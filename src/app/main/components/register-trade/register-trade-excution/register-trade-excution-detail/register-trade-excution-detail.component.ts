import {
  Component,
  OnInit,
  Inject,
  Output,
  EventEmitter,
  NgZone,
  ViewChild,
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import {
  MemberClientTrade,
  RegisterTradeDetailModel,
} from "../../shared/models/register-trade-model";
import { ToastrService } from "ngx-toastr";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { locale as langEnglish } from "../../../../lang/en";
import { locale as langEthiopic } from "../../../../lang/et";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { RegisterTradeService } from "../../shared/services/register-trade.service";
import { DataSharingService } from "../../shared/services/dataSharingService";
import {
  StaticData,
  StaticData12,
  StaticData5,
  StaticData6,
} from "src/app/common/models/static-data.model";
import {
  TRADEEXCUTIONREPORT,
  TRADETYPE,
} from "src/app/common/constants/consts";
import { RegisterTradeMessageService } from "../../shared/services/registerTrade-message.service";
import { TranslateService } from "@ngx-translate/core";
import { ClientSearchDialogComponent } from "../../Client-Search-Dialog/client-search-dialog/client-search-dialog.component";
import { SearchClientInformation } from "../../shared/models/member-client-regiistration-model";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { map, startWith, take } from "rxjs/operators";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";

@Component({
  selector: "app-register-trade-excution-detail",
  templateUrl: "./register-trade-excution-detail.component.html",
  styleUrls: ["./register-trade-excution-detail.component.scss"],
})
export class RegisterTradeExcutionDetailComponent implements OnInit {
  @Output() submitClicked = new EventEmitter<any>();
  formTardeExcutionDetail: FormGroup;
  commudityList: StaticData[];
  commudityNameList: StaticData[];
  commidityTypeList: StaticData[];
  commodityGradeList: StaticData[];
  tradeTypeList: StaticData[] = [];

  tradeExcutionReportList: StaticData[] = [];
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
  clientListOptions: Observable<StaticData5[]>;
  clientId: string;
  clientInformatiomList: StaticData12[];
  currentDate: Date;
  highCommodityGradeList: StaticData12[];
  highCommodityListOptions: Observable<StaticData5[]>;
  highCommodityGradeId: string;

  lowCommodityGradeList: StaticData12[];
  lowCommodityListOptions: Observable<StaticData5[]>;
  lowCommodityGradeId: string;

  memberClientList: StaticData12[];
  membersClientListOptions: Observable<StaticData5[]>;
  membersClientId: string;

  listOfWarehouse: StaticData5[] = [];
  warehouseListOptions: Observable<StaticData5[]>;
  warehouseId: string;

  gradeId: number;
  commTypeId: number = 0;
  memberClientTradeDetailId = 0;
  @ViewChild("autosize", { static: false }) autosize: CdkTextareaAutosize;
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
    private translate: TranslateService,
    private _ngZone: NgZone
  ) {
    this.currentLang = this.configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.createFormGroup();
  }

  ngOnInit() {
    const Zemen = require("zemen");
    const zare = new Zemen();
    this.currentDate = Zemen.toEC(new Date()).toString();
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
            this.getListOfWarehouse();
          } else {
            this.formTardeExcutionDetail.get("ClientFullName").enable();
            this.formTardeExcutionDetail.get("OrderPrice").enable();
            this.formTardeExcutionDetail.get("CommissionInPrice").enable();
            this.getListOfMemberClient(this.data.ExchangeActorId);
            this.getListOfWarehouse();
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
              this.getListOfMemberClient(this.data.ExchangeActorId);
            }
          });
        this.getTradeExcutionDetailById(this.data.MemberClientTradeDetailId);
      }
    }

    // this.getCommudityList();
    this.initStaticData();
    this.getUnitMeasurementList();
    this.tradeExcutionReport();
    // this.getListOfWarehouse();
    if (this.data.ExchangeActorId !== null) {
      this.getFloorRepresentative(this.data.ExchangeActorId);
    }
    // this.getPermissionWorkFlow();
    this.dataSharingService.valueAdd.subscribe((res) => {
      //this.clientRegId = res;
    });
    if (this.data.ExchangeActorId !== null) {
      this.getListOfMemberProduct();
    }
    this.getClientInformatin(this.data.ExchangeActorId);
  }
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
  private createFormGroup() {
    this.formTardeExcutionDetail = this.formBuilder.group({
      myControl: [null],
      ClientFullName: [null],
      TradeTypeId: [null],
      TradeDate: this.currentDate,
      OwnerManagerId: [null],
      UnitMeasurementId: [null],
      TradeExcutionReport: [null],
      CommudityTypeId: new FormControl(Validators.required),
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

    registerTradeDetail.MemberClientTradeDetailId =
      this.memberClientTradeDetailId;
    registerTradeDetail.MemberClientTradeId = this.data.MemberClientTradeId;
    registerTradeDetail.MemberClientInformationId = Number(this.membersClientId)
      ? Number(this.membersClientId)
      : 0;

    registerTradeDetail.CommodityId = formModel.CommodityId;
    registerTradeDetail.CommudityTypeId = Number(this.lowCommodityGradeId)
      ? Number(this.lowCommodityGradeId)
      : 0;
    registerTradeDetail.CommodityGradeId = Number(this.highCommodityGradeId)
      ? Number(this.highCommodityGradeId)
      : 0;

    registerTradeDetail.Quantity = formModel.Quantity;
    registerTradeDetail.UnitPrice = formModel.UnitPrice;
    registerTradeDetail.OrderPrice = formModel.OrderPrice;
    registerTradeDetail.CommissionInPrice = formModel.CommissionInPrice;

    registerTradeDetail.TradeTypeId = formModel.TradeTypeId;
    registerTradeDetail.TradeDate = formModel.TradeDate;

    registerTradeDetail.MemberTradeRemark = formModel.MemberTradeRemark;
    // registerTradeDetail.ClientTradeRemark = formModel.ClientTradeRemark;
    //registerTradeDetail.Warehouse = this.warehouseId;
    registerTradeDetail.WarehouseId = Number(this.warehouseId)
      ? Number(this.warehouseId)
      : 0;
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
    this.registerTradeService.getListOfWarehouse().subscribe((res) => {
      // this.warehouseList = res;
    });
  }

  saveOrUpdateMemberClient() {
    const postData = this.getEditedData();
    const detail = this.getEditRegisterTrade();
    this.registerTradeMessageService.currentMessage.subscribe((msg) => {
      this.memberTradeEcutionDetailId = msg;
    });

    if (this.memberClientTradeDetailId === 0) {
      this.registerTradeService
        .saveOrUpdateMemberTradeDetail(detail)
        .subscribe((res) => {
          if (res > 0) {
            this.toaster.success(
              this.translate.instant("common.messages.Saved"),
              "",
              {
                closeButton: true,
              }
            );
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
    tradeRegistrationData.PreparedDate = new Date();
    tradeRegistrationData.ApproveDate = new Date();
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
          // this.getLowCommodityGradeList(this.tradeExcutionDetail.CommodityId);
          this.registerTradeService
            .getCommudityType(
              this.tradeExcutionDetail.CommodityId,
              this.currentLang
            )
            .subscribe((commodityId) => {
              this.lowCommodityGradeList = commodityId;
              this.lowCommodityListOptions =
                this.CommudityTypeId.valueChanges.pipe(
                  startWith(""),
                  map((value) =>
                    typeof value === "string" ? value : value.Id
                  ),
                  map((Id) =>
                    Id
                      ? this._filterLowGrade(Id)
                      : this.lowCommodityGradeList.slice()
                  )
                );

              const xxcd = this.CommudityTypeId.setValue({
                Description: this.lowCommodityGradeList[0].Description,
                Id: this.lowCommodityGradeList[0].Id,
              });
              this.displayLowCommodityGrade(this.lowCommodityGradeList[0]);
              this.registerTradeService
                .getCommudityGradeList(
                  this.tradeExcutionDetail.CommudityTypeId,
                  this.currentLang
                )
                .subscribe((commodityGradeId) => {
                  this.highCommodityGradeList = commodityGradeId;
                  this.highCommodityListOptions =
                    this.CommodityGradeId.valueChanges.pipe(
                      startWith(""),
                      map((value) =>
                        typeof value === "string" ? value : value.Id
                      ),
                      map((Id) =>
                        Id
                          ? this._filterHighGrade(Id)
                          : this.highCommodityGradeList.slice()
                      )
                    );
                  this.registerTradeService
                    .getListOfWarehouse()
                    .subscribe((result) => {
                      this.listOfWarehouse = result;
                      this.warehouseListOptions =
                        this.WarehouseId.valueChanges.pipe(
                          startWith(""),
                          map((value) =>
                            typeof value === "string" ? value : value.Id
                          ),
                          map((Id) =>
                            Id
                              ? this._filterWarehouse(Id)
                              : this.listOfWarehouse.slice()
                          )
                        );
                    });
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
  private getClientInformatin(customerId: string) {
    this.registerTradeService
      .getClientInformationList(customerId, this.currentLang)
      .subscribe((result) => {
        this.clientInformatiomList = result;
        if (result) {
          this.clientListOptions = this.ClientFullName.valueChanges.pipe(
            startWith(""),
            map((value) => (typeof value === "string" ? value : value.Id)),
            map((Id) =>
              Id ? this._filter(Id) : this.clientInformatiomList.slice()
            )
          );
        }
      });
  }

  private _filter(Client: string): StaticData5[] {
    this.clientId = Client;
    const filterValue = Client.toLocaleLowerCase();
    return this.clientInformatiomList.filter(
      (option) =>
        option.Description.toLocaleLowerCase().indexOf(filterValue) === 0
    );
  }

  display(staticd: StaticData5): string {
    if (this.clientId) {
      this.clientId = staticd.Id ? staticd.Id : "";
      return staticd && staticd.Description ? staticd.Description : "";
    }
  }

  getHighCommodityGradeList(commodityTypeId: number) {
    this.registerTradeService
      .getCommudityGradeList(commodityTypeId, this.currentLang)
      .subscribe((result) => {
        this.highCommodityGradeList = result;
        this.highCommodityListOptions = this.CommodityGradeId.valueChanges.pipe(
          startWith(""),
          map((value) => (typeof value === "string" ? value : value.Id)),
          map((Id) =>
            Id ? this._filterHighGrade(Id) : this.highCommodityGradeList.slice()
          )
        );
      });
  }
  private _filterHighGrade(Commodity: string): StaticData5[] {
    this.highCommodityGradeId = Commodity;
    const filterValue = Commodity.toLocaleLowerCase();
    return this.highCommodityGradeList.filter(
      (option) =>
        option.Description.toLocaleLowerCase().indexOf(filterValue) === 0
    );
  }
  displayHighCommodityGrade(staticd: StaticData5): string {
    if (staticd) {
      this.highCommodityGradeId = staticd.Id ? staticd.Id : "";
      return staticd && staticd.Description ? staticd.Description : "";
    }
  }
  getLowCommodityGradeList(commodityTypeId: number) {
    this.registerTradeService
      .getCommudityType(commodityTypeId, this.currentLang)
      .subscribe((result) => {
        this.lowCommodityGradeList = result;
        this.lowCommodityListOptions = this.CommudityTypeId.valueChanges.pipe(
          startWith(""),
          map((value) => (typeof value === "string" ? value : value.Id)),
          map((Id) =>
            Id ? this._filterLowGrade(Id) : this.lowCommodityGradeList.slice()
          )
        );
      });
  }
  private _filterLowGrade(Commodity: string): StaticData5[] {
    this.lowCommodityGradeId = Commodity;
    const filterValue = Commodity.toLocaleLowerCase();
    return this.lowCommodityGradeList.filter(
      (option) =>
        option.Description.toLocaleLowerCase().indexOf(filterValue) === 0
    );
  }
  displayLowCommodityGrade(staticd: StaticData12): string {
    if (staticd) {
      this.lowCommodityGradeId = staticd.Id ? staticd.Id : "";
      return staticd && staticd.Description ? staticd.Description : "";
    }
  }

  getListOfMemberClient(exchangeActorId: string) {
    this.registerTradeService
      .getClientInformationList(exchangeActorId, this.currentLang)
      .subscribe((result) => {
        this.memberClientList = result;
        this.membersClientListOptions = this.ClientFullName.valueChanges.pipe(
          startWith(""),
          map((value) => (typeof value === "string" ? value : value.Id)),
          map((Id) =>
            Id ? this._filterMembersClient(Id) : this.memberClientList.slice()
          )
        );
      });
  }
  private _filterMembersClient(Commodity: string): StaticData5[] {
    this.membersClientId = Commodity;
    const filterValue = Commodity.toLocaleLowerCase();
    return this.memberClientList.filter(
      (option) =>
        option.Description.toLocaleLowerCase().indexOf(filterValue) === 0
    );
  }
  displayMembersClient(memberClient: StaticData5): string {
    if (memberClient) {
      this.membersClientId = memberClient.Id ? memberClient.Id : "";
      this.clientRegId = Number(this.membersClientId);
      return memberClient && memberClient.Description
        ? memberClient.Description
        : "";
    }
  }

  getListOfWarehouse() {
    this.registerTradeService.getListOfWarehouse().subscribe((result) => {
      this.listOfWarehouse = result;
      this.warehouseListOptions = this.WarehouseId.valueChanges.pipe(
        startWith(""),
        map((value) => (typeof value === "string" ? value : value.Id)),
        map((Id) =>
          Id ? this._filterWarehouse(Id) : this.listOfWarehouse.slice()
        )
      );
    });
  }
  private _filterWarehouse(warehouse: string): StaticData5[] {
    this.warehouseId = warehouse;
    const filterValue = warehouse.toLocaleLowerCase();
    return this.listOfWarehouse.filter(
      (option) =>
        option.Description.toLocaleLowerCase().indexOf(filterValue) === 0
    );
  }
  displayWarehouse(warehouse: StaticData5): string {
    if (warehouse) {
      this.warehouseId = warehouse.Id ? warehouse.Id : "";
      return warehouse && warehouse.Description ? warehouse.Description : "";
    }
  }
}
