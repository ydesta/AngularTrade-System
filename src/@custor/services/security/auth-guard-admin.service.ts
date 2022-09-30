import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import { SITE_ADMIN, SUPER_ADMIN, VIEW_ADMIN, VIEW_USER, VIEW_ROLE, MANAGE_ROLE, VIEW_SETTING, MANAGE_SETTING, MANAGE_USER } from "src/app/common/constants/permissionConsts";

@Injectable()
export class AuthGuardAdmin implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) {
      return (this.authService.currentUser.Roles.indexOf(SITE_ADMIN) >= 0)
        || (this.authService.currentUser.Roles.indexOf(SUPER_ADMIN) >= 0)
        ||(this.authService.currentUser.Roles.indexOf(VIEW_ADMIN) >= 0)
        ||(this.authService.currentUser.Roles.indexOf(VIEW_SETTING) >= 0)
        ||(this.authService.currentUser.Roles.indexOf(VIEW_USER) >= 0)
        ||(this.authService.currentUser.Roles.indexOf(VIEW_ROLE) >= 0)
        ||(this.authService.currentUser.Roles.indexOf(MANAGE_ROLE) >= 0)
        ||(this.authService.currentUser.Roles.indexOf(MANAGE_SETTING) >= 0
        ||(this.authService.currentUser.Roles.indexOf(MANAGE_USER) >= 0));
    }
    this.authService.loginRedirectUrl = url;
    this.router.navigate(['auth/login']);
    return false;
  }
}
