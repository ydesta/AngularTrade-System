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
import {
  TRADE_EXECUTION_REPORTER
} from '../../../app/common/constants/permissionConsts';

@Injectable()
export class AuthGuardCustomer implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const sets = new Set(route.data.roles);
    if (this.authService.isLoggedIn) {

      if (route.data.roles && route.data.roles.some(role => sets.has(role))) {
        // this.router.navigate(['/']);
        return true;
      }

      // not authorised so return false
      return false;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
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
      return (this.authService.currentUser.Roles.indexOf(TRADE_EXECUTION_REPORTER) >= 0
      );
    }
    this.authService.loginRedirectUrl = url;
    this.router.navigate(['auth/login']);
    return false;
  }
}
