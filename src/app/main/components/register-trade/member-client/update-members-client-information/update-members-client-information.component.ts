import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatDialogRef,
  MatDialog,
  MatTableDataSource,
  MatDialogConfig,
  PageEvent,
} from "@angular/material";
import {
  StaticData,
  StaticData2,
} from "src/app/common/models/static-data.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CustomerSearchResultModel } from "src/app/main/models/exchange-actor.model";
import { SearchDialogComponent } from "src/app/main/common/components/search-dialog/search-dialog.component";
import { MemberClientRegiistrationModel } from "../../shared/models/member-client-regiistration-model";
import { RegisterTradeService } from "../../shared/services/register-trade.service";
import { ToastrService } from "ngx-toastr";
import { AccountService } from "src/@custor/services/security/account.service";
import { AuthService } from "src/@custor/services/security/auth.service";
import { LookUpService } from "src/app/common/services/look-up.service";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { AddressService } from "src/app/common/services/address.service";
import { RegisterTradeMessageService } from "src/app/admin/settings/setting/shared/services/registerTrade-message.service";
import { TranslateService } from "@ngx-translate/core";
//import { PaginationService } from '@custor/services/pagination.service';
//import { SearchCriteria } from 'app/admin/settings/setting/shared/models/register-trade-model';
import {
  CLIENTSTATUS,
  TRADETYPE,
  GENDERS,
} from "src/app/common/constants/consts";
import { LookupType } from "src/app/common/enums/common";
import { PaginationService } from "src/@custor/services/pagination.service";
import { SearchCriteria } from "../../shared/models/register-trade-model";
import { locale as langEnglish } from "../../lang/en";
import { locale as langEthiopic } from "../../lang/et";
import { EditMemberClientProfileComponent } from "./edit-member-client-profile/edit-member-client-profile.component";
@Component({
  selector: "app-update-members-client-information",
  templateUrl: "./update-members-client-information.component.html",
  styleUrls: ["./update-members-client-information.component.scss"],
})
export class UpdateMembersClientInformationComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  clientStatusList: StaticData[] = [];
  tradeTypeList: StaticData[] = [];
  dataSource: any;
  searchForm: FormGroup;
  memberClientTradeList: any;
  currentLang = "";
  businessTypes: StaticData[] = [];
  expandClose: boolean;
  customerSearchResult: CustomerSearchResultModel;
  searchDialog: MatDialogRef<SearchDialogComponent>;
  memberClientInfo: MemberClientRegiistrationModel[];
  memberViolationOnOff: boolean;
  regions: StaticData2[] = [];
  zones: StaticData2[] = [];
  genders: StaticData[] = [];
  selectedExchangeActorId: string;
  parentId = 0;
  totalCount = 0;
  memberClientInformationId: number;
  isUpdate: boolean;
  displayedColumns = [
    "no",
    "FullName",
    // "Gender",
    "BusinessFiledId",
    "DateAgreement",
    ///"RegularPhone",
    "MobilePhone",
    "RegionId",
    "ZoneId",
    "CommodityName",
    "Actions",
  ];

  constructor(
    private registerTardeService: RegisterTradeService,
    private toastr: ToastrService,
    private accountService: AccountService,
    private authService: AuthService,
    private dialog: MatDialog,
    private lookupService: LookUpService,
    private configService: ConfigurationService,
    private translationLoaderService: TranslationLoaderService,
    private addressService: AddressService,
    private registerTradeMessageService: RegisterTradeMessageService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    public paginationService: PaginationService
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.initForm();
    this.expandClose = true;
    this.memberViolationOnOff = false;
  }

  ngOnInit() {
    this.clientStatus();
    this.getBusinessType(this.currentLang);
    this.getRegions();
    this.getAllZones();
    this.tradeType();
    this.initStaticData();
    // @ts-ignore
    // if (this.canViewMemberClientInformation()) {
    //   this.searchForm.disable();
    // }
    this.onSubmit();
  }

  initForm() {
    this.searchForm = this.formBuilder.group({
      CustomerFullName: [null],
      OrganizationName: this.authService.currentUser.FullName,
      CustomerType: [null],
      ECXCode: [null, [Validators.required]],
      Status: ["", []],
      TradeType: ["", []],
    });
  }

  get ECXCode() {
    return this.searchForm.get("ECXCode");
  }

  get Status() {
    return this.searchForm.get("Status");
  }

  get TradeType() {
    return this.searchForm.get("TradeType");
  }

  getMemberClientTradeSearch(): SearchCriteria {
    const formModel = this.searchForm.getRawValue();
    const params = new SearchCriteria();
    params.Lang = this.currentLang;
    params.ExchangeActorId = this.authService.currentUser.ExchangeActorId;
    params.Status = formModel.Status ? formModel.Status : 0;
    params.TradeType = formModel.TradeType ? formModel.TradeType : 0;
    params.PageIndex = this.paginationService.page;
    params.PageSize = this.paginationService.pageCount;

    return params;
  }

  private clientStatus() {
    const lang = this.currentLang;
    let tradeExcution: StaticData = new StaticData();
    CLIENTSTATUS.forEach((pair) => {
      tradeExcution = {
        Id: pair.Id.toString(),
        Description: lang === "et" ? pair.Description : pair.DescriptionEnglish,
      };
      this.clientStatusList.push(tradeExcution);
    });
  }

  private tradeType() {
    const lang = this.currentLang;
    let tradeExcution: StaticData = new StaticData();
    TRADETYPE.forEach((pair) => {
      tradeExcution = {
        Id: pair.Id.toString(),
        Description: lang === "et" ? pair.Description : pair.DescriptionEnglish,
      };
      this.tradeTypeList.push(tradeExcution);
    });
  }

  onSubmit() {
    this.registerTardeService
      .searchClientInformation(this.getMemberClientTradeSearch())
      .subscribe((res) => {
        if (res.Items.length > 0) {
          this.memberClientInfo = res.Items;
          if (this.totalCount === 0) {
            this.totalCount = res.ItemsCount;
          }
          this.dataSource = new MatTableDataSource(res.Items);
          this.expandClose = false;
          this.memberViolationOnOff = true;
        } else {
          this.toastr.info(
            this.translate.instant("common.messages.NoRecordFound"),
            "",
            {
              closeButton: true,
            }
          );
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
    });
  }
  getDescriptionRegions(Status: any) {
    const clientStatus = this.regions.find((status) => status.Id === Status);
    return clientStatus ? clientStatus.Description : "";
  }
  getDescriptionZones(Status: any) {
    const clientStatus = this.zones.find((status) => status.Id === Status);
    return clientStatus ? clientStatus.Description : "";
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
  getDescriptionGenders(Status: any) {
    const clientStatus = this.genders.find((status) => status.Id === Status);
    return clientStatus ? clientStatus.Description : "";
  }
  clearForm() {
    this.searchForm.reset();
  }
  getBusinessType(lang: string) {
    this.lookupService
      .getLookup(lang, LookupType.BUSINESS_TYPE)
      .subscribe((res) => {
        this.businessTypes = res;
      });
  }
  getDescriptionBusinessSector(Status: any) {
    const clientStatus = this.businessTypes.find(
      (status) => status.Id === Status
    );
    return clientStatus ? clientStatus.Description : "";
  }

  // canViewMemberClientInformation() {
  //   this.accountService.userHasPermission(
  //     Permission.viewMemmberClientInformation
  //   );
  // }
  public openSearchDialog() {
    this.searchDialog = this.dialog.open(SearchDialogComponent, {
      disableClose: true,
      width: "900px",
      backdropClass: "custom-backdrop",
      minHeight: "300px",
    });
    this.searchDialog.afterClosed().subscribe((result) => {
      this.customerSearchResult = result;
      this.selectedExchangeActorId = this.customerSearchResult.ExchangeActorId;
      this.searchForm
        .get("ECXCode")
        .setValue(this.customerSearchResult.Ecxcode);
      this.searchForm
        .get("CustomerFullName")
        .setValue(this.customerSearchResult.FullName);
      this.searchForm
        .get("OrganizationName")
        .setValue(this.customerSearchResult.OrganizationName);
      this.searchForm
        .get("CustomerType")
        .setValue(this.customerSearchResult.CustomerType);
    });
  }
  getEditClientInformation(clientInformation: MemberClientRegiistrationModel) {
    this.parentId = clientInformation.MemberClientTradeId;
    this.memberClientInformationId =
      clientInformation.MemberClientInformationId;
    if (this.parentId && this.memberClientInformationId) {
      // this.registerTradeMessageService.updateMessage(
      //   clientInformation.MemberClientInformationId
      // );
      this.EditMemeberClientInformation();
    }
  }
  EditMemeberClientInformation() {
    this.isUpdate = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "95%";
    dialogConfig.height = "92%";
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      isUpdate: this.isUpdate,
      MemberClientTradeId: this.parentId,
      ExchangeActorId: this.selectedExchangeActorId,
      MemberClientInformationId: this.memberClientInformationId,
    };
    this.dialog.open(EditMemberClientProfileComponent, dialogConfig);
  }
  public switchPage(event: PageEvent) {
    this.paginationService.change(event);
    this.onSubmit();
  }
}
