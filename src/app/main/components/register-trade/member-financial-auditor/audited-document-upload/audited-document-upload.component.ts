import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { StaticData } from "src/app/common/models/static-data.model";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { DataSharingService } from "src/app/admin/settings/setting/shared/services/dataSharingService";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { RegisterTradeService } from "../../shared/services/register-trade.service";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { locale as langEnglish } from "src/app/main/components/register-trade/lang/en";
import { locale as langEthiopic } from "src/app/main/components/register-trade/lang/et";
import { AnnualAuditReportService } from "../../shared/services/annual-audit-report.service";

@Component({
  selector: "app-audited-document-upload",
  templateUrl: "./audited-document-upload.component.html",
  styleUrls: ["./audited-document-upload.component.scss"],
})
export class AuditedDocumentUploadComponent implements OnInit {
  form: FormGroup;
  fileName = [];
  currentLang = "";
  auditorList: StaticData[] = [];
  @ViewChild("fileInput", { static: false }) fileInput: any;
  urls = [];
  allFiles: string[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    fb: FormBuilder,
    private configService: ConfigurationService,
    private translationLoaderService: TranslationLoaderService,
    private registerService: RegisterTradeService,
    private toaster: ToastrService,
    private translate: TranslateService,
    private registerTradeMessageService: AnnualAuditReportService
  ) {
    this.currentLang = this.configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.form = this.createFormGroup(fb);
  }

  ngOnInit() {}
  private createFormGroup(fb: FormBuilder) {
    return fb.group({
      ActualFile: ["", Validators.required],
    });
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
      if (/\.(pdf)$/i.test(filesAmount[0].name.toLocaleLowerCase()) === false) {
        this.toaster.error(
          "Only files with .xls or .xlsx extension are allowed",
          "Error"
        );
        return;
      }
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
  saveAttachment() {
    const formData = new FormData();
    formData.append(
      "MemberFinancialAuditorId",
      this.data.MemberFinancialAuditorId
    );
    formData.append("ExchangeActorId", this.data.ExchangeActorId);
    formData.append("Ecxcode", this.data.Ecxcode);
    formData.append("AnnualBudgetCloserId", this.data.AnnualBudgetCloserId);
    formData.append("Remark", this.data.Remark);
    formData.append("Year", this.data.Year);
    formData.append("CustomerTypeId", this.data.CustomerTypeId);
    formData.append("ReportTypeId", this.data.ReportTypeId);
    formData.append("ReportPeriodId", this.data.ReportPeriodId);
    // formData.append("ReportDate", this.data.ReportDate);
    formData.append("Status", this.data.Status);
    formData.append(
      "TradeExcutionStatusTypeId",
      this.data.TradeExcutionStatusTypeId
    );
    for (var i = 0; i < this.allFiles.length; i++) {
      formData.append("ActualFile", this.allFiles[i]);
    }
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
          //  this.dataSharingService.valueAdd.next(res);
          this.registerTradeMessageService.sendMessage(res);
          this.dialogRef.close();
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
    this.dialogRef.close();
  }
}
