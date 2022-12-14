
import {throwError as observableThrowError, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {EndpointFactory} from './endpoint-factory.service';
import {ConfigurationService} from '../configuration.service';

@Injectable()
export class AccountEndpoint extends EndpointFactory {
  private readonly _usersUrl: string = 'api/account/users';
  // private readonly _usersAddUrl: string = '/api/account/users/add';
  private readonly _usersAddUrl: string = 'api/account/users';
  private readonly _selfRegisterUsersAddUrl: string = 'api/account/users';
  private readonly _userByUserNameUrl: string = 'api/account/users/username';
  private readonly _currentUserUrl: string = 'api/account/users/me';
  private readonly _currentUserPreferencesUrl: string = 'api/account/users/me/preferences';
  private readonly _unblockUserUrl: string = 'api/account/users/unblock';
  private readonly _rolesUrl: string = 'api/account/roles';
  private readonly _roleByRoleNameUrl: string = 'api/account/roles/name';
  private readonly _permissionsUrl: string = 'api/account/permissions';
  private readonly _resetUrl: string = 'api/account/ChangeOrResetPassword';

  get usersUrl() {
    return this.configurations.baseUrl + this._usersUrl;
  }

  get usersAddUrl() {
    return this.configurations.baseUrl + this._usersAddUrl;
  }

  get selfRegisterUsersAddUrl() {
    return this.configurations.baseUrl + this._selfRegisterUsersAddUrl;
  }

  get userByUserNameUrl() {
    return this.configurations.baseUrl + this._userByUserNameUrl;
  }

  get currentUserUrl() {
    return this.configurations.baseUrl + this._currentUserUrl;
  }

  get currentUserPreferencesUrl() {
    return this.configurations.baseUrl + this._currentUserPreferencesUrl;
  }

  get unblockUserUrl() {
    return this.configurations.baseUrl + this._unblockUserUrl;
  }

  get rolesUrl() {
    return this.configurations.baseUrl + this._rolesUrl;
  }

  get roleByRoleNameUrl() {
    return this.configurations.baseUrl + this._roleByRoleNameUrl;
  }

  get permissionsUrl() {
    return this.configurations.baseUrl + this._permissionsUrl;
  }

  get resetUrl() {
    return this.configurations.baseUrl + this._resetUrl;
  }

  constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {
    super(http, configurations, injector);
  }

  getUserEndpoint<T>(userId?: string): Observable<T> {
    const endpointUrl = userId ? `${this.usersUrl}/${userId}` : this.currentUserUrl;
    return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe(
      catchError(err => observableThrowError(err || 'Server error')));
  }

  getUserByUserNameEndpoint<T>(userName: string): Observable<T> {
    const endpointUrl = `${this.userByUserNameUrl}/${userName}`;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe(
      catchError(err => observableThrowError(err || 'Server error')));
  }

  getUsersEndpoint<T>(page?: number, pageSize?: number): Observable<T> {

    const endpointUrl = page && pageSize ? `${this.usersUrl}/${page}/${pageSize}` : this.usersUrl;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe(
      catchError(err => observableThrowError(err || 'Server error')));
  }

  getNewUserEndpoint<T>(userObject: any): Observable<T> {
    return this.http.post<T>(this.usersUrl, JSON.stringify(userObject), this.getRequestHeaders()).pipe(
      catchError(err => observableThrowError(err || 'Server error'))
    );
  }

  getAddNewUserEndpoint<T>(userObject: any): Observable<T> {
    return this.http.post<T>(this.usersAddUrl, JSON.stringify(userObject), this.getRequestHeaders()).pipe(
      catchError(err => observableThrowError(err || 'Server error'))
    );
  }

  getSelfRegisterAddNewUserEndpoint<T>(userObject: any): Observable<T> {
    return this.http.post<T>(this.selfRegisterUsersAddUrl, JSON.stringify(userObject), this.getRequestHeaders()).pipe(
      catchError(err => observableThrowError(err || 'Server error'))
    );
  }

  getUpdateUserEndpoint<T>(userObject: any, userId?: string): Observable<T> {
    const endpointUrl = userId ? `${this.usersUrl}/${userId}` : this.currentUserUrl;

    return this.http.put<T>(endpointUrl, JSON.stringify(userObject), this.getRequestHeaders()).pipe(
      catchError(err => observableThrowError(err || 'Server error')));
  }

  getPatchUpdateUserEndpoint<T>(patch: {}, userId?: string): Observable<T>;
  getPatchUpdateUserEndpoint<T>(value: any, op: string, path: string, from?: any, userId?: string): Observable<T>;
  getPatchUpdateUserEndpoint<T>(valueOrPatch: any, opOrUserId?: string, path?: string, from?: any, userId?: string): Observable<T> {
    let endpointUrl: string;
    let patchDocument: {};

    if (path) {
      endpointUrl = userId ? `${this.usersUrl}/${userId}` : this.currentUserUrl;
      patchDocument = from ?
        [{value: valueOrPatch, path: path, op: opOrUserId, from: from}] :
        [{value: valueOrPatch, path: path, op: opOrUserId}];
    } else {
      endpointUrl = opOrUserId ? `${this.usersUrl}/${opOrUserId}` : this.currentUserUrl;
      patchDocument = valueOrPatch;
    }

    return this.http.patch<T>(endpointUrl, JSON.stringify(patchDocument), this.getRequestHeaders()).pipe(
      catchError(err => observableThrowError(err || 'Server error')));
  }

  getUserPreferencesEndpoint<T>(): Observable<T> {
    return this.http.get<T>(this.currentUserPreferencesUrl, this.getRequestHeaders()).pipe(
      catchError(err => observableThrowError(err || 'Server error')));
  }

  getUpdateUserPreferencesEndpoint<T>(configuration: string): Observable<T> {
    return this.http.put<T>(this.currentUserPreferencesUrl, JSON.stringify(configuration), this.getRequestHeaders()).pipe(
      catchError(err => observableThrowError(err || 'Server error')));
  }

  getUnblockUserEndpoint<T>(userId: string): Observable<T> {
    const endpointUrl = `${this.unblockUserUrl}/${userId}`;

    return this.http.put<T>(endpointUrl, null, this.getRequestHeaders()).pipe(
      catchError(err => observableThrowError(err || 'Server error')));
  }

  getDeleteUserEndpoint<T>(userId: string): Observable<T> {
    const endpointUrl = `${this.usersUrl}/${userId}`;

    return this.http.delete<T>(endpointUrl, this.getRequestHeaders()).pipe(
      catchError(err => observableThrowError(err || 'Server error')));
  }

  getRoleEndpoint<T>(roleId: string): Observable<T> {
    const endpointUrl = `${this.rolesUrl}/${roleId}`;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe(
      catchError(err => observableThrowError(err || 'Server error')));
  }

  getRoleByRoleNameEndpoint<T>(roleName: string): Observable<T> {
    const endpointUrl = `${this.roleByRoleNameUrl}/${roleName}`;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe(
      catchError(err => observableThrowError(err || 'Server error')));
  }

  getRolesEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    const endpointUrl = page && pageSize ? `${this.rolesUrl}/${page}/${pageSize}` : this.rolesUrl;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe(
      catchError(err => observableThrowError(err || 'Server error')));
  }

  getNewRoleEndpoint<T>(roleObject: any): Observable<T> {
    return this.http.post<T>(this.rolesUrl, JSON.stringify(roleObject), this.getRequestHeaders()).pipe(
      catchError(err => observableThrowError(err || 'Server error')));
  }

  getUpdateRoleEndpoint<T>(roleObject: any, roleId: string): Observable<T> {
    const endpointUrl = `${this.rolesUrl}/${roleId}`;

    return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders()).pipe(
      catchError(err => observableThrowError(err || 'Server error')));
  }

  getDeleteRoleEndpoint<T>(roleId: string): Observable<T> {
    const endpointUrl = `${this.rolesUrl}/${roleId}`;

    return this.http.delete<T>(endpointUrl, this.getRequestHeaders()).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getDeleteRoleEndpoint(roleId));
      }));
  }

  getPermissionsEndpoint<T>(): Observable<T> {
    return this.http.get<T>(this.permissionsUrl, this.getRequestHeaders()).pipe(
      catchError(err => observableThrowError(err || 'Server error')));
  }

  getResetPasswordEndpoint<T>(userObject: any): Observable<T> {
    return this.http.post<T>(this.resetUrl, JSON.stringify(userObject), this.getRequestHeaders()).pipe(
      catchError(err => observableThrowError(err || 'Server error')));
  }
}
