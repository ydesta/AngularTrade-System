import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserListComponent } from "./user-list.component";
import { EditUserDialogComponent } from "./edit-user-dialog.component";
import { UserEditorComponent } from "./user-editor.component";
import { SharedModule } from "src/@custor/modules/shared.module";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

import { EndpointFactory } from "src/@custor/services/security/endpoint-factory.service";
import { AccountService } from "src/@custor/services/security/account.service";
import { AccountEndpoint } from "src/@custor/services/security/account-endpoint.service";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { ExistingUserDialogModule } from "./existing-user-dialog/existing-user-dialog.module";
import { UserDocumentsUploadDialogModule } from "./user-documents-upload-dialog/user-documents-upload-dialog.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { http_interceptor } from "src/app/common/error/http_interceptor";
import { LookUpService } from "src/app/common/services/look-up.service";
import { SearchDialogModule } from "src/app/main/common/components/search-dialog/search-dialog.module";
import { SharedComponentModule } from "src/@custor/modules/shared-component.module";

export const routes = [{ path: "", component: UserListComponent }];

@NgModule({
  imports: [
    HttpClientModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SearchDialogModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    TranslateModule,
    ExistingUserDialogModule,
    UserDocumentsUploadDialogModule,
    SharedComponentModule,
  ],
  declarations: [
    UserListComponent,
    EditUserDialogComponent,
    UserEditorComponent,
  ],
  entryComponents: [EditUserDialogComponent],
  providers: [
    LookUpService,
    AccountService,
    AccountEndpoint,
    EndpointFactory,
    ConfigurationService,
    { provide: HTTP_INTERCEPTORS, useClass: http_interceptor, multi: true },
  ],
})
export class UsersModule {}
