import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/@custor/modules/shared.module';
import { RegisterComponent } from './register/register.component';
import { ManagePasswordComponent } from './manage-password/manage.component';
import { LoginComponent } from './login/login.component';
import { LoginControlComponent } from './login/login-control.component';
import { ConfirmComponent } from './register/confirm.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppTranslationService } from 'src/@custor/services/translation.service';
import { EndpointFactory } from 'src/@custor/services/security/endpoint-factory.service';
import { AccountService } from 'src/@custor/services/security/account.service';
import { AccountEndpoint } from 'src/@custor/services/security/account-endpoint.service';
// import {AuthService} from '@custor/services/security/auth.service';
import { CommonConfirmDialogModule } from '../../@custor/components/common-confirm-dialog/common-confirm-dialog.module';
import { LangSwitcherModule } from '../../@custor/components/lang-switcher/lang-switcher.component';
import { AuthService } from "../../@custor/services/security/auth.service";
// import {ToolbarModule} from '@common/components/toolbar/toolbar.module';

export const routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'confirm', component: ConfirmComponent },
    { path: 'manage/:id', component: ManagePasswordComponent }

];

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        CommonConfirmDialogModule,
        TranslateModule.forChild(),
        LangSwitcherModule,
    ],
    declarations: [
        RegisterComponent,
        LoginComponent,
        LoginControlComponent,
        ConfirmComponent,
        ManagePasswordComponent
    ],
    providers: [
        AppTranslationService,
        AccountService,
        AccountEndpoint,
        EndpointFactory,
        AuthService
    ]
})
export class AuthenticationModule {
}
