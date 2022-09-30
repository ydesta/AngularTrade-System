import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { SharedComponentModule } from "src/@custor/modules/shared-component.module";
import { SharedModule } from "src/@custor/modules/shared.module";
import { ReportSettingService } from "../service/report-setting.service";
import { LookUpService } from "src/app/common/services/look-up.service";
import { GeneralSettingComponent } from "./general-setting/general-setting.component";
import { LookupComponent } from "./general-setting/lookup/lookup.component";
import { LookupValueComponent } from "./general-setting/lookup-value/lookup-value.component";
import { ReportPeriodSettingComponent } from "./trade-execution/Setting/report-period-setting/report-period-setting.component";
import { AngConfirmDialogModule } from "src/@custor/components/confirm-dialog/confirm-dialog.module";
import { CommodityTypeComponent } from "./trade-execution/Setting/commodity-type/commodity-type.component";
import { FinancialPerformanceSettingComponent } from "./trade-execution/Setting/financial-performance-setting/financial-performance-setting.component";
import { FinancialReportReminderComponent } from "./trade-execution/Setting/financial-report-reminder/financial-report-reminder.component";
import { AppTranslationService } from "src/@custor/services/translation.service";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { PaginationService } from "src/@custor/services/pagination.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ReportTypeComponent } from "./trade-execution/Setting/report-type/report-type.component";
import { SettingUpComponent } from "./trade-execution/Setting/setting-up/setting-up.component";
import { TradeExecutionSettingService } from "./shared/services/trade-execution-setting.service";
import { AnnualBudgetCloserComponent } from "./trade-execution/Setting/annual-budget-closer/annual-budget-closer.component";
import { CommodityGradeComponent } from "./trade-execution/Setting/commodity-grade/commodity-grade.component";
import { ClientInformationReminderComponent } from "./trade-execution/Setting/client-information-reminder/client-information-reminder.component";
import { CommodityComponent } from "./trade-execution/Setting/commodity/commodity.component";
import { EditAnnualBudgetCloserComponent } from "./trade-execution/Setting/annual-budget-closer/edit-annual-budget-closer/edit-annual-budget-closer.component";
import { EditClientInformationReminderComponent } from "./trade-execution/Setting/client-information-reminder/edit-client-information-reminder/edit-client-information-reminder.component";
import { EditCommodityGradeComponent } from "./trade-execution/Setting/commodity-grade/edit-commodity-grade/edit-commodity-grade.component";
import { EditCommodityTypeComponent } from "./trade-execution/Setting/commodity-type/edit-commodity-type/edit-commodity-type.component";
import { EditCommodityComponent } from "./trade-execution/Setting/commodity/edit-commodity/edit-commodity.component";
import { EditFinancialPerformanceSettingComponent } from "./trade-execution/Setting/financial-performance-setting/edit-financial-performance-setting/edit-financial-performance-setting.component";
import { EditFinancialReportReminderComponent } from "./trade-execution/Setting/financial-report-reminder/edit-financial-report-reminder/edit-financial-report-reminder.component";
import { EditReportPeriodComponent } from "./trade-execution/Setting/report-period-setting/edit-report-period/edit-report-period.component";
import { EditReportTypeComponent } from "./trade-execution/Setting/report-type/edit-report-type/edit-report-type.component";
import { CovertQuntityMeasurementListComponent } from "./trade-execution/Setting/covert-quntity-measurement-list/covert-quntity-measurement-list.component";
import { EditConvertQuantityMeasurementComponent } from "./trade-execution/Setting/covert-quntity-measurement-list/edit-convert-quantity-measurement/edit-convert-quantity-measurement.component";

export const routes = [
  // { path: "general", component: GeneralSettingComponent },
  { path: "trade-execution", component: SettingUpComponent },
];

@NgModule({
  declarations: [
    SettingUpComponent,
    ClientInformationReminderComponent,
    CommodityComponent,
    CommodityGradeComponent,
    CommodityTypeComponent,
    FinancialPerformanceSettingComponent,
    FinancialReportReminderComponent,
    GeneralSettingComponent,
    LookupComponent,
    LookupValueComponent,
    ReportPeriodSettingComponent,
    AnnualBudgetCloserComponent,
    ReportTypeComponent,
    EditReportPeriodComponent,
    EditReportTypeComponent,
    EditFinancialPerformanceSettingComponent,
    EditClientInformationReminderComponent,
    EditFinancialReportReminderComponent,
    EditCommodityComponent,
    EditCommodityTypeComponent,
    EditCommodityGradeComponent,
    EditAnnualBudgetCloserComponent,
    CovertQuntityMeasurementListComponent,
    EditConvertQuantityMeasurementComponent,
  ],
  imports: [
    AngConfirmDialogModule,
    SharedComponentModule,
    TranslateModule,
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    ReportSettingService,
    LookUpService,
    TradeExecutionSettingService,
    AppTranslationService,
    ConfigurationService,
    PaginationService,
  ],
  entryComponents: [
    LookupValueComponent,
    EditReportPeriodComponent,
    EditCommodityComponent,
    EditReportTypeComponent,
    EditFinancialPerformanceSettingComponent,
    EditClientInformationReminderComponent,
    EditFinancialReportReminderComponent,
    EditCommodityTypeComponent,
    EditCommodityGradeComponent,
    EditAnnualBudgetCloserComponent,
    EditConvertQuantityMeasurementComponent,
  ],
})
export class SettingModule {}
