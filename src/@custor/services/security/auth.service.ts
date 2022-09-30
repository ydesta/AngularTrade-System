import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { LocalStoreManager } from '../storeManager.service';
import { ConfigurationService } from '../configuration.service';
import { settingKeys } from '../../helpers/settingKeys';
import { JwtHelper } from './jwt-helper';
import { Utilities } from '../../helpers/utilities';
import { AccessToken, LoginResponse } from '../../models/login-response.model';
import { User } from '../../models/user.model';
import { UserLogin } from '../../models/user-login.model';
import { PermissionValues } from '../../models/permission.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

// import { access } from 'fs';

// import * as fs from 'fs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public get loginUrl() {
    return this.configurations.loginUrl;
  }

  public get homeUrl() {
    return this.configurations.homeUrl;
  }

  public loginRedirectUrl: string;
  public logoutRedirectUrl: string;

  public reLoginDelegate: () => void;

  private previousIsLoggedInCheck = false;
  private _loginStatus = new Subject<boolean>();

  constructor(private router: Router, private configurations: ConfigurationService,
    private localStorage: LocalStoreManager, protected http: HttpClient) {
    this.initializeLoginStatus();
  }

  private initializeLoginStatus() {
    this.localStorage.getInitEvent().subscribe(() => {
      this.reevaluateLoginStatus();
    });
  }

  gotoPage(page: string, preserveParams = true) {
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: preserveParams ? 'merge' : '', preserveFragment: preserveParams
    };

    this.router.navigate([page], navigationExtras);
  }

  redirectLoginUser() {
    const redirect = this.loginRedirectUrl && this.loginRedirectUrl !== '/' && this.loginRedirectUrl
      !== ConfigurationService.defaultHomeUrl ? this.loginRedirectUrl : this.homeUrl;
    this.loginRedirectUrl = null;

    const urlParamsAndFragment = Utilities.splitInTwo(redirect, '#');
    const urlAndParams = Utilities.splitInTwo(urlParamsAndFragment.firstPart, '?');

    const navigationExtras: NavigationExtras = {
      fragment: urlParamsAndFragment.secondPart,
      queryParams: Utilities.getQueryParamsFromString(urlAndParams.secondPart),
      queryParamsHandling: 'merge'
    };

    this.router.navigate([urlAndParams.firstPart], navigationExtras);
  }

  redirectLogoutUser() {
    const redirect = this.logoutRedirectUrl ? this.logoutRedirectUrl : this.loginUrl;
    this.logoutRedirectUrl = null;
    this.router.navigate(['auth/login']);
  }

  redirectLogoutUserAdmin() {
    this.router.navigate(['']);
  }
  redirectForLogin() {
    this.loginRedirectUrl = this.router.url;
    this.router.navigate([this.loginUrl]);
  }

  reLogin() {
    this.localStorage.deleteData(settingKeys.TOKEN_EXPIRES_IN);

    if (this.reLoginDelegate) {
      this.reLoginDelegate();
    } else {
      this.redirectForLogin();
    }
  }

  refreshLogin() {
    return this.getRefreshLoginEndpoint<LoginResponse>().pipe(
      map(response => this.processLoginResponse(response, this.rememberMe)));
  }

  login(user: UserLogin) {
    if (this.isLoggedIn) {
      this.logout();
    }

    return this.getLoginEndpoint<LoginResponse>(user.userName, user.password).pipe(
      map(response => this.processLoginResponse(response, user.rememberMe)));
  }
  getLoginEndpoint<T>(userName: string, password: string): Observable<T> {
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    });

    const params = new HttpParams()
      .append('username', userName)
      .append('password', password)
      .append('client_id', 'swaggerui')
      .append('grant_type', 'password')
    //.append('scope', 'icers_api');
    return this.http.post<T>(this.loginUrl, params, { headers: header });
  }
  getRefreshLoginEndpoint<T>(): Observable<T> {
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    });

    const params = new HttpParams()
      .append('refresh_token', this.refreshToken)
      .append('client_id', 'swaggerui')
      .append('grant_type', 'refresh_token');

    return this.http.post<T>(this.loginUrl, params, { headers: header });
  }

  private processLoginResponse(response: LoginResponse, rememberMe: boolean) {


    const accessToken = response.access_token;

    if (accessToken == null) {
      throw new Error('Received accessToken was empty');
    }
    localStorage.setItem('loggIn', 'true');


    const refreshToken = response.refresh_token || this.refreshToken;
    const expiresIn = response.expires_in;

    const tokenExpiryDate = new Date();
    tokenExpiryDate.setSeconds(tokenExpiryDate.getSeconds() + expiresIn);

    const accessTokenExpiry = tokenExpiryDate;

    const jwtHelper = new JwtHelper();
    const decodedAccessToken = jwtHelper.decodeToken(response.access_token) as AccessToken;

    const permissions: PermissionValues[] = Array.isArray(decodedAccessToken.permission) ?
      decodedAccessToken.permission : [decodedAccessToken.permission];

    if (!this.isLoggedIn) {
      this.configurations.import(decodedAccessToken.configuration);
    }

    const user = new User(
      decodedAccessToken.sub,
      decodedAccessToken.name,
      decodedAccessToken.fullname,
      decodedAccessToken.email,
      decodedAccessToken.tin,
      decodedAccessToken.phone_number,
      Array.isArray(decodedAccessToken.role) ? decodedAccessToken.role : [decodedAccessToken.role],
      decodedAccessToken.sitecode,
      decodedAccessToken.ExchangeActorId,
      parseInt(decodedAccessToken.CustomerTypeId),
    );
    user.IsEnabled = true;

    this.saveUserDetails(user, permissions, accessToken, refreshToken, accessTokenExpiry, rememberMe);

    this.reevaluateLoginStatus(user);

    return user;
  }

  private saveUserDetails(user: User, permissions: PermissionValues[],
    accessToken: string, refreshToken: string, expiresIn: Date, rememberMe: boolean) {
    if (rememberMe) {
      this.localStorage.savePermanentData(accessToken, settingKeys.ACCESS_TOKEN);
      this.localStorage.savePermanentData(refreshToken, settingKeys.REFRESH_TOKEN);
      this.localStorage.savePermanentData(expiresIn, settingKeys.TOKEN_EXPIRES_IN);
      this.localStorage.savePermanentData(permissions, settingKeys.USER_PERMISSIONS);
      this.localStorage.savePermanentData(user, settingKeys.CURRENT_USER);
    } else {
      this.localStorage.saveSyncedSessionData(accessToken, settingKeys.ACCESS_TOKEN);
      this.localStorage.saveSyncedSessionData(refreshToken, settingKeys.REFRESH_TOKEN);
      this.localStorage.saveSyncedSessionData(expiresIn, settingKeys.TOKEN_EXPIRES_IN);
      this.localStorage.saveSyncedSessionData(permissions, settingKeys.USER_PERMISSIONS);
      this.localStorage.saveSyncedSessionData(user, settingKeys.CURRENT_USER);
    }

    this.localStorage.savePermanentData(rememberMe, settingKeys.REMEMBER_ME);
  }

  logout(): void {
    this.localStorage.deleteData(settingKeys.ACCESS_TOKEN);
    this.localStorage.deleteData(settingKeys.REFRESH_TOKEN);
    this.localStorage.deleteData(settingKeys.TOKEN_EXPIRES_IN);
    this.localStorage.deleteData(settingKeys.USER_PERMISSIONS);
    this.localStorage.deleteData(settingKeys.CURRENT_USER);

    this.configurations.clearLocalChanges();

    this.reevaluateLoginStatus();
  }

  private reevaluateLoginStatus(currentUser?: User) {
    const user = currentUser || this.localStorage.getDataObject<User>(settingKeys.CURRENT_USER);
    const isLoggedIn = user != null;

    if (this.previousIsLoggedInCheck !== isLoggedIn) {
      setTimeout(() => {
        this._loginStatus.next(isLoggedIn);
      });
    }

    this.previousIsLoggedInCheck = isLoggedIn;
  }

  getLoginStatusEvent(): Observable<boolean> {
    return this._loginStatus.asObservable();
  }

  get currentUser(): User {
    const user = this.localStorage.getDataObject<User>(settingKeys.CURRENT_USER);
    this.reevaluateLoginStatus(user);

    return user;
  }

  get userPermissions(): PermissionValues[] {
    return this.localStorage.getDataObject<PermissionValues[]>(settingKeys.USER_PERMISSIONS) || [];
  }

  get accessToken(): string {
    this.reevaluateLoginStatus();
    return this.localStorage.getData(settingKeys.ACCESS_TOKEN);
  }

  get accessTokenExpiryDate(): Date {
    this.reevaluateLoginStatus();
    return this.localStorage.getDataObject<Date>(settingKeys.TOKEN_EXPIRES_IN, true);
  }

  get isSessionExpired(): boolean {
    if (this.accessTokenExpiryDate == null) {
      return true;
    }

    return this.accessTokenExpiryDate.valueOf() <= new Date().valueOf();
  }

  get refreshToken(): string {
    this.reevaluateLoginStatus();
    return this.localStorage.getData(settingKeys.REFRESH_TOKEN);
  }

  get isLoggedIn(): boolean {
    return this.currentUser != null;
  }

  get rememberMe(): boolean {
    return this.localStorage.getDataObject<boolean>(settingKeys.REMEMBER_ME) === true;
  }
  checkLogin() {
    if (!this.isLoggedIn) {
      this.router.navigate(['/auth/login'])
    }
  }

}
