import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ConfigurationService } from "../../../../../../../../@custor/services/configuration.service";
import { TranslationLoaderService } from "../../../../../../../../@custor/services/translation-loader.service";
import { TranslateService } from "@ngx-translate/core";
import { locale as langEnglish } from "../../../../../../lang/en";
import { locale as langEthiopic } from "../../../../../../lang/et";

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { RegisterTradeService } from "src/app/main/components/register-trade/shared/services/register-trade.service";
import { AccountService } from "src/@custor/services/security/account.service";
import { Permission } from "src/@custor/models/permission.model";
import {
  ALPHABET_WITHNUMERIC_REGEX,
  ET_ALPHABET_WITHSPACE_REGEX,
} from "src/app/common/constants/consts";
import { ClientInformationReminder } from "../../../../shared/models/setting-model";
import { TradeExecutionSettingService } from "../../../../shared/services/trade-execution-setting.service";

@Component({
  selector: "app-edit-client-information-reminder",
  templateUrl: "./edit-client-information-reminder.component.html",
  styleUrls: ["./edit-client-information-reminder.component.scss"],
})
export class EditClientInformationReminderComponent implements OnInit {
  clientInformationForm: FormGroup;
  currentLang = "";
  clientInformationId = 0;
  isNews: boolean;

  constructor(
    private registerService: TradeExecutionSettingService,
    private toaster: ToastrService,
    private configService: ConfigurationService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditClientInformationReminderComponent>,
    private translationLoaderService: TranslationLoaderService,
    private translate: TranslateService,
    private accountService: AccountService
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.createClientInformation();
  }

  ngOnInit() {
    if (!this.data.isNew) {
      this.clientInformationId = this.data.clientInformationId;
      this.editClientInformationReminder(this.clientInformationId);
    }
  }

  createClientInformation() {
    this.clientInformationForm = this.formBuilder.group({
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

  getEntryClientInformation(): ClientInformationReminder {
    const formModel = this.clientInformationForm.getRawValue();
    const clientReminder = new ClientInformationReminder();
    clientReminder.ClientInformationReminderId = this.clientInformationId;
    clientReminder.DescriptionAmh = formModel.DescriptionAmh;
    clientReminder.DescriptionEng = formModel.DescriptionEng;
    return clientReminder;
  }

  get DescriptionAmh() {
    return this.clientInformationForm.get("DescriptionAmh");
  }

  get DescriptionEng() {
    return this.clientInformationForm.get("DescriptionEng");
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
        .saveClientInformationReminder(this.getEntryClientInformation())
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
      postData.ClientInformationReminderId = this.clientInformationId;
      this.registerService
        .updateClientInformationReminder(postData)
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

  editClientInformationReminder(clientInformationId: number) {
    this.registerService
      .getClientInformationReminderById(clientInformationId)
      .subscribe((result) => {
        this.clientInformationForm.patchValue(result);
      });
  }

  get IsEdit(): any {
    return this.data.isNew ? (this.isNews = true) : (this.isNews = false);
  }
}
