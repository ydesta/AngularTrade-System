import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  MatPaginator,
  MatSort,
  MatDialogRef,
  MatDialog,
  PageEvent,
  MatDialogConfig,
  MatTableDataSource,
} from "@angular/material";
import { StaticData } from "src/app/common/models/static-data.model";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { PaginationService } from "src/@custor/services/pagination.service";
import { AccountService } from "src/@custor/services/security/account.service";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { TranslateService } from "@ngx-translate/core";
import { RegisterTradeMessageService } from "src/app/admin/settings/setting/shared/services/registerTrade-message.service";
import { SearchDialogComponent } from "src/app/main/common/components/search-dialog/search-dialog.component";
import { CustomerSearchResultModel } from "src/app/main/models/exchange-actor.model";
import { ToastrService } from "ngx-toastr";
import { RegisterTradeService } from "../../register-trade/shared/services/register-trade.service";
import { AuthService } from "src/@custor/services/security/auth.service";
import { locale as langEnglish } from "src/app/main/components/register-trade/lang/en";
import { locale as langEthiopic } from "src/app/main/components/register-trade/lang/et";
import {
  MemberTradeFinancialModel,
  SearchCriteria,
} from "../../register-trade/shared/models/register-trade-model";
//import { ViwMemberFinancialDetailComponent } from "../../register-trade/member-client-trade-list/view-trade-excution/viw-member-financial-detail/viw-member-financial-detail.component";
import { MemberFinancialAditor } from "../../register-trade/shared/models/MemberFinancialAditor";
import { MemberFinancialAuditorViewComponent } from "../../register-trade/member-financial-auditor/member-financial-auditor-view/member-financial-auditor-view.component";
import { ViwMemberFinancialDetailComponent } from "../viw-member-financial-detail/viw-member-financial-detail.component";
@Component({
  selector: "app-view-annual-financial-report",
  templateUrl: "./view-annual-financial-report.component.html",
  styleUrls: ["./view-annual-financial-report.component.scss"],
})
export class ViewAnnualFinancialReportComponent implements OnInit {
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
  annualBudgetCloserIdList: StaticData[] = [];
  memberTradeFinancialId: number;
  selectedExchangeActorId: string;
  MemberFinancialAuditorId: string;
  baseDocumentUrl: string;
  auditedFileDataSource: any;
  displayedColumns = [
    "no",
    //"OrganizationName",
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
  displayedColumnsAuditedFile = ["no", "FileName", "CreatedDate", "Actions"];

  constructor(
    private registerTardeService: RegisterTradeService,
    private toastr: ToastrService,
    private configService: ConfigurationService,
    private accountService: AccountService,
    private translationLoaderService: TranslationLoaderService,
    private dialog: MatDialog,
    private registerTradeMessageService: RegisterTradeMessageService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private authService: AuthService,
    public paginationService: PaginationService
  ) {
    this.currentLang = configService.language;
    this.baseDocumentUrl = this.configService.baseUrl + "Uploads/";
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
    this.getAnnualBudgetCloserList();
    this.selectedExchangeActorId = this.authService.currentUser.ExchangeActorId;
  }
  initForm() {
    this.searchForm = this.formBuilder.group({
      CustomerFullName: [null],
      OrganizationName: this.authService.currentUser.FullName,
      CustomerType: [null],
      ECXCode: ["", []],
      AnnualBudgetCloserId: ["", []],
      Year: this.currentYear,
    });
  }
  get ECXCode() {
    return this.searchForm.get("ECXCode");
  }

  get AnnualBudgetCloserId() {
    return this.searchForm.get("AnnualBudgetCloserId");
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
    params.AnnualBudgetCloserId = formModel.AnnualBudgetCloserId
      ? formModel.AnnualBudgetCloserId
      : 0;
    params.Year = formModel.Year ? formModel.Year : 0;
    return params;
  }

  getAnnualBudgetCloserList() {
    this.registerTardeService
      .getAnnualBudgetCloser(this.currentLang)
      .subscribe((res) => {
        this.annualBudgetCloserIdList = res;
      });
  }
  getFinancialTrade(financialTrade: MemberTradeFinancialModel) {
    this.memberTradeFinancialId = financialTrade.MemberTradeFinancialId;
    if (this.memberTradeFinancialId) {
      this.EditMemeberFinancialClient();
    }
  }
  EditMemeberFinancialClient() {
    const formModel = this.searchForm.getRawValue();
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
      .getMemberAnnualFinancialReport(this.getMemberClientTradeSearch())
      .subscribe((res) => {
        if (res) {
          this.dataSource = new MatTableDataSource(res);
          setTimeout(() => (this.dataSource.paginator = this.paginator));
          setTimeout(() => (this.dataSource.sort = this.sort));
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
    this.registerTardeService
      .getMemberAnnualFileUploadReport(this.getMemberClientTradeSearch())
      .subscribe((res) => {
        if (res) {
          this.auditedFileDataSource = new MatTableDataSource(res);
          setTimeout(
            () => (this.auditedFileDataSource.paginator = this.paginator)
          );
          setTimeout(() => (this.auditedFileDataSource.sort = this.sort));
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
}
