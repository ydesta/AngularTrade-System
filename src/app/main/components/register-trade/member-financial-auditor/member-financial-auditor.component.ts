import { Component, Injector, NgZone, OnInit, ViewChild } from "@angular/core";
import {
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
  MatTableDataSource,
  PageEvent,
  MatPaginator,
  MatSort,
} from "@angular/material";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { RegisterTradeService } from "../shared/services/register-trade.service";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
//import { DataSharingService } from "src/app/admin/settings/setting/shared/services/dataSharingService";
import {
  StaticData,
  StaticData5,
} from "src/app/common/models/static-data.model";
import { locale as langEnglish } from "src/app/main/components/register-trade/lang/en";
import { locale as langEthiopic } from "src/app/main/components/register-trade/lang/et";
import { CustomerSearchResultModel } from "src/app/main/models/exchange-actor.model";
import { SearchDialogComponent } from "src/app/main/common/components/search-dialog/search-dialog.component";
import { AuditedDocumentUploadComponent } from "./audited-document-upload/audited-document-upload.component";
import {
  MemberTradeFinancialModel,
  NotificationParms,
} from "../shared/models/register-trade-model";
import { PaginationService } from "src/@custor/services/pagination.service";
import { AngConfirmDialogComponent } from "src/@custor/components/confirm-dialog/confirm-dialog.component";
import {
  FinancialAuditoredFileUpload,
  MemberFinancialAditor,
} from "../shared/models/MemberFinancialAditor";
import { MemberFinancialAuditorViewComponent } from "./member-financial-auditor-view/member-financial-auditor-view.component";
import { OffSiteMonitoringMessageService } from "../shared/services/off-site-monitoring-message.service";
import { AnnualAuditReportService } from "../shared/services/annual-audit-report.service";
import { MemberFinancialTradeDetailComponent } from "../member-financial-trade/member-financial-trade-detail/member-financial-trade-detail.component";
import { RegisterTradeMessageService } from "../shared/services/registerTrade-message.service";
import { AuthService } from "src/@custor/services/security/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ErrorService } from "src/@custor/services/error/error.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { take } from "rxjs/operators";
import { AnnualAuditReportDataServiceService } from "../shared/services/annual-audit-report-data-service.service";
@Component({
  selector: "app-member-financial-auditor",
  templateUrl: "./member-financial-auditor.component.html",
  styleUrls: ["./member-financial-auditor.component.scss"],
})
export class MemberFinancialAuditorComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  form: FormGroup;
  fileName = [];
  currentLang = "";
  auditorList: StaticData[] = [];
  @ViewChild("fileInput", { static: false }) fileInput: any;
  urls = [];
  allFiles: string[] = [];
  selectedExchangeActorId: string;
  customerSearchResult: CustomerSearchResultModel;
  exchangeActorStatus: number;
  searchDialog: MatDialogRef<SearchDialogComponent>;
  auditorId = "";
  annualBudgetCloserIdList: StaticData[] = [];
  customerTypeId = this.authService.currentUser.CustomerTypeId;
  currentYear: number;
  dataSource: any;
  MemberFinancialAuditorId: number;
  totalCount = 0;
  fianaceDataSource: any;
  parentId = "";
  isUpdate: boolean;
  memberId = this.authService.currentUser.ExchangeActorId;
  baseDocumentUrl: string;
  fileToUpload: File = null;
  public displayAnnualColumns = [
    // "no",
    "OrganizationName",
    "AnnualBudgetCloser",
    "DateReport",
    "AuditorName",
    "AnnualAuditStatus",
    "Action",
  ];
  SelectedFilename = "";
  displayedColumns = ["no", "FileName", "CreatedDate", "Actions"];
  listOfExchangeActor: StaticData5[] = [];
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
  fileUploadExponestional: boolean;
  yearList: number[] = [];
  @ViewChild("autosize", { static: false }) autosize: CdkTextareaAutosize;
  generalInfo = true;
  generalInfoList = false;
  fileDataSource: any;
  constructor(
    fb: FormBuilder,
    private dialog: MatDialog,
    private annualMessageService: AnnualAuditReportService,
    private configService: ConfigurationService,
    private translationLoaderService: TranslationLoaderService,
    private registerService: RegisterTradeService,
    private toaster: ToastrService,
    private translate: TranslateService,
    public paginationService: PaginationService,
    private registerTradeMessageService: OffSiteMonitoringMessageService,
    private financialMessageService: RegisterTradeMessageService,
    private authService: AuthService,
    private annualAuditReportService: AnnualAuditReportDataServiceService,
    private injector: Injector,
    private ngxUiService: NgxUiLoaderService,
    private _ngZone: NgZone
  ) {
    this.currentLang = this.configService.language;
    this.baseDocumentUrl = this.configService.baseUrl + "Uploads/";
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    const Zemen = require("zemen");
    const zare = new Zemen();
    this.currentYear = zare.getFullYear() - 1;
    this.yearList = this.getYearRange(this.currentYear);
    this.form = this.createFormGroup(fb);
    this.fileUploadExponestional = false;
  }

  ngOnInit() {
    this.getAnnualBudgetCloserList();
    this.annualMessageService.currentMessage.subscribe((res) => {
      if (res != 0) {
        // this.getAllAnnualAuditedDocument();
        this.getFinancialListById(res);
      }
    });
    this.annualMessageService.messageCurrent.subscribe((res) => {
      this.auditorId = res;
      if (this.auditorId != "") {
        this.getFinancialAuditListById(this.auditorId);
        this.getMemberAnnualAuditerByIdFileUpload(this.auditorId);
        this.getAllAnnualAuditedDocument();
      }
    });
    this.getListOfMemberAuditorList(this.memberId, this.currentLang);
    this.getListOfAnnualAuditReport();
  }
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
  getYearRange(CurrentYear: number) {
    const YeaList = [];
    const startYear = CurrentYear - 10;
    for (let i = startYear; i <= CurrentYear; i++) {
      YeaList.push(i);
    }
    return YeaList.reverse();
  }
  private createFormGroup(fb: FormBuilder) {
    return fb.group({
      CustomerFullName: [null],
      OrganizationName: this.authService.currentUser.FullName,
      CustomerType: [null],
      ExchangeActorId: [null],
      Remark: [null],
      Ecxcode: [null],
      ReportDate: new Date(),
      AnnualBudgetCloserId: [null],
      Year: this.currentYear,
    });
  }
  get Ecxcode() {
    return this.form.get("Ecxcode");
  }
  getFinancialFileUpload() {
    const formData = new FormData();
    for (var i = 0; i < this.allFiles.length; i++) {
      formData.append("ActualFile", this.allFiles[i]);
    }
    return formData;
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files;
      for (let i = 0; i < filesAmount.length; i++) {
        this.allFiles.push(filesAmount[i]);
        this.fileName = filesAmount[i].name;
        this.form.patchValue({
          ActualFile: event.target.files[i],
        });
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.urls.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  addFiles() {
    this.fileInput.nativeElement.click();
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
      if (this.exchangeActorStatus === 64) {
        this.toaster.warning(
          this.translate.instant("common.messages.Cancelled"),
          "",
          {
            closeButton: true,
          }
        );
      } else if (this.exchangeActorStatus === 31) {
        this.toaster.warning(
          this.translate.instant("common.messages.UnderInjunction"),
          "",
          {
            closeButton: true,
          }
        );
      } else {
        if (
          this.customerSearchResult.CustomerTypeId == 5 ||
          this.customerSearchResult.CustomerTypeId == 6 ||
          this.customerSearchResult.CustomerTypeId == 90
        ) {
          this.form
            .get("CustomerFullName")
            .setValue(this.customerSearchResult.FullName);
          this.form
            .get("OrganizationName")
            .setValue(this.customerSearchResult.OrganizationName);
          this.selectedExchangeActorId =
            this.customerSearchResult.ExchangeActorId;
          this.form
            .get("CustomerType")
            .setValue(this.customerSearchResult.CustomerType);
        } else {
          this.toaster.warning(
            this.translate.instant("common.messages.SelectMemberAuditorDirect"),
            "",
            {
              closeButton: true,
            }
          );
        }
      }
    });
  }
  get CustomerFullName() {
    return this.form.get("CustomerFullName");
  }

  get OrganizationName() {
    return this.form.get("OrganizationName");
  }

  get CustomerType() {
    return this.form.get("CustomerType");
  }
  deleteImages() {
    var index = this.urls.indexOf(this.fileName);
    this.urls.splice(index, 1);
    this.allFiles.splice(index, 1);
  }
  private getMemberFinancialAditorValue(): MemberFinancialAditor {
    const formModel = this.form.value;
    const memberAudit = new MemberFinancialAditor();
    memberAudit.MemberFinancialAuditorId = this.auditorId;
    memberAudit.ExchangeActorId = this.memberId;
    memberAudit.AnnualBudgetCloserId = formModel.AnnualBudgetCloserId;
    memberAudit.Ecxcode = formModel.Ecxcode;
    memberAudit.Remark = formModel.Remark;
    memberAudit.Year = formModel.Year;
    memberAudit.CustomerTypeId = this.customerTypeId;
    memberAudit.ReportTypeId = 4;
    memberAudit.ReportPeriodId = 5;
    memberAudit.Status = 7;
    memberAudit.ReportDate = new Date();
    memberAudit.TradeExcutionStatusTypeId = 1;
    return memberAudit;
  }

  saveAttachment() {
    const formData = new FormData();
    const formModel = this.form.getRawValue();
    formData.append("MemberFinancialAuditorId", this.auditorId.toString());
    for (var i = 0; i < this.allFiles.length; i++) {
      formData.append("ActualFile", this.allFiles[i]);
    }
    this.registerService
      .saveMemberFinancialAuditor(formData)
      .subscribe((res) => {
        if (res != null) {
          this.toaster.success(
            this.translate.instant("common.messages.Saved"),
            "",
            {
              closeButton: true,
            }
          );
          this.getAllAnnualAuditedDocument();
          // this.dataSharingService.valueAdd.next(res);
          // this.dialogRef.close(true);
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
  }
  onClose() {
    // this.dialogRef.close();
  }
  getAnnualBudgetCloserList() {
    this.registerService
      .getAnnualBudgetCloser(this.currentLang)
      .subscribe((res) => {
        this.annualBudgetCloserIdList = res;
      });
  }
  AddAnnualFileAudit() {
    const formModel = this.form.getRawValue();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = null;
    dialogConfig.width = "60%";
    dialogConfig.height = "60%";
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      MemberFinancialAuditorId: this.auditorId,
      ExchangeActorId: this.authService.currentUser.ExchangeActorId,
      Ecxcode: formModel.Ecxcode,
      AnnualBudgetCloserId: formModel.AnnualBudgetCloserId,
      Remark: formModel.Remark,
      Year: formModel.Year,
      CustomerTypeId: this.customerTypeId,
      // ReportDate: new Date(),
      ReportTypeId: 4,
      ReportPeriodId: 5,
      Status: 7,
      TradeExcutionStatusTypeId: 1,
    };
    this.dialog.open(AuditedDocumentUploadComponent, dialogConfig);
  }

  private getMemberTradeParameters(): NotificationParms {
    const params = new NotificationParms();
    params.MemberFinancialAuditorId = this.auditorId;
    params.Lang = this.currentLang;
    params.PageIndex = this.paginationService.page;
    params.PageSize = this.paginationService.pageCount;
    return params;
  }
  getAllAnnualAuditedDocument() {
    this.registerService
      .getAllAnnualAuditedDocument(this.getMemberTradeParameters())
      .subscribe((result) => {
        if (result.Items.length > 0) {
          if (this.totalCount === 0) {
            this.totalCount = result.ItemsCount;
          }
          this.fileDataSource = new MatTableDataSource(result.Items);
        }
      });
  }
  public switchPage(event: PageEvent) {
    this.paginationService.change(event);
    this.getAllAnnualAuditedDocument();
  }
  deleteMemberClientInformation(deletFileUplaod: FinancialAuditoredFileUpload) {
    const message = `Are you sure you want to delete this record?`;
    const fileUpload: FinancialAuditoredFileUpload = {
      FinancialAuditoredFileUploadId:
        deletFileUplaod.FinancialAuditoredFileUploadId,
      FileLocation: deletFileUplaod.FileLocation,
      MemberFinancialAuditorId: deletFileUplaod.MemberFinancialAuditorId,
      Url: deletFileUplaod.Url,
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "30%";
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(AngConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult === true) {
        this.registerService
          .deleteAuditorFileUpload(fileUpload)
          .subscribe((res) => {
            if (res) {
              this.toaster.success(
                this.translate.instant("common.messages.Deleted"),
                "",
                {
                  closeButton: true,
                }
              );
              this.getAllAnnualAuditedDocument();
            }
          });
      }
    });
  }
  openAttachmentPreviewDialog(viewModel: FinancialAuditoredFileUpload) {
    this.MemberFinancialAuditorId = viewModel.FinancialAuditoredFileUploadId;
    if (this.MemberFinancialAuditorId) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "70%";
      dialogConfig.height = "96%";
      dialogConfig.disableClose = true;
      dialogConfig.position = {
        top: "1%",
        right: "10%",
      };
      dialogConfig.disableClose = true;
      dialogConfig.data = {
        FinancialAuditoredFileUploadId: this.MemberFinancialAuditorId,
      };
      this.dialog.open(MemberFinancialAuditorViewComponent, dialogConfig);
    }
  }
  getMemberAnnualAuditerByIdFileUpload(memberClientId: string) {
    this.registerService
      .getMemberAnnualAuditerUploadFile(memberClientId)
      .subscribe((res) => {
        if (res != null) {
          this.customerTypeId = res.CustomerTypeId;
          this.form.patchValue(res);
        }
      });
  }
  AddMemeberFinancialClient() {
    //this.isUpdate = false;
    const formModel = this.form.getRawValue();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "70%";
    dialogConfig.height = "90%";
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      isUpdate: false,
      MemberFinancialAuditorId: this.auditorId,
      // ExchangeActorId: this.authService.currentUser.ExchangeActorId,
      // Ecxcode: formModel.Ecxcode,
      // AnnualBudgetCloserId: formModel.AnnualBudgetCloserId,
      // Remark: formModel.Remark,
      // Year: formModel.Year,
      // ReportDate: formModel.ReportDate,
      // CustomerTypeId: this.customerTypeId,
      ReportTypeId: 4,
      // ReportPeriodId: 5,
      // Status: 7,
      // TradeExcutionStatusTypeId: 1,
    };
    this.dialog.open(MemberFinancialTradeDetailComponent, dialogConfig);
  }
  getFinancialAuditListById(memberFinancialAuditorId: string) {
    this.registerService
      .getFinancialAuditListById(memberFinancialAuditorId)
      .subscribe((result) => {
        this.fianaceDataSource = new MatTableDataSource(result);
        this.fianaceDataSource.sort = this.sort;
        this.fianaceDataSource.paginator = this.paginator;
      });
  }
  getFinancialListById(financialId: number) {
    this.annualAuditReportService
      .getMemberFinancialListById(financialId)
      .subscribe((result) => {
        this.fianaceDataSource = new MatTableDataSource(result);
        this.fianaceDataSource.sort = this.sort;
        this.fianaceDataSource.paginator = this.paginator;
      });
  }
  EditMemeberFinancialClient() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "70%";
    dialogConfig.height = "90%";
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      isUpdate: true,
      MemberFinancialAuditorId: this.parentId,
      ReportTypeId: 4,
    };
    this.dialog.open(MemberFinancialTradeDetailComponent, dialogConfig);
  }
  getFinancialTrade(financialTrade: MemberTradeFinancialModel) {
    this.parentId = financialTrade.MemberFinancialAuditorId;
    if (this.parentId) {
      this.financialMessageService.updateMessage(
        financialTrade.MemberTradeFinancialId
      );
      this.EditMemeberFinancialClient();
    }
  }
  deleteMemberFinancialTrade(postedData: MemberTradeFinancialModel) {
    const deletedFinancialTrade: MemberTradeFinancialModel = {
      AccountsPriority: postedData.AccountsPriority,
      AdvancePayment: postedData.AdvancePayment,
      Building: postedData.Building,
      CollectedPayment: postedData.CollectedPayment,
      CreatedDateTime: postedData.CreatedDateTime,
      CreatedUserId: postedData.CreatedUserId,
      DepositsMoney: postedData.DepositsMoney,
      IsActive: postedData.IsActive,
      IsDeleted: postedData.IsDeleted,
      LongTermloanFromfinancial: postedData.LongTermloanFromfinancial,
      LongTermLoanPayable: postedData.LongTermLoanPayable,
      MemberClientTradeId: postedData.MemberClientTradeId,
      MemberTradeFinancialId: postedData.MemberTradeFinancialId,
      MortgageLoan: postedData.MortgageLoan,
      NetAssets: postedData.NetAssets,
      OfficeFurniture: postedData.OfficeFurniture,
      OverDraft: postedData.OverDraft,
      PayableDebts: postedData.PayableDebts,
      PerShare: postedData.PerShare,
      ShortTermLoan: postedData.ShortTermLoan,
      Stock: postedData.Stock,
      Tools: postedData.Tools,
      TotalDebts: postedData.TotalDebts,
      TotalFixedAsset: postedData.TotalFixedAsset,
      TotalIncome: postedData.TotalIncome,
      TotalLongTermDebts: postedData.TotalLongTermDebts,
      TotalPerShare: postedData.TotalPerShare,
      TotalTemporaryDebts: postedData.TotalTemporaryDebts,
      TotalWealth: postedData.TotalWealth,
      UpdatedDateTime: postedData.UpdatedDateTime,
      UpdatedUserId: postedData.UpdatedUserId,
      Vehicle: postedData.Vehicle,
      InJectedStatus: postedData.InJectedStatus,
      Computerandaccessories: postedData.Computerandaccessories,
      MemberFinancialAuditorId: postedData.MemberFinancialAuditorId,
      InvestOthers: postedData.InvestOthers,
      CurrentAssetsOthers: postedData.CurrentAssetsOthers,
      TangibaleAssetsOthers: postedData.TangibaleAssetsOthers,
      CurrentLiabilityOthers: postedData.TangibaleAssetsOthers,
      LongTermLiabilityOthers: postedData.LongTermLiabilityOthers,
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "30%";
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(AngConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.registerService
          .deleteMemberFinancialTrade(deletedFinancialTrade)
          .subscribe((res) => {
            this.getFinancialAuditListById(this.selectedExchangeActorId);
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
  handleError(error) {
    const errorService = this.injector.get(ErrorService);
    if (error instanceof HttpErrorResponse) {
      // Server error
      const message = errorService.getServerErrorMessage(error);
      this.toaster.error(message);
    }
  }
  handleFileInput(event) {
    const fileItem = event.target.files.item(0);
    if (
      /\.(pdf)$/i.test(event.target.files[0].name.toLocaleLowerCase()) === false
    ) {
      this.toaster.error("Only files with .Pdf extension are allowed", "Error");
      return;
    }
    this.SelectedFilename = fileItem.name;
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files;
      for (let i = 0; i < filesAmount.length; i++) {
        this.allFiles.push(filesAmount[i]);
        this.fileName = filesAmount[i].name;
        this.form.patchValue({
          ActualFile: event.target.files[i],
        });
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.urls.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  handleSubmit(event) {
    if (this.SelectedFilename.length === 0) {
      this.toaster.error("Please select Excel file to upload", "Error", {
        closeButton: true,
      });
      return;
    }
    const formData = new FormData();
    const formModel = this.form.getRawValue();
    formData.append("MemberFinancialAuditorId", this.auditorId.toString());
    formData.append("ExchangeActorId", this.memberId);
    formData.append("Ecxcode", formModel.Ecxcode);
    formData.append("AnnualBudgetCloserId", formModel.AnnualBudgetCloserId);
    formData.append("Remark", formModel.Remark);
    formData.append("Year", formModel.Year);
    formData.append("CustomerTypeId", this.customerTypeId.toString());
    formData.append("ReportTypeId", "4");
    formData.append("ReportPeriodId", "5");
    formData.append("Status", "7");
    formData.append("TradeExcutionStatusTypeId", "1");
    for (var i = 0; i < this.allFiles.length; i++) {
      formData.append("ActualFile", this.allFiles[i]);
    }
    this.ngxUiService.start();
    this.registerService
      .saveMemberFinancialAuditor(formData)
      .subscribe((res) => {
        if (res !== "00000000-0000-0000-0000-000000000000") {
          this.toaster.success(
            this.translate.instant("common.messages.Saved"),
            "",
            {
              closeButton: true,
            }
          );
          this.SelectedFilename = "";
          const params = new NotificationParms();
          params.ExchangeActorId = res;
          params.Lang = this.currentLang;
          params.PageIndex = this.paginationService.page;
          params.PageSize = this.paginationService.pageCount;
          this.registerService
            .getAllAnnualAuditedDocument(params)
            .subscribe((result) => {
              if (result.Items.length > 0) {
                if (this.totalCount === 0) {
                  this.totalCount = result.ItemsCount;
                }
                this.dataSource = new MatTableDataSource(result.Items);
              }
            });
          this.ngxUiService.stop();
        } else {
          this.ngxUiService.stop();
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
      }),
      (error) => this.handleError(error);
  }
  getListOfMemberAuditorList(customerTypeId: string, lang: string) {
    this.registerService
      .getMemberAuditorAgreementList(customerTypeId, lang)
      .subscribe((res) => {
        this.listOfExchangeActor = res;
      });
  }
  clearForm() {
    this.form.reset();
  }
  saveOrUpdate() {
    if (this.auditorId == "") {
      this.annualAuditReportService
        .saveMemberAnnualAudit(this.getMemberFinancialAditorValue())
        .subscribe((res) => {
          if (res != null) {
            this.toaster.success(
              this.translate.instant("common.messages.Saved"),
              "",
              {
                closeButton: true,
              }
            );
            this.getListOfAnnualAuditReport();
            this.auditorId = res;
            this.generalInfo = false;
            this.generalInfoList = true;
            this.clearForm();
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
      this.annualAuditReportService
        .updateFinancialAuditor(this.getMemberFinancialAditorValue())
        .subscribe((res) => {
          if (res) {
            this.toaster.success(
              this.translate.instant("common.messages.UpdateSuccess"),
              "",
              {
                closeButton: true,
              }
            );
            this.getListOfAnnualAuditReport();
            this.generalInfo = false;
            this.generalInfoList = true;
            this.clearForm();
          } else {
            this.toaster.error(
              this.translate.instant("common.messages.UpdateError"),
              "",
              {
                closeButton: true,
              }
            );
          }
        });
    }
  }
  private getMemberAnnualParameters(): NotificationParms {
    const params = new NotificationParms();
    params.Lang = this.currentLang;
    params.ExchangeActorId = this.authService.currentUser.ExchangeActorId;
    params.PageIndex = this.paginationService.page;
    params.PageSize = this.paginationService.pageCount;
    return params;
  }
  getListOfAnnualAuditReport() {
    this.annualAuditReportService
      .getExchangeActorAuditorList(this.getMemberAnnualParameters())
      .subscribe((res: any) => {
        if (res.Items.length > 0) {
          if (this.totalCount === 0) {
            this.totalCount = res.ItemsCount;
          }
          this.dataSource = new MatTableDataSource(res.Items);
          this.generalInfo = false;
          this.generalInfoList = true;
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
  editAnnualReport(registerTrade: any) {
    this.auditorId = registerTrade.MemberFinancialAuditorId;
    if (this.auditorId) {
      this.generalInfo = true;
      this.generalInfoList = false;
    }
    this.getFinancialAuditListById(this.auditorId);
    this.getAllAnnualAuditedDocument();
    this.form.patchValue(registerTrade);
  }
  deleteAnnualDelete(postedData: MemberFinancialAditor) {
    console.log(postedData);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "30%";
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(AngConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.annualAuditReportService
          .deleteAnnualAudit(postedData.MemberFinancialAuditorId)
          .subscribe((res) => {
            if (res) {
              this.toaster.success(
                this.translate.instant("common.messages.Deleted"),
                "",
                {
                  closeButton: true,
                }
              );
              this.getListOfAnnualAuditReport();
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
