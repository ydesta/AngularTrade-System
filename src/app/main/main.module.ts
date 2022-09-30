import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { MainComponent } from "./main.component";
import { RouterModule } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { MatBadgeModule, MatPaginatorIntl } from "@angular/material";
import { AuthGuardCustomer } from "../../@custor/services/security/auth-guard-customer.service";
import { AccountService } from "../../@custor/services/security/account.service";
import { LangSwitcherModule } from "src/@custor/components/lang-switcher/lang-switcher.component";
import { SidebarModule } from "../common/components/sidebar/sidebar.module";
import { AngConfirmDialogModule } from "src/@custor/components/confirm-dialog/confirm-dialog.module";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { LocalStoreManager } from "src/@custor/services/storeManager.service";
import { AccountEndpoint } from "src/@custor/services/security/account-endpoint.service";
import { EndpointFactory } from "src/@custor/services/security/endpoint-factory.service";
import { AuthService } from "src/@custor/services/security/auth.service";
import { LookUpService } from "../common/services/look-up.service";
import { PaginationTraslation } from "src/@custor/helpers/Pagination-traslation ";
import { http_interceptor } from "../common/error/http_interceptor";

export const routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      // {
      //   path: "home-dashboard",
      //   loadChildren: () =>
      //     import(
      //       "./common/components/home-dashboard/home-dashboard.module"
      //     ).then((rm) => rm.HomeDashboardModule),
      // },
      {
        path: "registertrade",
        loadChildren: () =>
          import("./components/register-trade/register-trade.module").then(
            (m) => m.RegisterTradeModule
          ),
        // canActivate: [AuthGuardCustomer],
        // data: {
        //   roles: [
        //     MEMBER_DATA_OFFICER,
        //     AUDITOR_DATA_OFFICER,
        //     DIRECT_TRADING_DATA_OFFICER
        //   ],
        // },
      },
      {
        path: "about",
        loadChildren: () =>
          import("./components/about/about.module").then(
            (cm) => cm.AboutModule
          ),
      },
      {
        path: "view-offsite-monitoring",
        loadChildren: () =>
          import(
            "./components/view-off-site-monitoring/view-off-site-monitoring.module"
          ).then((cm) => cm.ViewOffSiteMonitoringModule),
      },
    ],
  },
];

@NgModule({
  declarations: [MainComponent],
  imports: [
    HttpClientModule,
    ToastrModule.forRoot(),
    RouterModule.forChild(routes),
    LangSwitcherModule,
    SidebarModule,
    AngConfirmDialogModule,
    MatBadgeModule,
  ],
  exports: [],
  providers: [
    ConfigurationService,
    LocalStoreManager,
    AccountEndpoint,
    EndpointFactory,
    AuthService,
    AccountService,
    LookUpService,
    // PaginationService,
    AuthGuardCustomer,
    {
      provide: MatPaginatorIntl,
      deps: [TranslateService],
      useFactory: (translateService: TranslateService) =>
        new PaginationTraslation(translateService).getPaginatorIntl(),
    },
    { provide: HTTP_INTERCEPTORS, useClass: http_interceptor, multi: true },
  ],
})
export class MainModule {}
