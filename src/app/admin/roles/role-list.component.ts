import { AfterViewInit, Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, MatDialogConfig } from '@angular/material';

import { EditRoleDialogComponent } from './edit-role-dialog.component';
import { fadeInOut } from 'src/@custor/services/animations';
import { Role } from 'src/@custor/models/role.model';
import { Permission } from 'src/@custor/models/permission.model';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/@custor/services/security/account.service';
import { Utilities } from 'src/@custor/helpers/utilities';

import { TranslateService } from '@ngx-translate/core';
import { TranslationLoaderService } from 'src/@custor/services/translation-loader.service';
import { locale as langEnglish } from '../lang/et';
import { locale as langEthiopic } from '../lang/en';
import { ConfirmDialogModel, AngConfirmDialogComponent } from 'src/@custor/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
  animations: [fadeInOut]
})
export class RoleListComponent implements OnInit, AfterViewInit,OnChanges {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns = ['roleName', 'description', 'actions'];
  dataSource: MatTableDataSource<Role>;
  allPermissions: Permission[] = [];
  sourceRole: Role;
  editingRoleName: { name: string };
  loadingIndicator: boolean;

  constructor(
    private alertService: ToastrService,
    private translationService: TranslateService,
    private translationLoaderService: TranslationLoaderService,
    private accountService: AccountService,
    private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
  }

  get canManageRoles() {
    return this.accountService.userHasPermission(Permission.manageRolesPermission);
  }

  get canViewRoles() {
    return this.accountService.userHasPermission(Permission.viewRolesPermission);
  }

  get canManageAdmins() {
    return this.accountService.userHasPermission(Permission.manageSiteAdministratorsPermission);
  }


  ngOnInit() {
    this.checkAuthorization();
  }
ngOnChanges(){
this.loadData();
}
  checkAuthorization() {
    if (!this.canManageRoles&&!this.canViewRoles) {

      this.alertService.error('You are not allowed to access this page');
      //  this.router.navigateByUrl('denied');
      return;
    } else {
      this.loadData();
    }
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

  private updateRoles(role: Role) {
    if (this.sourceRole) {
      Object.assign(this.sourceRole, role);
      this.sourceRole = null;
    } else {
      this.dataSource.data.push(role);
    }

    this.refresh();
    this.loadData();
  }

  private loadData() {
    this.loadingIndicator = true;

    this.accountService.getRolesAndPermissions()
      .subscribe(results => {
        this.loadingIndicator = false;
        this.dataSource.data = results[0];
        this.allPermissions = results[1];
      });
  }

  editRole(role?: Role) {
    this.sourceRole = role;
    const dialogRef = this.dialog.open(EditRoleDialogComponent,
      {
        panelClass: 'mat-dialog-md',
        data: { role: role, allPermissions: this.allPermissions }

      }
    );
    dialogRef.afterClosed().subscribe(role => {
      if (role && this.canManageRoles) {
        this.updateRoles(role);
      }
    });
  }

  confirmDelete(role: Role) {
   const message = `Are you sure you want to delete this record?`;
  const dialogData = new ConfirmDialogModel('Confirm', message);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = '345px';
  dialogConfig.height = '220px';
  dialogConfig.data = dialogData;
  dialogConfig.disableClose = true;
  const dialogRef = this.dialog.open(AngConfirmDialogComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(dialogResult => {
    if (dialogResult === true) {
      this.accountService.deleteRole(role).subscribe(() => {
        this.loadingIndicator = false;
        this.dataSource.data = this.dataSource.data.filter(item => item !== role);
        this.alertService.success(this.translationService.instant('common.messages.Deleted'), '', {
          closeButton: true
        })},
        error => {
          this.loadingIndicator = false;
          this.alertService.error(`An error occured whilst deleting the role.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
            'Delete Error');
        });
    }
  });
}
}