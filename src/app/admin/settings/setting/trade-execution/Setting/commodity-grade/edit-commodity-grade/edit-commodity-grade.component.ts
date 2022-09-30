import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { TranslateService } from "@ngx-translate/core";
import { Permission } from "src/@custor/models/permission.model";
import { AccountService } from "src/@custor/services/security/account.service";
import {
  StaticData,
  StaticData2,
} from "src/app/common/models/static-data.model";
import { locale as langEnglish } from "../../../../../../lang/en";
import { locale as langEthiopic } from "../../../../../../lang/et";
import { TradeExecutionSettingService } from "../../../../shared/services/trade-execution-setting.service";
import { ALPHABET_WITHNUMERIC_REGEX } from "src/app/common/constants/consts";
import { CommodityGrade } from "../../../../shared/models/setting-model";
@Component({
  selector: "app-edit-commodity-grade",
  templateUrl: "./edit-commodity-grade.component.html",
  styleUrls: ["./edit-commodity-grade.component.scss"],
})
export class EditCommodityGradeComponent implements OnInit {
  commodityGradeForm: FormGroup;
  currentLang = "";
  commodityGradeId = 0;
  commudityList: StaticData[];
  commidityTypeList: StaticData2[];
  isNews: boolean;

  constructor(
    private accountService: AccountService,
    private registerService: TradeExecutionSettingService,
    private toaster: ToastrService,
    private configService: ConfigurationService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditCommodityGradeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private translationLoaderService: TranslationLoaderService,
    private translate: TranslateService
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.createCommodityGrade();
  }

  ngOnInit() {
    if (!this.data.isNew) {
      this.commodityGradeId = this.data.commodityGradeId;
      this.editCommodityGrade(this.commodityGradeId);
    }
    this.getCommudityList();
  }

  private createCommodityGrade() {
    this.commodityGradeForm = this.formBuilder.group({
      CommodityId: ["", Validators.compose([Validators.required])],
      DescriptionAmh: [
        "",
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      DescriptoinEng: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(ALPHABET_WITHNUMERIC_REGEX),
        ]),
      ],
      CommodityTypeId: ["", Validators.compose([Validators.required])],
    });
  }

  get DescriptionAmh() {
    return this.commodityGradeForm.get("DescriptionAmh");
  }

  get DescriptoinEng() {
    return this.commodityGradeForm.get("DescriptoinEng");
  }

  get CommodityTypeId() {
    return this.commodityGradeForm.get("CommodityTypeId");
  }

  get CommodityId() {
    return this.commodityGradeForm.get("CommodityId");
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

  private getEditCommodityGrade(): CommodityGrade {
    const formData = this.commodityGradeForm.getRawValue();
    const commodityGrade = new CommodityGrade();
    commodityGrade.CommodityGradeId = this.commodityGradeId;
    commodityGrade.DescriptionAmh = formData.DescriptionAmh;
    commodityGrade.DescriptoinEng = formData.DescriptoinEng;
    commodityGrade.CommodityTypeId = formData.CommodityTypeId;
    return commodityGrade;
  }

  onSubmit() {
    const postData = this.getEditCommodityGrade();
    if (this.commodityGradeId === 0) {
      this.registerService
        .saveCommudityGrade(this.getEditCommodityGrade())
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
      postData.CommodityGradeId = this.commodityGradeId;
      this.registerService
        .updateCommodityGrade(postData)
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

  public getCommudityList() {
    this.registerService.getCommudityList(this.currentLang).subscribe((res) => {
      this.commudityList = res;
    });
  }

  public getCommudityType(commodityId: number) {
    this.registerService
      .getCommudityTypess(commodityId, this.currentLang)
      .subscribe((res) => {
        this.commidityTypeList = res;
      });
  }

  editCommodityGrade(commodity: number) {
    this.registerService
      .getCommodityGradeByIda(commodity, this.currentLang)
      .subscribe((result) => {
        this.commodityGradeForm.patchValue(result);
      });
  }

  get IsEdit(): any {
    return this.data.isNew ? (this.isNews = true) : (this.isNews = false);
  }
}
