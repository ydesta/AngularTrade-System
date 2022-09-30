import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AccountService } from "src/@custor/services/security/account.service";

import { ToastrService } from "ngx-toastr";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { TranslateService } from "@ngx-translate/core";
import { locale as langEnglish } from "../../../../../../lang/en";
import { locale as langEthiopic } from "../../../../../../lang/et";

import { DatePipe } from "@angular/common";
import {
  ALPHABET_WITHSPACE_REGEX,
  ET_ALPHABET_WITHSPACE_REGEX,
} from "src/app/common/constants/consts";
import { AnnualBudgetNewCloser } from "../../../../shared/models/setting-model";
import { TradeExecutionSettingService } from "../../../../shared/services/trade-execution-setting.service";
@Component({
  selector: "app-edit-annual-budget-closer",
  templateUrl: "./edit-annual-budget-closer.component.html",
  styleUrls: ["./edit-annual-budget-closer.component.scss"],
})
export class EditAnnualBudgetCloserComponent implements OnInit {
  formAnnualBudgetCloser: FormGroup;
  annualBudgetCloserId = 0;
  currentLang = "";
  isNews: boolean;

  constructor(
    private accountService: AccountService,
    private registerService: TradeExecutionSettingService,
    private toaster: ToastrService,
    public dialogRef: MatDialogRef<EditAnnualBudgetCloserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private configService: ConfigurationService,
    private formBuilder: FormBuilder,
    private translationLoaderService: TranslationLoaderService,
    private translate: TranslateService
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.createAnnualBudget();
  }

  ngOnInit() {
    if (!this.data.isNew) {
      this.annualBudgetCloserId = this.data.annualBudgetCloserId;
      this.editAnnualBudgetCloser(this.annualBudgetCloserId);
    }
  }
  private createAnnualBudget() {
    this.formAnnualBudgetCloser = this.formBuilder.group({
      DescriptionAmh: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(ET_ALPHABET_WITHSPACE_REGEX),
        ]),
      ],
      DescriptionEng: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(ALPHABET_WITHSPACE_REGEX),
        ]),
      ],
      EndDate: ["", Validators.compose([Validators.required])],
      StartDate: ["", Validators.compose([Validators.required])],
    });
  }
  get DescriptionAmh() {
    return this.formAnnualBudgetCloser.get("DescriptionAmh");
  }

  get DescriptionEng() {
    return this.formAnnualBudgetCloser.get("DescriptionEng");
  }

  get EndDate() {
    return this.formAnnualBudgetCloser.get("EndDate");
  }

  get StartDate() {
    return this.formAnnualBudgetCloser.get("StartDate");
  }
  private getEditAnnualBudgetCloser(): AnnualBudgetNewCloser {
    const formData = this.formAnnualBudgetCloser.getRawValue();
    const annualBudet = new AnnualBudgetNewCloser();
    annualBudet.AnnualBudgetCloserId = this.annualBudgetCloserId;
    annualBudet.DescriptionAmh = formData.DescriptionAmh;
    annualBudet.DescriptionEng = formData.DescriptionEng;
    annualBudet.EndDate = new DatePipe("en").transform(
      formData.EndDate,
      "yyyy/MM/dd"
    );
    annualBudet.StartDate = new DatePipe("en").transform(
      formData.StartDate,
      "yyyy/MM/dd"
    );
    return annualBudet;
  }

  onSubmit() {
    const postData = this.getEditAnnualBudgetCloser();
    if (this.annualBudgetCloserId === 0) {
      this.registerService
        .saveAnnualBudgetCloser(postData)
        .subscribe((result) => {
          this.toaster.success(
            this.translate.instant("common.messages.Saved"),
            "",
            {
              closeButton: true,
            }
          );
          this.dialogRef.close(result);
        });
    } else {
      postData.AnnualBudgetCloserId = this.annualBudgetCloserId;
      this.registerService
        .updateAnnualBudgetCloser(postData)
        .subscribe((result) => {
          this.toaster.success(
            this.translate.instant("common.messages.UpdateSuccess"),
            "",
            {
              closeButton: true,
            }
          );
          this.dialogRef.close(result);
        });
    }
  }
  editAnnualBudgetCloser(annualBudget: number) {
    this.annualBudgetCloserId = annualBudget;
    this.registerService
      .getAnnualBudgetCloserId(annualBudget)
      .subscribe((result) => {
        this.formAnnualBudgetCloser.patchValue(result);
      });
  }

  get IsEdit(): any {
    return this.data.isNew ? (this.isNews = true) : (this.isNews = false);
  }
}
