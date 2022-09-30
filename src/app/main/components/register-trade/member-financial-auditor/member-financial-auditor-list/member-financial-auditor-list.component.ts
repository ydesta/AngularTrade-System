import { Component, OnInit, ViewChild } from "@angular/core";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { RegisterTradeService } from "../../shared/services/register-trade.service";
import { locale as langEnglish } from "src/app/main/components/register-trade/lang/en";
import { locale as langEthiopic } from "src/app/main/components/register-trade/lang/et";
import { NotificationParms } from "../../shared/models/register-trade-model";
import { PaginationService } from "src/@custor/services/pagination.service";
import {
  MatTableDataSource,
  PageEvent,
  MatDialogConfig,
  MatDialog,
  MatPaginator,
  MatSort,
} from "@angular/material";
import { MemberFinancialAuditorViewComponent } from "../member-financial-auditor-view/member-financial-auditor-view.component";
import { MemberFinancialAditor } from "../../shared/models/MemberFinancialAditor";
import { MemberFinancialAuditorComponent } from "../member-financial-auditor.component";
import { User } from "src/@custor/models/user.model";
import { DataSharingService } from "../../shared/services/dataSharingService";
import { Router } from "@angular/router";
import { AuthService } from "src/@custor/services/security/auth.service";
import { SendReportToEceaComponent } from "../../send-report-to-ecea/send-report-to-ecea.component";
import { AnnualAuditReportService } from "../../shared/services/annual-audit-report.service";
import { ReportTypeMessageService } from "../../shared/services/report-type-message.service";
@Component({
  selector: "app-member-financial-auditor-list",
  templateUrl: "./member-financial-auditor-list.component.html",
  styleUrls: ["./member-financial-auditor-list.component.scss"],
})
export class MemberFinancialAuditorListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  currentLang = "";
  MemberFinancialAuditorId: string;
  selectedExchangeActorId: string;
  currentUser: User;
  financialReport: boolean;
  public displayedColumns = [
    "no",
    "OrganizationName",
    "AnnualBudgetCloser",
    "DateReport",
    "AuditorName",
    "AnnualAuditStatus",
    "Action",
  ];
  totalCount = 0;
  public dataSource = new MatTableDataSource<any>();
  netSalaryCount = 0;
  fileUploadCount = 0;
  constructor(
    private configService: ConfigurationService,
    private translationLoaderService: TranslationLoaderService,
    private registerService: RegisterTradeService,
    private registerTradeMessageService: AnnualAuditReportService,
    private dialog: MatDialog,
    public paginationService: PaginationService,
    private dataSharingService: DataSharingService,
    private router: Router,
    private authService: AuthService,
    private reportTypeMessageService: ReportTypeMessageService
  ) {
    this.currentLang = this.configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.financialReport = false;
  }

  ngOnInit() {
    this.dataSharingService.valueAdd.subscribe(() => {});
    this.getListOfMembersFinancialAuditor();
  }

  private getMemberTradeParameters(): NotificationParms {
    const params = new NotificationParms();
    params.Lang = this.currentLang;
    params.ExchangeActorId = this.authService.currentUser.ExchangeActorId;
    params.PageIndex = this.paginationService.page;
    params.PageSize = this.paginationService.pageCount;
    return params;
  }
  getListOfMembersFinancialAuditor() {
    this.registerService
      .getExchangeActorAuditorList(this.getMemberTradeParameters())
      .subscribe((res: any) => {
        console.log(res);
        if (res.Items.length > 0) {
          if (this.totalCount === 0) {
            this.totalCount = res.ItemsCount;
          }
          this.dataSource = new MatTableDataSource(res.Items);
          this.netSalaryCount = res.Items[0].NetSalaryCount;
          this.fileUploadCount = res.Items[0].FileUploadCount;
        }
      });
  }
  getListOfMemberAnnualAuditored(exchangActorId: string) {
    this.registerService
      .getMemberAnnulAuditor(this.getMemberTradeParameters(), exchangActorId)
      .subscribe((res) => {
        if (res.Items.length > 0) {
          if (this.totalCount === 0) {
            this.totalCount = res.ItemsCount;
          }
          this.dataSource = new MatTableDataSource(res.Items);
        }
      });
  }
  public switchPage(event: PageEvent) {
    this.paginationService.change(event);
    this.getListOfMembersFinancialAuditor();
  }
  openAttachmentPreviewDialog(viewModel: MemberFinancialAditor) {
    this.MemberFinancialAuditorId = viewModel.MemberFinancialAuditorId;
    if (this.MemberFinancialAuditorId) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "70%";
      dialogConfig.height = "97%";
      dialogConfig.disableClose = true;
      dialogConfig.position = {
        top: "1%",
        right: "10%",
      };
      dialogConfig.disableClose = true;
      dialogConfig.data = {
        MemberFinancialAuditorId: this.MemberFinancialAuditorId,
      };
      this.dialog.open(MemberFinancialAuditorViewComponent, dialogConfig);
    }
  }

  addNewAnnualAudit() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "80%";
    dialogConfig.height = "71%";
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(
      MemberFinancialAuditorComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult == true) {
        this.getListOfMembersFinancialAuditor();
      }
    });
  }
  sendAnnualAuditor(financialAditor: MemberFinancialAditor) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "65%";
    dialogConfig.height = "65%";
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      ExchangeActorId: financialAditor.ExchangeActorId,
      Remark: financialAditor.Remark,
      Status: financialAditor.Status,
      TradeExcutionStatusTypeId: 2,
      MemberFinancialAuditorId: financialAditor.MemberFinancialAuditorId,
      AnnualBudgetCloserId: financialAditor.AnnualBudgetCloserId,
      Year: financialAditor.Year,
      CustomerTypeId: financialAditor.CustomerTypeId,
      Ecxcode: financialAditor.Ecxcode,
      ReportPeriodId: financialAditor.ReportPeriodId,
      ReportTypeId: financialAditor.ReportTypeId,
      EndDate: financialAditor.EndDate,
      StartDate: financialAditor.StartDate,
      CreatedDateTime: financialAditor.CreatedDateTime,
      CreatedUserId: financialAditor.CreatedUserId,
      IsActive: financialAditor.IsActive,
      IsDeleted: financialAditor.IsDeleted,
      UpdatedDateTime: new Date(),
      ReportDate: new Date(),
    };
    const dialogRef = this.dialog.open(SendReportToEceaComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult == true) {
        this.getListOfMembersFinancialAuditor();
      }
    });
  }

  // sendAnnualAuditor(financialAditor: MemberFinancialAditor) {
  //   const updateStatus: MemberFinancialAditor = {
  //     ExchangeActorId: financialAditor.ExchangeActorId,
  //     Remark: financialAditor.Remark,
  //     Status: financialAditor.Status,
  //     TradeExcutionStatusTypeId: 2,
  //     MemberFinancialAuditorId: financialAditor.MemberFinancialAuditorId,
  //     AnnualBudgetCloserId: financialAditor.AnnualBudgetCloserId,
  //     Year: financialAditor.Year,
  //     CustomerTypeId: financialAditor.CustomerTypeId,
  //     Ecxcode: financialAditor.Ecxcode,
  //     ReportPeriodId: financialAditor.ReportPeriodId,
  //     ReportTypeId: financialAditor.ReportTypeId,
  //     EndDate: financialAditor.EndDate,
  //     StartDate: financialAditor.StartDate,
  //     ReportDate: financialAditor.ReportDate,

  //     FinancialAuditoredFileUpload: [],
  //     MemberTradeFinancial: []
  //   };
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.width = "25%";
  //   dialogConfig.height = "30%";
  //   dialogConfig.disableClose = true;
  //   dialogConfig.data = {
  //     message: this.translate.instant(
  //       "registerTrade.editor.MemberSendReportConfirmMessage"
  //     ),
  //   };
  //   const dialogRef = this.dialog.open(
  //     CommonConfirmDialogComponent,
  //     dialogConfig
  //   );
  //   dialogRef.afterClosed().subscribe((dialogResult) => {
  //     if (dialogResult === true) {
  //       this.registerService
  //         .updateFinancialAuditor(updateStatus)
  //         .subscribe(() => {
  //           this.toster.success(
  //             this.translate.instant("common.messages.SendSuccess"),
  //             "",
  //             {
  //               closeButton: true,
  //             }
  //           );
  //           this.getListOfMembersFinancialAuditor();
  //         });
  //     }
  //   });
  // }
  public openComment() {
    const dialogConfig = new MatDialogConfig();
    (dialogConfig.disableClose = true),
      (dialogConfig.width = "50%"),
      (dialogConfig.backdropClass = "custom-backdrop"),
      (dialogConfig.minHeight = "65%"),
      (dialogConfig.data = {
        MemberFinancialAuditorId: this.MemberFinancialAuditorId,
      });
    // this.dialog.open(WorkflowComponent, dialogConfig);
  }
  setTradeStatusColor(TradeExcutionStatusTypeId) {
    switch (TradeExcutionStatusTypeId) {
      case 1:
        return "blue";
      case 2:
        return "red";
      case 3:
        return "green";
    }
  }
  editAnnualReportPeriod(registerTrade: any) {
    if (registerTrade) {
      this.registerTradeMessageService.sendMessage(
        registerTrade.MemberFinancialAuditorId
      );
      this.router.navigate(["/main/registertrade/member-financial-auditor"]);
    }
  }

  sendReportToECEA(annualAudit: any) {
    if (annualAudit) {
      this.reportTypeMessageService.updateMessage(4);
      this.router.navigate(["/main/registertrade/send-report-to-ecea"], {
        queryParams: { annualAudit: JSON.stringify(annualAudit) },
      });
    }
  }
}
