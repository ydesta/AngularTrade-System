import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
} from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { DataSharingService } from "src/app/admin/settings/setting/shared/services/dataSharingService";
import { RegisterTradeMessageService } from "src/app/admin/settings/setting/shared/services/registerTrade-message.service";
import {
  TRADETYPE,
  WAREHOUSE,
  TRADEEXCUTIONREPORT,
} from "src/app/common/constants/consts";
import {
  StaticData,
  StaticData2,
  StaticData5,
  StaticData6,
} from "src/app/common/models/static-data.model";
import { ClientSearchDialogComponent } from "../../Client-Search-Dialog/client-search-dialog/client-search-dialog.component";
import { RegisterTradeService } from "../../shared/services/register-trade.service";
import { locale as langEnglish } from "../../../../lang/en";
import { locale as langEthiopic } from "../../../../lang/et";
import {
  MemberClientTrade,
  RegisterTradeDetailModel,
} from "../../shared/models/register-trade-model";
import { SearchClientInformation } from "../../shared/models/member-client-regiistration-model";
@Component({
  selector: "app-edit-register-trade-execution-detail",
  templateUrl: "./edit-register-trade-execution-detail.component.html",
  styleUrls: ["./edit-register-trade-execution-detail.component.scss"],
})
export class EditRegisterTradeExecutionDetailComponent implements OnInit {
  @Output() submitClicked = new EventEmitter<any>();
  formTardeExcutionDetail: FormGroup;
  commudityList: StaticData[];
  commudityNameList: StaticData[];
  commidityTypeList: StaticData2[];
  commodityGradeList: StaticData2[];
  tradeTypeList: StaticData[] = [];
  warehouseList: StaticData[] = [];
  tradeExcutionReportList: StaticData[] = [];

  clientInformatiomList: StaticData6[];
  unitMeasurementList: StaticData[] = [];
  floorReperesentative: StaticData6[] = [];
  clientName = 0;
  memberTradeEcutionDetailId: number;
  tradeExcutionDetail: RegisterTradeDetailModel;
  private child: RegisterTradeDetailModel[] = [];
  searchDialog: MatDialogRef<ClientSearchDialogComponent>;
  clientSearch: SearchClientInformation;
  currentLang = "";
  maxDate = new Date();
  clientRegId: number;
  userId: string;
  customerId: string;
  customerTypeId: number;
  isLoading = false;
  errorMsg: string;
  clientListOptions: Observable<StaticData6[]>;
  clientId: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private registerTradeMessageService: RegisterTradeMessageService,
    private toaster: ToastrService,
    private translationLoaderService: TranslationLoaderService,
    private dataSharingService: DataSharingService,
    private configService: ConfigurationService,
    private registerTradeService: RegisterTradeService,
    public dialogRef: MatDialogRef<any>,
    private dialog: MatDialog,
    private translate: TranslateService
  ) {
    this.currentLang = this.configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.createFormGroup();
  }

  ngOnInit() {
    this.customerTypeId = this.data.CustomerTypeId;
    if (this.data.isUpdate === false) {
      this.createFormGroup();
      this.formTardeExcutionDetail
        .get("TradeExcutionReport")
        .valueChanges.subscribe((res) => {
          this.clientName = res;
          if (this.clientName == 1) {
            this.formTardeExcutionDetail.get("ClientFullName").disable();
            this.formTardeExcutionDetail.get("OrderPrice").disable();
            this.formTardeExcutionDetail.get("CommissionInPrice").disable();
          } else {
            this.formTardeExcutionDetail.get("ClientFullName").enable();
            this.formTardeExcutionDetail.get("OrderPrice").enable();
            this.formTardeExcutionDetail.get("CommissionInPrice").enable();
          }
        });
    } else if (this.data.isUpdate === true) {
      if (this.data.MemberClientTradeDetailId != 0) {
        this.formTardeExcutionDetail
          .get("TradeExcutionReport")
          .valueChanges.subscribe((res) => {
            this.clientName = res;
            if (this.clientName == 1) {
              this.formTardeExcutionDetail.get("ClientFullName").disable();
              this.formTardeExcutionDetail.get("OrderPrice").disable();
              this.formTardeExcutionDetail.get("CommissionInPrice").disable();
            } else {
              this.formTardeExcutionDetail.get("ClientFullName").enable();
              this.formTardeExcutionDetail.get("OrderPrice").enable();
              this.formTardeExcutionDetail.get("CommissionInPrice").enable();
            }
          });
        this.getTradeExcutionDetailById(this.data.MemberClientTradeDetailId);
      }
    }

    // this.getCommudityList();
    this.initStaticData();
    this.getUnitMeasurementList();
    this.tradeExcutionReport();
    this.wareHouseLists();
    if (this.data.ExchangeActorId !== null) {
      this.getFloorRepresentative(this.data.ExchangeActorId);
    }
    // this.getPermissionWorkFlow();
    this.dataSharingService.valueAdd.subscribe((res) => {
      this.clientRegId = res;
    });
    if (this.data.ExchangeActorId !== null) {
      this.getListOfMemberProduct();
    }
  }

  private createFormGroup() {
    this.formTardeExcutionDetail = this.formBuilder.group({
      myControl: [null],
      ClientFullName: [null],
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
          Validators.pattern("^[0-9]+(.[0-9]{0,5})?$"),
        ],
      ],
      UnitPrice: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,4})?$"),
        ],
      ],
      OrderPrice: [null],
      CommissionInPrice: [
        0,
        [
          //Validators.required,
          Validators.min(0),
          Validators.max(2),
          Validators.pattern("^[0-9]+(.[0-9]{0,4})?$"),
        ],
      ],
      WarehouseId: ["", Validators.compose([Validators.required])],
      MemberTradeRemark: [null],
      // ClientTradeRemark: [null, [Validators.required]],
    });
  }

  private getEditRegisterTrade(): RegisterTradeDetailModel {
    const formModel = this.formTardeExcutionDetail.getRawValue();
    const registerTradeDetail = new RegisterTradeDetailModel();

    registerTradeDetail.MemberClientTradeDetailId = 0;
    registerTradeDetail.MemberClientTradeId = this.data.MemberClientTradeId;
    registerTradeDetail.MemberClientInformationId = this.clientRegId;

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
    // registerTradeDetail.ClientTradeRemark = formModel.ClientTradeRemark;
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

  addTradeClientDetail() {
    const formModel = this.getEditRegisterTrade();
    if (this.data.memberClientIndex == null) {
      this.child.push(formModel);
      this.dataSharingService.valueAdd.next(formModel);
    } else {
      this.child[this.data.memberClientIndex] = formModel;
    }
    this.toaster.success(this.translate.instant("common.messages.Saved"), "", {
      closeButton: true,
    });
    this.clearForm();
  }

  clearForm() {
    this.createFormGroup();
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

  private getFloorRepresentative(customerId: string) {
    this.registerTradeService
      .getCustomerLegalBodyList(customerId, this.currentLang)
      .subscribe((res) => {
        if (res) {
          this.floorReperesentative = res;
        }
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

  private wareHouseLists() {
    this.registerTradeService.getWarehouseList().subscribe((res) => {
      this.warehouseList = res;
    });
  }

  saveOrUpdateMemberClient() {
    const postData = this.getEditedData();
    const detail = this.getEditRegisterTrade();
    this.registerTradeMessageService.currentMessage.subscribe((msg) => {
      this.memberTradeEcutionDetailId = msg;
    });
    // if (!this.data.isUpdate)
    if (this.data.MemberClientTradeId === 0) {
      this.registerTradeService
        .saveOrUpdateMemberTradeDetail(postData)
        .subscribe((res) => {
          if (res > 0) {
            this.toaster.success(
              this.translate.instant("common.messages.Saved"),
              "",
              {
                closeButton: true,
              }
            );
            this.formTardeExcutionDetail.reset();
            this.dataSharingService.valueAdd.next(res);
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
    } else {
      detail.MemberClientTradeDetailId = this.data.MemberClientTradeDetailId;
      this.registerTradeService
        .updateMemberTradeExecutionDetail(detail)
        .subscribe((res) => {
          this.toaster.success(
            this.translate.instant("common.messages.UpdateSuccess"),
            "",
            {
              closeButton: true,
            }
          );
          this.createFormGroup();
          this.dataSharingService.valueAdd.next(res);
          this.dialogRef.close();
        });
    }
  }

  private getEditedData(): MemberClientTrade {
    const tradeRegistrationData = new MemberClientTrade();
    tradeRegistrationData.ExchangeActorId = this.data.ExchangeActorId;
    tradeRegistrationData.ReportTypeId = this.data.ReportTypeId;
    tradeRegistrationData.IsActive = this.data.IsActive;
    tradeRegistrationData.IsDeleted = this.data.IsDeleted;
    tradeRegistrationData.CreatedDateTime = this.data.CreatedDateTime;
    tradeRegistrationData.CreatedUserId = this.data.CreatedUserId;
    tradeRegistrationData.UpdatedDateTime = this.data.UpdatedDateTime;
    tradeRegistrationData.UpdatedUserId = this.data.UpdatedUserId;
    tradeRegistrationData.IsTradeExcutionAccomplished =
      this.data.IsTradeExcutionAccomplished;
    tradeRegistrationData.Year = this.data.Year;
    tradeRegistrationData.Remark = this.data.Remark;
    tradeRegistrationData.ReportDate = this.data.ReportDate;
    tradeRegistrationData.ReportPeriodId = this.data.ReportPeriodId;
    tradeRegistrationData.TradeExcutionStatusTypeId =
      this.data.TradeExcutionStatusTypeId;
    tradeRegistrationData.WorkFlowStatus = this.data.WorkFlowStatus;
    const detail = this.getEditRegisterTrade();
    const myDetails = [];
    myDetails.push(detail);
    tradeRegistrationData.MemberClientTradeDetail = myDetails;
    return tradeRegistrationData;
  }

  tradeExcutionReport() {
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

  get TradeExcutionReport() {
    return this.formTardeExcutionDetail.get("TradeExcutionReport");
  }

  get Quantity() {
    return this.formTardeExcutionDetail.get("Quantity");
  }

  get UnitPrice() {
    return this.formTardeExcutionDetail.get("UnitPrice");
  }

  get OrderPrice() {
    return this.formTardeExcutionDetail.get("OrderPrice");
  }

  get CommissionInPrice() {
    return this.formTardeExcutionDetail.get("CommissionInPrice");
  }

  get CommodityId() {
    return this.formTardeExcutionDetail.get("CommodityId");
  }

  get CommudityTypeId() {
    return this.formTardeExcutionDetail.get("CommudityTypeId");
  }

  get CommodityGradeId() {
    return this.formTardeExcutionDetail.get("CommodityGradeId");
  }

  get TradeTypeId() {
    return this.formTardeExcutionDetail.get("TradeTypeId");
  }

  get TradeDate() {
    return this.formTardeExcutionDetail.get("TradeDate");
  }

  get MemberTradeRemark() {
    return this.formTardeExcutionDetail.get("MemberTradeRemark");
  }

  // get ClientTradeRemark() {
  //   return this.formTardeExcutionDetail.get("ClientTradeRemark");
  // }

  get WarehouseId() {
    return this.formTardeExcutionDetail.get("WarehouseId");
  }

  get OwnerManagerId() {
    return this.formTardeExcutionDetail.get("OwnerManagerId");
  }

  get UnitMeasurementId() {
    return this.formTardeExcutionDetail.get("UnitMeasurementId");
  }
  get ClientFullName() {
    return this.formTardeExcutionDetail.get("ClientFullName");
  }
  getTradeExcutionDetailById(tradeExcutionDetailById: number) {
    this.registerTradeService
      .getTradeExcutionDetailById(tradeExcutionDetailById)
      .subscribe((res) => {
        if (res) {
          this.tradeExcutionDetail = res;
          this.registerTradeService
            .getCommodityTypeListById(
              this.tradeExcutionDetail.CommodityId,
              this.currentLang
            )
            .subscribe((commodityId) => {
              this.commidityTypeList = commodityId;
              this.registerTradeService
                .getCommodityGradeListById(
                  this.tradeExcutionDetail.CommudityTypeId,
                  this.currentLang
                )
                .subscribe((commodityGradeId) => {
                  //console.log("####         ", commodityGradeId);
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
        }
      });
  }

  public openSearchDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "43%";
    dialogConfig.height = "50%";
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      ExchangeActorId: this.data.ExchangeActorId,
    };
    this.searchDialog = this.dialog.open(
      ClientSearchDialogComponent,
      dialogConfig
    );
    this.searchDialog.afterClosed().subscribe((result) => {
      this.clientSearch = result;
      this.formTardeExcutionDetail
        .get("ClientFullName")
        .setValue(this.clientSearch.Description);
      this.clientRegId = this.clientSearch.Id;
      this.getListOfClientProduct(this.clientRegId);
    });
  }
  getListOfClientProduct(memberclientId: number) {
    this.registerTradeService
      .getListOfClientProduct(memberclientId, this.currentLang)
      .subscribe((res) => {
        this.commudityNameList = res;
      });
  }
  getListOfMemberProduct() {
    this.registerTradeService
      .getListOfMemberProduct(this.data.ExchangeActorId, this.currentLang)
      .subscribe((res) => {
        this.commudityList = res;
      });
  }
  // getEditWorkFlow(): WorkFlowModel {
  //   const WorkFlow = new WorkFlowModel();
  //   WorkFlow.CreatedUserId = this.authService.currentUser.Id;
  //   WorkFlow.ProcessedByName = this.authService.currentUser.FullName;
  //   WorkFlow.FinalDec = this.status;
  //   return WorkFlow;
  // }

  // getPermissionWorkFlow() {
  //   // this.userId = this.authService.currentUser.Id;
  //   if (this.accountService.userHasPermission(Permission.prepare)) {
  //     this.status = WORK_FLOW[0].Id;
  //   } else if (this.accountService.userHasPermission(Permission.checker)) {
  //     this.status = WORK_FLOW[1].Id;
  //   } else if (this.accountService.userHasPermission(Permission.approverOne)) {
  //     this.status = WORK_FLOW[2].Id;
  //   } else if (this.accountService.userHasPermission(Permission.approverTwo)) {
  //     this.status = WORK_FLOW[3].Id;
  //   }
  // }
  getCommudityType(commodityId: number) {
    this.registerTradeService
      .getCommudityType(commodityId, this.currentLang)
      .subscribe((res) => {
        this.commidityTypeList = res;
      });
  }
  getCommudityGrade(commodityTypeId: number) {
    this.registerTradeService
      .getCommudityGradeList(commodityTypeId, this.currentLang)
      .subscribe((res) => {
        this.commodityGradeList = res;
      });
  }
}
