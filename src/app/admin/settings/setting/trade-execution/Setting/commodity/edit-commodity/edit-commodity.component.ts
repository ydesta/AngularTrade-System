import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ConfigurationService } from "../../../../../../../../@custor/services/configuration.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TranslationLoaderService } from "../../../../../../../../@custor/services/translation-loader.service";
import { TranslateService } from "@ngx-translate/core";
import { locale as langEnglish } from "../../../../../../lang/en";
import { locale as langEthiopic } from "../../../../../../lang/et";

import { Permission } from "src/@custor/models/permission.model";
import { AccountService } from "src/@custor/services/security/account.service";
import { StaticData } from "src/app/common/models/static-data.model";
import { Commodity } from "../../../../shared/models/setting-model";
import {
  ET_ALPHABET_WITHSPACE_REGEX,
  ALPHABET_WITHSPACE_REGEX,
  NUMERIC_WITHPERIOD_REGEX,
} from "src/app/common/constants/consts";
import { TradeExecutionSettingService } from "../../../../shared/services/trade-execution-setting.service";

@Component({
  selector: "app-edit-commodity",
  templateUrl: "./edit-commodity.component.html",
  styleUrls: ["./edit-commodity.component.scss"],
})
export class EditCommodityComponent implements OnInit {
  commodityForm: FormGroup;
  currentLang = "";
  unitMeasurementList: StaticData[] = [];
  commodityId = 0;
  isNews: boolean;

  constructor(
    private accountService: AccountService,
    private registerService: TradeExecutionSettingService,
    private toaster: ToastrService,
    configService: ConfigurationService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditCommodityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private translationLoaderService: TranslationLoaderService,
    private translate: TranslateService
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.createCommodity();
  }

  ngOnInit() {
    if (!this.data.isNew) {
      this.commodityId = this.data.commodityId;
      this.editCommodity(this.commodityId);
    }
    this.getUnitMeasurementList();
  }

  private createCommodity() {
    this.commodityForm = this.formBuilder.group({
      DescriptionAmh: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(ET_ALPHABET_WITHSPACE_REGEX),
        ]),
      ],
      DesciptionEng: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(ALPHABET_WITHSPACE_REGEX),
        ]),
      ],
      UnitMeasurementId: ["", Validators.compose([Validators.required])],
      PriceTollerance: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern(NUMERIC_WITHPERIOD_REGEX),
        ],
      ],
      WeightedAverage: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern(NUMERIC_WITHPERIOD_REGEX),
        ],
      ],
    });
  }

  get DescriptionAmh() {
    return this.commodityForm.get("DescriptionAmh");
  }

  get DesciptionEng() {
    return this.commodityForm.get("DesciptionEng");
  }

  get UnitMeasurementId() {
    return this.commodityForm.get("UnitMeasurementId");
  }

  get PriceTollerance() {
    return this.commodityForm.get("PriceTollerance");
  }
  get WeightedAverage() {
    return this.commodityForm.get("WeightedAverage");
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
  private getEditCommodity(): Commodity {
    const formData = this.commodityForm.getRawValue();
    const commodity = new Commodity();
    commodity.CommodityId = this.commodityId;
    commodity.DescriptionAmh = formData.DescriptionAmh;
    commodity.DesciptionEng = formData.DesciptionEng;
    commodity.UnitMeasurementId = formData.UnitMeasurementId;
    commodity.PriceTollerance = formData.PriceTollerance;
    commodity.WeightedAverage = formData.WeightedAverage;
    return commodity;
  }

  onSubmit() {
    const postData = this.getEditCommodity();
    if (this.commodityId === 0) {
      this.registerService
        .saveCommudity(this.getEditCommodity())
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
      postData.CommodityId = this.commodityId;
      this.registerService.updateCommodity(postData).subscribe((result) => {
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

  private getUnitMeasurementList() {
    this.registerService
      .getUnitMeasurementList(this.currentLang)
      .subscribe((result) => {
        this.unitMeasurementList = result;
      });
  }

  editCommodity(commodity: number) {
    this.registerService.getCommodityById(commodity).subscribe((result) => {
      this.commodityForm.patchValue(result);
    });
  }
  get IsEdit(): any {
    return this.data.isNew ? (this.isNews = true) : (this.isNews = false);
  }
}
