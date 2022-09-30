import { NgModule, ErrorHandler } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { AdminComponent } from "./admin.component";
import { RouterModule } from "@angular/router";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { EndpointFactory } from "src/@custor/services/security/endpoint-factory.service";
import { AccountService } from "src/@custor/services/security/account.service";
import { AccountEndpoint } from "src/@custor/services/security/account-endpoint.service";
import { AuthService } from "src/@custor/services/security/auth.service";
import { LangSwitcherModule } from "src/@custor/components/lang-switcher/lang-switcher.component";
import { GlobalErrorHandler } from "src/app/common/error/global-error-handler";
import { ServerErrorInterceptor } from "src/app/common/error/server-error.interceptor";
import { CommonModule } from "@angular/common";
import { SidebarModule } from "src/app/common/components/sidebar/sidebar.module";
import { AuthGuardAdmin } from "src/@custor/services/security/auth-guard-admin.service";
import { http_interceptor } from "src/app/common/error/http_interceptor";
import { MatPaginatorIntl } from "@angular/material";
import { PaginationTraslation } from "src/@custor/helpers/Pagination-traslation ";
import { SharedComponentModule } from "src/@custor/modules/shared-component.module";
export const routes = [
  {
    path: "",
    canActivate: [AuthGuardAdmin],
    component: AdminComponent,
    children: [
      {
        path: "users",
        loadChildren: "./users/users.module#UsersModule",
      },
      {
        path: "roles",
        loadChildren: "./roles/roles.module#RolesModule",
      },
      {
        path: "sites",
        loadChildren: "./sites/site.module#SiteModule",
      },
      {
        path: "prerequisite",
        loadChildren: "./prerequisite/prerequisite.module#PreRequisiteModule",
      },
      {
        path: "user-instruction",
        loadChildren:
          "./user-instruction/user-instruction.module#UserInstructionModule",
      },
      {
        path: "settings",
        loadChildren: () =>
          import("./settings/setting/setting.module").then(
            (fm) => fm.SettingModule
          ),
      },

      {
        path: "address",
        loadChildren: () =>
          import("./address/address.module").then((add) => add.AddressModule),
      },
    ],
  },
];

@NgModule({
  declarations: [AdminComponent],
  imports: [
    HttpClientModule,
    ToastrModule.forRoot(),
    RouterModule.forChild(routes),
    LangSwitcherModule,
    TranslateModule,
    CommonModule,
    SidebarModule,
    SharedComponentModule,
  ],
  providers: [
    AccountService,
    AccountEndpoint,
    EndpointFactory,
    AuthService,
    AuthGuardAdmin,
    {
      provide: MatPaginatorIntl,
      deps: [TranslateService],
      useFactory: (translateService: TranslateService) =>
        new PaginationTraslation(translateService).getPaginatorIntl(),
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: http_interceptor, multi: true },
  ],
})
export class AdminModule {}
