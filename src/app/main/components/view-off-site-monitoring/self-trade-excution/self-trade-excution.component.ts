import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { StaticData } from "src/app/common/models/static-data.model";
import {
  ISTRADENOTACCOMPLISHED,
  TRADEEXCUTIONREPORT,
  TRADETYPE,
} from "src/app/common/constants/consts";

import { locale as langEnglish } from "src/app/main/components/register-trade/lang/en";
import { locale as langEthiopic } from "src/app/main/components/register-trade/lang/et";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { CustomerSearchResultModel } from "src/app/main/models/exchange-actor.model";
import { SearchDialogComponent } from "src/app/main/common/components/search-dialog/search-dialog.component";
import { MatDialogRef, MatDialog, MatDialogConfig } from "@angular/material";

import { TranslateService } from "@ngx-translate/core";
import { PaginationService } from "src/@custor/services/pagination.service";
import { AuthService } from "src/@custor/services/security/auth.service";
import {
  BoughtSelfTradeExecution,
  RegisterTradeDetailModel,
  SearchCriteria,
} from "../../register-trade/shared/models/register-trade-model";
import { RegisterTradeService } from "../../register-trade/shared/services/register-trade.service";
import { ViewTradeExcutionDetailComponent } from "../view-trade-excution-detail/view-trade-excution-detail.component";
import { OffSiteMonitoringMessageService } from "../../register-trade/shared/services/off-site-monitoring-message.service";

@Component({
  selector: "app-self-trade-excution",
  templateUrl: "./self-trade-excution.component.html",
  styleUrls: ["./self-trade-excution.component.scss"],
})
export class SelfTradeExcutionComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  bayerDataSource = new MatTableDataSource<BoughtSelfTradeExecution>();
  sellerDataSource: any;
  tradeTypeList: StaticData[] = [];
  searchForm: FormGroup;
  currentLang = "";
  isTradeAccomplishedList: StaticData[] = [];
  tradeExcutionReportList: StaticData[] = [];
  boughtSelfTradeList: BoughtSelfTradeExecution[];
  reportPeriodList: StaticData[] = [];
  yearList: number[] = [];
  currentYear: number;
  expandClose: boolean;
  memberViolationOnOff;
  customerSearchResult: CustomerSearchResultModel;
  searchDialog: MatDialogRef<SearchDialogComponent>;
  selectedExchangeActorId: string;
  tradeDetailId: number;
  totalCount = 0;
  unitMeasurementList: StaticData[] = [];
  displayedBayerColumns = [
    "sn",
    "TradeDate",
    "ClientFullName",
    "Reperesentative",
    "CommodityName",
    "BayerCommodityGrade",
    "UnitMeasurement",
    "Lot",
    "KiloGram",
    "Quintal",
    "BayerUnitPrice",
    "Action",
  ];
  displayedSellerColumns = [
    "sn",
    // "OrganizationName",
    "TradeDate",
    "SellerCommodityType",
    "SellerCommodityGrade",
    //"SellerOrderPrice",
    "SellerUnitPrice",
    "Reperesentative",
    "Warehouse",
    // "CommissionInPercent",
    "LotQuantity",
  ];

  constructor(
    private registerTardeService: RegisterTradeService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    configService: ConfigurationService,
    private translationLoaderService: TranslationLoaderService,
    private formBuilder: FormBuilder,
    private registerTradeMessageService: OffSiteMonitoringMessageService,
    public paginationService: PaginationService,
    private authService: AuthService,
    private translate: TranslateService
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    const Zemen = require("zemen");
    const zare = new Zemen();
    this.currentYear = zare.getFullYear();
    this.yearList = this.getYearRange(this.currentYear);
    this.initForm();
    this.expandClose = false;
    this.memberViolationOnOff = false;
  }

  ngOnInit() {
    this.initStaticData();
    this.tradeType();
    this.getRePortPeriod();
    this.getIsTradeAccomplished();
    this.expandClose = true;
    this.getUnitMeasurementList();
    this.selectedExchangeActorId = this.authService.currentUser.ExchangeActorId;
    // if(this.selectedExchangeActorId){
    //   this.onSubmit();
    // }
  }

  initForm() {
    this.searchForm = this.formBuilder.group({
      CustomerFullName: [null],
      OrganizationName: this.authService.currentUser.FullName,
      CustomerType: [null],
      From: ["", []],
      To: ["", []],
      TradeExcutionReport: ["", []],
      TradeType: ["", []],
      ECXCode: ["", []],
      Year: this.currentYear,
      ReportPeriodId: [null, [Validators.required]],
    });
  }

  get From() {
    return this.searchForm.get("From");
  }

  get To() {
    return this.searchForm.get("To");
  }

  get TradeExcutionReport() {
    return this.searchForm.get("TradeExcutionReport");
  }

  get TradeType() {
    return this.searchForm.get("TradeType");
  }

  get ECXCode() {
    return this.searchForm.get("ECXCode");
  }

  get Year() {
    return this.searchForm.get("Year");
  }

  get ReportPeriodId() {
    return this.searchForm.get("ReportPeriodId");
  }

  getRePortPeriod() {
    this.registerTardeService
      .getRePortPeriod(this.currentLang)
      .subscribe((res) => {
        this.reportPeriodList = res;
      });
  }

  getMemberClientTradeSearch(): SearchCriteria {
    const formModel = this.searchForm.getRawValue();
    const params = new SearchCriteria();
    params.Lang = this.currentLang;
    params.From = formModel.From ? formModel.From.toDateString() : "";
    params.To = formModel.To ? formModel.To.toDateString() : "";
    params.TradeExcutionReport = formModel.TradeExcutionReport
      ? formModel.TradeExcutionReport
      : 0;
    params.TradeType = formModel.TradeType ? formModel.TradeType : 0;
    params.ExchangeActorId = this.selectedExchangeActorId;
    params.ReportPeriodId = formModel.ReportPeriodId
      ? formModel.ReportPeriodId
      : 0;
    params.Year = formModel.Year ? formModel.Year : 0;
    params.PageIndex = this.paginationService.page;
    params.PageSize = this.paginationService.pageCount;
    return params;
  }

  private tradeType() {
    const lang = this.currentLang;
    let tradeExcution: StaticData = new StaticData();
    TRADETYPE.forEach((pair) => {
      tradeExcution = {
        Id: pair.Id.toString(),
        Description: lang === "et" ? pair.Description : pair.DescriptionEnglish,
      };
      this.tradeTypeList.push(tradeExcution);
    });
  }

  onSubmit() {
    this.searchTradeExcution();
  }

  searchTradeExcution() {
    this.registerTardeService
      .searchBoughtSelfTradeExcution(this.getMemberClientTradeSearch())
      .subscribe((res) => {
        if (res.Items.length > 0) {
          this.boughtSelfTradeList = res.Items;
          if (this.totalCount === 0) {
            this.totalCount = res.ItemsCount;
          }
          this.bayerDataSource = new MatTableDataSource(
            this.boughtSelfTradeList
          );
          this.expandClose = false;
          this.memberViolationOnOff = true;
        } else {
          this.toastr.info(
            this.translate.instant("common.messages.NoRecordFound"),
            "",
            {
              closeButton: true,
            }
          );
        }
      });
  }

  getAllBoughtSelfTradeExcuction() {
    this.registerTardeService
      .getAllBoughtSelfTradeExcution()
      .subscribe((data) => {
        this.bayerDataSource = new MatTableDataSource(data);
        this.bayerDataSource.sort = this.sort;
        this.bayerDataSource.paginator = this.paginator;
      });
  }

  getAllSellerSelfTradeExcuction() {
    this.registerTardeService
      .getAllSellerSelfTradeExcution()
      .subscribe((res) => {
        this.sellerDataSource = new MatTableDataSource(res);
        this.sellerDataSource.sort = this.sort;
        this.sellerDataSource.paginator = this.paginator;
      });
  }

  clearForm() {
    this.searchForm.reset();
  }

  private initStaticData() {
    const lang = this.currentLang;
    let tradeExcution: StaticData = new StaticData();
    TRADEEXCUTIONREPORT.forEach((pair) => {
      tradeExcution = {
        Id: pair.Id.toString(),
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

  getYearRange(CurrentYear: number) {
    const YeaList = [];
    const startYear = CurrentYear - 10;
    for (let i = startYear; i <= CurrentYear; i++) {
      YeaList.push(i);
    }
    return YeaList.reverse();
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
      this.selectedExchangeActorId = this.customerSearchResult.ExchangeActorId;
      this.searchForm
        .get("ECXCode")
        .setValue(this.customerSearchResult.Ecxcode);
      this.searchForm
        .get("CustomerFullName")
        .setValue(this.customerSearchResult.FullName);
      this.searchForm
        .get("OrganizationName")
        .setValue(this.customerSearchResult.OrganizationName);
      this.searchForm
        .get("CustomerType")
        .setValue(this.customerSearchResult.CustomerType);
    });
  }

  getEditTradeExcution(tradeExcution: RegisterTradeDetailModel) {
    this.selectedExchangeActorId = tradeExcution.ExchangeActorId;
    this.tradeDetailId = tradeExcution.MemberClientTradeDetailId;
    if (tradeExcution) {
      this.registerTradeMessageService.updateMessage(
        tradeExcution.MemberClientTradeDetailId
      );
      this.EditTradeExcutionDetail();
    }
  }
  EditTradeExcutionDetail() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "80%";
    dialogConfig.height = "70%";
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      ExchangeActorId: this.selectedExchangeActorId,
      MemberClientTradeDetailId: this.tradeDetailId,
    };

    this.dialog.open(ViewTradeExcutionDetailComponent, dialogConfig);
  }
  public switchPage(event: PageEvent) {
    this.paginationService.change(event);
    this.onSubmit();
  }
  getLot() {
    return this.bayerDataSource.data
      .map((t) => t.Lot)
      .reduce((acc, value) => acc + value, 0);
  }
  getKiloGram() {
    return this.bayerDataSource.data
      .map((t) => t.KiloGram)
      .reduce((acc, value) => acc + value, 0);
  }
  getQunital() {
    return this.bayerDataSource.data
      .map((t) => t.Quintal)
      .reduce((acc, value) => acc + value, 0);
  }
  getBayerUnitPrice() {
    return this.bayerDataSource.data
      .map((t) => t.BayerUnitPrice)
      .reduce((acc, value) => acc + value, 0);
  }
  private getUnitMeasurementList() {
    this.registerTardeService
      .getUnitMeasurementList(this.currentLang)
      .subscribe((result) => {
        this.unitMeasurementList = result;
      });
  }
  getDescriptionUnitMeasurement(id: any) {
    const unit = this.unitMeasurementList.find((item) => item.Id === id);
    return unit ? unit.Description : "";
  }
}
