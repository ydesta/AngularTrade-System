import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { TranslateService } from "@ngx-translate/core";
import { TradeExecutionSettingService } from "../../../../shared/services/trade-execution-setting.service";
import { StaticData2 } from "src/app/common/models/static-data.model";
import { locale as langEnglish } from "../../../../../../lang/en";
import { locale as langEthiopic } from "../../../../../../lang/et";
import { ReportType } from "../../../../shared/models/setting-model";
import { ALPHABET_WITHNUMERIC_REGEX } from "src/app/common/constants/consts";

@Component({
  selector: "app-edit-report-type",
  templateUrl: "./edit-report-type.component.html",
  styleUrls: ["./edit-report-type.component.scss"],
})
export class EditReportTypeComponent implements OnInit {
  ReportTypeForm: FormGroup;
  currentLang = "";
  ReportTypeId = 0;
  ReportList: StaticData2[];
  isNews: boolean;

  constructor(
    private registerService: TradeExecutionSettingService,
    private toaster: ToastrService,
    public dialogRef: MatDialogRef<EditReportTypeComponent>,
    private configService: ConfigurationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private translationLoaderService: TranslationLoaderService,
    private translate: TranslateService
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.createReportType();
  }

  ngOnInit() {
    if (!this.data.isNew) {
      this.ReportTypeId = this.data.ReportTypeId;
      this.editReportType(this.ReportTypeId);
    }
  }

  private createReportType() {
    this.ReportTypeForm = this.formBuilder.group({
      DescriptionAmh: [
        "",
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      DescriptionEng: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(ALPHABET_WITHNUMERIC_REGEX),
        ]),
      ],
    });
  }

  get DescriptionAmh() {
    return this.ReportTypeForm.get("DescriptionAmh");
  }

  get DescriptionEng() {
    return this.ReportTypeForm.get("DescriptionEng");
  }

  get CommodityId() {
    return this.ReportTypeForm.get("CommodityId");
  }

  private getEditReportType(): ReportType {
    const formData = this.ReportTypeForm.getRawValue();
    const ReportTypes = new ReportType();
    ReportTypes.ReportTypeId = this.ReportTypeId;
    ReportTypes.DescriptionAmh = formData.DescriptionAmh;
    ReportTypes.DescriptionEng = formData.DescriptionEng;
    return ReportTypes;
  }

  onSubmit() {
    const postData = this.getEditReportType();
    if (this.ReportTypeId === 0) {
      this.registerService
        .SaveReportType(this.getEditReportType())
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
      postData.ReportTypeId = this.ReportTypeId;
      this.registerService.updateReportType(postData).subscribe((result) => {
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

  editReportType(reporttypeid: number) {
    this.ReportTypeId = reporttypeid;
    this.registerService
      .getReportTypeById(this.ReportTypeId)
      .subscribe((result) => {
        this.ReportTypeForm.patchValue(result);
      });
  }

  get IsEdit(): any {
    return this.data.isNew ? (this.isNews = true) : (this.isNews = false);
  }
}
