import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

import { SharedModule } from "src/@custor/modules/shared.module";
import { LangSwitcherModule } from "src/@custor/components/lang-switcher/lang-switcher.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// tslint:disable-next-line:import-spacing
import { RegisterTradeExcutionDetailComponent } from "./register-trade-excution/register-trade-excution-detail/register-trade-excution-detail.component";
import { RegisterTradeService } from "./shared/services/register-trade.service";
import { MemberClientComponent } from "./member-client/member-client.component";
import { MemberClientDetailComponent } from "./member-client/member-client-detail/member-client-detail.component";
import { DataSharingService } from "./shared/services/dataSharingService";
import { MemberClientTradeListComponent } from "./member-client-trade-list/member-client-trade-list.component";
import { RegisterTradeComponent } from "./register-trade.component";
import { RegisterTradeExcutionComponent } from "./register-trade-excution/register-trade-excution.component";
import { MemberFinancialTradeComponent } from "./member-financial-trade/member-financial-trade.component";
// tslint:disable-next-line:max-line-length
import { MemberFinancialTradeDetailComponent } from "./member-financial-trade/member-financial-trade-detail/member-financial-trade-detail.component";
import { SendTradeExcutionComponent } from "./send-trade-excution/send-trade-excution.component";
import { ViewTradeExcutionComponent } from "./member-client-trade-list/view-trade-excution/view-trade-excution.component";
// tslint:disable-next-line:max-line-length
import { SharedComponentModule } from "src/@custor/modules/shared-component.module";
import { AngConfirmDialogComponent } from "src/@custor/components/confirm-dialog/confirm-dialog.component";
// tslint:disable-next-line:max-line-length
import { AngConfirmDialogModule } from "src/@custor/components/confirm-dialog/confirm-dialog.module";
import { AddressService } from "src/app/common/services/address.service";
import { ClientSearchDialogComponent } from "./Client-Search-Dialog/client-search-dialog/client-search-dialog.component";
import { MemberTradeAttachmentComponent } from "./shared-compenent/member-trade-attachment/member-trade-attachment.component";
import { MemberTradeAttachmentListComponent } from "./shared-compenent/member-trade-attachment-list/member-trade-attachment-list.component";
import { CaseAttachmentViewerComponent } from "./shared-compenent/attachment-viewer/case-attachment-viewer.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SearchDialogModule } from "../../common/components/search-dialog/search-dialog.module";

import { AccountService } from "src/@custor/services/security/account.service";
import { CommonConfirmDialogModule } from "src/@custor/components/common-confirm-dialog/common-confirm-dialog.module";
//import { WorkflowDialogModule } from "../../common/components/workflow-dialog/workflow-dialog.module";
//import { ViwMemberFinancialDetailComponent } from "./member-client-trade-list/view-trade-excution/viw-member-financial-detail/viw-member-financial-detail.component";
// import { ViewMemberClientInformationDetailComponent } from "./member-client-trade-list/view-trade-excution/view-member-client-information-detail/view-member-client-information-detail.component";

import { MemberFinancialAuditorComponent } from "./member-financial-auditor/member-financial-auditor.component";
import { MemberFinancialAuditorListComponent } from "./member-financial-auditor/member-financial-auditor-list/member-financial-auditor-list.component";
import { MemberFinancialAuditorViewComponent } from "./member-financial-auditor/member-financial-auditor-view/member-financial-auditor-view.component";
import { RegisterTradeMessageService } from "./shared/services/registerTrade-message.service";
import { SendReportToEceaComponent } from "./send-report-to-ecea/send-report-to-ecea.component";
import { UpdateMembersClientInformationComponent } from "./member-client/update-members-client-information/update-members-client-information.component";
import { PaginationService } from "src/@custor/services/pagination.service";
import { AuditedDocumentUploadComponent } from "./member-financial-auditor/audited-document-upload/audited-document-upload.component";
import { http_interceptor } from "src/app/common/error/http_interceptor";
import { EditMemberClientProfileComponent } from "./member-client/update-members-client-information/edit-member-client-profile/edit-member-client-profile.component";
import { MemberAuditorComponent } from "./member-auditor/member-auditor.component";
import { MemberAndAuditorAgreementComponent } from "./member-auditor/member-and-auditor-agreement/member-and-auditor-agreement.component";
import { ClientInformationTransferHistoryComponent } from "./member-client/client-information-transfer-history/client-information-transfer-history.component";
import { MatCarouselModule } from "@ngmodule/material-carousel";
import { MatAutocompleteModule } from "@angular/material";
import { EditRegisterTradeExecutionDetailComponent } from "./register-trade-excution/edit-register-trade-execution-detail/edit-register-trade-execution-detail.component";

export const routes = [
  {
    path: "register-trade",
    component: MemberClientTradeListComponent,
    pathMatch: "full",
  },
  {
    path: "register-trade-execution",
    component: RegisterTradeExcutionComponent,
    pathMatch: "full",
  },
  {
    path: "view-trade-execution",
    component: ViewTradeExcutionComponent,
    pathMatch: "full",
  },
  {
    path: "member-client-trade",
    component: MemberClientComponent,
    pathMatch: "full",
  },
  {
    path: "member-client-detail",
    component: MemberClientDetailComponent,
    pathMatch: "full",
  },
  {
    path: "member-trade-financial",
    component: MemberFinancialTradeComponent,
    pathMatch: "full",
  },

  {
    path: "send-trade-execution",
    component: SendTradeExcutionComponent,
    pathMatch: "full",
  },
  {
    path: "member-trade-attachment",
    component: MemberTradeAttachmentListComponent,
    pathMatch: "full",
  },

  {
    path: "annual-financial-auditor-list",
    component: MemberFinancialAuditorListComponent,
    pathMatch: "full",
  },
  {
    path: "member-financial-auditor",
    component: MemberFinancialAuditorComponent,
    pathMatch: "full",
  },
  {
    path: "update-client-information-profile",
    component: UpdateMembersClientInformationComponent,
    pathMatch: "full",
  },
  {
    path: "send-report-to-ecea",
    component: SendReportToEceaComponent,
    pathMatch: "full",
  },
  // {
  //   path: "self-trade-execution",
  //   component: SelfTradeExcutionComponent,
  //   pathMatch: "full",
  // },
  // {
  //   path: "financial-report-list",
  //   component: FinancialTradeListComponent,
  //   pathMatch: "full",
  // },
  // {
  //   path: "view-annual-financial-report",
  //   component: ViewAnnualFinancialReportComponent,
  //   pathMatch: "full",
  // },
  {
    path: "member-auditor",
    component: MemberAuditorComponent,
  },
  // {
  //   path: "currentmonth",
  //   // canActivate: [AuthGuardCustomer],
  //   // data: {
  //   //   roles: [
  //   //     OVERSIGHT_FOLLOWUP_USER,
  //   //     OVERSIGHT_FOLLOWUP_TEAM_LEADER,
  //   //     OVERSIGHT_FOLLOWUP_DEPARTMENET_OFFICER,
  //   //   ],
  //   // },
  //   component: ScheduleListComponent,
  //   pathMatch: "full",
  // },
];

@NgModule({
  imports: [
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
    MatAutocompleteModule,
    MatCarouselModule.forRoot(),
  ],
  declarations: [
    RegisterTradeComponent,
    RegisterTradeExcutionComponent,
    RegisterTradeExcutionDetailComponent,
    MemberClientComponent,
    MemberClientDetailComponent,
    MemberClientTradeListComponent,
    MemberFinancialTradeComponent,
    MemberFinancialTradeDetailComponent,
    SendTradeExcutionComponent,
    ViewTradeExcutionComponent,
    //ViewTradeExcutionDetailComponent,
    ClientSearchDialogComponent,
    ClientSearchDialogComponent,
    MemberTradeAttachmentComponent,
    MemberTradeAttachmentListComponent,
    CaseAttachmentViewerComponent,
    // ViwMemberFinancialDetailComponent,
    // ViewMemberClientInformationDetailComponent,
    MemberFinancialAuditorComponent,
    MemberFinancialAuditorListComponent,
    MemberFinancialAuditorViewComponent,
    SendReportToEceaComponent,
    UpdateMembersClientInformationComponent,
    AuditedDocumentUploadComponent,
    EditMemberClientProfileComponent,
    // SelfTradeExcutionComponent,
    // FinancialTradeListComponent,
    // ViewAnnualFinancialReportComponent,
    MemberAuditorComponent,
    MemberAndAuditorAgreementComponent,
    //ScheduleListComponent,
    ClientInformationTransferHistoryComponent,
    EditRegisterTradeExecutionDetailComponent,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MemberFinancialAuditorListComponent,
  ],
  providers: [
    RegisterTradeService,
    DataSharingService,
    AddressService,
    AccountService,
    PaginationService,
    RegisterTradeMessageService,
    { provide: HTTP_INTERCEPTORS, useClass: http_interceptor, multi: true },
  ],
  entryComponents: [
    RegisterTradeExcutionDetailComponent,
    MemberClientDetailComponent,
    MemberFinancialTradeDetailComponent,
    // ViewTradeExcutionDetailComponent,
    AngConfirmDialogComponent,
    ClientSearchDialogComponent,
    MemberTradeAttachmentComponent,
    CaseAttachmentViewerComponent,
    // ViewMemberClientInformationDetailComponent,
    // ViwMemberFinancialDetailComponent,
    MemberFinancialAuditorViewComponent,
    MemberFinancialAuditorComponent,
    // SendReportToEceaComponent,
    AuditedDocumentUploadComponent,
    EditMemberClientProfileComponent,
    MemberAndAuditorAgreementComponent,
    EditRegisterTradeExecutionDetailComponent,
  ],
})
export class RegisterTradeModule {}
