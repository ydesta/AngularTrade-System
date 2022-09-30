import { Observable, Subject, forkJoin as observableForkJoin, BehaviorSubject } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AccountEndpoint } from './account-endpoint.service';
import { AuthService } from './auth.service';
import { User } from '../../models/user.model';
import { Role } from '../../models/role.model';
import { Permission, PermissionValues } from '../../models/permission.model';
import { UserEdit } from '../../models/user-edit.model';

export type RolesChangedOperation = 'add' | 'delete' | 'modify';

export interface RolesChangedEventArg {
  roles: Role[] | string[];
  operation: RolesChangedOperation;
}

@Injectable()
export class AccountService {
  public static readonly roleAddedOperation: RolesChangedOperation = 'add';
  public static readonly roleDeletedOperation: RolesChangedOperation = 'delete';
  public static readonly roleModifiedOperation: RolesChangedOperation = 'modify';

  private _rolesChanged = new Subject<RolesChangedEventArg>();
  userType = 'OnlineSite';

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private accountEndpoint: AccountEndpoint) {
  }

  getUser(userId?: string) {
    return this.accountEndpoint.getUserEndpoint<User>(userId);
  }

  getUserAndRoles(userId?: string) {
    return observableForkJoin(
      this.accountEndpoint.getUserEndpoint<User>(userId),
      this.accountEndpoint.getRolesEndpoint<Role[]>());
  }

  getUsers(page?: number, pageSize?: number) {

    return this.accountEndpoint.getUsersEndpoint<User[]>(page, pageSize);
  }

  getUsersAndRoles(page?: number, pageSize?: number) {
    return observableForkJoin(
      this.accountEndpoint.getUsersEndpoint<User[]>(page, pageSize),
      this.accountEndpoint.getRolesEndpoint<Role[]>());
  }

  updateUser(user: UserEdit) {
    if (user.Id) {
      return this.accountEndpoint.getUpdateUserEndpoint(user, user.Id);
    } else {
      return this.accountEndpoint.getUserByUserNameEndpoint<User>(user.UserName).pipe(
        mergeMap(foundUser => {
          user.Id = foundUser.Id;
          return this.accountEndpoint.getUpdateUserEndpoint(user, user.Id);
        }));
    }
  }


  newUser(user: UserEdit) {
    // console.debug(user);
    // return this.accountEndpoint.getNewUserEndpoint<User>(user);
    return this.accountEndpoint.getAddNewUserEndpoint<User>(user);
  }

  selfRegisterNewUser(user: UserEdit) {
    // console.debug(user);
    // return this.accountEndpoint.getNewUserEndpoint<User>(user);
    return this.accountEndpoint.getSelfRegisterAddNewUserEndpoint<User>(user);
  }

  getUserPreferences() {
    return this.accountEndpoint.getUserPreferencesEndpoint<string>();
  }

  updateUserPreferences(configuration: string) {
    return this.accountEndpoint.getUpdateUserPreferencesEndpoint(configuration);
  }

  deleteUser(userOrUserId: string | User): Observable<User> {
    if (typeof userOrUserId === 'string' || userOrUserId instanceof String) {
      return this.accountEndpoint.getDeleteUserEndpoint<User>(userOrUserId as string).pipe(
        tap(data => this.onRolesUserCountChanged(data.Roles)));
    } else {
      if (userOrUserId.Id) {
        return this.deleteUser(userOrUserId.Id);
      } else {
        return this.accountEndpoint.getUserByUserNameEndpoint<User>(userOrUserId.UserName).pipe(
          mergeMap(user => this.deleteUser(user.Id)));
      }
    }
  }

  unblockUser(userId: string) {
    return this.accountEndpoint.getUnblockUserEndpoint(userId);
  }

  userHasPermission(permissionValue: PermissionValues): boolean {
    return this.permissions.some(p => p === permissionValue);
  }

  refreshLoggedInUser() {
    return this.authService.refreshLogin();
  }

  getRoles(page?: number, pageSize?: number) {
    return this.accountEndpoint.getRolesEndpoint<Role[]>(page, pageSize);
  }

  getRolesAndPermissions(page?: number, pageSize?: number) {
    return observableForkJoin(
      this.accountEndpoint.getRolesEndpoint<Role[]>(page, pageSize),
      this.accountEndpoint.getPermissionsEndpoint<Permission[]>());
  }

  updateRole(role: Role) {
    if (role.Id) {
      return this.accountEndpoint.getUpdateRoleEndpoint(role, role.Id).pipe(
        tap(data => this.onRolesChanged([role], AccountService.roleModifiedOperation)));
    } else {
      return this.accountEndpoint.getRoleByRoleNameEndpoint<Role>(role.Name).pipe(
        mergeMap(foundRole => {
          role.Id = foundRole.Id;
          return this.accountEndpoint.getUpdateRoleEndpoint(role, role.Id);
        }),
        tap(data => this.onRolesChanged([role], AccountService.roleModifiedOperation)));
    }
  }

  newRole(role: Role) {
    return this.accountEndpoint.getNewRoleEndpoint<Role>(role).pipe(
      tap(data => this.onRolesChanged([role], AccountService.roleAddedOperation)));
  }

  deleteRole(roleOrRoleId: string | Role): Observable<Role> {
    if (typeof roleOrRoleId === 'string' || roleOrRoleId instanceof String) {
      return this.accountEndpoint.getDeleteRoleEndpoint<Role>(roleOrRoleId as string).pipe(
        tap(data => this.onRolesChanged([data], AccountService.roleDeletedOperation)));
    } else {
      if (roleOrRoleId.Id) {
        return this.deleteRole(roleOrRoleId.Id);
      } else {
        return this.accountEndpoint.getRoleByRoleNameEndpoint<Role>(roleOrRoleId.Name).pipe(
          mergeMap(role => this.deleteRole(role.Id)));
      }
    }
  }

  getPermissions() {
    return this.accountEndpoint.getPermissionsEndpoint<Permission[]>();
  }

  private onRolesChanged(roles: Role[] | string[], op: RolesChangedOperation) {
    this._rolesChanged.next({ roles, operation: op });
  }

  onRolesUserCountChanged(roles: Role[] | string[]) {
    return this.onRolesChanged(roles, AccountService.roleModifiedOperation);
  }

  getRolesChangedEvent(): Observable<RolesChangedEventArg> {
    return this._rolesChanged.asObservable();
  }

  get permissions(): PermissionValues[] {
    return this.authService.userPermissions;
  }

  get currentUser() {
    return this.authService.currentUser;
  }

  // isInvestor() {
  //   return true;
  // }

  getUserType() {
    if (this.authService.isLoggedIn) {
      if (this.currentUser.SiteCode === this.userType) {
        return true;
      }
    }
  }


  resetAccount(user: UserEdit) {
    return this.accountEndpoint.getResetPasswordEndpoint(user);
  }

  // resetAccount(user: UserEdit): Observable<any> {

  //   return this.http.post<any>(this.appConfig.urls.url('resetPassword', user,  this.getRequestHeaders())).pipe(
  //   );
  // }
  // resetAccount(email: string): Observable<any> {

  //   return this.http.get<any>(this.appConfig.urls.url('resetPassword', email)).pipe(
  //   );
  // }
}
