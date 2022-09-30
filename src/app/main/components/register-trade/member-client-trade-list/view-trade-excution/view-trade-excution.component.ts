import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { StaticData } from "src/app/common/models/static-data.model";
import {
  MemberTradeFinancialModel,
  RegisterTradeDetailModel,
  RegisterTradeModel,
  NotificationParms,
} from "../../shared/models/register-trade-model";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  CLIENTSTATUS,
  ISTRADENOTACCOMPLISHED,
  TRADEEXCUTIONREPORT,
  TRADENOTACCOMPLISHED,
  TRADETYPE,
} from "src/app/common/constants/consts";
import { RegisterTradeService } from "../../shared/services/register-trade.service";
import { DataSharingService } from "../../shared/services/dataSharingService";
import { RegisterTradeMessageService } from "../../shared/services/registerTrade-message.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { locale as langEnglish } from "../../lang/en";
import { locale as langEthiopic } from "../../lang/et";
import { MatTableDataSource } from "@angular/material/table";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { LookupType } from "src/app/common/enums/common";
import { LookUpService } from "src/app/common/services/look-up.service";
// import { ViewMemberClientInformationDetailComponent } from "./view-member-client-information-detail/view-member-client-information-detail.component";
import { MemberClientRegiistrationModel } from "../../shared/models/member-client-regiistration-model";
//import { WorkflowDecisionComponent } from "app/main/common/components/workflow-dialog/workflow-decision/workflow-decision.component";
import { PaginationService } from "src/@custor/services/pagination.service";
import { ViwMemberFinancialDetailComponent } from "../../../view-off-site-monitoring/viw-member-financial-detail/viw-member-financial-detail.component";
import { ViewTradeExcutionDetailComponent } from "../../../view-off-site-monitoring/view-trade-excution-detail/view-trade-excution-detail.component";

@Component({
  selector: "app-view-trade-excution",
  templateUrl: "./view-trade-excution.component.html",
  styleUrls: ["./view-trade-excution.component.scss"],
})
export class ViewTradeExcutionComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  dataSource: any;
  fianaceDataSource: any;
  reportTypeList: StaticData[];
  selectedReportType = 0;
  tradeExecutionAccomplished = 0;
  tradeNotAccomplishedList: StaticData[] = [];
  isTradeAccomplishedList: StaticData[] = [];
  registerTrade: RegisterTradeModel;
  formRegisterTrade: FormGroup;
  currentLang = "";
  tradeTypeList: StaticData[] = [];
  tradeExcutionReportList: StaticData[] = [];
  public status = TRADETYPE;
  memberClientTradeId: number;
  reportPeriodList: StaticData[] = [];
  private userId: string;
  memberClientDataSource: any;
  businessTypes: StaticData[] = [];
  clientStatusList: StaticData[] = [];
  parentId = 0;
  selectedExchangeActorId: string;
  totalCount = 0;
  displayedColumns = [
    "no",
    "DateTrade",
    "FloorRepresentativeName",
    "TradeExcutionReport",
    "ClientFullName",
    "CommodityName",
    "CommodityTypeName",
    "CommodityGradeName",
    "Quantity",
    "UnitPrice",
    "TradeTypeId",
    "Action",
  ];
  displayedFinancials = [
    "no",
    "TotalIncome",
    "TotalPerShare",
    "TotalFixedAsset",

    "TotalWealth",
    "TotalTemporaryDebts",
    "TotalLongTermDebts",

    "TotalDebts",
    "NetAssets",
    "Action",
  ];
  displayedClientInformation = [
    "no",
    // 'CustomerFullName',
    "FullName",
    "BusinessFiledId",
    "DateAgreement",
    // 'RegularPhone',
    "MobilePhone",
    "TradeTypeId",
    "CommodityName",
    "Status",
    "Actions",
  ];

  constructor(
    private registerService: RegisterTradeService,
    private dataSharingService: DataSharingService,
    private formBuilder: FormBuilder,
    private registerTradeMessageService: RegisterTradeMessageService,
    configService: ConfigurationService,
    private translationLoaderService: TranslationLoaderService,
    private dialog: MatDialog,
    private lookupService: LookUpService,
    private myDialog: MatDialog,
    public paginationService: PaginationService
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    // this.dataSource = new MatTableDataSource();

    this.createRegisterTradeForm();
  }

  ngOnInit() {
    this.getRePortPeriod();
    this.registerTradeMessageService.messageCurrent.subscribe((res) => {
      this.selectedExchangeActorId = res;
    });
    this.registerTradeMessageService.currentMessage.subscribe((msg) => {
      this.memberClientTradeId = msg;
    });
    if (this.memberClientTradeId !== 0) {
      this.getTradeExcutionData(this.memberClientTradeId);
      this.getAllTradeFinnancialById(this.memberClientTradeId);
      this.getAllTradeExcutionById();
      this.getAllMemberClientInformationById();
    }
    this.getReportType();
    this.initStaticData();
    this.tradeExcutionReport();
    this.getTradeNotAccomplished();
    this.getIsTradeAccomplished();
    this.formRegisterTrade
      .get("IsTradeExcutionAccomplished")
      .valueChanges.subscribe((res) => {
        this.tradeExecutionAccomplished = res;
      });

    this.formRegisterTrade.get("ReportTypeId").valueChanges.subscribe((res) => {
      this.selectedReportType = res;
    });
    this.formRegisterTrade.disable();
    this.dataSharingService.valueAdd.subscribe((res) => {
      this.getAllTradeExcutionById();
      this.getAllTradeFinnancialById(res);
    });
    this.getBusinessType(this.currentLang);
    this.getClientStatus();
    // this.userId = this.authService.currentUser.Id;
  }

  private getTradeNotAccomplished() {
    const lang = this.currentLang;
    let tradeExcution: StaticData = new StaticData();
    TRADENOTACCOMPLISHED.forEach((pair) => {
      tradeExcution = {
        Id: pair.Id,
        Description: lang === "et" ? pair.Description : pair.DescriptionEnglish,
      };
      this.tradeNotAccomplishedList.push(tradeExcution);
    });
  }

  private getIsTradeAccomplished() {
    const lang = this.currentLang;
    let tradeExcution: StaticData = new StaticData();
    ISTRADENOTACCOMPLISHED.forEach((pair) => {
      tradeExcution = {
        Id: pair.Id,
        Description: lang === "et" ? pair.Description : pair.DescriptionEnglish,
      };
      this.isTradeAccomplishedList.push(tradeExcution);
    });
  }

  getTradeExcutionData(memberClientId: number) {
    this.registerService
      .getEditMemberClientTrade(memberClientId)
      .subscribe((res) => {
        this.formRegisterTrade.patchValue(res);
      });
  }

  private createRegisterTradeForm() {
    this.formRegisterTrade = this.formBuilder.group({
      CustomerId: [null],
      CustomerFullName: [null],
      OrganizationName: [null],
      CustomerType: [null],
      ReportTypeId: [null, [Validators.required]],
      TradeExcutionNotAccomplish: [null],
      IsTradeExcutionAccomplished: [null, [Validators.required]],
      ReportDate: new Date(),
      ReportPeriodId: [null, [Validators.required]],
      Year: [new Date().getFullYear(), [Validators.required]],
      Remark: [null],
    });
  }

  EditTradeExcutionDetail() {
    const formModel = this.formRegisterTrade.getRawValue();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "80%";
    dialogConfig.height = "70%";
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      MemberClientTradeId: this.parentId,
      ExchangeActorId: this.selectedExchangeActorId,
      // CustomerId: formModel.CustomerId,
      ReportTypeId: formModel.ReportTypeId,
      TradeExcutionNotAccomplish: formModel.TradeExcutionNotAccomplish,
      IsTradeExcutionAccomplished: formModel.IsTradeExcutionAccomplished,
      ReportDate: formModel.ReportDate,
      ReportPeriodId: formModel.ReportPeriodId,
      Remark: formModel.Remark,
      Year: formModel.Year,
      TradeExcutionStatusTypeId: 1,
      IsActive: true,
      IsDeleted: false,
      CreatedDateTime: new Date(),
      CreatedUserId: this.userId,
      UpdatedDateTime: new Date(),
      UpdatedUserId: this.userId,
    };

    this.dialog.open(ViewTradeExcutionDetailComponent, dialogConfig);
  }

  EditMemeberFinancialClient() {
    const formModel = this.formRegisterTrade.getRawValue();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "60%";
    dialogConfig.height = "68%";
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      CustomerId: formModel.CustomerId,
      ReportTypeId: formModel.ReportTypeId,
      TradeExcutionNotAccomplish: formModel.TradeExcutionNotAccomplish,
      IsTradeExcutionAccomplished: formModel.IsTradeExcutionAccomplished,
      ReportPeriodId: formModel.ReportPeriodId,
      ReportDate: formModel.ReportDate,
      Remark: formModel.Remark,
      Year: formModel.Year,
      TradeExcutionStatusTypeId: 1,
      IsActive: true,
      IsDeleted: false,
      CreatedDateTime: new Date(),
      CreatedUserId: this.userId,
      UpdatedDateTime: new Date(),
      UpdatedUserId: this.userId,
    };

    this.dialog.open(ViwMemberFinancialDetailComponent, dialogConfig);
  }

  EditMemeberClientInformation() {
    const formModel = this.formRegisterTrade.getRawValue();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "80%";
    dialogConfig.height = "65%";
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      CustomerId: formModel.CustomerId,
      ReportTypeId: formModel.ReportTypeId,
      TradeExcutionNotAccomplish: formModel.TradeExcutionNotAccomplish,
      IsTradeExcutionAccomplished: formModel.IsTradeExcutionAccomplished,
      ReportPeriodId: formModel.ReportPeriodId,
      ReportDate: formModel.ReportDate,
      Remark: formModel.Remark,
      Year: formModel.Year,
      TradeExcutionStatusTypeId: 1,
      IsActive: true,
      IsDeleted: false,
      CreatedDateTime: new Date(),
      CreatedUserId: this.userId,
      UpdatedDateTime: new Date(),
      UpdatedUserId: this.userId,
    };

    // this.dialog.open(ViewMemberClientInformationDetailComponent, dialogConfig);
  }

  private getReportType() {
    this.registerService.getReportType(this.currentLang).subscribe((res) => {
      this.reportTypeList = res;
    });
  }

  getAllTradeExcutionById() {
    this.registerService
      .getAllTradeExcutionById(this.getMemberTradeParameters())
      .subscribe((result) => {
        if (result.Items.length > 0) {
          if (this.totalCount === 0) {
            this.totalCount = result.ItemsCount;
          }
          this.dataSource = new MatTableDataSource(result.Items);
          this.dataSource.sort = this.sort;
        }
      });
  }

  getAllTradeFinnancialById(memberClientId: number) {
    this.registerService
      .getAllTradeFinancialById(memberClientId)
      .subscribe((result) => {
        this.fianaceDataSource = new MatTableDataSource(result);
        this.fianaceDataSource.sort = this.sort;
        this.fianaceDataSource.paginator = this.paginator;
      });
  }

  getEditTradeExcution(tradeExcution: RegisterTradeDetailModel) {
    if (tradeExcution) {
      // this.isUpdate = true;
      this.registerTradeMessageService.updateMessage(
        tradeExcution.MemberClientTradeDetailId
      );
      this.EditTradeExcutionDetail();
    }
  }

  viewMemberClientInformation(tradeExcution: MemberClientRegiistrationModel) {
    if (tradeExcution) {
      this.registerTradeMessageService.updateMessage(
        tradeExcution.MemberClientInformationId
      );
      this.EditMemeberClientInformation();
    }
  }

  getFinancialTrade(financialTrade: MemberTradeFinancialModel) {
    if (financialTrade) {
      this.registerTradeMessageService.updateMessage(
        financialTrade.MemberTradeFinancialId
      );
      this.EditMemeberFinancialClient();
    }
  }

  getRePortPeriod() {
    this.registerService.getRePortPeriod(this.currentLang).subscribe((res) => {
      this.reportPeriodList = res;
    });
  }

  private initStaticData() {
    const lang = this.currentLang;
    let tradeType: StaticData = new StaticData();
    TRADETYPE.forEach((pair) => {
      tradeType = {
        Id: pair.Id,
        Description: lang === "et" ? pair.Description : pair.DescriptionEnglish,
      };
      this.tradeTypeList.push(tradeType);
    });
  }

  private tradeExcutionReport() {
    const lang = this.currentLang;
    let tradeExcution: StaticData = new StaticData();
    TRADEEXCUTIONREPORT.forEach((pair) => {
      tradeExcution = {
        Id: pair.Id,
        Description: lang === "et" ? pair.Description : pair.DescriptionEnglish,
      };
      this.tradeExcutionReportList.push(tradeExcution);
    });
  }

  getDescriptionTradeType(TradeTypeId: any) {
    const tradeAccoplished = this.tradeTypeList.find(
      (item) => item.Id === TradeTypeId
    );
    return tradeAccoplished ? tradeAccoplished.Description : "";
  }

  getDescriptionTradeExcutionReport(TradeExcutionReport: any) {
    const tradeExcutionReport = this.tradeExcutionReportList.find(
      (item) => item.Id === TradeExcutionReport
    );
    return tradeExcutionReport ? tradeExcutionReport.Description : "";
  }

  public openComment() {
    const dialogConfig = new MatDialogConfig();
    (dialogConfig.disableClose = true),
      (dialogConfig.width = "65%"),
      (dialogConfig.backdropClass = "custom-backdrop"),
      (dialogConfig.minHeight = "65%"),
      (dialogConfig.data = {
        MemberClientTradeId: this.memberClientTradeId,
      });
    //this.myDialog.open(WorkflowComponent, dialogConfig);
  }
  public openWorkFlowDecision() {
    const dialogConfig = new MatDialogConfig();
    (dialogConfig.disableClose = true),
      (dialogConfig.width = "65%"),
      (dialogConfig.height = "65%");
    (dialogConfig.backdropClass = "custom-backdrop"),
      (dialogConfig.data = {
        MemberClientTradeId: this.memberClientTradeId,
      });
    //this.myDialog.open(WorkflowDecisionComponent, dialogConfig);
  }
  getAllMemberClientInformationById() {
    this.registerService
      .getAllMemberClientInformationById(this.getMemberTradeParameters())
      .subscribe((result) => {
        // this.ClientInfo = result;
        // this.memberClientDataSource = new MatTableDataSource(this.ClientInfo);
        // this.memberClientDataSource.paginator = this.paginator;
        // this.memberClientDataSource.sort = this.sort;
        if (result.Items.length > 0) {
          if (this.totalCount === 0) {
            this.totalCount = result.ItemsCount;
          }
          this.memberClientDataSource = new MatTableDataSource(result.Items);
          this.memberClientDataSource.paginator = this.paginator;
          this.memberClientDataSource.sort = this.sort;
        }
      });
  }

  getDescriptionClientStatus(Status: any) {
    const clientStatus = this.clientStatusList.find(
      (status) => status.Id === Status
    );
    return clientStatus ? clientStatus.Description : "";
  }

  getBusinessType(lang: string) {
    this.lookupService
      .getLookup(lang, LookupType.BUSINESS_TYPE)
      .subscribe((res) => {
        this.businessTypes = res;
      });
  }

  getDescriptionBusinessSector(Status: any) {
    const clientStatus = this.businessTypes.find(
      (status) => status.Id === Status
    );
    return clientStatus ? clientStatus.Description : "";
  }

  setClientStatusColor(Status) {
    switch (Status) {
      case 1:
        return "blue";
      case 2:
        return "red";
    }
  }

  private getClientStatus() {
    const lang = this.currentLang;
    let tradeType: StaticData = new StaticData();
    CLIENTSTATUS.forEach((pair) => {
      tradeType = {
        Id: pair.Id,
        Description: lang === "et" ? pair.Description : pair.DescriptionEnglish,
      };
      this.clientStatusList.push(tradeType);
    });
  }
  private getMemberTradeParameters(): NotificationParms {
    const params = new NotificationParms();
    // params.MemberClientTradeId = this.memberClientTradeId;
    params.Lang = this.currentLang;
    params.PageIndex = this.paginationService.page;
    params.PageSize = this.paginationService.pageCount;
    return params;
  }
  public switchPage(event: PageEvent) {
    this.paginationService.change(event);
    this.getAllMemberClientInformationById();
    this.getAllTradeExcutionById();
  }
}
