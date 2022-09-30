import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { TranslateService } from "@ngx-translate/core";
import { RegisterTradeService } from "src/app/main/components/register-trade/shared/services/register-trade.service";
import { AccountService } from "src/@custor/services/security/account.service";
import { Permission } from "src/@custor/models/permission.model";
import { StaticData2 } from "src/app/common/models/static-data.model";

import { locale as langEnglish } from "../../../../../../lang/en";
import { locale as langEthiopic } from "../../../../../../lang/et";
import { ALPHABET_WITHNUMERIC_REGEX } from "src/app/common/constants/consts";
import { CommodityType } from "../../../../shared/models/setting-model";
import { TradeExecutionSettingService } from "../../../../shared/services/trade-execution-setting.service";
@Component({
  selector: "app-edit-commodity-type",
  templateUrl: "./edit-commodity-type.component.html",
  styleUrls: ["./edit-commodity-type.component.scss"],
})
export class EditCommodityTypeComponent implements OnInit {
  commodityTypeForm: FormGroup;
  currentLang = "";
  commodityTypeId = 0;
  commudityList: StaticData2[];
  isNews: boolean;

  constructor(
    private accountService: AccountService,
    private registerService: TradeExecutionSettingService,
    private toaster: ToastrService,
    private configService: ConfigurationService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditCommodityTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private translationLoaderService: TranslationLoaderService,
    private translate: TranslateService
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.createCommodityType();
  }

  ngOnInit() {
    if (!this.data.isNew) {
      this.commodityTypeId = this.data.commodityTypeId;
      this.editCommodityType(this.commodityTypeId);
    }
    this.getCommudityList();
  }

  private createCommodityType() {
    this.commodityTypeForm = this.formBuilder.group({
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
      CommodityId: ["", Validators.compose([Validators.required])],
    });
  }

  get DescriptionAmh() {
    return this.commodityTypeForm.get("DescriptionAmh");
  }

  get DescriptionEng() {
    return this.commodityTypeForm.get("DescriptionEng");
  }

  get CommodityId() {
    return this.commodityTypeForm.get("CommodityId");
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
  private getEditCommodityType(): CommodityType {
    const formData = this.commodityTypeForm.getRawValue();
    const commodityType = new CommodityType();
    commodityType.CommodityTypeId = this.commodityTypeId;
    commodityType.DescriptionAmh = formData.DescriptionAmh;
    commodityType.DescriptionEng = formData.DescriptionEng;
    commodityType.CommodityId = formData.CommodityId;
    return commodityType;
  }

  onSubmit() {
    const postData = this.getEditCommodityType();
    if (this.commodityTypeId === 0) {
      this.registerService
        .saveCommudityType(this.getEditCommodityType())
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
      postData.CommodityTypeId = this.commodityTypeId;
      this.registerService.updateCommodityType(postData).subscribe((result) => {
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

  editCommodityType(commodity: number) {
    this.registerService.getCommodityTypeById(commodity).subscribe((result) => {
      this.commodityTypeForm.patchValue(result);
    });
  }
  get IsEdit(): any {
    return this.data.isNew ? (this.isNews = true) : (this.isNews = false);
  }
}
