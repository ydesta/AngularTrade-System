import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ConfigurationService } from "../../../../../../../../@custor/services/configuration.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TranslationLoaderService } from "../../../../../../../../@custor/services/translation-loader.service";
import { TranslateService } from "@ngx-translate/core";
import { AccountService } from "src/@custor/services/security/account.service";
import { Permission } from "src/@custor/models/permission.model";

import { locale as langEnglish } from "../../../../../../lang/en";
import { locale as langEthiopic } from "../../../../../../lang/et";
import { TradeExecutionSettingService } from "../../../../shared/services/trade-execution-setting.service";
import {
  ET_ALPHABET_WITHSPACE_REGEX,
  ALPHABET_WITHNUMERIC_REGEX,
} from "src/app/common/constants/consts";
import { FinancialReportReminder } from "../../../../shared/models/setting-model";
@Component({
  selector: "app-edit-financial-report-reminder",
  templateUrl: "./edit-financial-report-reminder.component.html",
  styleUrls: ["./edit-financial-report-reminder.component.scss"],
})
export class EditFinancialReportReminderComponent implements OnInit {
  financialReportReminderForm: FormGroup;
  currentLang = "";
  clientInformationId = 0;
  isNews: boolean;

  constructor(
    private accountService: AccountService,
    private registerService: TradeExecutionSettingService,
    private toaster: ToastrService,
    private configService: ConfigurationService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditFinancialReportReminderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private translationLoaderService: TranslationLoaderService,
    private translate: TranslateService
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.createClientInformation();
  }

  ngOnInit() {
    if (!this.data.isNew) {
      this.clientInformationId = this.data.clientInformationId;
      this.editFinancialReportReminder(this.clientInformationId);
    }
  }

  createClientInformation() {
    this.financialReportReminderForm = this.formBuilder.group({
      DescriptionAmh: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(ET_ALPHABET_WITHSPACE_REGEX),
        ]),
      ],
      DescriptionEng: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(ALPHABET_WITHNUMERIC_REGEX),
        ]),
      ],
    });
  }

  getEntryClientInformation(): FinancialReportReminder {
    const formModel = this.financialReportReminderForm.getRawValue();
    const clientReminder = new FinancialReportReminder();
    clientReminder.FinancialReportReminderId = this.clientInformationId;
    clientReminder.DescriptionAmh = formModel.DescriptionAmh;
    clientReminder.DescriptionEng = formModel.DescriptionEng;
    return clientReminder;
  }

  get DescriptionAmh() {
    return this.financialReportReminderForm.get("DescriptionAmh");
  }

  get DescriptionEng() {
    return this.financialReportReminderForm.get("DescriptionEng");
  }

  get canManageSetting() {
    return this.accountService.userHasPermission(
      Permission.manageSettingsPermission
    );
  }
  get canViewSetting() {
    return this.accountService.userHasPermission(
      Permission.viewSettingPermission
    );
  }

  onSubmit() {
    const postData = this.getEntryClientInformation();
    if (this.clientInformationId === 0) {
      this.registerService
        .saveFinancialReportReminder(this.getEntryClientInformation())
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
      postData.FinancialReportReminderId = this.clientInformationId;
      this.registerService
        .updateFinancialReportReminder(postData)
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

  editFinancialReportReminder(financialReportReminder: number) {
    this.registerService
      .getFinancialReportReminderById(financialReportReminder)
      .subscribe((result) => {
        this.financialReportReminderForm.patchValue(result);
      });
  }
  get IsEdit(): any {
    return this.data.isNew ? (this.isNews = true) : (this.isNews = false);
  }
}
