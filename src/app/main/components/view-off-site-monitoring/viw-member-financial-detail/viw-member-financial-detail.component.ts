import { Component, Inject, OnInit } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { locale as langEnglish } from "src/app/main/components/register-trade/lang/en";
import { locale as langEthiopic } from "src/app/main/components/register-trade/lang/et";
import { StaticData } from "src/app/common/models/static-data.model";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { AuthService } from "src/@custor/services/security/auth.service";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { DataSharingService } from "src/app/admin/settings/setting/shared/services/dataSharingService";
import { RegisterTradeMessageService } from "src/app/admin/settings/setting/shared/services/registerTrade-message.service";
import { RegisterTradeService } from "../../register-trade/shared/services/register-trade.service";

@Component({
  selector: "app-viw-member-financial-detail",
  templateUrl: "./viw-member-financial-detail.component.html",
  styleUrls: ["./viw-member-financial-detail.component.scss"],
})
export class ViwMemberFinancialDetailComponent implements OnInit {
  formFinancial: FormGroup;
  currentLang = "";
  reportPeriodList: StaticData[] = [];
  step = 0;
  memberFinancialTradeId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private registerService: RegisterTradeService,
    private dataSharingService: DataSharingService,
    private registerTradeMessageService: RegisterTradeMessageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private configService: ConfigurationService,
    private translationLoaderService: TranslationLoaderService,
    private dialog: MatDialog,
    private toaster: ToastrService,
    public dialogRef: MatDialogRef<any>,
    private translate: TranslateService
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.createFinancialTradeForm();
  }

  ngOnInit() {
    if (this.data.MemberTradeFinancialId !== 0) {
      this.getMemberFinancialTradeById(this.data.MemberTradeFinancialId);
    }
  }

  private createFinancialTradeForm() {
    this.formFinancial = this.formBuilder.group({
      DepositsMoney: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,2})?$"),
        ],
      ],
      CollectedPayment: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,2})?$"),
        ],
      ],
      Stock: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,2})?$"),
        ],
      ],
      AdvancePayment: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,2})?$"),
        ],
      ],
      TotalIncome: 0,
      PerShare: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,2})?$"),
        ],
      ],
      TotalPerShare: 0,
      Building: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,2})?$"),
        ],
      ],
      Vehicle: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,2})?$"),
        ],
      ],
      Tools: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,2})?$"),
        ],
      ],
      OfficeFurniture: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,2})?$"),
        ],
      ],
      TotalFixedAsset: 0,
      TotalWealth: 0,
      PayableDebts: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,2})?$"),
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
          Validators.pattern("^[0-9]+(.[0-9]{0,2})?$"),
        ],
      ],
      LongTermLoanPayable: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,2})?$"),
        ],
      ],
      ShortTermLoan: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,2})?$"),
        ],
      ],
      TotalTemporaryDebts: 0,
      MortgageLoan: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,2})?$"),
        ],
      ],
      LongTermloanFromfinancial: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,2})?$"),
        ],
      ],
      TotalLongTermDebts: 0,
      TotalDebts: 0,
      NetAssets: 0,
      Computerandaccessories: 0,
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
    });
  }

  onClose() {
    this.dialogRef.close();
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
}
