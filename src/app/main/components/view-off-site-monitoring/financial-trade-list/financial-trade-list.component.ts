import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FormBuilder, FormGroup } from "@angular/forms";
import { StaticData } from "src/app/common/models/static-data.model";
// import {
//   SearchCriteria,
//   MemberTradeFinancialModel,
// } from "../shared/models/register-trade-model";
import { MatTableDataSource } from "@angular/material/table";
//import { RegisterTradeService } from "../shared/services/register-trade.service";
import { ToastrService } from "ngx-toastr";
import { locale as langEnglish } from "src/app/main/components/register-trade/lang/en";
import { locale as langEthiopic } from "src/app/main/components/register-trade/lang/et";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { CustomerSearchResultModel } from "src/app/main/models/exchange-actor.model";
import { MatDialogRef, MatDialog, MatDialogConfig } from "@angular/material";
import { SearchDialogComponent } from "src/app/main/common/components/search-dialog/search-dialog.component";
//import { ViwMemberFinancialDetailComponent } from "../member-client-trade-list/view-trade-excution/viw-member-financial-detail/viw-member-financial-detail.component";
import { PaginationService } from "src/@custor/services/pagination.service";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "src/@custor/services/security/auth.service";
import { RegisterTradeService } from "../../register-trade/shared/services/register-trade.service";
import {
  MemberTradeFinancialModel,
  SearchCriteria,
} from "../../register-trade/shared/models/register-trade-model";
import { ViwMemberFinancialDetailComponent } from "../viw-member-financial-detail/viw-member-financial-detail.component";
//import { ViwMemberFinancialDetailComponent } from "../../register-trade/member-client-trade-list/view-trade-excution/viw-member-financial-detail/viw-member-financial-detail.component";

@Component({
  selector: "app-financial-trade-list",
  templateUrl: "./financial-trade-list.component.html",
  styleUrls: ["./financial-trade-list.component.scss"],
})
export class FinancialTradeListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  currentLang = "";
  searchForm: FormGroup;
  dataSource: any;
  memberClientTradeList: any;
  reportPeriodList: StaticData[] = [];
  currentYear: number;
  yearList: number[] = [];
  expandClose: boolean;
  customerSearchResult: CustomerSearchResultModel;
  searchDialog: MatDialogRef<SearchDialogComponent>;
  memberViolationOnOff: boolean;
  totalCount = 0;
  selectedExchangeActorId: string;
  displayedColumns = [
    "no",
    // "OrganizationName",
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
  memberTradeFinancialId: number;
  constructor(
    private registerTardeService: RegisterTradeService,
    private toastr: ToastrService,
    configService: ConfigurationService,
    private translationLoaderService: TranslationLoaderService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    public paginationService: PaginationService,
    private authService: AuthService
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    const Zemen = require("zemen");
    const zare = new Zemen();
    this.currentYear = zare.getFullYear();
    this.yearList = this.getYearRange(this.currentYear);
    this.initForm();
    this.expandClose = true;
    this.memberViolationOnOff = false;
  }

  ngOnInit() {
    this.initStaticData();
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
      ECXCode: ["", []],
      ReportPeriodId: ["", []],
      Year: this.currentYear,
    });
  }

  get ECXCode() {
    return this.searchForm.get("ECXCode");
  }

  get ReportPeriodId() {
    return this.searchForm.get("ReportPeriodId");
  }

  get Year() {
    return this.searchForm.get("Year");
  }

  getMemberClientTradeSearch(): SearchCriteria {
    const formModel = this.searchForm.getRawValue();
    const params = new SearchCriteria();
    params.Lang = this.currentLang;
    params.PageIndex = this.paginationService.page;
    params.PageSize = this.paginationService.pageCount;
    params.ExchangeActorId = this.selectedExchangeActorId;
    params.ReportPeriodId = formModel.ReportPeriodId
      ? formModel.ReportPeriodId
      : 0;
    params.Year = formModel.Year ? formModel.Year : 0;
    return params;
  }

  private initStaticData() {
    this.registerTardeService
      .getRePortPeriod(this.currentLang)
      .subscribe((res) => {
        this.reportPeriodList = res;
      });
  }
  getFinancialTrade(financialTrade: MemberTradeFinancialModel) {
    this.memberTradeFinancialId = financialTrade.MemberTradeFinancialId;
    if (this.memberTradeFinancialId) {
      this.EditMemeberFinancialClient();
    }
  }
  EditMemeberFinancialClient() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "45%";
    dialogConfig.height = "73%";
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      MemberTradeFinancialId: this.memberTradeFinancialId,
    };

    this.dialog.open(ViwMemberFinancialDetailComponent, dialogConfig);
  }

  onSubmit() {
    this.registerTardeService
      .getFinancialTradeReport(this.getMemberClientTradeSearch())
      .subscribe((res) => {
        if (res.Items.length > 0) {
          this.memberClientTradeList = res.Items;
          if (this.totalCount === 0) {
            this.totalCount = res.ItemsCount;
          }
          this.dataSource = new MatTableDataSource(this.memberClientTradeList);
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

  clearForm() {
    this.searchForm.reset();
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
  public switchPage(event: PageEvent) {
    this.paginationService.change(event);
    this.onSubmit();
  }
}
