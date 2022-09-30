import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
//import {RegisterTradeService} from "../../shared/services/register-trade.service";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { ConfigurationService } from "../../../../../../../../@custor/services/configuration.service";
import { TranslationLoaderService } from "../../../../../../../../@custor/services/translation-loader.service";
import { locale as langEnglish } from "../../../../../../lang/en";
import { locale as langEthiopic } from "../../../../../../lang/et";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AccountService } from "src/@custor/services/security/account.service";
import { Permission } from "src/@custor/models/permission.model";
import { MonthList } from "src/app/admin/settings/model/report.model";
import { DatePipe } from "@angular/common";
import { TradeExecutionSettingService } from "../../../../shared/services/trade-execution-setting.service";
import {
  ET_ALPHABET_WITHSPACE_REGEX,
  ALPHABET_WITHSPACE_REGEX,
} from "src/app/common/constants/consts";
import { ReportPeriod } from "../../../../shared/models/setting-model";

@Component({
  selector: "app-edit-report-period",
  templateUrl: "./edit-report-period.component.html",
  styleUrls: ["./edit-report-period.component.scss"],
})
export class EditReportPeriodComponent implements OnInit {
  @ViewChild("form", { static: false })
  isNews: boolean;
  formReportPeriod: FormGroup;
  reportPeriodId = 0;
  currentLang = "";
  dataSource: any;
  expandClose: boolean = false;
  ReportPeriodId: number = 0;

  monthList: MonthList[] = [
    { Value: 1, Eng: "January", Amh: "ጥር" },
    { Value: 2, Eng: "February", Amh: "የካቲት" },
    { Value: 3, Eng: "March", Amh: "መጋቢት" },
    { Value: 4, Eng: "April", Amh: "ሚያዚያ" },
    { Value: 5, Eng: "May", Amh: "ግንቦት" },
    { Value: 6, Eng: "June", Amh: "ሰኔ" },
    { Value: 7, Eng: "July", Amh: "ሐምሌ" },
    { Value: 8, Eng: "August", Amh: "ነሐሴ" },
    { Value: 9, Eng: "September", Amh: "መስከረም" },
    { Value: 10, Eng: "October", Amh: "ጥቅምት" },
    { Value: 11, Eng: "November", Amh: "ኅዳር" },
    { Value: 12, Eng: "December", Amh: "ታሕሣስ" },
  ];

  constructor(
    private accountService: AccountService,
    private registerService: TradeExecutionSettingService,
    private toaster: ToastrService,
    private configService: ConfigurationService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditReportPeriodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private translationLoaderService: TranslationLoaderService,
    private translate: TranslateService
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.createReportPeriod();
    this.expandClose = false;
  }

  ngOnInit() {
    if (!this.data.isNew) {
      this.reportPeriodId = this.data.ReportPeriodId;
      this.editReportPeriod(this.data.ReportPeriodId);
    }
  }

  private createReportPeriod() {
    this.formReportPeriod = this.formBuilder.group({
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
      DeadLine: ["", Validators.compose([Validators.required])],
      StartDate: ["", Validators.compose([Validators.required])],
      StartMonthAmh: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(ET_ALPHABET_WITHSPACE_REGEX),
        ]),
      ],
      StartMonthEng: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(ALPHABET_WITHSPACE_REGEX),
        ]),
      ],
      EndMonthAmh: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(ET_ALPHABET_WITHSPACE_REGEX),
        ]),
      ],
      EndMonthEng: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(ALPHABET_WITHSPACE_REGEX),
        ]),
      ],
    });
  }
  cancelEditOperation() {
    this.resetEdit();
    this.clearForm();
    this.expandClose = false;
  }
  private resetEdit() {
    this.reportPeriodId = 0;
  }

  get DescriptionAmh() {
    return this.formReportPeriod.get("DescriptionAmh");
  }

  get DescriptionEng() {
    return this.formReportPeriod.get("DescriptionEng");
  }

  get DeadLine() {
    return this.formReportPeriod.get("DeadLine");
  }

  get StartDate() {
    return this.formReportPeriod.get("StartDate");
  }

  get StartMonthAmh() {
    return this.formReportPeriod.get("StartMonthAmh");
  }

  get StartMonthEng() {
    return this.formReportPeriod.get("StartMonthEng");
  }

  get EndMonthAmh() {
    return this.formReportPeriod.get("EndMonthAmh");
  }

  get EndMonthEng() {
    return this.formReportPeriod.get("EndMonthEng");
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
  private getEditReportPeriod(): ReportPeriod {
    const formData = this.formReportPeriod.getRawValue();
    const reportPeriod = new ReportPeriod();
    reportPeriod.ReportPeriodId = this.reportPeriodId;
    reportPeriod.DescriptionAmh = formData.DescriptionAmh;
    reportPeriod.DescriptionEng = formData.DescriptionEng;
    reportPeriod.DeadLine = new DatePipe("en").transform(
      formData.DeadLine,
      "yyyy/MM/dd"
    );
    reportPeriod.StartDate = new DatePipe("en").transform(
      formData.StartDate,
      "yyyy/MM/dd"
    );
    reportPeriod.StartMonthAmh = formData.StartMonthAmh;
    reportPeriod.StartMonthEng = formData.StartMonthEng;
    reportPeriod.EndMonthAmh = formData.EndMonthAmh;
    reportPeriod.EndMonthEng = formData.EndMonthEng;
    return reportPeriod;
  }

  onSubmit() {
    const postData = this.getEditReportPeriod();
    if (this.reportPeriodId === 0) {
      this.registerService
        .saveReportPeriod(this.getEditReportPeriod())
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
      this.expandClose = false;
    } else {
      postData.ReportPeriodId = this.reportPeriodId;
      this.registerService.updateReportPeriod(postData).subscribe((result) => {
        this.toaster.success(
          this.translate.instant("common.messages.UpdateSuccess"),
          "",
          {
            closeButton: true,
          }
        );
        this.dialogRef.close(result);
      });
      this.expandClose = false;
    }
  }

  public clearForm() {
    this.createReportPeriod();
  }

  editReportPeriod(reportPeriod: number) {
    this.reportPeriodId = reportPeriod;
    this.registerService
      .getReportPeriodById(reportPeriod)
      .subscribe((result) => {
        this.formReportPeriod.patchValue(result);
      });
    this.expandClose = true;
  }
  get IsEdit(): any {
    return this.data.isNew ? (this.isNews = true) : (this.isNews = false);
  }
}
