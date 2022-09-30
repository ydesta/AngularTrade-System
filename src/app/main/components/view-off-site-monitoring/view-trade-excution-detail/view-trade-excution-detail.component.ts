import { Component, Inject, OnInit } from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  StaticData,
  StaticData2,
  StaticData5,
  StaticData6,
} from "src/app/common/models/static-data.model";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { locale as langEnglish } from "../../../lang/en";
import { locale as langEthiopic } from "../../../lang/et";
import {
  TRADEEXCUTIONREPORT,
  TRADETYPE,
  WAREHOUSE,
} from "src/app/common/constants/consts";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { AuthService } from "src/@custor/services/security/auth.service";
import { DataSharingService } from "src/app/admin/settings/setting/shared/services/dataSharingService";
import { RegisterTradeMessageService } from "src/app/admin/settings/setting/shared/services/registerTrade-message.service";
import { RegisterTradeService } from "../../register-trade/shared/services/register-trade.service";
import { RegisterTradeDetailModel } from "../../register-trade/shared/models/register-trade-model";

@Component({
  selector: "app-view-trade-excution-detail",
  templateUrl: "./view-trade-excution-detail.component.html",
  styleUrls: ["./view-trade-excution-detail.component.scss"],
})
export class ViewTradeExcutionDetailComponent implements OnInit {
  formTardeExcutionDetail: FormGroup;
  commudityList: StaticData2[];
  commidityTypeList: StaticData2[];
  commodityGradeList: StaticData2[];
  tradeTypeList: StaticData[] = [];
  tradeExcutionReportList: StaticData[] = [];
  clientInformatiomList: StaticData5[];
  unitMeasurementList: StaticData[] = [];
  floorReperesentative: StaticData6[] = [];
  clientName = 0;
  memberTradeEcutionDetailId: number;
  tradeDetailModel: RegisterTradeDetailModel;
  currentLang = "";
  tradeSource: any;
  private userId: string;
  tradeExcutionDetail: RegisterTradeDetailModel;
  warehouseList: StaticData[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private registerTradeMessageService: RegisterTradeMessageService,
    private toaster: ToastrService,
    private translationLoaderService: TranslationLoaderService,
    private dataSharingService: DataSharingService,
    private configService: ConfigurationService,
    private registerTradeService: RegisterTradeService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    private authService: AuthService
  ) {
    this.currentLang = this.configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.createFormGroup();
  }

  ngOnInit() {
    this.formTardeExcutionDetail
      .get("TradeExcutionReport")
      .valueChanges.subscribe((res) => {
        this.clientName = res;
      });
    this.registerTradeMessageService.currentMessage.subscribe((msg) => {
      this.memberTradeEcutionDetailId = msg;
    });
    if (this.data.MemberClientTradeDetailId !== 0) {
      this.getTradeExcutionDetailById(this.data.MemberClientTradeDetailId);
    }
    if (this.data.ExchangeActorId != null) {
      this.getFloorRepresentative(this.data.ExchangeActorId);
    }
    this.getCommudityList();
    this.initStaticData();
    this.getClientInformatin(this.data.ExchangeActorId);
    this.getUnitMeasurementList();
    this.tradeExcutionReport();
    this.wareHouseLists();
    this.formTardeExcutionDetail.disable();
  }

  private createFormGroup() {
    this.formTardeExcutionDetail = this.formBuilder.group({
      MemberClientInformationId: [null],
      TradeTypeId: [null],
      TradeDate: [null],
      OwnerManagerId: [null],
      UnitMeasurementId: [null],
      TradeExcutionReport: [null],
      CommudityTypeId: [null],
      CommodityGradeId: [
        "",
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
      CommodityId: [null],
      Quantity: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^(0|[1-9][0-9]*)$"),
        ],
      ],
      UnitPrice: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^(0|[1-9][0-9]*)$"),
        ],
      ],
      OrderPrice: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^(0|[1-9][0-9]*)$"),
        ],
      ],
      CommissionInPrice: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^(0|[1-9][0-9]*)$"),
        ],
      ],
      WarehouseId: ["", Validators.compose([Validators.required])],
      MemberTradeRemark: [null, [Validators.required]],
      ClientTradeRemark: [null, [Validators.required]],
    });
  }

  private getEditRegisterTrade(): RegisterTradeDetailModel {
    const formModel = this.formTardeExcutionDetail.getRawValue();
    const registerTradeDetail = new RegisterTradeDetailModel();

    registerTradeDetail.MemberClientTradeDetailId = 0;
    registerTradeDetail.MemberClientTradeId = this.data.MemberClientTradeId;
    registerTradeDetail.MemberClientInformationId =
      formModel.MemberClientInformationId;

    registerTradeDetail.CommodityId = formModel.CommodityId;
    registerTradeDetail.CommudityTypeId = formModel.CommudityTypeId;
    registerTradeDetail.CommodityGradeId = formModel.CommodityGradeId;

    registerTradeDetail.Quantity = formModel.Quantity;
    registerTradeDetail.UnitPrice = formModel.UnitPrice;
    registerTradeDetail.OrderPrice = formModel.OrderPrice;
    registerTradeDetail.CommissionInPrice = formModel.CommissionInPrice;

    registerTradeDetail.TradeTypeId = formModel.TradeTypeId;
    registerTradeDetail.TradeDate = formModel.TradeDate;

    registerTradeDetail.MemberTradeRemark = formModel.MemberTradeRemark;
    registerTradeDetail.ClientTradeRemark = formModel.ClientTradeRemark;
    registerTradeDetail.WarehouseId = formModel.WarehouseId;
    registerTradeDetail.OwnerManagerId = formModel.OwnerManagerId;
    registerTradeDetail.UnitMeasurementId = formModel.UnitMeasurementId;
    registerTradeDetail.TradeExcutionReport = formModel.TradeExcutionReport;
    (registerTradeDetail.IsActive = true),
      (registerTradeDetail.IsDeleted = false),
      (registerTradeDetail.CreatedDateTime = new Date()),
      (registerTradeDetail.CreatedUserId = this.userId),
      (registerTradeDetail.UpdatedDateTime = new Date()),
      (registerTradeDetail.UpdatedUserId = this.userId);
    return registerTradeDetail;
  }

  onClose() {
    this.dialogRef.close();
  }

  private getCommudityType(commodityId: number) {
    this.registerTradeService
      .getCommudityType(commodityId, this.currentLang)
      .subscribe((res) => {
        this.commidityTypeList = res;
      });
  }

  private getCommudityList() {
    this.registerTradeService
      .getCommudityList(this.currentLang)
      .subscribe((res) => {
        this.commudityList = res;
      });
  }

  private getUnitMeasurementList() {
    this.registerTradeService
      .getUnitMeasurementList(this.currentLang)
      .subscribe((result) => {
        this.unitMeasurementList = result;
      });
  }

  private getCommudityGrade(commodityTypeId: number) {
    this.registerTradeService
      .getCommudityGradeList(commodityTypeId, this.currentLang)
      .subscribe((res) => {
        this.commodityGradeList = res;
      });
  }

  private getFloorRepresentative(customerId: string) {
    this.registerTradeService
      .getCustomerLegalBodyList(customerId, this.currentLang)
      .subscribe((res) => {
        this.floorReperesentative = res;
      });
  }

  private initStaticData() {
    const lang = this.currentLang;
    let tradeType: StaticData = new StaticData();
    TRADETYPE.forEach((pair) => {
      tradeType = {
        Id: pair.Id,
        Description: lang === "et" ? pair.Description : pair.DescriptionEnglish,
      };
      this.tradeTypeList.push(tradeType);
    });
  }

  private getClientInformatin(cutomerId: string) {
    this.registerTradeService
      .getClientInformationList(cutomerId, this.currentLang)
      .subscribe((result) => {
        this.clientInformatiomList = result;
      });
  }

  private tradeExcutionReport() {
    const lang = this.currentLang;
    let tradeExcution: StaticData = new StaticData();
    TRADEEXCUTIONREPORT.forEach((pair) => {
      tradeExcution = {
        Id: pair.Id,
        Description: lang === "et" ? pair.Description : pair.DescriptionEnglish,
      };
      this.tradeExcutionReportList.push(tradeExcution);
    });
  }

  getTradeExcutionDetailById(tradeExcutionDetailById: number) {
    this.registerTradeService
      .getTradeExcutionDetailById(tradeExcutionDetailById)
      .subscribe((res) => {
        this.tradeExcutionDetail = res;
        this.registerTradeService
          .getCommudityType(
            this.tradeExcutionDetail.CommodityId,
            this.currentLang
          )
          .subscribe((commodityId) => {
            (this.commidityTypeList = commodityId),
              this.registerTradeService
                .getCommudityGradeList(
                  this.tradeExcutionDetail.CommudityTypeId,
                  this.currentLang
                )
                .subscribe((commodityGradeId) => {
                  this.commodityGradeList = commodityGradeId;
                  this.registerTradeService
                    .getCustomerLegalBodyList(
                      this.data.ExchangeActorId,
                      this.currentLang
                    )
                    .subscribe((ownerId) => {
                      this.floorReperesentative = ownerId;
                    });
                  this.formTardeExcutionDetail.patchValue(res);
                });
          });
      });
  }
  private wareHouseLists() {
    const lang = this.currentLang;
    let warehouse: StaticData = new StaticData();
    WAREHOUSE.forEach((pair) => {
      warehouse = {
        Id: pair.Id,
        Description: lang === "et" ? pair.Description : pair.DescriptionEnglish,
      };
      this.warehouseList.push(warehouse);
    });
  }
}
