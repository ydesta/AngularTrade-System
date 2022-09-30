import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ScheduleListComponent } from "./over-sight-schedule/schedule-list.component";
import { FinancialTradeListComponent } from "./financial-trade-list/financial-trade-list.component";
import { SelfTradeExcutionComponent } from "./self-trade-excution/self-trade-excution.component";
import { ViewAnnualFinancialReportComponent } from "./view-annual-financial-report/view-annual-financial-report.component";
import { HttpClientModule } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { CommonConfirmDialogModule } from "src/@custor/components/common-confirm-dialog/common-confirm-dialog.module";
import { AngConfirmDialogModule } from "src/@custor/components/confirm-dialog/confirm-dialog.module";
import { LangSwitcherModule } from "src/@custor/components/lang-switcher/lang-switcher.component";
import { SharedComponentModule } from "src/@custor/modules/shared-component.module";
import { SharedModule } from "src/@custor/modules/shared.module";
import { SearchDialogModule } from "../../common/components/search-dialog/search-dialog.module";
import { ViwMemberFinancialDetailComponent } from "./viw-member-financial-detail/viw-member-financial-detail.component";
import { ViewTradeExcutionDetailComponent } from "./view-trade-excution-detail/view-trade-excution-detail.component";
import { MarketActorRenewalNotificationComponent } from "./market-actor-renewal-notification/market-actor-renewal-notification.component";
export const routes = [
  {
    path: "self-trade-execution",
    component: SelfTradeExcutionComponent,
    pathMatch: "full",
  },
  {
    path: "financial-report-list",
    component: FinancialTradeListComponent,
    pathMatch: "full",
  },
  {
    path: "view-annual-financial-report",
    component: ViewAnnualFinancialReportComponent,
    pathMatch: "full",
  },
  {
    path: "currentmonth",
    component: ScheduleListComponent,
    pathMatch: "full",
  },
  {
    path: "renewal-notification",
    component: MarketActorRenewalNotificationComponent,
    pathMatch: "full",
  },
];

@NgModule({
  declarations: [
    ScheduleListComponent,
    SelfTradeExcutionComponent,
    FinancialTradeListComponent,
    ViewAnnualFinancialReportComponent,
    ViwMemberFinancialDetailComponent,
    ViewTradeExcutionDetailComponent,
    MarketActorRenewalNotificationComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    LangSwitcherModule,
    SharedModule,
    RouterModule.forChild(routes),
    TranslateModule,
    SharedComponentModule,
    AngConfirmDialogModule,
    FlexLayoutModule,
    SearchDialogModule,
    CommonConfirmDialogModule,
  ],
  entryComponents: [
    ViewTradeExcutionDetailComponent,
    // ViewMemberClientInformationDetailComponent,
    ViwMemberFinancialDetailComponent,
    // MemberFinancialAuditorViewComponent,
    // MemberFinancialAuditorComponent,
    // EditMemberClientProfileComponent,
  ],
})
export class ViewOffSiteMonitoringModule {}
