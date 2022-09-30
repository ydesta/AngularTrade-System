import {
  Component,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";

import { Subject, Subscription } from "rxjs";

import { AccountService } from "src/@custor/services/security/account.service";
import { ToastrService } from "ngx-toastr";

import { User } from "src/@custor/models/user.model";
import { UserEdit } from "src/@custor/models/user-edit.model";
import { Role } from "src/@custor/models/role.model";
import { Permission } from "src/@custor/models/permission.model";
import { EqualValidator } from "src/@custor/validators/equal.validator";
// import {Site} from '../../common/models/sites.model';
import { determineId } from "../../../@custor/helpers/compare";
import { Utilities } from "../../../@custor/helpers/utilities";
import { StaticData2 } from "src/app/common/models/static-data.model";
import { TranslateService } from "@ngx-translate/core";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { locale as langEnglish } from "../lang/et";
import { locale as langEthiopic } from "../lang/en";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { MatDialog, MatDialogRef, MatDialogConfig } from "@angular/material";
import { ExistingUserDialogComponent } from "./existing-user-dialog/existing-user-dialog.component";
import { HttpErrorResponse } from "@angular/common/http";
import { ErrorService } from "../../../@custor/services/error/error.service";
import {
  EMAIL_VALIDATOR,
  PHONE_VALIDATOR,
} from "src/app/common/constants/consts";
import { UserService } from "../../auth/services/user.service";
import { ExchangeActorApiService } from "src/app/main/services/exchange-actor-api.service";
import { SearchDialogComponent } from "src/app/main/common/components/search-dialog/search-dialog.component";
import { CustomerSearchResultModel } from "src/app/main/models/exchange-actor.model";
import {
  MEMBER_DATA_OFFICER,
  DIRECT_TRADING_DATA_OFFICER,
  AUDITOR_DATA_OFFICER,
} from "src/app/common/constants/permissionConsts";

@Component({
  selector: "user-editor",
  templateUrl: "./user-editor.component.html",
  styleUrls: ["./user-editor.component.scss"],
})
export class UserEditorComponent implements OnChanges, OnDestroy, OnInit {
  @ViewChild("form", { static: false })
  private form: NgForm;
  isNewUser = false;
  isChangePassword = false;
  isempty = "";
  public isSaving = false;
  private passwordWatcher: Subscription;
  private onUserSaved = new Subject<User>();
  sitesList: StaticData2[] = [];
  @Input() user: User = new User();
  @Input() roles: Role[] = [];
  @Input() isStaff: boolean;
  @Input() isEditMode = false;
  @Input() errors: string[] = [];
  private CONST_ADMIN = "site administrator";
  private CONST_SUPERADMIN = "super administrator";

  userProfileForm: FormGroup;
  userSaved$ = this.onUserSaved.asObservable();
  private isExisting: boolean;
  isTinExisting = true;
  existingRegistrationConfirmationDialogRef: MatDialogRef<ExistingUserDialogComponent>;
  private tinInfo: any;
  showCheckTinButton: boolean;
  exchangeActorId: string = null;
  exchangeActorStatus: any;
  customerSearchResult: CustomerSearchResultModel;
  customerTypeId: number = 0;
  exchangeActorName: any;
  exchangeActorIdy: any;

  constructor(
    private translate: TranslateService,
    private toaster: ToastrService,
    private exchangeActorApiService: ExchangeActorApiService,
    private alertService: ToastrService,
    private translationService: TranslateService,
    private translationLoaderService: TranslationLoaderService,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    // private siteSer: SiteService,
    private userService: UserService,
    private ngxUiService: NgxUiLoaderService,
    private dialog: MatDialog,
    private injector: Injector
  ) {
    this.buildForm();
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
  }

  ngOnInit() {
    this.exchangeActorIdy = this.user.ExchangeActorId;
    if (this.exchangeActorIdy) {
      this.exchangeActorApiService
        .getExchangeActorInfo(this.user.ExchangeActorId)
        .subscribe((res) => {
          this.exchangeActorId = this.user.ExchangeActorId;
          this.customerTypeId = this.user.CustomerTypeId;
          this.userProfileForm
            .get("ExchangeActorId")
            .setValue(res.OrganizationNameEng);
        });
    }

    this.formControlValueChanged();
  }

  get userSite() {
    return this.userProfileForm.get("userSite");
  }

  get fullName() {
    return this.userProfileForm.get("fullName");
  }

  // get fullNameAmharic() {
  //     return this.userProfileForm.get('fullNameAmharic');
  // }
  get userName() {
    return this.userProfileForm.get("userName");
  }
  get isEnabled() {
    return this.userProfileForm.get("isEnabled");
  }
  get email() {
    return this.userProfileForm.get("email");
  }

  get phoneNo() {
    return this.userProfileForm.get("phoneNumber");
  }

  get password() {
    return this.userProfileForm.get("password");
  }

  get currentPassword() {
    return this.password.get("currentPassword");
  }

  get newPassword() {
    return this.password.get("newPassword");
  }

  get confirmPassword() {
    return this.password.get("confirmPassword");
  }
  get ExchangeActorId() {
    return this.userProfileForm.get("ExchangeActorId");
  }

  get assignedRoles() {
    return this.userProfileForm.get("roles");
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

  get canManageAdmins() {
    return this.accountService.userHasPermission(
      Permission.manageSiteAdministratorsPermission
    );
  }

  get isEditingSelf() {
    return this.accountService.currentUser
      ? this.user.Id === this.accountService.currentUser.Id
      : false;
  }

  get assignableRoles(): Role[] {
    if (this.canManageAdmins) {
      // return this.roles;
      return (this.roles = this.roles.filter((item) => {
        return (
          item.Name === MEMBER_DATA_OFFICER ||
          item.Name === DIRECT_TRADING_DATA_OFFICER ||
          item.Name === AUDITOR_DATA_OFFICER
        );
      }));
    }

    return (this.roles = this.roles.filter((item) => {
      return (
        item.Name.toLowerCase() !== this.CONST_ADMIN &&
        item.Name.toLowerCase() !== this.CONST_SUPERADMIN
      );
    }));
  }

  get floatLabels(): string {
    return this.isEditMode ? "auto" : "always";
  }

  ngOnChanges() {
    console.info(this.user);
    if (this.user) {
      this.isNewUser = false;
    } else {
      this.isNewUser = true;
      this.user = new User();
      this.user.IsEnabled = true;
    }
    this.setRoles();
    this.resetForm();
  }

  formControlValueChanged() {
    // const cTin = this.userProfileForm.get('tin');
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
  }

  ngOnDestroy() {
    this.passwordWatcher.unsubscribe();
  }

  public setUser(user?: User, roles?: Role[]) {
    this.user = user;
    if (roles) {
      this.roles = [...roles];
    }

    this.ngOnChanges();
  }

  private buildForm() {
    this.userProfileForm = this.formBuilder.group({
      userName: ["", Validators.required],
      email: ["", [Validators.required, Validators.pattern(EMAIL_VALIDATOR)]],
      password: this.formBuilder.group({
        currentPassword: ["", Validators.required],
        newPassword: [
          "",
          [
            Validators.required,
            Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}/),
          ],
        ],
        confirmPassword: [
          "",
          [Validators.required, EqualValidator("newPassword")],
        ],
      }),
      roles: ["", this.canAssignRoles ? Validators.required : ""],
      fullName: ["", Validators.required],
      // fullNameAmharic: ['', Validators.required],
      phoneNumber: [
        "",
        [Validators.required, Validators.pattern(PHONE_VALIDATOR)],
      ],
      isEnabled: "",
      ExchangeActorId: ["", this.isStaff ? Validators.required : ""],
      CustomerTypeId: "",
    });

    this.passwordWatcher = this.newPassword.valueChanges.subscribe(() =>
      this.confirmPassword.updateValueAndValidity()
    );
  }

  public resetForm(stopEditing: boolean = false) {
    if (stopEditing) {
      this.isEditMode = false;
    }

    if (!this.user) {
      this.isNewUser = true;
      this.user = new User();
    }

    if (this.isNewUser) {
      this.isChangePassword = true;
      this.addNewPasswordValidators();
    } else {
      this.isChangePassword = false;
      this.newPassword.clearValidators();
      this.confirmPassword.clearValidators();
    }

    this.currentPassword.clearValidators();

    this.userProfileForm.reset({
      userName: this.user.UserName || "",
      email: this.user.Email || "",
      password: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      roles: this.user.Roles || [],
      fullName: this.user.FullName || "",
      fullNameAmharic: this.user.FullName || "",
      phoneNumber: this.user.PhoneNumber || "",
      isEnabled: this.user.IsEnabled,
      ExchangeActorId: this.exchangeActorName,
    });
  }

  searchCustomer() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = { top: "10%", left: "30%" };
    dialogConfig.width = "900px";
    dialogConfig.disableClose = false;
    const dialogRef = this.dialog.open(SearchDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.customerSearchResult = result;
      this.exchangeActorId = result.ExchangeActorId;
      if (result.CustomerTypeId == 6) {
        this.customerTypeId = result.MemberCategoryId;
      } else {
        this.customerTypeId = result.CustomerTypeId;
      }
      this.exchangeActorStatus = this.customerSearchResult.Status;
      if (this.exchangeActorStatus === 64) {
        this.toaster.info(
          this.translate.instant("Oversight.Search.cancelled"),
          "",
          {
            closeButton: true,
          }
        );
      } else if (this.exchangeActorStatus === 31) {
        this.toaster.info(
          this.translate.instant("Oversight.Search.UnderInjunction"),
          "",
          {
            closeButton: true,
          }
        );
      } else {
        this.userProfileForm
          .get("ExchangeActorId")
          .setValue(result.OrganizationName);
        const CustomerType = result.CustomerTypeId;
        switch (CustomerType) {
          case 5:
            this.userProfileForm
              .get("ExchangeActorId")
              .setValue(result.OrganizationName);
            this.userProfileForm
              .get("fullName")
              .setValue(result.OrganizationName);
            break;
          case 6:
            this.userProfileForm
              .get("ExchangeActorId")
              .setValue(result.OrganizationName);
            this.userProfileForm
              .get("fullName")
              .setValue(result.OrganizationName);
            break;
          case 63:
            this.userProfileForm
              .get("ExchangeActorId")
              .setValue(result.LegalBodyName);
            this.userProfileForm
              .get("fullName")
              .setValue(result.OrganizationName);
            break;
          case 69:
            break;
          case 90:
            this.userProfileForm
              .get("ExchangeActorId")
              .setValue(result.OrganizationName);
            this.userProfileForm
              .get("fullName")
              .setValue(result.OrganizationName);
            break;
        }
      }
    });
  }
  private setRoles() {
    if (this.user.Roles) {
      for (const role of this.user.Roles) {
        if (!this.roles.some((r) => r.Name === role)) {
          this.roles.unshift(new Role(role));
        }
      }
    }
  }

  public beginEdit() {
    this.isEditMode = true;
    this.isChangePassword = false;
  }

  public save() {
    if (!this.form.submitted) {
      // Causes validation to update.
      this.form.onSubmit(null);
      return;
    }

    this.isSaving = true;
    // check if user is existing
    if (!this.canManageAdmins) {
      if (this.isNewUser) {
        this.ngxUiService.start();
        this.checkIfExistingRegistration();
      } else {
        this.saveUser(this.getEditedUser());
      }
    } else {
      this.saveUser(this.getEditedUser());
    }
  }

  public cancel() {
    this.resetForm();
    this.isEditMode = false;
  }

  private getEditedUser(): UserEdit {
    const formModel = this.userProfileForm.getRawValue();
    const onlineSitecode = "OnlineSite";
    const tempRole: string[] = ["Online Users"];
    return {
      Id: this.user.Id,
      Tin: formModel.tin,
      UserName: formModel.userName,
      FullName: formModel.fullName,
      FriendlyName: formModel.FriendlyName,
      Email: formModel.email,
      PhoneNumber: formModel.phoneNumber,
      Roles: this.canAssignRoles ? formModel.roles : tempRole,
      CurrentPassword: formModel.password.currentPassword,
      NewPassword: formModel.password.newPassword,
      ConfirmPassword: formModel.password.confirmPassword,
      IsEnabled: formModel.isEnabled,
      IsLockedOut: this.user.IsLockedOut,
      SiteCode: this.canManageAdmins ? formModel.userSite : onlineSitecode,
      ExchangeActorId: this.exchangeActorId,
      CustomerTypeId: this.customerTypeId,
    };
  }

  private saveCompleted(user?: User) {
    this.ngxUiService.stop();
    if (user) {
      this.raiseEventIfRolesModified(this.user, user);
      this.user = user;
    }

    this.isSaving = false;
    // this.resetForm(true);
    if (this.isNewUser) {
      this.alertService.success(
        this.translationService.instant("users.management.CreateUser")
      );
    } else {
      // this.alertService.success(`Changes to user \"${this.userName}\" were saved successfully`, 'success');
    }
    this.onUserSaved.next(this.user);
  }

  private raiseEventIfRolesModified(currentUser: User, editedUser: User) {
    const rolesAdded = this.isNewUser
      ? editedUser.Roles
      : editedUser.Roles.filter(
          (role) => currentUser.Roles.indexOf(role) === -1
        );
    const rolesRemoved = this.isNewUser
      ? []
      : currentUser.Roles.filter(
          (role) => editedUser.Roles.indexOf(role) === -1
        );

    const modifiedRoles = rolesAdded.concat(rolesRemoved);

    if (modifiedRoles.length) {
      setTimeout(() =>
        this.accountService.onRolesUserCountChanged(modifiedRoles)
      );
    }
  }

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  private addNewPasswordValidators() {
    this.newPassword.setValidators([
      Validators.required,
      Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}/),
    ]);
    this.confirmPassword.setValidators([
      Validators.required,
      EqualValidator("newPassword"),
    ]);
  }

  public unlockUser() {
    this.isSaving = true;
    this.accountService.unblockUser(this.user.Id).subscribe(
      () => {
        this.isSaving = false;
        this.user.IsLockedOut = false;
        this.userProfileForm.patchValue({
          isLockedOut: this.user.IsLockedOut,
        });
        this.alertService.success(
          "User has been successfully unlocked",
          "Success"
        );
      },
      (error) => {
        this.isSaving = false;
        this.alertService.error(
          "The below errors occured whilst unlocking the user:",
          "Unblock Error"
        );
        this.alertService.error(null, error);
      }
    );
  }

  public CheckFromRevenue() {
    this.ngxUiService.start();
    this.userService.checkExistingTinFromRevenue(this.email.value).subscribe(
      (res) => {
        this.ngxUiService.stop();
        this.isTinExisting = !!res;
        if (this.isTinExisting != null) {
          this.tinInfo = res;
          this.existingRegistrationConfirmationDialogRef = this.dialog.open(
            ExistingUserDialogComponent,
            {
              data: { isReg: false, title: "tins", data: res },
              width: "600px",
              height: "420px",
              disableClose: true,
              backdropClass: "custom-backdrop",
            }
          );
          this.existingRegistrationConfirmationDialogRef
            .afterClosed()
            .subscribe((result) => {
              if (result) {
                this.fullName.patchValue(this.tinInfo.tpName);
                this.fullName.disable();
                this.email.patchValue(this.tinInfo.addressEMail);
                if (this.tinInfo.mobilePhone !== undefined) {
                  this.phoneNo.patchValue(this.tinInfo.mobilePhone);
                  this.phoneNo.disable();
                }
              }
            });
        } else {
          this.alertService.error(
            "The Tin number you requested is not found on Revenue Database:",
            "Unblock Error"
          );
        }
      },
      () => {
        this.ngxUiService.stop();
        this.alertService.error(
          "The Tin number you requested is not found on Revenue Database"
        );
      }
    );
  }

  private checkIfExistingRegistration() {
    this.userService
      .checkExistingRegistration(this.email.value)
      .subscribe((res) => {
        this.ngxUiService.stop();
        this.isExisting = !!res;
        if (this.isExisting) {
          this.existingRegistrationConfirmationDialogRef = this.dialog.open(
            ExistingUserDialogComponent,
            {
              data: { isReg: true, title: "resg", data: res },
              width: "500px",
              height: "380px",
              disableClose: true,
              backdropClass: "custom-backdrop",
            }
          );
          this.existingRegistrationConfirmationDialogRef
            .afterClosed()
            .subscribe((result) => {
              if (result) {
                this.saveUser(this.getEditedUser());
              }
            });
        } else {
          this.saveUser(this.getEditedUser());
        }
      });
  }

  private saveUser(editedUser) {
    if (this.isNewUser) {
      console.info(editedUser);
      this.ngxUiService.start();
      this.accountService.newUser(editedUser).subscribe(
        (user) => {
          console.info("this is the postion" + user);
          this.saveCompleted(user);
        },
        (err) => {
          this.ngxUiService.stop();
          const errorService = this.injector.get(ErrorService);
          if (err instanceof HttpErrorResponse) {
            // Server error
            const message = errorService.getServerErrorMessage(err);
            const errorMessage =
              Utilities.findHttpResponseMessage("Validation Error", message) ||
              Utilities.findHttpResponseMessage("error", message) ||
              Utilities.findHttpResponseMessage("error_description", message);
            // stackTrace = errorService.getServerErrorStackTrace(error);

            this.alertService.error(errorMessage);
          }
          this.isSaving = false;
        }
      );
    } else {
      this.accountService
        .updateUser(editedUser)
        .subscribe(() => this.saveCompleted(editedUser));
    }
  }
}
