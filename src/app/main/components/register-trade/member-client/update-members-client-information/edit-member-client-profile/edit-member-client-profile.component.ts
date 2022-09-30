import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatPaginator, MatSort, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { determineId } from 'src/@custor/helpers/compare';
import { ConfigurationService } from 'src/@custor/services/configuration.service';
import { TranslationLoaderService } from 'src/@custor/services/translation-loader.service';
//import { MemberClientTrade } from 'src/app/admin/settings/setting/shared/models/register-trade-model';
import { DataSharingService } from 'src/app/admin/settings/setting/shared/services/dataSharingService';
import { RegisterTradeMessageService } from 'src/app/admin/settings/setting/shared/services/registerTrade-message.service';
import { ALPHABET_WITHSPAC_EBACKSLASH__REGEX, CLIENTSTATUS, ET_ALPHABET_WITHNEWLINE_REGEX, GENDERS, PHONE_NO, TRADETYPE } from 'src/app/common/constants/consts';
import { LookupType } from 'src/app/common/enums/common';
import { StaticData, StaticData2 } from 'src/app/common/models/static-data.model';
import { AddressService } from 'src/app/common/services/address.service';
import { LookUpService } from 'src/app/common/services/look-up.service';
import { SearchDialogComponent } from 'src/app/main/common/components/search-dialog/search-dialog.component';
import { CustomerSearchResultModel } from 'src/app/main/models/exchange-actor.model';
import { locale as langEnglish } from "../../../lang/en";
import { locale as langEthiopic } from "../../../lang/et";
import { ClientProduct } from '../../../shared/models/ClientProduct';
import { MemberClientRegiistrationModel } from '../../../shared/models/member-client-regiistration-model';
import { MemberClientTrade } from '../../../shared/models/register-trade-model';
import { RegisterTradeService } from '../../../shared/services/register-trade.service';
@Component({
  selector: 'app-edit-member-client-profile',
  templateUrl: './edit-member-client-profile.component.html',
  styleUrls: ['./edit-member-client-profile.component.scss']
})
export class EditMemberClientProfileComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  formClient: FormGroup;
  //MemberClientInformationId: number;
  currentLang = "";
  genders: StaticData[] = [];
  regions: StaticData2[] = [];
  zones: StaticData2[] = [];
  woredas: StaticData2[] = [];
  kebeles: StaticData2[];
  commidityType: StaticData2[];
  tradeTypeList: StaticData[] = [];
  commudityList: StaticData2[];
  clientStatusList: StaticData[] = [];
  businessTypes: StaticData[] = [];
  clientTypeList: StaticData[] = [];
  memberTradeExcutionId: number;
  selectedExchangeActorId: string;
  exchageActorStatus: number;
  static: boolean;
  searchDialog: MatDialogRef<SearchDialogComponent>;
  customerSearchResult: CustomerSearchResultModel;
  clientRegistration: MemberClientRegiistrationModel;
  maxDate = new Date();
  AllowCascading = true;
  dataSource: any;
  filteredZones: StaticData2[] = [];
  filteredWoredas: StaticData2[] = [];
  filteredKebeles: StaticData2[] = [];
  selectedProduct: number[];
  @ViewChild("regionName", { static: false }) rName: ElementRef;
  @ViewChild("zoneName", { static: false }) zName: ElementRef;
  @ViewChild("weredaName", { static: false }) wName: ElementRef;
  @ViewChild("kebeleName", { static: false }) kName: ElementRef;
  @ViewChild("commudityTypeName", { static: false }) ctName: ElementRef;
  @ViewChild("genderName", { static: false }) gName: ElementRef;
  private clientTypeId = 0;
  memberClientInformationId = 0;
  currentYear: number;
  constructor(
    public dialogRef: MatDialogRef<EditMemberClientProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataSharingService: DataSharingService,
    private formBuilder: FormBuilder,
    private router: Router,
    private registerTradeService: RegisterTradeService,
    private lookupService: LookUpService,
    private configService: ConfigurationService,
    private translationLoaderService: TranslationLoaderService,
    private toaster: ToastrService,
    private addressService: AddressService,
    private registerTradeMessageService: RegisterTradeMessageService,
    private dialog: MatDialog,
    private translate: TranslateService) {
    this.currentLang = configService.language;
    this.selectedProduct = [];
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    const Zemen = require('zemen');
    const zare = new Zemen();
    this.currentYear = zare.toString();
    this.createClientRegistrationForm();
  }

  ngOnInit() {
    this.getClientInformationReminderList();
    if (this.data.isUpdate === false) {
      this.createClientRegistrationForm();
      this.formClient.get("ClientTypeId").valueChanges.subscribe((res) => {
        this.clientTypeId = res;
        if (this.clientTypeId == 127) {
          this.formClient.get("ClientTypeId").disable()
          this.formClient.get("OrganizationNameAmh").disable();
          this.formClient.get("OrganizationNameEng").disable();
          this.formClient.get("FirstNameAmh").disable();
          this.formClient.get("FirstNameEng").disable();
          this.formClient.get("FatherNameAmh").disable();
          this.formClient.get("FatherNameEng").disable();
          this.formClient.get("GrandFatherNameAmh").disable();
          this.formClient.get("GrandFatherNameEng").disable();
          this.formClient.get("Gender").enable();
        } else if (
          this.clientTypeId == 128 ||
          this.clientTypeId == 129 ||
          this.clientTypeId == 130 ||
          this.clientTypeId == 131
        ) {
          this.formClient.get("FirstNameAmh").disable();
          this.formClient.get("FirstNameEng").disable();
          this.formClient.get("FatherNameAmh").disable();
          this.formClient.get("FatherNameEng").disable();
          this.formClient.get("GrandFatherNameAmh").disable();
          this.formClient.get("GrandFatherNameEng").disable();
          this.formClient.get("OrganizationNameAmh").enable();
          this.formClient.get("OrganizationNameEng").enable();
          this.formClient.get("Gender").disable();
        }
      });
    } else if (this.data.isUpdate == true) {
      if (this.data.MemberClientInformationId != 0) {

        this.formClient.get("OrganizationNameAmh").disable();
        this.formClient.get("OrganizationNameEng").disable();
        this.formClient.get("FirstNameAmh").disable();
        this.formClient.get("FirstNameEng").disable();
        this.formClient.get("FatherNameAmh").disable();
        this.formClient.get("FatherNameEng").disable();
        this.formClient.get("GrandFatherNameAmh").disable();
        this.formClient.get("GrandFatherNameEng").disable();
        this.formClient.get("ClientTypeId").disable();

        this.getMemberClientInformation(this.data.MemberClientInformationId);
      }
    }

    this.getLookUpData();
  }

  private createClientRegistrationForm() {
    this.formClient = this.formBuilder.group({
      ClientTypeId: ["", Validators.compose([Validators.required])],
      OrganizationNameAmh: [
        "",
        Validators.compose([
          //Validators.required,
          Validators.minLength(2),
          Validators.pattern(ET_ALPHABET_WITHNEWLINE_REGEX),
        ]),
      ],
      OrganizationNameEng: [
        "",
        Validators.compose([
          //Validators.required,
          Validators.minLength(2),
          Validators.pattern(ALPHABET_WITHSPAC_EBACKSLASH__REGEX),
        ]),
      ],
      CustomerFullName: [null],
      OrganizationName: [null],
      CustomerType: [null],
      FirstNameAmh: [
        "",
        Validators.compose([
          //Validators.required,
          Validators.minLength(2),
          Validators.pattern(ET_ALPHABET_WITHNEWLINE_REGEX),
        ]),
      ],
      FirstNameEng: [
        "",
        Validators.compose([
          //Validators.required,
          Validators.minLength(2),
          Validators.pattern(ALPHABET_WITHSPAC_EBACKSLASH__REGEX),
        ]),
      ],
      FatherNameAmh: [
        "",
        Validators.compose([
          //Validators.required,
          Validators.minLength(2),
          Validators.pattern(ET_ALPHABET_WITHNEWLINE_REGEX),
        ]),
      ],
      FatherNameEng: [
        "",
        Validators.compose([
          //Validators.required,
          Validators.minLength(2),
          Validators.pattern(ALPHABET_WITHSPAC_EBACKSLASH__REGEX),
        ]),
      ],
      GrandFatherNameAmh: [
        "",
        Validators.compose([
          //  Validators.required,
          Validators.minLength(2),
          Validators.pattern(ET_ALPHABET_WITHNEWLINE_REGEX),
        ]),
      ],
      GrandFatherNameEng: [
        "",
        Validators.compose([
          //Validators.required,
          Validators.minLength(2),
          Validators.pattern(ALPHABET_WITHSPAC_EBACKSLASH__REGEX),
        ]),
      ],
      //   BusinessFiledId: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      AgreementDate: ["", Validators.compose([Validators.required])],
      Gender: [0],
      RegionId: ["", Validators.compose([Validators.required])],
      ZoneId: ["", Validators.compose([Validators.required])],
      WoredaId: ["", Validators.compose([Validators.required])],
      KebeleId: ["", Validators.compose([Validators.required])],
      HouseNo: ["", []],
      RegularPhone: [
        "",
        Validators.compose([
          // Validators.required,
          Validators.minLength(9),
          Validators.maxLength(13),
          Validators.pattern(PHONE_NO),
        ]),
      ],
      MobilePhone: [
        "+251",
        Validators.compose([
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(13),
          Validators.pattern(PHONE_NO),
        ]),
      ],
      TradeTypeId: ["", Validators.compose([Validators.required])],
      ClientProduct: ["", Validators.compose([Validators.required])],
      BusinessFiledId: ["", Validators.compose([Validators.required])],
      Status: [null, [Validators.required]],
    });
  }

  private getClientRegistrationValue(): MemberClientRegiistrationModel {
    const formModel = this.formClient.value;
    const clientRegistration = new MemberClientRegiistrationModel();
    clientRegistration.MemberClientInformationId = 0;
    clientRegistration.MemberClientTradeId = this.data.MemberClientTradeId;
    (clientRegistration.ClientTypeId = formModel.ClientTypeId),
      (clientRegistration.OrganizationNameAmh = formModel.OrganizationNameAmh),
      (clientRegistration.OrganizationNameEng = formModel.OrganizationNameEng),
      (clientRegistration.FirstNameAmh = formModel.FirstNameAmh);
    clientRegistration.FirstNameEng = formModel.FirstNameEng;
    clientRegistration.FatherNameAmh = formModel.FatherNameAmh;
    clientRegistration.FatherNameEng = formModel.FatherNameEng;
    clientRegistration.GrandFatherNameAmh = formModel.GrandFatherNameAmh;
    clientRegistration.GrandFatherNameEng = formModel.GrandFatherNameEng;
    // clientRegistration.ExchangeActorId = this.selectedExchangeActorId;
    clientRegistration.BusinessFiledId = formModel.BusinessFiledId;
    clientRegistration.AgreementDate = formModel.AgreementDate;
    clientRegistration.Gender = formModel.Gender;
    clientRegistration.RegionId = formModel.RegionId;
    clientRegistration.ZoneId = formModel.ZoneId;
    clientRegistration.WoredaId = formModel.WoredaId;
    clientRegistration.KebeleId = formModel.KebeleId;
    clientRegistration.HouseNo = formModel.HouseNo;
    clientRegistration.RegularPhone = formModel.RegularPhone;
    clientRegistration.MobilePhone = formModel.MobilePhone;
    //clientRegistration.CommodityId = formModel.CommodityId;
    clientRegistration.TradeTypeId = formModel.TradeTypeId;
    clientRegistration.Status = formModel.Status;
    clientRegistration.IsActive = true;
    clientRegistration.IsDeleted = false;
    clientRegistration.CreatedDateTime = new Date();
    clientRegistration.UpdatedDateTime = new Date();
    const productTypes: ClientProduct[] = [];
    if (formModel.ClientProduct) {
      formModel.ClientProduct.forEach((element) => {
        productTypes.push({
          CommodityId: element,
        });
      });
    }
    clientRegistration.ClientProduct = productTypes;
    return clientRegistration;
  }

  clearForm() {
    this.formClient.reset("");
  }

  private getLookUpData() {
    this.getRegions();
    this.getAllZones();
    this.getAllWoredas();
    this.initStaticData();
    this.getCommudityList();
    this.tradeTypeDataList();
    this.getClientStatus();
    this.getBusinessType(this.currentLang);
    this.getClientTypeList(this.currentLang);
  }

  private initStaticData() {
    const lang = this.currentLang;
    let gender: StaticData = new StaticData();
    GENDERS.forEach((pair) => {
      gender = {
        Id: pair.Id,
        Description: lang === "et" ? pair.Description : pair.DescriptionEnglish,
      };
      this.genders.push(gender);
    });
  }

  private tradeTypeDataList() {
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

  getZonesByRegion(regionID: number) {
    this.lookupService
      .getZonesByRegion(this.currentLang, regionID)
      .subscribe((data) => (this.zones = data));
  }

  getWoredasByZone(zoneID: number) {
    this.lookupService
      .getWoredasByZone(this.currentLang, zoneID)
      .subscribe((data) => (this.woredas = data));
  }

  getKebelesByWoreda(woredaID: number) {
    this.lookupService
      .getKebelesByWoreda(this.currentLang, woredaID)
      .subscribe((data) => (this.kebeles = data));
  }

  getBusinessType(lang: string) {
    this.lookupService
      .getLookup(lang, LookupType.BUSINESS_TYPE)
      .subscribe((res) => {
        this.businessTypes = res;
      });
  }
  getClientTypeList(lang: string) {
    this.lookupService
      .getLookup(lang, LookupType.CLIENT_TYPE)
      .subscribe((res) => {
        this.clientTypeList = res;
      });
  }

  private getEditedData(): MemberClientTrade {
    const tradeRegistrationData = new MemberClientTrade();
    tradeRegistrationData.MemberClientTradeId = this.data.MemberClientTradeId;
    tradeRegistrationData.ExchangeActorId = this.data.ExchangeActorId;
    tradeRegistrationData.ReportTypeId = this.data.ReportTypeId;
    tradeRegistrationData.IsActive = this.data.IsActive;
    tradeRegistrationData.IsDeleted = this.data.IsDeleted;
    tradeRegistrationData.CreatedDateTime = this.data.CreatedDateTime;
    tradeRegistrationData.CreatedUserId = this.data.CreatedUserId;
    tradeRegistrationData.UpdatedDateTime = this.data.UpdatedDateTime;
    tradeRegistrationData.UpdatedUserId = this.data.UpdatedUserId;
    tradeRegistrationData.Remark = this.data.Remark;
    tradeRegistrationData.ReportDate = this.data.ReportDate;
    tradeRegistrationData.ReportPeriodId = this.data.ReportPeriodId;
    tradeRegistrationData.Year = this.data.Year;
    tradeRegistrationData.TradeExcutionStatusTypeId = this.data.TradeExcutionStatusTypeId;
    tradeRegistrationData.WorkFlowStatus = this.data.WorkFlowStatus;
    const detail = this.getClientRegistrationValue();
    const myDetails = [];
    myDetails.push(detail);
    tradeRegistrationData.MemberClientInformation = myDetails;
    return tradeRegistrationData;
  }

  saveOrUpdateMemberClientInformation() {    
    const postData = this.getEditedData();
    const clientDetail = this.getClientRegistrationValue();
    this.registerTradeMessageService.currentMessage.subscribe((msg) => {
      this.memberTradeExcutionId = msg;
    });
    if (this.data.MemberClientTradeId === 0) {
      this.registerTradeService
        .saveOrUpdateMemberClient(postData)
        .subscribe((res) => {
          if (res > 0) {
            this.toaster.success(
              this.translate.instant("common.messages.Saved"),
              "",
              {
                closeButton: true,
              }
            );
            this.createClientRegistrationForm();
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
      clientDetail.MemberClientInformationId = this.data.MemberClientInformationId;
      this.registerTradeService
        .updateMemberClientInformation(clientDetail)
        .subscribe((res) => {
          this.toaster.success(
            this.translate.instant("common.messages.UpdateSuccess"),
            "",
            {
              closeButton: true,
            }
          );
          this.createClientRegistrationForm();
          this.dataSharingService.valueAdd.next(res);
          this.dialogRef.close();
        });
    }
  }

  getAllMemberClientInformationById(memberClientId: number) {
    this.registerTradeService
      .getMemberClientInformation(memberClientId)
      .subscribe((result) => {
        if (result) {
          this.clientRegistration = result;
          this.clientRegistration.ClientProduct.forEach((rep) => {
            this.selectedProduct.push(Number(rep.CommodityId));
          });
          this.formClient.patchValue(this.clientRegistration);
          this.formClient.controls.ClientProduct.setValue(this.selectedProduct);
        }
      });
  }

  private getCommudityList() {
    this.registerTradeService
      .getCommudityList(this.currentLang)
      .subscribe((res) => {
        this.commudityList = res;
      });
  }

  private getClientStatus() {
    const lang = this.currentLang;
    let tradeType: StaticData = new StaticData();
    CLIENTSTATUS.forEach((pair) => {
      tradeType = {
        Id: pair.Id,
        Description: lang === "et" ? pair.Description : pair.DescriptionEnglish,
      };
      this.clientStatusList.push(tradeType);
    });
  }

  getMemberClientInformation(memberClientTradeId: number) {
    this.registerTradeService
      .getMemberClientInformation(memberClientTradeId)
      .subscribe((res) => {
        if (res) {
          this.clientRegistration = res;
          this.clientRegistration.ClientProduct.forEach((rep) => {
            this.selectedProduct.push(Number(rep.CommodityId));
          });
          this.updateForm();
          this.formClient.patchValue(this.clientRegistration);
          this.formClient.controls.ClientProduct.setValue(this.selectedProduct);
        }
      });
  }
  get OrganizationNameEng() {
    return this.formClient.get("OrganizationNameEng");
  }
  get OrganizationNameAmh() {
    return this.formClient.get("OrganizationNameAmh");
  }
  get ClientTypeId() {
    return this.formClient.get("ClientTypeId");
  }
  get FirstNameAmh() {
    return this.formClient.get("FirstNameAmh");
  }

  get FirstNameEng() {
    return this.formClient.get("FirstNameEng");
  }

  get FatherNameAmh() {
    return this.formClient.get("FatherNameAmh");
  }

  get FatherNameEng() {
    return this.formClient.get("FatherNameEng");
  }

  get GrandFatherNameEng() {
    return this.formClient.get("GrandFatherNameEng");
  }

  get GrandFatherNameAmh() {
    return this.formClient.get("GrandFatherNameAmh");
  }

  get BusinessFiledId() {
    return this.formClient.get("BusinessFiledId");
  }

  get AgreementDate() {
    return this.formClient.get("AgreementDate");
  }

  get Gender() {
    return this.formClient.get("Gender");
  }

  get RegionId() {
    return this.formClient.get("RegionId");
  }

  get ZoneId() {
    return this.formClient.get("ZoneId");
  }

  get WoredaId() {
    return this.formClient.get("WoredaId");
  }

  get KebeleId() {
    return this.formClient.get("KebeleId");
  }

  get HouseNo() {
    return this.formClient.get("HouseNo");
  }

  get RegularPhone() {
    return this.formClient.get("RegularPhone");
  }

  get MobilePhone() {
    return this.formClient.get("MobilePhone");
  }

  get ClientProduct() {
    return this.formClient.get("ClientProduct");
  }

  get TradeTypeId() {
    return this.formClient.get("TradeTypeId");
  }

  get Status() {
    return this.formClient.get("Status");
  }

  saveOrUpdateClientInformation() {
    this.registerTradeMessageService.currentMessage.subscribe((result) => {
      this.memberTradeExcutionId = result;
    });
    const postData = this.getClientRegistrationValue();
    if (this.memberTradeExcutionId === 0) {
      this.registerTradeService
        .saveClientInformation(postData)
        .subscribe((res) => {
          if (res != null) {
            this.toaster.success(
              this.translate.instant("common.messages.Saved"),
              "",
              {
                closeButton: true,
              }
            );
            this.registerTradeMessageService.sendMessage(
              postData.ExchangeActorId
            );
            this.router.navigate(
              ["main/registertrade/member-client-trade"],
              {}
            );
          }
        });
    } else {
      postData.MemberClientInformationId = this.memberTradeExcutionId;
      this.registerTradeService
        .updateMemberClientInformation(postData)
        .subscribe(() => {
          this.toaster.success(
            this.translate.instant("common.messages.UpdateSuccess"),
            "",
            {
              closeButton: true,
            }
          );
          this.dataSharingService.valueAdd.next(postData.ExchangeActorId);
          this.router.navigate(["main/registertrade/member-client-trade"], {});
        });
    }
  }

  public openSearchDialog() {
    this.searchDialog = this.dialog.open(SearchDialogComponent, {
      disableClose: true,
      width: "900px",
      backdropClass: "custom-backdrop",
      minHeight: "300px",
    });
    this.searchDialog.afterClosed().subscribe((result) => {
      this.customerSearchResult = result;
      this.exchageActorStatus = this.customerSearchResult.Status;
      if (this.exchageActorStatus === 2) {
        this.toaster.warning(
          this.translate.instant("common.messages.Cancelled"),
          "",
          {
            closeButton: true,
          }
        );
      } else if (this.exchageActorStatus === 3) {
        this.toaster.warning(
          this.translate.instant("common.messages.UnderInjunction"),
          "",
          {
            closeButton: true,
          }
        );
      } else {
        this.selectedExchangeActorId = this.customerSearchResult.ExchangeActorId;
        this.formClient
          .get("CustomerFullName")
          .setValue(this.customerSearchResult.FullName);
        this.formClient
          .get("OrganizationName")
          .setValue(this.customerSearchResult.OrganizationName);
        this.formClient
          .get("CustomerType")
          .setValue(this.customerSearchResult.CustomerType);
      }
    });
  }

  getRegions() {
    this.addressService
      .getRegionsByLang(this.currentLang)
      .subscribe((result) => {
        this.regions = result;
      });
  }

  getAllZones() {
    this.addressService.getAllZonesByLang(this.currentLang).subscribe((z) => {
      this.zones = z;
      if (this.zones && this.clientRegistration) {
        this.filterRegion(this.clientRegistration.RegionId);
      }
    });
  }

  getAllWoredas() {
    this.addressService
      .getAllWoredasByLang(this.currentLang)
      .subscribe((result) => {
        this.woredas = result;
        if (this.woredas && this.clientRegistration) {
          this.filterZone(this.clientRegistration.ZoneId);
        }
        // TODO change this one to customer id if customer id != zero
      });
  }

  filterRegion(regionCode: number) {
    if (!regionCode || !this.AllowCascading) {
      return;
    }
    if (!this.zones) {
      return;
    }
    this.filteredZones = this.zones.filter((item) => {
      return item.ParentId === regionCode;
    });
  }

  filterZone(zoneCode: number) {
    if (!zoneCode || !this.AllowCascading) {
      return;
    }
    this.filteredWoredas = this.woredas.filter((item) => {
      return item.ParentId === zoneCode;
    });
  }

  filterWoreda(woredaCode: string) {
    if (!woredaCode || !this.AllowCascading) {
      return;
    }
    this.getKebeleByWoredaId(woredaCode);
  }

  getKebeleByWoredaId(woredaId: any) {
    this.addressService
      .getKebelesByWoreda(this.configService.language, woredaId)
      .subscribe((result) => {
        this.filteredKebeles = result;
      });
  }

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  updateForm() {
    this.AllowCascading = false;
    setTimeout(() => {
      if (this.clientRegistration.ZoneId != null) {
        this.filteredWoredas = this.woredas.filter(
          (item) => item.ParentId === this.clientRegistration.ZoneId
        );
      }
    }, 100);

    setTimeout(() => {
      if (this.clientRegistration.RegionId != null) {
        this.filteredZones = this.zones.filter(
          (item) => item.ParentId === this.clientRegistration.RegionId
        );
      }
    }, 100);

    setTimeout(() => {
      if (this.clientRegistration.WoredaId != null) {
        this.getKebeleByWoredaId(this.clientRegistration.WoredaId);
      }
    }, 100);

    this.AllowCascading = true;
  }

  getClientInformationReminderList() {
    this.registerTradeService
      .getClientInformationReminder(this.currentLang)
      .subscribe((result) => {
        this.dataSource = result;
      });
  }
  onCLose() {
    this.dialogRef.close();
  }

}
