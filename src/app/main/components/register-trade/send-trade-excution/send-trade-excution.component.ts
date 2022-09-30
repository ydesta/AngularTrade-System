import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { RegisterTradeService } from "../shared/services/register-trade.service";
import { RegisterTradeMessageService } from "../shared/services/registerTrade-message.service";
import { MatTableDataSource } from "@angular/material/table";
import {
  RegisterTradeModel,
  NotificationParms,
} from "../shared/models/register-trade-model";
import { Router } from "@angular/router";
import { locale as langEnglish } from "../lang/en";
import { locale as langEthiopic } from "../lang/et";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { AccountService } from "src/@custor/services/security/account.service";
import { AuthService } from "src/@custor/services/security/auth.service";
import { PaginationService } from "src/@custor/services/pagination.service";
import { SendReportToEceaComponent } from "../send-report-to-ecea/send-report-to-ecea.component";

@Component({
  selector: "app-send-trade-excution",
  templateUrl: "./send-trade-excution.component.html",
  styleUrls: ["./send-trade-excution.component.scss"],
})
export class SendTradeExcutionComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  public dataSource = new MatTableDataSource<any>();
  currentLang = "";
  private userId: string;
  totalCount = 0;
  selectedExchangeActorId: string;
  public displayedColumns = [
    "no",
    "OrganizationName",
    "ReportType",
    "DateReport",
    "ReportPeriod",
    "Year",
    "TradeStatus",
    "Action",
  ];
  isUpdate = false;
  constructor(
    private registerService: RegisterTradeService,
    private router: Router,
    configService: ConfigurationService,
    private translationLoaderService: TranslationLoaderService,
    private registerTradeMessageService: RegisterTradeMessageService,
    public dialog: MatDialog,
    private accountService: AccountService,
    private authService: AuthService,
    public paginationService: PaginationService
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.selectedExchangeActorId = this.authService.currentUser.ExchangeActorId;
    if (this.selectedExchangeActorId) {
      this.getGetAllRegisteredTradeExcution();
    }

    // if (this.accountService.userHasPermission(Permission.prepare)) {
    // } else if (this.accountService.userHasPermission(Permission.checker)) {
    // } else if (this.accountService.userHasPermission(Permission.approverOne)) {
    // } else if (this.accountService.userHasPermission(Permission.approverTwo)) {
    // } else if (this.accountService.userHasPermission(Permission.reporter)) {
    // }
    this.userId = this.authService.currentUser.Id;
  }

  getGetAllRegisteredTradeExcution() {
    this.registerService
      .getTradeExcutionReportList(this.getMemberTradeParameters())
      .subscribe((res: any) => {
        if (res.Items.length > 0) {
          if (this.totalCount === 0) {
            this.totalCount = res.ItemsCount;
          }
          this.dataSource = new MatTableDataSource(res.Items);
        }
      });
  }

  editRegisterTrade(registerTrade: any) {
    if (registerTrade) {
      this.isUpdate = true;
      this.registerTradeMessageService.updateMessage(
        registerTrade.MemberClientTradeId
      );
      this.registerTradeMessageService.sendMessage(
        registerTrade.ExchangeActorId
      );
      this.router.navigate(["/main/registertrade/register-trade-execution"]);
    }
  }

  sendMemberTradeExcution(tradeExcution: RegisterTradeModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "65%";
    dialogConfig.height = "65%";
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      MemberClientTradeId: tradeExcution.MemberClientTradeId,
      ExchangeActorId: tradeExcution.ExchangeActorId,
      ReportPeriodId: tradeExcution.ReportPeriodId,
      IsTradeExcutionAccomplished: tradeExcution.IsTradeExcutionAccomplished,
      ReportTypeId: tradeExcution.ReportTypeId,
      ReportDate: new Date(),
      TradeExcutionNotAccomplish: tradeExcution.TradeExcutionNotAccomplish,
      TradeExcutionStatusTypeId: 2,
      Year: tradeExcution.Year,
      Remark: tradeExcution.Remark,
      CreatedDateTime: tradeExcution.CreatedDateTime,
      CreatedUserId: this.userId,
      IsActive: tradeExcution.IsActive,
      IsDeleted: tradeExcution.IsDeleted,
      UpdatedDateTime: tradeExcution.UpdatedDateTime,
      UpdatedUserId: this.userId,
      WorkFlowStatus: tradeExcution.WorkFlowStatus,
      StartDate: tradeExcution.StartDate,
      DeadLine: tradeExcution.DeadLine,
    };
    const dialogRef = this.dialog.open(SendReportToEceaComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult == true) {
        this.getGetAllRegisteredTradeExcution();
      }
    });
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
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  private getMemberTradeParameters(): NotificationParms {
    const params = new NotificationParms();
    params.Lang = this.currentLang;
    params.ExchangeActorId = this.selectedExchangeActorId;
    params.PageIndex = this.paginationService.page;
    params.PageSize = this.paginationService.pageCount;
    return params;
  }

  public switchPage(event: PageEvent) {
    this.paginationService.change(event);
    this.getGetAllRegisteredTradeExcution();
  }
  sendReportToECEA(querterReport: any) {
    if (querterReport) {
      this.router.navigate(["/main/registertrade/send-report-to-ecea"], {
        queryParams: { memberQuarterReport: JSON.stringify(querterReport) },
      });
    }
  }
}
