import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  NgZone,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MatPaginator,
  MatSort,
  MatTableDataSource,
  PageEvent,
} from "@angular/material";

import { locale as langEnglish } from "../lang/en";
import { locale as langEthiopic } from "../lang/et";
import { ToastrService } from "ngx-toastr";
import {
  MemberClientTrade,
  MemberTradeFinancialModel,
  RegisterTradeDetailModel,
  RegisterTradeModel,
  NotificationParms,
} from "../shared/models/register-trade-model";
import { RegisterTradeExcutionDetailComponent } from "./register-trade-excution-detail/register-trade-excution-detail.component";
import { StaticData } from "src/app/common/models/static-data.model";
import { RegisterTradeService } from "../shared/services/register-trade.service";
import { DataSharingService } from "../shared/services/dataSharingService";
import { MemberClientDetailComponent } from "../member-client/member-client-detail/member-client-detail.component";
import { MemberFinancialTradeDetailComponent } from "../member-financial-trade/member-financial-trade-detail/member-financial-trade-detail.component";
import { RegisterTradeMessageService } from "../shared/services/registerTrade-message.service";
import {
  ISTRADENOTACCOMPLISHED,
  TRADENOTACCOMPLISHED,
  TRADETYPE,
  TRADEEXCUTIONREPORT,
  CLIENTSTATUS,
  DOYOUHAVENEWCLIENT,
} from "src/app/common/constants/consts";
import {
  MemberClientRegiistrationModel,
  MemberClientInformationView,
  xxx,
} from "../shared/models/member-client-regiistration-model";
import {
  AngConfirmDialogComponent,
  ConfirmDialogModel,
} from "src/@custor/components/confirm-dialog/confirm-dialog.component";
import { SearchDialogComponent } from "../../../common/components/search-dialog/search-dialog.component";
import { CustomerSearchResultModel } from "../../../models/exchange-actor.model";
import { TranslateService } from "@ngx-translate/core";
import { MemberTradeAttachmentComponent } from "../shared-compenent/member-trade-attachment/member-trade-attachment.component";
import {
  AttachmentViewModel,
  TradeAttachmentDialogModel,
} from "../shared/models/member-trade-upload-model";
import { CaseAttachmentViewerComponent } from "../shared-compenent/attachment-viewer/case-attachment-viewer.component";
import { AuthService } from "src/@custor/services/security/auth.service";
import { LookupType } from "src/app/common/enums/common";
import { LookUpService } from "src/app/common/services/look-up.service";
import { CommodityName } from "../shared/models/ClientProduct";
import { PaginationService } from "src/@custor/services/pagination.service";
import { EditRegisterTradeExecutionDetailComponent } from "./edit-register-trade-execution-detail/edit-register-trade-execution-detail.component";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { take } from "rxjs/operators";
import { TradeNotAccomplishReason } from "../shared/models/trade-not-accomplish-reason.model";

@Component({
  selector: "app-register-trade-excution",
  templateUrl: "./register-trade-excution.component.html",
  styleUrls: ["./register-trade-excution.component.scss"],
})
export class RegisterTradeExcutionComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @Input() MemberClientTradeId;
  dataSource = new MatTableDataSource<RegisterTradeDetailModel>();
  attchmentDataSource: any;
  financialReportLength = 0;
  fianaceDataSource: any;
  memberClientDataSource = new MatTableDataSource<xxx>();
  ClientInformation: MemberClientInformationView;
  reportTypeList: StaticData[];
  selectedReportType = 0;
  selectedReportPeriod = 0;
  tradeExecutionAccomplished = 0;
  tradeNotAccomplishedList: StaticData[] = [];
  isTradeAccomplishedList: StaticData[] = [];
  registerTrade: RegisterTradeModel;
  formRegisterTrade: FormGroup;
  currentLang = "";
  public status = TRADETYPE;
  memberClientTradeId = 0;
  reportPeriodList: StaticData[] = [];
  isUpdate: boolean;
  tradeExcutionstatusList: StaticData[] = [];
  parentId = 0;
  memberClientInformationId = 0;
  memberClientTradeDetail = 0;
  searchDialog: MatDialogRef<SearchDialogComponent>;
  customerSearchResult: CustomerSearchResultModel;
  tradeTypeList: StaticData[] = [];
  @Input() parentObject: TradeAttachmentDialogModel;
  tradeExcutionReportList: StaticData[] = [];
  public selectedExchangeActorId: string;
  memberId = this.authService.currentUser.ExchangeActorId;
  organzationName = this.authService.currentUser.FullName;
  delegatorId: string;
  exchangeActorStatus: number;
  private userId: string;
  private workFlowStatus: number;
  businessTypes: StaticData[] = [];
  tradeNotAccomplishReasonList: StaticData[] = [];
  clientStatusList: StaticData[] = [];
  memberClientId: any;
  public ClientInfo: xxx[] = [];
  clientCommodity: CommodityName;
  customerTypeId = this.authService.currentUser.CustomerTypeId;
  totalCount = 0;
  yearList: number[] = [];
  selectedReason: number[] = [];
  unitMeasurementList: StaticData[] = [];
  public displayedGeneralInfoColumns = [
    "no",
    "OrganizationName",
    "ReportType",
    "DateReport",
    "ReportPeriod",
    "Year",
    "TradeStatus",
    "Action",
  ];
  displayedColumns: string[] = [
    "no",
    "DateTrade",
    "FloorRepresentativeName",
    "TradeExcutionReport",
    "ClientFullName",
    // "TradeTypeId",
    "CommodityName",
    // 'CommodityTypeName',
    "CommodityGradeName",
    "UnitMeasurement",
    "Lot",
    "KiloGram",
    "Quintal",
    "UnitPrice",
    "edit",
    //"delete",
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
  displayedAttachmentColumns = [
    "sno",
    "AttachmentContent",
    "SelectedWord",
    "CreatedDate",
    "UpdatedDate",
    "previewButton",
  ];
  currentYear: number;
  doYouHaveClientList: StaticData[] = [];
  doYouHaveClientId: number;
  memberClientTradeList: RegisterTradeModel;
  generalInfo = true;
  generalInfoList = false;
  @ViewChild("autosize", { static: false }) autosize: CdkTextareaAutosize;
  public dataSourceList = new MatTableDataSource<any>();
  constructor(
    private registerService: RegisterTradeService,
    private dataSharingService: DataSharingService,
    private formBuilder: FormBuilder,
    private registerTradeMessageService: RegisterTradeMessageService,
    configService: ConfigurationService,
    private translationLoaderService: TranslationLoaderService,
    private dialog: MatDialog,
    private toaster: ToastrService,
    private translate: TranslateService,
    private lookupService: LookUpService,
    private authService: AuthService,
    private changeDetectoRef: ChangeDetectorRef,
    public paginationService: PaginationService,
    private _ngZone: NgZone
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    const Zemen = require("zemen");
    const zare = new Zemen();
    this.currentYear = zare.getFullYear();
    this.yearList = this.getYearRange(this.currentYear);
    this.createRegisterTradeForm();
  }

  ngOnInit() {
    this.getRePortPeriod();
    this.initStaticData();
    this.tradeExcutionReport();
    this.getClientStatus();
    this.getBusinessType(this.currentLang);
    this.getUnitMeasurementList();
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
      // this.formRegisterTrade.disable();
    }
    this.getReportType();
    this.getTradeNotAccomplished();
    this.getIsTradeAccomplished();
    this.formRegisterTrade
      .get("IsTradeExcutionAccomplished")
      .valueChanges.subscribe((res) => {
        this.tradeExecutionAccomplished = res;
      });

    this.formRegisterTrade
      .get("DoYouHaveNewCustomerId")
      .valueChanges.subscribe((res) => {
        this.doYouHaveClientId = res;
      });

    this.formRegisterTrade.get("ReportTypeId").valueChanges.subscribe((res) => {
      this.selectedReportType = res;
    });
    this.formRegisterTrade
      .get("ReportPeriodId")
      .valueChanges.subscribe((res) => {
        this.selectedReportPeriod = res;
      });

    this.dataSharingService.valueAdd.subscribe((res) => {
      this.memberClientTradeId = res;
      if (this.memberClientTradeId != 0) {
        this.getAllTradeExcutionById();
        this.getAllTradeFinnancialById(res);
        this.getAllMemberClientInformationById();
        this.memberClientId = res;
        // this.formRegisterTrade.disable();
      }
    });
    this.dataSharingService.valueAdd.subscribe((result) => {
      this.getAllAttachementFile(result);
    });
    this.getDoYouHaveClientList();
    this.getTradeNotAccomplishedReasonType(this.currentLang);
    this.selectedExchangeActorId = this.authService.currentUser.ExchangeActorId;
    if (this.selectedExchangeActorId) {
      this.getGetAllRegisteredTradeExcution();
    }
  }
  getGetAllRegisteredTradeExcution() {
    this.registerService
      .getTradeExcutionReportList(this.getQuarterReportParameters())
      .subscribe((res: any) => {
        if (res.Items.length > 0) {
          if (this.totalCount === 0) {
            this.totalCount = res.ItemsCount;
          }
          this.dataSourceList = new MatTableDataSource(res.Items);
        }
      });
  }
  // getPermissionWorkFlow() {
  //   // this.userId = this.authService.currentUser.Id;
  //   if (this.accountService.userHasPermission(Permission.prepare)) {
  //     this.workFlowStatus = WORK_FLOW[0].Id;
  //   } else if (this.accountService.userHasPermission(Permission.checker)) {
  //     this.workFlowStatus = WORK_FLOW[1].Id;
  //   } else if (this.accountService.userHasPermission(Permission.approverOne)) {
  //     this.workFlowStatus = WORK_FLOW[2].Id;
  //   } else if (this.accountService.userHasPermission(Permission.approverTwo)) {
  //     this.workFlowStatus = WORK_FLOW[3].Id;
  //   } else if (this.accountService.userHasPermission(Permission.reporter)) {
  //     this.workFlowStatus = WORK_FLOW[7].Id;
  //   }
  // }
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
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
  getYearRange(CurrentYear: number) {
    const YeaList = [];
    const startYear = CurrentYear - 10;
    for (let i = startYear; i <= CurrentYear; i++) {
      YeaList.push(i);
    }
    return YeaList.reverse();
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
  private getDoYouHaveClientList() {
    const lang = this.currentLang;
    let tradeType: StaticData = new StaticData();
    DOYOUHAVENEWCLIENT.forEach((pair) => {
      tradeType = {
        Id: pair.Id,
        Description: lang === "et" ? pair.Description : pair.DescriptionEnglish,
      };
      this.doYouHaveClientList.push(tradeType);
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

  private createRegisterTradeForm() {
    this.formRegisterTrade = this.formBuilder.group({
      CustomerFullName: [null],
      OrganizationName: this.organzationName,
      CustomerType: [null],
      ReportTypeId: [null, [Validators.required]],
      TradeExcutionNotAccomplish: [null],
      IsTradeExcutionAccomplished: [null, [Validators.required]],
      ReportDate: new Date(),
      ReportPeriodId: [null, [Validators.required]],
      Year: this.currentYear,
      Remark: [null],
      TradeNotAccomplishReason: ["", Validators.compose([Validators.required])],
      DoYouHaveNewCustomerId: [0, [Validators.required]],
    });
  }

  get TradeNotAccomplishReason() {
    return this.formRegisterTrade.get("TradeNotAccomplishReason");
  }
  private getMemberClientInfoRegistration(): MemberClientTrade {
    const formModel = this.formRegisterTrade.getRawValue();
    const memberClientTrade = new MemberClientTrade();
    memberClientTrade.MemberClientTradeId = this.memberClientTradeId;
    memberClientTrade.ExchangeActorId =
      this.authService.currentUser.ExchangeActorId;
    memberClientTrade.ReportTypeId = formModel.ReportTypeId;
    memberClientTrade.ReportDate = formModel.ReportDate;
    memberClientTrade.ReportPeriodId = formModel.ReportPeriodId;
    memberClientTrade.Year = formModel.Year;
    memberClientTrade.TradeExcutionStatusTypeId = 1;
    (memberClientTrade.IsActive = true),
      (memberClientTrade.IsDeleted = false),
      (memberClientTrade.Remark = formModel.Remark);
    (memberClientTrade.CreatedDateTime = new Date()),
      (memberClientTrade.UpdatedDateTime = new Date()),
      (memberClientTrade.WorkFlowStatus = 7);

    if (formModel.ReportTypeId == 3) {
      memberClientTrade.DoYouHaveNewCustomerId =
        formModel.DoYouHaveNewCustomerId;
    }
    if (formModel.ReportTypeId == 1) {
      memberClientTrade.IsTradeExcutionAccomplished =
        formModel.IsTradeExcutionAccomplished;
    }
    if (
      formModel.ReportTypeId == 1 &&
      formModel.IsTradeExcutionAccomplished == 2
    ) {
      memberClientTrade.TradeExcutionNotAccomplish =
        formModel.TradeExcutionNotAccomplish;
      const reasonTypes: TradeNotAccomplishReason[] = [];
      if (formModel.TradeNotAccomplishReason) {
        formModel.TradeNotAccomplishReason.forEach((element) => {
          reasonTypes.push({
            ReasonTypeId: element,
          });
        });
      }
      memberClientTrade.TradeNotAccomplishReason = reasonTypes;
    }

    return memberClientTrade;
  }
  AddMemeberTradeExcution() {
    this.isUpdate = false;
    const formModel = this.formRegisterTrade.getRawValue();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = null;
    dialogConfig.width = "80%";
    dialogConfig.height = "80%";
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      isUpdate: this.isUpdate,
      MemberClientTradeId: this.memberClientTradeId,
      CustomerTypeId: this.customerTypeId,
      ExchangeActorId: this.memberId,
      DelegatorId: this.delegatorId,
      ReportTypeId: formModel.ReportTypeId,
      TradeExcutionNotAccomplish: formModel.TradeExcutionNotAccomplish,
      IsTradeExcutionAccomplished: formModel.IsTradeExcutionAccomplished,
      ReportDate: formModel.ReportDate,
      ReportPeriodId: formModel.ReportPeriodId,
      Year: formModel.Year,
      TradeExcutionStatusTypeId: 1,
      IsActive: true,
      IsDeleted: false,
      CreatedDateTime: new Date(),
      CreatedUserId: this.userId,
      UpdatedDateTime: new Date(),
      UpdatedUserId: this.userId,
      Remark: formModel.Remark,
      WorkFlowStatus: this.workFlowStatus,
    };
    this.dialog.open(RegisterTradeExcutionDetailComponent, dialogConfig);
  }

  EditTradeExcutionDetail() {
    this.isUpdate = true;
    const formModel = this.formRegisterTrade.getRawValue();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "80%";
    dialogConfig.height = "60%";
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      isUpdate: this.isUpdate,
      MemberClientTradeDetailId: this.memberClientTradeDetail,
      MemberClientTradeId: this.parentId,
      CustomerTypeId: this.customerTypeId,
      ExchangeActorId: this.authService.currentUser.ExchangeActorId,
      OwnerManagerId: formModel.OwnerManagerId,
      ReportTypeId: formModel.ReportTypeId,
      TradeExcutionNotAccomplish: formModel.TradeExcutionNotAccomplish,
      IsTradeExcutionAccomplished: formModel.IsTradeExcutionAccomplished,
      ReportDate: formModel.ReportDate,
      ReportPeriodId: formModel.ReportPeriodId,
      Year: formModel.Year,
      TradeExcutionStatusTypeId: 1,
      IsActive: true,
      IsDeleted: false,
      CreatedDateTime: new Date(),
      CreatedUserId: this.userId,
      UpdatedDateTime: new Date(),
      UpdatedUserId: this.userId,
      Remark: formModel.Remark,
    };
    this.dialog.open(EditRegisterTradeExecutionDetailComponent, dialogConfig);
  }

  AddMemeberFinancialClient() {
    this.isUpdate = false;
    const formModel = this.formRegisterTrade.getRawValue();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "70%";
    dialogConfig.height = "90%";
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      isUpdate: this.isUpdate,
      MemberClientTradeId: this.memberClientTradeId,
      ExchangeActorId: this.memberId,
      ReportTypeId: formModel.ReportTypeId,
      // TradeExcutionNotAccomplish: formModel.TradeExcutionNotAccomplish,
      // IsTradeExcutionAccomplished: formModel.IsTradeExcutionAccomplished,
      ReportPeriodId: formModel.ReportPeriodId,
      // ReportDate: formModel.ReportDate,
      // Remark: formModel.Remark,
      // Year: formModel.Year,
      // TradeExcutionStatusTypeId: 1,
      // IsActive: true,
      // IsDeleted: false,
      // CreatedDateTime: new Date(),
      // CreatedUserId: this.userId,
      // UpdatedDateTime: new Date(),
      // UpdatedUserId: this.userId,
      // WorkFlowStatus: this.workFlowStatus,
    };
    this.dialog.open(MemberFinancialTradeDetailComponent, dialogConfig);
  }

  EditMemeberFinancialClient() {
    this.isUpdate = true;
    const formModel = this.formRegisterTrade.getRawValue();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "70%";
    dialogConfig.height = "90%";
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      isUpdate: this.isUpdate,
      MemberClientTradeId: this.memberClientTradeId,
      ExchangeActorId: this.authService.currentUser.ExchangeActorId,
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
      WorkFlowStatus: this.workFlowStatus,
    };

    this.dialog.open(MemberFinancialTradeDetailComponent, dialogConfig);
  }

  AddMemeberClientInformation() {
    this.isUpdate = false;
    const formModel = this.formRegisterTrade.getRawValue();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "99%";
    dialogConfig.height = "88%";
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      isUpdate: this.isUpdate,
      MemberClientTradeId: this.memberClientTradeId,
      ExchangeActorId: this.memberId,
      ReportTypeId: formModel.ReportTypeId,
      TradeExcutionNotAccomplish: formModel.TradeExcutionNotAccomplish,
      IsTradeExcutionAccomplished: formModel.IsTradeExcutionAccomplished,
      ReportPeriodId: formModel.ReportPeriodId,
      ReportDate: formModel.ReportDate,
      Remark: formModel.Remark,
      Year: formModel.Year,
      TradeExcutionStatusTypeId: 1,
      DoYouHaveNewCustomerId: formModel.DoYouHaveNewCustomerId,
      IsActive: true,
      IsDeleted: false,
      CreatedDateTime: new Date(),
      CreatedUserId: this.userId,
      UpdatedDateTime: new Date(),
      UpdatedUserId: this.userId,
      WorkFlowStatus: this.workFlowStatus,
    };
    this.dialog.open(MemberClientDetailComponent, dialogConfig);
  }

  EditMemeberClientInformation() {
    this.isUpdate = true;
    const formModel = this.formRegisterTrade.getRawValue();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "99%";
    dialogConfig.height = "84%";
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      isUpdate: this.isUpdate,
      MemberClientTradeId: this.parentId,
      MemberClientInformationId: this.memberClientInformationId,
      ExchangeActorId: this.authService.currentUser.ExchangeActorId,
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
      WorkFlowStatus: this.workFlowStatus,
    };
    this.dialog.open(MemberClientDetailComponent, dialogConfig);
  }

  private getReportType() {
    this.registerService.getReportType(this.currentLang).subscribe((res) => {
      this.reportTypeList = res;
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.memberClientDataSource.paginator = this.paginator;
    this.memberClientDataSource.sort = this.sort;
  }
  saveOrUpdateMemberClient() {
    const postData = this.getMemberClientInfoRegistration();
    if (this.memberClientTradeId == 0) {
      this.registerService
        .saveOrUpdateQuarterlyReport(postData)
        .subscribe((res) => {
          if (res > 0) {
            this.toaster.success(
              this.translate.instant("common.messages.Saved"),
              "",
              {
                closeButton: true,
              }
            );
            this.memberClientTradeId = res;
            this.getGetAllRegisteredTradeExcution();
            this.generalInfo = true;
            this.generalInfoList = false;
          } else {
            this.toaster.warning(
              this.translate.instant(
                "common.messages.DuplicateDataOrReportPeriodError"
              ),
              "",
              {
                closeButton: true,
              }
            );
          }
        });
    } else {
      const postData = this.getMemberClientInfoRegistration();
      postData.MemberClientTradeId == this.memberClientTradeId;
      this.registerService
        .updateMemberTradeClientInfo(postData)
        .subscribe((res) => {
          this.toaster.success(
            this.translate.instant("common.messages.UpdateSuccess"),
            "",
            {
              closeButton: true,
            }
          );
          this.memberClientTradeId = res;
          this.getGetAllRegisteredTradeExcution();
          this.generalInfo = true;
          this.generalInfoList = false;
        });
    }
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
          this.changeDetectoRef.detectChanges();
        }
      });
  }

  getAllTradeFinnancialById(memberClientId: number) {
    this.registerService
      .getAllTradeFinancialById(memberClientId)
      .subscribe((result) => {
        this.financialReportLength = result.length;
        this.fianaceDataSource = new MatTableDataSource(result);
        this.fianaceDataSource.sort = this.sort;
        this.fianaceDataSource.paginator = this.paginator;
      });
  }

  getAllMemberClientInformationById() {
    this.registerService
      .getAllMemberClientInformationById(this.getMemberTradeParameters())
      .subscribe((result) => {
        if (result.Items.length > 0) {
          if (this.totalCount === 0) {
            this.totalCount = result.ItemsCount;
          }
          this.memberClientDataSource = new MatTableDataSource(result.Items);
          this.changeDetectoRef.detectChanges();
        }
      });
  }

  get TradeNotAccomplished() {
    return this.formRegisterTrade.get("IsTradeExcutionAccomplished");
  }

  get SelfTradeNotAccomplished() {
    return this.formRegisterTrade.get("SelfTradeNotAccomplished");
  }

  get ClientTradeNotAccomplished() {
    return this.formRegisterTrade.get("ClientTradeNotAccomplished");
  }

  get Remark() {
    return this.formRegisterTrade.get("Remark");
  }

  get ReportTypeId() {
    return this.formRegisterTrade.get("ReportTypeId");
  }

  get IsTradeExcutionAccomplished() {
    return this.formRegisterTrade.get("IsTradeExcutionAccomplished");
  }

  get ReportPeriodId() {
    return this.formRegisterTrade.get("ReportPeriodId");
  }

  get Year() {
    return this.formRegisterTrade.get("Year");
  }

  get CustomerFullName() {
    return this.formRegisterTrade.get("CustomerFullName");
  }

  get OrganizationName() {
    return this.formRegisterTrade.get("OrganizationName");
  }

  get CustomerType() {
    return this.formRegisterTrade.get("CustomerType");
  }
  get DoYouHaveNewCustomerId() {
    return this.formRegisterTrade.get("DoYouHaveNewCustomerId");
  }
  getTradeExcutionData(memberClientId: number) {
    this.registerService
      .getEditMemberClientTrade(memberClientId)
      .subscribe((res) => {
        if (res != null) {
          this.memberClientTradeList = res;

          this.memberClientTradeList.TradeNotAccomplishReason.forEach((rep) => {
            this.selectedReason.push(rep.ReasonTypeId);
          });
          this.formRegisterTrade.patchValue(res);
          this.formRegisterTrade.controls.TradeNotAccomplishReason.setValue(
            this.selectedReason
          );
        }
      });
  }

  getEditClientInformation(clientInformation: MemberClientRegiistrationModel) {
    this.parentId = clientInformation.MemberClientTradeId;
    this.memberClientInformationId =
      clientInformation.MemberClientInformationId;
    if (this.parentId && this.memberClientInformationId) {
      this.EditMemeberClientInformation();
    }
  }

  getEditTradeExcution(tradeExcution: any) {
    this.parentId = tradeExcution.MemberClientTradeId;
    this.memberClientTradeDetail = tradeExcution.MemberClientTradeDetailId;
    if (this.parentId) {
      // this.isUpdate = true;
      // this.registerTradeMessageService.sendMessage(this.selectedExchangeActorId);
      this.registerTradeMessageService.updateMessage(
        tradeExcution.MemberClientTradeDetailId
      );
      // this.registerTradeMessageService.updateMessage(tradeExcution.MemberClientInformationId);
      this.EditTradeExcutionDetail();
    }
  }

  getFinancialTrade(financialTrade: MemberTradeFinancialModel) {
    this.parentId = financialTrade.MemberClientTradeId;
    if (this.parentId) {
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

  getTradeExcutionStatusType() {
    this.registerService.getTradeExcutionStatusType().subscribe((result) => {
      this.tradeExcutionstatusList = result;
    });
  }

  deleteMemberTradeExecutionDetail(postData: RegisterTradeDetailModel) {
    const message = `Are you sure you want to delete this record?`;

    const dialogData = new ConfirmDialogModel("Confirm", message);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "30%";
    dialogConfig.data = dialogData;
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(AngConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult === true) {
        this.registerService
          .deleteMemberTradeExecutionDetail(postData)
          .subscribe(() => {
            this.toaster.success(
              this.translate.instant("common.messages.Deleted"),
              "",
              {
                closeButton: true,
              }
            );
            this.getAllTradeExcutionById();
          });
      }
    });
  }

  deleteMemberClientInformation(
    deletClientInfo: MemberClientRegiistrationModel
  ) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "30%";
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(AngConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult === true) {
        this.registerService
          .deleteMemberClientInformation(deletClientInfo)
          .subscribe(() => {
            this.toaster.success(
              this.translate.instant("common.messages.Deleted"),
              "",
              {
                closeButton: true,
              }
            );
            this.getAllMemberClientInformationById();
          });
      }
    });
  }

  deleteMemberFinancialTrade(postedData: MemberTradeFinancialModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "30%";
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(AngConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.registerService
          .deleteMemberFinancialTrade(postedData)
          .subscribe(() => {
            this.getAllTradeFinnancialById(this.memberClientTradeId);
            this.toaster.success(
              this.translate.instant("common.messages.Deleted"),
              "",
              {
                closeButton: true,
              }
            );
          });
      }
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

  public openSearchDialog() {
    this.searchDialog = this.dialog.open(SearchDialogComponent, {
      disableClose: true,
      width: "900px",
      backdropClass: "custom-backdrop",
      minHeight: "300px",
    });

    this.searchDialog.afterClosed().subscribe((result) => {
      this.customerSearchResult = result;
      this.exchangeActorStatus = this.customerSearchResult.Status;
      if (this.exchangeActorStatus === 2) {
        this.toaster.warning(
          this.translate.instant("common.messages.Cancelled"),
          "",
          {
            closeButton: true,
          }
        );
      } else if (this.exchangeActorStatus === 3) {
        this.toaster.warning(
          this.translate.instant("common.messages.UnderInjunction"),
          "",
          {
            closeButton: true,
          }
        );
      } else {
        if (
          this.customerSearchResult.CustomerTypeId == 6 ||
          this.customerSearchResult.CustomerTypeId == 90
        ) {
          this.formRegisterTrade
            .get("CustomerFullName")
            .setValue(this.customerSearchResult.FullName);
          this.formRegisterTrade
            .get("OrganizationName")
            .setValue(this.customerSearchResult.OrganizationName);
          // this.selectedExchangeActorId = this.customerSearchResult.ExchangeActorId;
          this.delegatorId = this.customerSearchResult.DelegatorId;
          this.formRegisterTrade
            .get("CustomerType")
            .setValue(this.customerSearchResult.CustomerType);
        } else {
          this.toaster.warning(
            this.translate.instant(
              "common.messages.SelectMembersandDirectTrader"
            ),
            "",
            {
              closeButton: true,
            }
          );
        }
      }
    });
  }

  getTotalQuantity() {
    return this.dataSource.data
      .map((t) => t.Quantity)
      .reduce((acc, value) => acc + value, 0);
  }
  getLot() {
    return this.dataSource.data
      .map((t) => t.Lot)
      .reduce((acc, value) => acc + value, 0);
  }
  getKiloGram() {
    return this.dataSource.data
      .map((t) => t.KiloGram)
      .reduce((acc, value) => acc + value, 0);
  }
  getQunital() {
    return this.dataSource.data
      .map((t) => t.Quintal)
      .reduce((acc, value) => acc + value, 0);
  }
  getTotalUnitPrice() {
    return this.dataSource.data
      .map((t) => t.UnitPrice)
      .reduce((acc, value) => acc + value, 0);
  }

  getTotalPrice() {
    return this.getTotalQuantity() * this.getTotalUnitPrice();
  }

  openAttachmentDialogForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = "1000px";
    dialogConfig.position = {
      top: "5%",
      left: "25%",
    };
    dialogConfig.width = "80%";
    dialogConfig.data = {
      ParentId: this.memberClientId,
    };
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(
      MemberTradeAttachmentComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(() => {});
  }

  getAllAttachementFile(memberClientTradeId: number) {
    this.registerService
      .getUploadeTradeExcution(memberClientTradeId)
      .subscribe((result) => {
        this.attchmentDataSource = new MatTableDataSource(result);
        this.attchmentDataSource.sort = this.sort;
        this.attchmentDataSource.paginator = this.paginator;
      });
  }

  openAttachmentPreviewDialog(viewModel: AttachmentViewModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = "1000px";
    dialogConfig.position = {
      top: "5%",
      left: "25%",
    };
    dialogConfig.disableClose = true;
    const attachmentModel: TradeAttachmentDialogModel = {
      ParentId: this.MemberClientTradeId,
      Url: viewModel.Url,
    };
    dialogConfig.data = attachmentModel;
    const dialogRef = this.dialog.open(
      CaseAttachmentViewerComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(() => {});
  }
  private getUnitMeasurementList() {
    this.registerService
      .getUnitMeasurementList(this.currentLang)
      .subscribe((result) => {
        this.unitMeasurementList = result;
      });
  }

  // canCreateTradeExecution() {
  //   this.accountService.userHasPermission(Permission.createTradeExecution);
  // }

  // canCreateFinancialReport() {
  //   this.accountService.userHasPermission(Permission.createFinancialReport);
  // }

  getDescriptionUnitMeasurement(id: any) {
    const unit = this.unitMeasurementList.find((item) => item.Id === id);
    return unit ? unit.Description : "";
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
    params.MemberClientTradeId = this.memberClientTradeId;
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
  getTradeNotAccomplishedReasonType(lang: string) {
    this.lookupService
      .getLookup(lang, LookupType.TRADE_NOT_ACCOMPLISHED_REASON)
      .subscribe((res) => {
        this.tradeNotAccomplishReasonList = res;
      });
  }
  private getQuarterReportParameters(): NotificationParms {
    const params = new NotificationParms();
    params.Lang = this.currentLang;
    params.ExchangeActorId = this.selectedExchangeActorId;
    params.PageIndex = this.paginationService.page;
    params.PageSize = this.paginationService.pageCount;
    return params;
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

  editRegisterTrade(registerTrade: any) {
    if (registerTrade) {
      this.memberClientTradeId = registerTrade.MemberClientTradeId;
      this.formRegisterTrade.patchValue(registerTrade);
      this.getAllTradeFinnancialById(this.memberClientTradeId);
      this.getAllMemberClientInformationById();
      this.getTradeExcutionData(this.memberClientTradeId);
    }
  }

  deleteAQuarterReport(postedData: any) {
    console.log(postedData);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "30%";
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(AngConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.registerService
          .deleteQuarterReport(postedData.MemberClientTradeId)
          .subscribe((res) => {
            if (res) {
              this.toaster.success(
                this.translate.instant("common.messages.Deleted"),
                "",
                {
                  closeButton: true,
                }
              );
              this.getGetAllRegisteredTradeExcution();
              this.generalInfo = true;
              this.generalInfoList = false;
            } else {
              this.toaster.warning(
                this.translate.instant("common.messages.DeletedChild"),
                "",
                {
                  closeButton: true,
                }
              );
            }
          });
      }
    });
  }
}
