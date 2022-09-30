import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { determineId } from 'src/@custor/helpers/compare';
import { Permission } from 'src/@custor/models/permission.model';
import { Role } from 'src/@custor/models/role.model';
import { TranslationLoaderService } from 'src/@custor/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AccountService } from '../../../@custor/services/security/account.service';
import { locale as langEthiopic } from '../lang/en';
import { locale as langEnglish } from '../lang/et';

@Component({
  selector: 'role-editor',
  templateUrl: './role-editor.component.html',
  styleUrls: ['./role-editor.component.scss']
})
export class RoleEditorComponent implements OnChanges, OnInit {
  @ViewChild('form', { static: false })
  private form: NgForm;
  LookupValuew = [];

  selectedPermissions: SelectionModel<Permission>;
  isexpand: boolean = false
  public isNewRole = false;
  private isSaving: boolean;
  private onRoleSaved = new Subject<Role>();

  @Input() role: Role = new Role();
  @Input() allPermissions: Permission[] = [];
  @Input() permisson2: Permission[] = [];
  roleForm: FormGroup;
  LookupValue: Permission;
  roleSaved$ = this.onRoleSaved.asObservable();

  // sites: SiteModel[] = [];

  get Name() {
    return this.roleForm.get('Name');
  }

  constructor(
    private alertService: ToastrService,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private translationService: TranslateService,
    private translationLoaderService: TranslationLoaderService,
  ) {
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.buildForm();
  }
  ngOnInit() {
    this.isexpand = true;
    this.formControlValueChanged();
  }
  ngOnChanges() {
    if (this.role) {
      this.isNewRole = false;

    } else {
      this.isNewRole = true;
      this.role = new Role();
    }
    this.resetForm();

  }


  public save() {



    if (!this.roleForm.valid) {
      return;
    }

    this.isSaving = true;

    if (this.isNewRole) {
      const getnewRole = this.getNewRole();
      this.accountService.newRole(getnewRole).subscribe(
        role => this.saveSuccessHelper(role),
        error => this.saveFailedHelper(error));
    }
    else {
      const editedRole = this.getEditedRole();
      console.info(editedRole)
      this.accountService.updateRole(editedRole).subscribe(
        response => this.saveSuccessHelper(editedRole),
        error => this.saveFailedHelper(error));
    }
  }

  private getNewRole(): Role {
    const formModel = this.roleForm.value;

    return {
      Id: this.role.Id,
      Name: formModel.Name,
      Description: formModel.Description,
      permissions: this.selectedPermissions.selected,
      UsersCount: 0
    };
  }
  private getEditedRole(): Role {
    const formModel = this.roleForm.value;

    return {
      Id: this.role.Id,
      Name: formModel.Name,
      Description: formModel.Description,
      permissions: formModel.PermissionN,
      UsersCount: 0
    };
  }
  compareIds(id1: any, id2: string): boolean {

    const a1 = determineId(id1.Value);
    const a2 = determineId(id2);
    // return;
    return a1 === a2;
  }
  private saveSuccessHelper(role?: Role) {
    this.isSaving = false;
    if (this.isNewRole) {
      this.alertService.success(this.translationService.instant('roles.management.CreateRole'));

    } else {
      this.alertService.success(this.translationService.instant('roles.management.UpdateRole'));

    }
    if (!this.isNewRole) {
      if (this.accountService.currentUser.Roles.some(r => r === this.role.Name)) {
        this.refreshLoggedInUser();
      }

      role.UsersCount = this.role.UsersCount;
    }

    this.onRoleSaved.next(role);
  }
  private refreshLoggedInUser() {
    this.accountService.refreshLoggedInUser()
      .subscribe(user => {
      },
        error => {
          this.alertService.error('An error occured whilst refreshing logged in user information from the server',
            'Refresh failed');
        });
  }

  private saveFailedHelper(error: any) {
    this.isSaving = false;
    this.alertService.error('The below errors occured whilst saving your changes:', 'Save Error');
    this.alertService.error(null, error);
  }

  private cancel() {
    this.resetForm();
  }


  private selectAll() {
    this.selectedPermissions.select(...this.allPermissions);
  }

  private toggleGroup(groupName: string) {
    let firstMemberValue: boolean;

    // tslint:disable-next-line:no-unused-expression
    // this.selectedPermissions.selected; // ???? to-do

    const permissions = this.allPermissions
      .filter(p => p.GroupName === groupName);
    if (permissions.length) {
      if (this.selectedPermissions.isSelected(permissions[0])) {
        this.selectedPermissions.deselect(...permissions);
      } else {
        this.selectedPermissions.select(...permissions);
      }
    }
  }

  get Permission() {
    return this.roleForm.get('Permission');
  }
  private buildForm() {
    this.roleForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Description: '',
      PermissionN: ['', this.canManageRoles ? Validators.required : ''],

    });
  }
  X = new FormControl(true, [
    Validators.required
  ]);
  formControlValueChanged() {

    // this.tin.valueChanges
    //   .subscribe(
    //     (tinval: string) => {
    //       if (tinval.length > 0) {
    //         this.showCheckTinButton = true;
    //         this.isTinExisting = false;
    //         cTin.setValidators([Validators.pattern('[0-9]+'), Validators.minLength(10), Validators.maxLength(10)]);
    //       } else {
    //         this.showCheckTinButton = false;
    //         this.isTinExisting = true;
    //         cTin.clearValidators();
    //       }
    //       cTin.updateValueAndValidity({ emitEvent: false });
    //     });

    // if the current user is a sites admin, he should only manage users of his own sites

  }

  onActiveHomeboxP(elem) {

    elem.checked = true;
    //this.checkedBtn = !this.checkedBtn;


  }
  private resetForm(replace = false) {

    this.roleForm.reset({
      Name: this.role.Name || '',
      Description: this.role.Description || '',
      PermissionN: this.role['Permissions'] || ''
    });
    if (this.isNewRole) {
      const selectePermissions = this.role.permissions
        ? this.allPermissions.filter(x => this.role.permissions.find(y => y.Value === x.Value))
        : [];

      this.selectedPermissions = new SelectionModel<Permission>(true, selectePermissions);
    }
  }

  get canManageRoles() {
    return this.accountService.userHasPermission(Permission.manageRolesPermission);
  }
}