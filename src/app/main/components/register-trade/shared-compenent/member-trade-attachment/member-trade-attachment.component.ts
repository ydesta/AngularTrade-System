import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { RegisterTradeService } from "../../shared/services/register-trade.service";
import { TradeAttachmentDialogModel } from "../../shared/models/member-trade-upload-model";
import { DataSharingService } from "../../shared/services/dataSharingService";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { StaticData } from "src/app/common/models/static-data.model";
import { locale as langEnglish } from "src/app/main/lang/en";
import { locale as langEthiopic } from "src/app/main/lang/et";
import { ConfigurationService } from "../../../../../../@custor/services/configuration.service";
import { TranslationLoaderService } from "../../../../../../@custor/services/translation-loader.service";
import { AUDITORS } from "src/app/common/constants/consts";

@Component({
  selector: "app-member-trade-attachment",
  templateUrl: "./member-trade-attachment.component.html",
  styleUrls: ["./member-trade-attachment.component.scss"],
})
export class MemberTradeAttachmentComponent implements OnInit {
  form: FormGroup;
  fileName = [];
  currentLang = "";
  auditorList: StaticData[] = [];
  @ViewChild("fileInput", { static: false }) fileInput: any;
  dialogModel: TradeAttachmentDialogModel;
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
    private dataSharingService: DataSharingService
  ) {
    this.currentLang = this.configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.form = this.createFormGroup(fb);
  }

  ngOnInit() {
    this.getIndependenceAuditors();
  }

  createFormGroup(fb: FormBuilder) {
    return fb.group({
      AttachmentContent: [null, [Validators.required]],
      SelectedWord: [null],
      ActualFile: [null],
      AuditorId: [null],
    });
  }
  deleteImages() {
    var index = this.urls.indexOf(this.fileName);
    this.urls.splice(index, 1);
    this.allFiles.splice(index, 1);
  }
  addFiles() {
    this.fileInput.nativeElement.click();
  }

  onFilesAdded() {
    const nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    if (nativeElement && nativeElement.files[0].size > 0) {
      this.fileName = this.fileInput.nativeElement.files[0].name;
      this.form.patchValue({
        ActualFile: nativeElement.files[0],
      });
    }
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
  saveAttachment() {
    const formModel = this.form.value;
    const formData = new FormData();
    formData.append("AttachmentContent", formModel.AttachmentContent);
    formData.append("SelectedWord", formModel.SelectedWord);
    for (var i = 0; i < this.allFiles.length; i++) {
      formData.append("ActualFile", this.allFiles[i]);
    }
    // formData.append("ActualFile", formModel.ActualFile);
    formData.append("ParentId", "204");
    formData.append("AuditorId", formModel.AuditorId);
    this.registerService
      .uploadMemberTradeAttachment(formData)
      .subscribe((result) => {
        this.toaster.success(
          this.translate.instant("common.messages.Saved"),
          "",
          {
            closeButton: true,
          }
        );
        this.dataSharingService.valueAdd.next(result);
        this.dialogRef.close({ result });
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getIndependenceAuditors() {
    const lang = this.currentLang;
    let warehouse: StaticData = new StaticData();
    AUDITORS.forEach((pair) => {
      warehouse = {
        Id: pair.Id,
        Description: lang === "et" ? pair.Description : pair.DescriptionEnglish,
      };
      this.auditorList.push(warehouse);
    });
  }
}
