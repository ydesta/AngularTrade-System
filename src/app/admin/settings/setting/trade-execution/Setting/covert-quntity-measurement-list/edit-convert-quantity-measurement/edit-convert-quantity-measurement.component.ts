import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { Permission } from "src/@custor/models/permission.model";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { AccountService } from "src/@custor/services/security/account.service";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { NUMERIC_WITHPERIOD_REGEX } from "src/app/common/constants/consts";
import { StaticData } from "src/app/common/models/static-data.model";
import { ConvertingQuantityMeasurement } from "../../../../shared/models/setting-model";
import { TradeExecutionSettingService } from "../../../../shared/services/trade-execution-setting.service";
import { locale as langEnglish } from "../../../../../../lang/en";
import { locale as langEthiopic } from "../../../../../../lang/et";
@Component({
  selector: "app-edit-convert-quantity-measurement",
  templateUrl: "./edit-convert-quantity-measurement.component.html",
  styleUrls: ["./edit-convert-quantity-measurement.component.scss"],
})
export class EditConvertQuantityMeasurementComponent implements OnInit {
  convertingQuantityForm: FormGroup;
  currentLang = "";
  commudityList: StaticData[];
  id = 0;
  isNews: boolean;
  constructor(
    private accountService: AccountService,
    private registerService: TradeExecutionSettingService,
    private toaster: ToastrService,
    configService: ConfigurationService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditConvertQuantityMeasurementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private translationLoaderService: TranslationLoaderService,
    private translate: TranslateService
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.createConvertingQuantity();
  }

  ngOnInit() {
    if (!this.data.isNew) {
      this.id = this.data.Id;
      this.editConvertingQuan(this.id);
    }
    this.getCommudityList();
  }
  private createConvertingQuantity() {
    this.convertingQuantityForm = this.formBuilder.group({
      CommodityId: ["", Validators.compose([Validators.required])],
      Qunital: [
        0,
        Validators.compose([
          Validators.required,
          Validators.min(0),
          Validators.pattern(NUMERIC_WITHPERIOD_REGEX),
        ]),
      ],

      KiloGram: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern(NUMERIC_WITHPERIOD_REGEX),
        ],
      ],
    });
  }

  get CommodityId() {
    return this.convertingQuantityForm.get("CommodityId");
  }

  get Qunital() {
    return this.convertingQuantityForm.get("Qunital");
  }

  get KiloGram() {
    return this.convertingQuantityForm.get("KiloGram");
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
  private getEditConverting(): ConvertingQuantityMeasurement {
    const formData = this.convertingQuantityForm.getRawValue();
    const converting = new ConvertingQuantityMeasurement();
    converting.Id = this.id;
    converting.CommodityId = formData.CommodityId;
    converting.Lot = 1;
    converting.Qunital = formData.Qunital;
    converting.KiloGram = formData.KiloGram;
    return converting;
  }
  onSubmit() {
    const postData = this.getEditConverting();
    if (this.id === 0) {
      this.registerService
        .saveConvertingQuan(this.getEditConverting())
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
      postData.Id = this.id;
      this.registerService
        .updateConvertingQuan(postData)
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

  private getCommudityList() {
    this.registerService.getCommudityList(this.currentLang).subscribe((res) => {
      this.commudityList = res;
    });
  }

  editConvertingQuan(id: number) {
    this.registerService.getConveringQuantityById(id).subscribe((result) => {
      this.convertingQuantityForm.patchValue(result);
    });
  }
  get IsEdit(): any {
    return this.data.isNew ? (this.isNews = true) : (this.isNews = false);
  }
}
