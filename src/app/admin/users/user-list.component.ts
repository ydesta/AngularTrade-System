import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatPaginator,
  MatSnackBar,
  MatSort,
  MatTableDataSource,
  MatDialogConfig,
} from "@angular/material";

import { EditUserDialogComponent } from "./edit-user-dialog.component";
import { fadeInOut } from "src/@custor/services/animations";
import { User } from "src/@custor/models/user.model";
import { Role } from "src/@custor/models/role.model";
import { ToastrService } from "ngx-toastr";
import { AccountService } from "src/@custor/services/security/account.service";
import { Utilities } from "src/@custor/helpers/utilities";
import { Permission } from "src/@custor/models/permission.model";
import { AuthService } from "src/@custor/services/security/auth.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { locale as langEnglish } from "../lang/et";
import { locale as langEthiopic } from "../lang/en";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { UserDocumentsUploadDialogComponent } from "./user-documents-upload-dialog/user-documents-upload-dialog.component";
import {
  AngConfirmDialogComponent,
  ConfirmDialogModel,
} from "src/@custor/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
  animations: [fadeInOut],
})
export class UserListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns = ["userName", "fullName", "email"];
  dataSource: MatTableDataSource<User>;
  sourceUser: User;
  loadingIndicator: boolean;
  allRoles: Role[] = [];
  public user: any;
  constructor(
    private myDialog: MatDialog,
    private alertService: ToastrService,
    private configService: ConfigurationService,
    private translationService: TranslateService,
    private translationLoaderService: TranslationLoaderService,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {
    // if (this.canManageUsers) {
    //   this.displayedColumns.push('actions');
    // }
    this.displayedColumns.push("actions");
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }

  private refresh() {
    // Causes the filter to refresh there by updating with recently added data.
    this.applyFilter(this.dataSource.filter);
  }

  private updateUsers(user: User) {
    if (this.sourceUser) {
      Object.assign(this.sourceUser, user);
      this.alertService.success(
        this.translationService.instant("users.management.UpdateUser")
      );
      this.sourceUser = null;
      this.loadData();
    } else {
      this.dataSource.data.push(user);
      this.loadData();
      this.refresh();
    }
  }

  private loadData() {
    if (this.canAssignRoles) {
      this.loadingIndicator = true;
      this.accountService
        .getUsersAndRoles()
        .subscribe((results) =>
          this.onDataLoadSuccessful(results[0], results[1])
        );
    } else {
      if (this.canViewUsers) {
        console.info("it is checking usersss");
        this.loadingIndicator = true;
        this.accountService.getUsers().subscribe((users) =>
          this.onDataLoadSuccessful(
            users,
            this.accountService.currentUser.Roles.map((r) => new Role(r))
          )
        );
      } else {
      }
    }
  }

  private onDataLoadSuccessful(users: User[], roles: Role[]) {
    this.loadingIndicator = false;

    //  this.dataSource.data = users;
    // this.dataSource.data.filter=th
    // users = users.filter((item) => {
    //   return (item.Roles.toString().toLowerCase().includes(MEMBER_DATA_OFFICER) ||
    //   item.Roles.toString().toLowerCase().includes(DIRECT_TRADING_DATA_OFFICER) ||
    //   item.Roles.toString().toLowerCase().includes(AUDITOR_DATA_OFFICER)  );
    // });
    // console.log("object  ",users)
    this.dataSource.data = users;
    this.allRoles = roles;
  }

  private onDataLoadFailed(error: any) {
    this.loadingIndicator = false;
    this.alertService.error(
      `Unable to retrieve users from the server.\r\nErrors: "${Utilities.getHttpResponseMessage(
        error
      )}"`,
      "Load Error"
    );
  }

  editUser(user?: User, isStaff?: boolean) {
    this.sourceUser = user;
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      panelClass: "mat-dialog-lg",
      data: { user, roles: [...this.allRoles], isStaff },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((user) => {
      if (user) {
        this.updateUsers(user);
      }
    });
  }

  uploadUerDocuments(user?: User) {
    this.sourceUser = user;

    const dialogRef = this.dialog.open(UserDocumentsUploadDialogComponent, {
      panelClass: "mat-dialog-lg",
      data: { user, roles: [...this.allRoles] },
      height: "auto",
    });
    dialogRef.afterClosed().subscribe((user) => {
      if (user) {
        this.updateUsers(user);
      }
    });
  }
  resetpassword(user: User) {
    this.router.navigate(["auth/manage/", user.UserName]);
  }
  confirmDelete(user: User) {
    const message = `Are you sure you want to delete this record?`;
    const dialogData = new ConfirmDialogModel("Confirm", message);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "345px";
    dialogConfig.height = "220px";
    dialogConfig.data = dialogData;
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(AngConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult === true) {
        this.accountService.deleteUser(user).subscribe(
          (result) => {
            this.loadingIndicator = false;
            this.dataSource.data = this.dataSource.data.filter(
              (item) => item !== user
            );
            this.alertService.success(
              this.translationService.instant("common.messages.Deleted"),
              "",
              {
                closeButton: true,
              }
            );
          },
          (error) => {
            this.loadingIndicator = false;
            // tslint:disable-next-line:max-line-length
            this.alertService.error(
              `An error occured whilst deleting the user.\r\nError: "${Utilities.getHttpResponseMessage(
                error
              )}"`,
              "Delete Error"
            );
          }
        );
      }
    });
  }

  get canManageAdmins() {
    return this.accountService.userHasPermission(
      Permission.manageSiteAdministratorsPermission
    );
  }

  get canManageUsers() {
    return this.accountService.userHasPermission(
      Permission.manageUsersPermission
    );
  }

  get canViewUsers() {
    console.info(
      this.accountService.userHasPermission(Permission.viewUsersPermission)
    );
    return this.accountService.userHasPermission(
      Permission.viewUsersPermission
    );
  }

  get canViewRoles() {
    return this.accountService.userHasPermission(
      Permission.viewRolesPermission
    );
  }

  get canAssignRoles() {
    return this.accountService.userHasPermission(
      Permission.assignRolesPermission
    );
  }

  get currentUser() {
    return this.authService.currentUser;
  }
}
