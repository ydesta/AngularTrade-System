import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/@custor/modules/shared.module";
// import {RoleRoutingModule} from './role-routing.module';
import { RoleEditorComponent } from "./role-editor.component";
import { RoleListComponent } from "./role-list.component";
import { EditRoleDialogComponent } from "./edit-role-dialog.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

import { AccountService } from "src/@custor/services/security/account.service";
import { AccountEndpoint } from "src/@custor/services/security/account-endpoint.service";
import { EndpointFactory } from "src/@custor/services/security/endpoint-factory.service";
import { AuthService } from "src/@custor/services/security/auth.service";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { GroupByPipe } from "src/@custor/pipes/group-by.pipe";
import { AngConfirmDialogModule } from "src/@custor/components/confirm-dialog/confirm-dialog.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { http_interceptor } from "src/app/common/error/http_interceptor";
import { SharedComponentModule } from "src/@custor/modules/shared-component.module";

export const routes = [{ path: "", component: RoleListComponent }];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    TranslateModule,
    AngConfirmDialogModule,
    SharedComponentModule,
  ],
  declarations: [
    RoleListComponent,
    EditRoleDialogComponent,
    RoleEditorComponent,
    GroupByPipe,
  ],
  entryComponents: [EditRoleDialogComponent],
  providers: [
    AccountService,
    AccountEndpoint,
    EndpointFactory,
    AuthService,
    ConfigurationService,
    { provide: HTTP_INTERCEPTORS, useClass: http_interceptor, multi: true },
  ],
})
export class RolesModule {}
