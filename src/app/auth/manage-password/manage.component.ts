import { Component, Input, OnDestroy, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { AppTranslationService } from '../../../@custor/services/translation.service';
import { AccountService } from '../../../@custor/services/security/account.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../@custor/models/user.model';
import { UserEdit } from '../../../@custor/models/user-edit.model';
import { Role } from '../../../@custor/models/role.model';
import { EqualValidator } from '../../../@custor/validators/equal.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../@custor/services/security/auth.service';
import { locale as langEthiopic } from '../lang/et';
import { locale as langEnglish } from '../lang/en';
import { TranslationLoaderService } from '../../../@custor/services/translation-loader.service';
import { ConfigurationService } from '../../../@custor/services/configuration.service';
import { TranslateService } from '@ngx-translate/core';
import { getMaxListeners } from 'cluster';

@Component({
    selector: 'app-manage-password',
    templateUrl: './manage.component.html',
})
export class ManagePasswordComponent implements OnDestroy, OnInit {
    @ViewChild(NgForm, { static: false })
    private form: NgForm;
    isNewUser = true;
    showOldPassword = false;
    isChangePassword = false;
    private passwordWatcher: Subscription;
    private onUserSaved = new Subject<User>();
    @Input() dialogTitle: string;
    @Input() oldPasswordCaption: string;
    @Input() actionCaption: string;
    @Input() user: User = new User();
    @Input() roles: Role[] = [];
    @Input() isEditMode = false;
    username: any;
    userProfileForm: FormGroup;
    userSaved$ = this.onUserSaved.asObservable();

    constructor(
        private alertService: ToastrService,
        public configService: ConfigurationService,
        private appTranslationService: AppTranslationService,
        private translationService: TranslateService,
        private translationLoaderService: TranslationLoaderService,
        private accountService: AccountService,
        private authService: AuthService,
        private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {
        this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
        this.buildForm();
    }

    ngOnDestroy() {
        this.passwordWatcher.unsubscribe();
    }

    ngOnInit() {

        const id = this.activatedRoute.snapshot.params['id'];
        console.info(id)
        if (id === '1') { // 0=reset, 1=change

            this.isChangePassword = true;
            this.dialogTitle = this.translationService.instant('Labels.ChangePassword');
            this.actionCaption = this.translationService.instant('Labels.ChangePassword');
            this.oldPasswordCaption = this.translationService.instant('Labels.OldPassword');
            this.showOldPassword = true;
            this.userProfileForm.patchValue({userName:this.authService.currentUser.UserName})

            // this.oldPassword.setValidators([Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}/)]);
        } else {

            this.isChangePassword = false;
            this.dialogTitle = this.translationService.instant('Labels.ResetPassword');
            this.actionCaption = this.translationService.instant('Labels.ResetPassword');
            this.oldPasswordCaption = 'Old Password - Not Required';
            this.showOldPassword = false;
            this.userProfileForm.patchValue({userName:id})
        }
        if (!this.isChangePassword) {
            const cOldPassword = this.userProfileForm.get('oldPassword');
            cOldPassword.clearValidators();
        }
    }

    formControlValueChanged() {
        if (this.isChangePassword) {
            this.addOldPasswordValidator();
        }
    }

    private buildForm() {
        this.userProfileForm = this.formBuilder.group({
            userName: ['', Validators.required],
            email: ['', []],
            oldPassword: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}/)]],
            password: this.formBuilder.group({
                newPassword: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}/)]],
                confirmPassword: ['', [Validators.required, EqualValidator('newPassword')]],
            })
        });
        this.passwordWatcher = this.newPassword.valueChanges.subscribe(() =>
            this.confirmPassword.updateValueAndValidity());
          // this.formControlValueChanged();
    }

    public beginEdit() {
        this.isEditMode = true;
        this.isChangePassword = false;
    }

    public save() {
        // if (!this.form.submitted) {
        //     // Causes validation to update.
        //     this.form.onSubmit(null);
        //     return;
        // }

        if (!this.userProfileForm.valid) {
            this.alertService.error(this.appTranslationService.getTranslation('form.ErrorMessage'),
                this.appTranslationService.getTranslation('form.ErrorCaption'));
            return;
        }

        const editedUser = this.getEditedUser();
        this.accountService.resetAccount(editedUser).subscribe(
            response =>{ this.saveCompleted();},
            
            (error) =>{
                if(!this.showOldPassword)
                this.alertService.error(this.appTranslationService.getTranslation('messages.UserNameNotcorrect'));
                else if(error.status===400)
                this.alertService.error(this.appTranslationService.getTranslation('messages.InvalidOldPassword'));
                else 
                this.alertService.error(this.appTranslationService.getTranslation('messages.UserNameNotcorrect'));

              });

    }


    private getEditedUser(): UserEdit {
        const formModel = this.userProfileForm.value;
        const tempRole: string[] = ['DummyRole']; // not required here
        return {
            Id: '0', // not required
            Tin: '', // not required
            UserName: formModel.userName,
            FullName: '', // not required
            // FullNameAmharic: '', // not required
            FriendlyName: '', // not required
            Email: 'e@gmail.com',
            PhoneNumber: '', // not required
            Roles: tempRole, // not required
            CurrentPassword: this.isChangePassword ? formModel.oldPassword : 'resetme',
            NewPassword: formModel.password.newPassword,
            ConfirmPassword: formModel.password.confirmPassword,
            IsEnabled: true, // to be further checked
            IsLockedOut: false, // to be further checked
            SiteCode: '',// not required
            ExchangeActorId:'',
            //IsExisting: false
        };
    }

    private saveCompleted(user?: User) {
        if (user) {
            this.user = user;
        }
        setTimeout(() => {
            this.alertService.success(this.translationService.instant('messages.resetsucess'));
        }, 500);
        this.onUserSaved.next(this.user);
       // this.dialogRef.close(true);
        this.authService.logout();
        this.authService.redirectLogoutUser();

        // this.router.navigate(['auth/confirm']);
    }

    private saveFailed(error: any) {
        this.alertService.error('One or more errors occured whilst saving your changes:',
            'Save Error');
        this.alertService.error(null, error);
    }

    validateMinMax(min, max) {
        return ['', [
            Validators.required,
            Validators.minLength(min),
            Validators.maxLength(max),
            Validators.pattern('[0-9]+')  //  digits only
        ]];
    }

    private addOldPasswordValidator() {
        this.oldPassword.setValidators([Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}/)]);
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

    get oldPassword() {
        return this.userProfileForm.get('oldPassword');
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


    get floatLabels(): string {
        return this.isEditMode ? 'auto' : 'always';
    }


}
