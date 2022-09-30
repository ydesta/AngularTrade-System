import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { User } from 'src/@custor/models/user.model';
import { UserEdit } from 'src/@custor/models/user-edit.model';
import { Role } from 'src/@custor/models/role.model';
import { Permission } from 'src/@custor/models/permission.model';
import { EqualValidator } from 'src/@custor/validators/equal.validator';
import { Router } from '@angular/router';
import { Utilities } from 'src/@custor/helpers/utilities';
import { AppTranslationService } from 'src/@custor/services/translation.service';
import { AccountService } from 'src/@custor/services/security/account.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { ALPHABET_WITHSPACE_REGEX, NUMERIC_REGEX } from 'src/app/common/constants/consts';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CommonConfirmDialogComponent } from 'src/@custor/components/common-confirm-dialog/common-confirm-dialog.component';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
})
export class RegisterComponent implements OnDestroy, OnInit {
    @ViewChild(NgForm, { static: false })
    private form: NgForm;
    isExisting = false;
    isNewUser = true;
    isChangePassword = false;
    private isSaving = false;
    private passwordWatcher: Subscription;
    private onUserSaved = new Subject<User>();
    @Input() user: User = new User();
    @Input() roles: Role[] = [];
    @Input() isEditMode = false;
    @Input() errors: string[] = [];
    userProfileForm: FormGroup;
    userSaved$ = this.onUserSaved.asObservable();
    loadingIndicator: boolean;
    existingRegistrationConfirmationDialogRef: MatDialogRef<CommonConfirmDialogComponent>;

    constructor(
        private alertService: ToastrService,
        private translationService: AppTranslationService,
        private accountService: AccountService,
        private userService: UserService,
        private ngxUiService: NgxUiLoaderService,
        private dialog: MatDialog,
        private formBuilder: FormBuilder, private router: Router) {
        this.buildForm();
    }

    ngOnDestroy() {
        this.passwordWatcher.unsubscribe();
    }

    ngOnInit() {
        this.formControlValueChanged();
    }

    formControlValueChanged() {
        const cTin = this.userProfileForm.get('tin');

        this.existingCustomer.valueChanges.subscribe(
            (checkStatus: boolean) => {
                if (checkStatus === true) {
                    cTin.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
                    // cTin.setAsyncValidators(this.isTinUnique.bind(this));
                } else {
                    cTin.clearValidators();
                }
                cTin.updateValueAndValidity();
            });
    }

    private buildForm() {
        this.userProfileForm = this.formBuilder.group({
            userName: ['', [Validators.required, Validators.pattern(ALPHABET_WITHSPACE_REGEX), Validators.minLength(2),
            Validators.maxLength(100)]],
            email: ['', [Validators.required]], //todo //tValidators.pattern(EMAIL_VALIDATOR)
            password: this.formBuilder.group({
                newPassword: ['', [Validators.required]], //todo Validators.pattern(PASSWORD)
                confirmPassword: ['', [Validators.required]], // todo EqualValidator('newPassword')
            }),
            fullName: ['', [Validators.required, Validators.pattern(ALPHABET_WITHSPACE_REGEX), Validators.minLength(2),
            Validators.maxLength(100)]],
            phoneNumber: ['', [Validators.required]], //todo //Validators.pattern(PHONE_VALIDATOR)//
            isExistingCustomer: false,
            // recaptcha: [null]
        });

        this.passwordWatcher = this.newPassword.valueChanges.subscribe(() =>
            this.confirmPassword.updateValueAndValidity());
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
        this.userProfileForm.reset({
            tin: this.user.Tin || '',
            userName: this.user.UserName || '',
            email: this.user.Email || '',
            password: {
                newPassword: '',
                confirmPassword: ''
            },
            fullName: this.user.FullName || '',
            phoneNumber: this.user.PhoneNumber || '',
            isExistingCustomer: false
        });
    }

    public beginEdit() {
        this.isEditMode = true;
        this.isChangePassword = false;
    }

    public save() {
        this.loadingIndicator = true;
        if (!this.form.submitted) {
            // Causes validation to update.
            this.form.onSubmit(null);
            return;
        }
        if (!this.userProfileForm.valid) {
            this.alertService.error(this.translationService.getTranslation('form.ErrorMessage'),
                this.translationService.getTranslation('form.ErrorCaption'));
            return;
        }
    }

    saveUser() {
        this.isSaving = true;
        const editedUser = this.getEditedUser();
        if (this.isNewUser) {
            this.accountService.selfRegisterNewUser(editedUser).subscribe(
                user => {
                    this.saveCompleted(user);
                });
        } else {
            this.accountService.updateUser(editedUser).subscribe(
                response => this.saveCompleted(editedUser),
                error => this.saveFailed(error));
        }
        this.loadingIndicator = false;
    }

    public cancel() {
        this.resetForm();
        this.isEditMode = false;
    }

    private getEditedUser(): UserEdit {
        const formModel = this.userProfileForm.value;
        const tempRole: string[] = ['Online Users'];
        const onlineSitecode = 'OnlineSite';
        return {
            Id: this.user.Id,
            Tin: formModel.tin,
            UserName: formModel.userName,
            FullName: formModel.fullName,
            // FullNameAmharic: formModel.fullName,
            FriendlyName: formModel.friendlyName,
            Email: formModel.email,
            PhoneNumber: formModel.phoneNumber,
            Roles: tempRole,
            CurrentPassword: '',
            NewPassword: formModel.password.newPassword,
            ConfirmPassword: formModel.password.confirmPassword,
            IsEnabled: true,
            IsLockedOut: false,
            SiteCode: onlineSitecode,
            ExchangeActorId: formModel.ExchangeActorId
            //IsExisting: this.isExisting
        };
    }

    private saveCompleted(user?: User) {
        if (user) {
            this.user = user;
        }
        this.isSaving = false;
        this.resetForm(true);
        this.alertService.success('Your account has been registered successfully.', 'Success');
        this.onUserSaved.next(this.user);
        this.router.navigate(['/auth/confirm']);
    }

    private saveFailed(error: any) {
        this.isSaving = false;
        this.alertService.error(null, error);
        const errList = Utilities.getHttpResponseMessage(error);
        if (error.status === 400) { // bad request (validation)
            this.errors = errList;
            this.alertService.error('Please fix the listed errors', 'Error');
        } else {
            this.errors = [];
            this.alertService.error(error.status + ':' + errList[0].toString(), 'Error');
        }
    }

    private addNewPasswordValidators() {
        this.newPassword.setValidators([Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}/)]);
        this.confirmPassword.setValidators([Validators.required, EqualValidator('newPassword')]);
    }

    public ExistingCustomerChecked(event) {
        // this.isExisting = (this.isExisting === true) ? false : true;
        this.isExisting = !this.isExisting;
    }

    private unlockUser() {
        this.isSaving = true;
        this.accountService.unblockUser(this.user.Id)
            .subscribe(response => {
                this.isSaving = false;
                this.user.IsLockedOut = false;
                this.userProfileForm.patchValue({
                    isLockedOut: this.user.IsLockedOut
                });
                this.alertService.success('User has been successfully unlocked', 'Success');
            },
                error => {
                    this.isSaving = false;
                    this.alertService.error('The below errors occured whilst unlocking the user:',
                        'Unblock Error');
                    this.alertService.error(null, error);
                });
    }

    validateMinMax(min, max) {
        return ['', [
            Validators.required,
            Validators.minLength(min),
            Validators.maxLength(max),
            Validators.pattern('[0-9]+')  //  digits only
        ]];
    }

    get phoneNumber() {
        return this.userProfileForm.get('phoneNumber');
    }

    get fullName() {
        return this.userProfileForm.get('fullName');
    }

    get existingCustomer() {
        return this.userProfileForm.get('isExistingCustomer');
    }

    get userName() {
        return this.userProfileForm.get('userName');
    }

    get email() {
        return this.userProfileForm.get('email');
    }

    get password() {
        return this.userProfileForm.get('password');
    }

    get newPassword() {
        return this.password.get('newPassword');
    }

    get confirmPassword() {
        return this.password.get('confirmPassword');
    }

    get assignedRoles() {
        return this.userProfileForm.get('roles');
    }

    get canViewRoles() {
        return this.accountService.userHasPermission(Permission.viewRolesPermission);
    }

    get canAssignRoles() {
        return this.accountService.userHasPermission(Permission.assignRolesPermission);
    }

    get isEditingSelf() {
        return this.accountService.currentUser ? this.user.Id === this.accountService.currentUser.Id : false;
    }

    get floatLabels(): string {
        return this.isEditMode ? 'auto' : 'always';
    }

}
