import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  MemberClientTrade,
  MemberTradeFinancialModel,
} from "../../shared/models/register-trade-model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegisterTradeService } from "../../shared/services/register-trade.service";
import { DataSharingService } from "../../shared/services/dataSharingService";
import { Router } from "@angular/router";

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { locale as langEnglish } from "../../lang/en";
import { locale as langEthiopic } from "../../lang/et";
import { StaticData } from "src/app/common/models/static-data.model";
import { REPORTPERIOD } from "src/app/common/constants/consts";
import { RegisterTradeMessageService } from "../../shared/services/registerTrade-message.service";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "src/@custor/services/security/auth.service";
import { MemberFinancialAditor } from "../../shared/models/MemberFinancialAditor";
import { AnnualAuditReportService } from "../../shared/services/annual-audit-report.service";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: "app-member-financial-trade-detail",
  templateUrl: "./member-financial-trade-detail.component.html",
  styleUrls: ["./member-financial-trade-detail.component.scss"],
})
export class MemberFinancialTradeDetailComponent implements OnInit {
  dataSource: any;
  formFinancial: FormGroup;
  currentLang = "";
  reportPeriodList: StaticData[] = [];
  step = 0;
  memberFinancialTradeId = 0;
  private child: MemberTradeFinancialModel[] = [];
  @ViewChild("totalIncome", { static: false }) tName: ElementRef;
  @ViewChild("perShare", { static: false }) tperShareName: ElementRef;
  @ViewChild("fixedAsset", { static: false }) totalFixedAssetName: ElementRef;
  @ViewChild("totalwealth", { static: false }) totalWealthName: ElementRef;
  @ViewChild("temporaryDebts", { static: false })
  totalTemporaryDebtsName: ElementRef;
  @ViewChild("totalLongTerm", { static: false })
  totalLongTermDebtsName: ElementRef;
  @ViewChild("totalDebts", { static: false }) totalDebtsName: ElementRef;
  @ViewChild("netAssets", { static: false }) netAssetsName: ElementRef;
  maxDate = new Date();
  userId: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private registerService: RegisterTradeService,
    private dataSharingService: DataSharingService,
    private registerTradeMessageService: RegisterTradeMessageService,
    private annualMessageService: AnnualAuditReportService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private configService: ConfigurationService,
    private translationLoaderService: TranslationLoaderService,
    private toaster: ToastrService,
    public dialogRef: MatDialogRef<any>,
    private translate: TranslateService,
    private ngxUiService: NgxUiLoaderService
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.createFinancialTradeForm();
  }

  ngOnInit() {
    this.getFinancialReportReminderList();
    this.initStaticData();
    if (this.data.isUpdate === false) {
      this.createFinancialTradeForm();
    } else if (this.data.isUpdate === true) {
      this.registerTradeMessageService.currentMessage.subscribe((res) => {
        this.memberFinancialTradeId = res;
        if (this.memberFinancialTradeId !== 0) {
          this.getMemberFinancialTradeById(this.memberFinancialTradeId);
        }
      });
    }
    this.userId = this.authService.currentUser.Id;
  }

  private createFinancialTradeForm() {
    this.formFinancial = this.formBuilder.group({
      DepositsMoney: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,4})?$"),
        ],
      ],
      CollectedPayment: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,4})?$"),
        ],
      ],
      Stock: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,4})?$"),
        ],
      ],
      AdvancePayment: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,4})?$"),
        ],
      ],
      TotalIncome: 0,
      PerShare: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,4})?$"),
        ],
      ],
      TotalPerShare: 0,
      Building: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,4})?$"),
        ],
      ],
      Vehicle: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,4})?$"),
        ],
      ],
      Tools: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,4})?$"),
        ],
      ],
      OfficeFurniture: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,4})?$"),
        ],
      ],
      Computerandaccessories: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,4})?$"),
        ],
      ],
      TotalFixedAsset: 0,
      TotalWealth: 0,
      PayableDebts: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,4})?$"),
        ],
      ],
      OverDraft: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,2})?$"),
        ],
      ],
      AccountsPriority: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,4})?$"),
        ],
      ],
      LongTermLoanPayable: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,4})?$"),
        ],
      ],
      ShortTermLoan: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,4})?$"),
        ],
      ],
      TotalTemporaryDebts: 0,
      MortgageLoan: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,4})?$"),
        ],
      ],
      LongTermloanFromfinancial: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,4})?$"),
        ],
      ],
      InvestOthers: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,4})?$"),
        ],
      ],
      CurrentAssetsOthers: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,4})?$"),
        ],
      ],
      TangibaleAssetsOthers: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,4})?$"),
        ],
      ],
      CurrentLiabilityOthers: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,4})?$"),
        ],
      ],
      LongTermLiabilityOthers: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,4})?$"),
        ],
      ],
      TotalLongTermDebts: 0,
      TotalDebts: 0,
      NetAssets: 0,
    });
  }

  private getMemberFinancialTradeExcution(): MemberTradeFinancialModel {
    const formModel = this.formFinancial.getRawValue();
    const memberFinancialTrade = new MemberTradeFinancialModel();
    memberFinancialTrade.MemberTradeFinancialId = this.memberFinancialTradeId;
    if (this.data.ReportTypeId == 4) {
      memberFinancialTrade.MemberFinancialAuditorId =
        this.data.MemberFinancialAuditorId;
    } else {
      memberFinancialTrade.MemberClientTradeId = this.data.MemberClientTradeId;
    }
    memberFinancialTrade.DepositsMoney = formModel.DepositsMoney;
    memberFinancialTrade.CollectedPayment = formModel.CollectedPayment;
    memberFinancialTrade.Stock = formModel.Stock;
    memberFinancialTrade.AdvancePayment = formModel.AdvancePayment;
    memberFinancialTrade.CurrentAssetsOthers = formModel.CurrentAssetsOthers;

    memberFinancialTrade.PerShare = formModel.PerShare;
    memberFinancialTrade.InvestOthers = formModel.InvestOthers;

    memberFinancialTrade.Building = formModel.Building;
    memberFinancialTrade.Vehicle = formModel.Vehicle;
    memberFinancialTrade.Tools = formModel.Tools;
    memberFinancialTrade.OfficeFurniture = formModel.OfficeFurniture;
    memberFinancialTrade.Computerandaccessories =
      formModel.Computerandaccessories;
    memberFinancialTrade.TangibaleAssetsOthers =
      formModel.TangibaleAssetsOthers;

    memberFinancialTrade.PayableDebts = formModel.PayableDebts;
    memberFinancialTrade.OverDraft = formModel.OverDraft;
    memberFinancialTrade.AccountsPriority = formModel.AccountsPriority;
    memberFinancialTrade.LongTermLoanPayable = formModel.LongTermLoanPayable;
    memberFinancialTrade.ShortTermLoan = formModel.ShortTermLoan;
    memberFinancialTrade.CurrentLiabilityOthers =
      formModel.CurrentLiabilityOthers;

    memberFinancialTrade.MortgageLoan = formModel.MortgageLoan;
    memberFinancialTrade.LongTermloanFromfinancial =
      formModel.LongTermloanFromfinancial;
    memberFinancialTrade.CurrentLiabilityOthers =
      formModel.CurrentLiabilityOthers;

    memberFinancialTrade.TotalIncome = formModel.TotalIncome;
    memberFinancialTrade.TotalPerShare = formModel.TotalPerShare;
    memberFinancialTrade.TotalFixedAsset = formModel.TotalFixedAsset;
    memberFinancialTrade.TotalWealth = formModel.TotalWealth;
    memberFinancialTrade.TotalTemporaryDebts = formModel.TotalTemporaryDebts;
    memberFinancialTrade.TotalLongTermDebts = formModel.TotalLongTermDebts;
    memberFinancialTrade.TotalDebts = formModel.TotalDebts;
    memberFinancialTrade.NetAssets = formModel.NetAssets;

    memberFinancialTrade.InJectedStatus = 0;
    return memberFinancialTrade;
  }

  updatePerShare() {
    const formModel = this.formFinancial.value;
    this.formFinancial
      .get("TotalPerShare")
      .setValue(parseFloat(formModel.PerShare));
  }

  onClose() {
    this.dialogRef.close();
  }

  clearForm() {
    this.formFinancial.reset();
  }

  addFanancialTrade() {
    this.formFinancial.patchValue({
      TotalIncome: this.tName.nativeElement.value,
      TotalPerShare: this.tperShareName.nativeElement.value,
      TotalFixedAsset: this.totalFixedAssetName.nativeElement.value,
      TotalWealth: this.totalWealthName.nativeElement.value,
      TotalTemporaryDebts: this.totalTemporaryDebtsName.nativeElement.value,
      TotalLongTermDebts: this.totalLongTermDebtsName.nativeElement.value,
      TotalDebts: this.totalDebtsName.nativeElement.value,
      NetAssets: this.netAssetsName.nativeElement.value,
    });
    const formModel = this.getMemberFinancialTradeExcution();
    if (this.data.memberClientIndex == null) {
      this.child.push(formModel);
      this.dataSharingService.valueAdd.next(formModel);
    } else {
      this.child[this.data.memberClientIndex] = formModel;
    }
    this.dialogRef.close({ formModel });
    this.toaster.warning(this.translate.instant("common.messages.Saved"), "", {
      closeButton: true,
    });
    this.formFinancial.reset();
  }

  saveOrUpdateMemberFinancialStatus() {
    this.registerTradeMessageService.currentMessage.subscribe((financialId) => {
      this.memberFinancialTradeId = financialId;
    });
    this.formFinancial.patchValue({
      TotalIncome: this.tName.nativeElement.value,
      TotalPerShare: this.tperShareName.nativeElement.value,
      TotalFixedAsset: this.totalFixedAssetName.nativeElement.value,
      TotalWealth: this.totalWealthName.nativeElement.value,
      TotalTemporaryDebts: this.totalTemporaryDebtsName.nativeElement.value,
      TotalLongTermDebts: this.totalLongTermDebtsName.nativeElement.value,
      TotalDebts: this.totalDebtsName.nativeElement.value,
      NetAssets: this.netAssetsName.nativeElement.value,
    });
    const postData = this.getEditedData();
    const financialTrade = this.getMemberFinancialTradeExcution();
    if (this.data.ReportTypeId === 2) {
      if (this.memberFinancialTradeId === 0) {
        this.ngxUiService.start();
        this.registerService
          .saveOrUpdateMemberFinancial(postData)
          .subscribe((res) => {
            if (res > 0) {
              this.toaster.success(
                this.translate.instant("common.messages.Saved"),
                "",
                {
                  closeButton: true,
                }
              );
              this.ngxUiService.stop();
              this.createFinancialTradeForm();
              this.dataSharingService.valueAdd.next(res);
              this.dialogRef.close();
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
          });
      } else {
        financialTrade.MemberTradeFinancialId = this.memberFinancialTradeId;
        this.ngxUiService.start();
        this.registerService
          .updatememberFinancialTrade(financialTrade)
          .subscribe((res) => {
            this.toaster.success(
              this.translate.instant("common.messages.UpdateSuccess"),
              "",
              {
                closeButton: true,
              }
            );
            this.ngxUiService.stop();
            this.dataSharingService.valueAdd.next(res);
            this.dialogRef.close();
          });
      }
    } else if (this.data.ReportTypeId === 4) {
      const financialAuditorData = this.getMemberFinancialTradeExcution();
      if (this.memberFinancialTradeId === 0) {
        this.ngxUiService.start();
        this.registerService
          .saveExchangeActorFinancialAuditor(financialAuditorData)
          .subscribe((res) => {
            if (res !== "00000000-0000-0000-0000-000000000000") {
              this.toaster.success(
                this.translate.instant("common.messages.Saved"),
                "",
                {
                  closeButton: true,
                }
              );
              this.ngxUiService.stop();
              //  this.dataSharingService.valueAdd.next(res);
              this.annualMessageService.sendMessage(res);
              this.dialogRef.close();
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
              this.dialogRef.close();
            }
          });
      } else {
        financialTrade.MemberTradeFinancialId = this.memberFinancialTradeId;
        this.ngxUiService.start();
        this.registerService
          .updatememberFinancialTrade(financialTrade)
          .subscribe((res) => {
            this.toaster.success(
              this.translate.instant("common.messages.UpdateSuccess"),
              "",
              {
                closeButton: true,
              }
            );
            this.ngxUiService.stop();
            // this.dataSharingService.valueAdd.next(res);
            this.annualMessageService.updateMessage(res);
            this.dialogRef.close();
          });
      }
    } else {
    }
  }

  private getEditedData(): MemberClientTrade {
    const tradeRegistrationData = new MemberClientTrade();
    tradeRegistrationData.MemberClientTradeId = this.data.MemberClientTradeId;
    tradeRegistrationData.ExchangeActorId = this.data.ExchangeActorId;
    tradeRegistrationData.ReportTypeId = this.data.ReportTypeId;
    tradeRegistrationData.IsActive = this.data.IsActive;
    tradeRegistrationData.IsDeleted = this.data.IsDeleted;
    tradeRegistrationData.CreatedDateTime = this.data.CreatedDateTime;
    tradeRegistrationData.CreatedUserId = this.data.CreatedUserId;
    tradeRegistrationData.UpdatedDateTime = this.data.UpdatedDateTime;
    tradeRegistrationData.UpdatedUserId = this.data.UpdatedUserId;
    tradeRegistrationData.Remark = this.data.Remark;
    tradeRegistrationData.ReportDate = this.data.ReportDate;
    tradeRegistrationData.ReportPeriodId = this.data.ReportPeriodId;
    tradeRegistrationData.Year = this.data.Year;
    tradeRegistrationData.WorkFlowStatus = this.data.WorkFlowStatus;
    tradeRegistrationData.TradeExcutionStatusTypeId =
      this.data.TradeExcutionStatusTypeId;
    tradeRegistrationData.PreparedDate = new Date();
    tradeRegistrationData.ApproveDate = new Date();
    const detail = this.getMemberFinancialTradeExcution();
    const myDetails = [];
    myDetails.push(detail);
    tradeRegistrationData.MemberTradeFinancial = myDetails;
    return tradeRegistrationData;
  }
  private getEditFinancialAuditorData() {
    const financialAuditorData = new MemberFinancialAditor();
    financialAuditorData.MemberFinancialAuditorId =
      this.data.MemberFinancialAuditorId;
    financialAuditorData.ExchangeActorId = this.data.ExchangeActorId;
    financialAuditorData.ReportTypeId = this.data.ReportTypeId;
    financialAuditorData.Ecxcode = this.data.Ecxcode;
    financialAuditorData.AnnualBudgetCloserId = this.data.AnnualBudgetCloserId;
    financialAuditorData.CustomerTypeId = this.data.CustomerTypeId;
    financialAuditorData.ReportPeriodId = this.data.ReportPeriodId;
    financialAuditorData.ReportDate = this.data.ReportDate;
    financialAuditorData.TradeExcutionStatusTypeId =
      this.data.TradeExcutionStatusTypeId;
    financialAuditorData.Status = this.data.Status;
    financialAuditorData.Remark = this.data.Remark;
    financialAuditorData.Year = this.data.Year;
    const detail = this.getMemberFinancialTradeExcution();
    const myDetails = [];
    myDetails.push(detail);
    financialAuditorData.MemberTradeFinancial = myDetails;
    return financialAuditorData;
  }
  private initStaticData() {
    const lang = this.currentLang;
    let gender: StaticData = new StaticData();
    REPORTPERIOD.forEach((pair) => {
      gender = {
        Id: pair.Id.toString(),
        Description: lang === "et" ? pair.Description : pair.DescriptionEnglish,
      };
      this.reportPeriodList.push(gender);
    });
  }

  get DepositsMoney() {
    return this.formFinancial.get("DepositsMoney");
  }

  get CollectedPayment() {
    return this.formFinancial.get("CollectedPayment");
  }

  get Stock() {
    return this.formFinancial.get("Stock");
  }

  get AdvancePayment() {
    return this.formFinancial.get("AdvancePayment");
  }

  get PerShare() {
    return this.formFinancial.get("PerShare");
  }

  get Building() {
    return this.formFinancial.get("Building");
  }

  get Vehicle() {
    return this.formFinancial.get("Vehicle");
  }

  get Tools() {
    return this.formFinancial.get("Tools");
  }

  get OfficeFurniture() {
    return this.formFinancial.get("OfficeFurniture");
  }

  get PayableDebts() {
    return this.formFinancial.get("PayableDebts");
  }
  get Computerandaccessories() {
    return this.formFinancial.get("Computerandaccessories");
  }
  get OverDraft() {
    return this.formFinancial.get("OverDraft");
  }

  get AccountsPriority() {
    return this.formFinancial.get("AccountsPriority");
  }

  get LongTermLoanPayable() {
    return this.formFinancial.get("LongTermLoanPayable");
  }

  get ShortTermLoan() {
    return this.formFinancial.get("ShortTermLoan");
  }

  get MortgageLoan() {
    return this.formFinancial.get("MortgageLoan");
  }

  get LongTermloanFromfinancial() {
    return this.formFinancial.get("LongTermloanFromfinancial");
  }
  get InvestOthers() {
    return this.formFinancial.get("InvestOthers");
  }
  get CurrentLiabilityOthers() {
    return this.formFinancial.get("CurrentLiabilityOthers");
  }
  get CurrentAssetsOthers() {
    return this.formFinancial.get("CurrentAssetsOthers");
  }
  get TangibaleAssetsOthers() {
    return this.formFinancial.get("TangibaleAssetsOthers");
  }
  get LongTermLiabilityOthers() {
    return this.formFinancial.get("LongTermLiabilityOthers");
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  getMemberFinancialTradeById(memberClientId: number) {
    this.registerService
      .getMemberFinancialTradeById(memberClientId)
      .subscribe((res) => {
        this.formFinancial.patchValue(res);
      });
  }

  getFinancialReportReminderList() {
    this.registerService
      .getFinancialReportReminder(this.currentLang)
      .subscribe((result) => {
        this.dataSource = result;
      });
  }
}
