import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ConfigurationService} from 'src/@custor/services/configuration.service';
import {TranslationLoaderService} from 'src/@custor/services/translation-loader.service';
import {ToastrService} from 'ngx-toastr';
import {locale as langEnglish} from '../lang/en';
import {locale as langEthiopic} from '../lang/et';
// import {LookupService} from 'app/main/shared/services/lookup.service';
import {MatPaginator, MatSort, MatTableDataSource, MatDialogConfig, MatDialog, PageEvent} from '@angular/material';
import {RegisterTradeModel, NotificationParms} from '../shared/models/register-trade-model';
// import {MemberSearchComponent} from '../../shared/member-search/member-search.component';
import {MemberClientDetailComponent} from './member-client-detail/member-client-detail.component';
import {MemberClientRegiistrationModel} from '../shared/models/member-client-regiistration-model';
import {StaticData, StaticData5} from 'src/app/common/models/static-data.model';
import {RegisterTradeService} from '../shared/services/register-trade.service';
import {RegisterTradeMessageService} from '../shared/services/registerTrade-message.service';

import {LookUpService} from 'src/app/common/services/look-up.service';
import {
  AngConfirmDialogComponent} from 'src/@custor/components/confirm-dialog/confirm-dialog.component';
import {CLIENTSTATUS, TRADETYPE} from 'src/app/common/constants/consts';
import {TranslateService} from "@ngx-translate/core";
import {LookupType} from "src/app/common/enums/common";
import {Permission} from "../../../../../@custor/models/permission.model";
import {AccountService} from "../../../../../@custor/services/security/account.service";
import { PaginationService } from 'src/@custor/services/pagination.service';

@Component({
  selector: 'app-member-client',
  templateUrl: './member-client.component.html',
  styleUrls: ['./member-client.component.scss']
})
export class MemberClientComponent implements OnInit {


  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  dataSource: any;
  MemberClientTradeId: number;
  tradeTypeList: StaticData[] = [];
  formMemberClientTrade: FormGroup;
  reportTypeList: StaticData[];
  currentLang = '';
  businessTypes: StaticData5[] = [];
  memberClientTradeId: number;
  clientStatusList: StaticData[] = [];
  totalCount = 0;
  displayedClientInformation = [
    'no',
    'CustomerFullName',
    'FullName',
    'BusinessFiledId',
    'DateAgreement',
    'RegularPhone',
    'MobilePhone',
    'TradeTypeId',
    'CommodityName',
    'Status',
    'Actions'
  ];

  constructor(
    private registerService: RegisterTradeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private lookupService: LookUpService,
    configService: ConfigurationService,
    private translationLoaderService: TranslationLoaderService,
    private toaster: ToastrService,
    private dialog: MatDialog,
    private accountService: AccountService,
    private registerTradeMessageService: RegisterTradeMessageService,
    private translate: TranslateService,
    public paginationService: PaginationService
    // public dialogRef: MatDialogRef<any>
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.dataSource = new MatTableDataSource();

    this.createRegisterTradeForm();
  }

  ngOnInit() {
    this.registerTradeMessageService.messageCurrent.subscribe(msg => {
      this.memberClientTradeId = msg;
      if (this.memberClientTradeId !== 0) {
        this.getAllMemberClientInformationById();
      }
    });
    // this.getAllMemberClientInformationById();
    this.getReportType();
    this.initStaticData();
    this.getClientStatus();
    this.getBusinessType(this.currentLang);
  }


  private createRegisterTradeForm() {
    this.formMemberClientTrade = this.formBuilder.group({
      MemberClientTradeId: [null],
      CustomerId: [null],
      ReportTypeId: [null, [Validators.required]],
      ReportStartDate: [null, [Validators.required]],
      ReportEndDate: [null, [Validators.required]],
      TradeNotAccomplished: [null]

    });

  }

  private getMemberClientRegistration(): RegisterTradeModel {
    const formModel = this.formMemberClientTrade.getRawValue();
    const memberClientTrade = new RegisterTradeModel();
    memberClientTrade.MemberClientTradeId = 0; // this.isNewClientRegistrationPostModel ? 0 : this.MemberClientTradeId;
    memberClientTrade.ExchangeActorId = formModel.ExchangeActorId;
    // memberClientTrade.ReportEndDate = formModel.ReportEndDate;
    // memberClientTrade.ReportStartDate = formModel.ReportStartDate;
    memberClientTrade.ReportTypeId = formModel.ReportTypeId;
    // memberClientTrade.MemberClientInformations = this.tempData;
    return memberClientTrade;
  }

  searchCustomer() {

    //   const dialogConfig = new MatDialogConfig();
    //   dialogConfig.maxWidth = '1000px';
    //   dialogConfig.position = {
    //     top: '10%',
    //     left: '30%',
    //   };
    //
    //   dialogConfig.disableClose = true;
    //
    //   const dialogRef = this.dialog.open(SearchComponent, dialogConfig);
    //   dialogRef.afterClosed().subscribe(result => {
    //     this.memberClientTrade = this.formMemberClientTrade.value;
    //     this.memberClientTrade.ExchangeActorId = result.customer.ExchangeActorId;
    //
    //     this.selectedCustomerDetail = 'Organization Name(Amh): ' + result.customer.OrganizationNameAmh +
    //       ', Organization Mobile Phone: ' + result.customer.OrganizationMobilePhone +
    //       ', ECXCode: ' + result.customer.Ecxcode;
    //     this.formMemberClientTrade.patchValue(this.formMemberClientTrade);
    //   });
  }

  AddMemeberClientInformation() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '80%';
    dialogConfig.height = '75%';
    dialogConfig.disableClose = true;
    // dialogConfig.data = {memberClientIndex, memberClientTrade};
    this.dialog.open(MemberClientDetailComponent, dialogConfig);

    //   .afterClosed().subscribe(result => {
    //   // this.tempData.push(result.formModel);
    //   // this.dataSource = this.tempData;
    // });

  }


  EditMemeberClientInformation() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '80%';
    dialogConfig.height = '75%';
    dialogConfig.disableClose = true;
    // dialogConfig.data = {memberClientIndex, memberClientTrade};
    this.dialog.open(MemberClientDetailComponent, dialogConfig);

    //   .afterClosed().subscribe(result => {
    //   // this.tempData.push(result.formModel);
    //   // this.dataSource = this.tempData;
    // });

  }

  private getReportType() {
    this.registerService.getReportType(this.currentLang).subscribe(res => {
      this.reportTypeList = res;
    });
  }

  saveOrUpdateMemberClient() {
    // if (this.formMemberClientTrade.valid) {
    //   return;
    // }
    // if (this.isNewClientRegistrationPostModel) {
    const postData = this.getMemberClientRegistration();
    this.registerService.saveOrUpdateMemberClient(postData).subscribe(res => {
      if (res != null) {
        this.toaster.success(this.translate.instant('common.messages.Saved'), '', {
          closeButton: true
        });
      }
    });
    this.formMemberClientTrade.reset();
    this.dataSource = '';
    // }
  }

  deleteMemberClientInformation(deletClientInfo: MemberClientRegiistrationModel) {
    const clientInformation: MemberClientRegiistrationModel = {
      MemberClientInformationId: deletClientInfo.MemberClientInformationId,
       MemberClientTradeId: deletClientInfo.MemberClientTradeId,
      BusinessSector: deletClientInfo.BusinessSector,
      AgreementDate: deletClientInfo.AgreementDate,
      KebeleId: deletClientInfo.KebeleId,
      ZoneId: deletClientInfo.ZoneId,
      RegionId: deletClientInfo.RegionId,
     // CommidityTypeId: deletClientInfo.CommidityTypeId,
     // CommodityId: deletClientInfo.CommodityId,
      CreatedDateTime: deletClientInfo.CreatedDateTime,
      CreatedUserId: deletClientInfo.CreatedUserId,
      FatherNameAmh: deletClientInfo.FatherNameAmh,
      FatherNameEng: deletClientInfo.FatherNameEng,
      FirstNameAmh: deletClientInfo.FirstNameAmh,
      FirstNameEng: deletClientInfo.FirstNameEng,
      Gender: deletClientInfo.Gender,
      GrandFatherNameAmh: deletClientInfo.GrandFatherNameAmh,
      GrandFatherNameEng: deletClientInfo.GrandFatherNameEng,
      HouseNo: deletClientInfo.HouseNo,
      IsActive: deletClientInfo.IsActive,
      IsDeleted: deletClientInfo.IsDeleted,
      MobilePhone: deletClientInfo.MobilePhone,
      RegularPhone: deletClientInfo.RegularPhone,
      Status: deletClientInfo.Status,
      TradeService: deletClientInfo.TradeService,
      TradeTypeId: deletClientInfo.TradeTypeId,
      UpdatedDateTime: deletClientInfo.UpdatedDateTime,
      UpdatedUserId: deletClientInfo.UpdatedUserId,
      WoredaId: deletClientInfo.WoredaId,
      BusinessFiledId: deletClientInfo.BusinessFiledId,
      ExchangeActorId: deletClientInfo.ExchangeActorId,
      ClientTypeId: deletClientInfo.ClientTypeId,
      OrganizationNameAmh: deletClientInfo.OrganizationNameAmh,
      OrganizationNameEng: deletClientInfo.OrganizationNameEng,
      EcxClientCode: deletClientInfo.EcxClientCode
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '20%';
    dialogConfig.height = '25%';
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(AngConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.registerService.deleteMemberClientInformation(clientInformation).subscribe(() => {
          this.getAllMemberClientInformationById();
          this.toaster.success(this.translate.instant('common.messages.Deleted'), '', {
            closeButton: true
          });

        });
      }
    });
  }

  getAllMemberClientInformationById() {
    this.registerService
    .getAllMemberClientInformationById(this.getMemberTradeParameters())
    .subscribe((result) => {
      if (result.Items.length > 0) {
        if (this.totalCount === 0) {
          this.totalCount = result.ItemsCount;
        }
        this.dataSource = new MatTableDataSource(result.Items);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

    });
  }

  getEditClientInformation(clientInformation: MemberClientRegiistrationModel) {
    if (clientInformation) {
      this.registerTradeMessageService.updateMessage(clientInformation.MemberClientInformationId);
      this.registerTradeMessageService.sendMessage(clientInformation.ExchangeActorId);
      this.router.navigate(['main/registertrade/member-client-detail'], {});
    }

  }

  private initStaticData() {
    const lang = this.currentLang;
    let tradeType: StaticData = new StaticData();
    TRADETYPE.forEach(pair => {
      tradeType = {
        Id: pair.Id,
        Description: (lang === 'et' ? pair.Description : pair.DescriptionEnglish)
      };
      this.tradeTypeList.push(tradeType);

    });
  }

  private getClientStatus() {
    const lang = this.currentLang;
    let tradeType: StaticData = new StaticData();
    CLIENTSTATUS.forEach(pair => {
      tradeType = {
        Id: pair.Id,
        Description: (lang === 'et' ? pair.Description : pair.DescriptionEnglish)
      };
      this.clientStatusList.push(tradeType);

    });
  }

  getDescriptionTradeType(TradeTypeId: any) {
    const tradeAccoplished = this.tradeTypeList.find(item => item.Id === TradeTypeId);
    return tradeAccoplished ? tradeAccoplished.Description : '';
  }

  getDescriptionClientStatus(Status: any) {
    const clientStatus = this.clientStatusList.find(status => status.Id === Status);
    return clientStatus ? clientStatus.Description : '';
  }

  getBusinessType(lang: string) {
    this.lookupService.getLookup2(lang, LookupType.BUSINESS_TYPE).subscribe(res => {
      this.businessTypes = res;
    });
  }

  getDescriptionBusinessSector(Status: any) {
    const clientStatus = this.businessTypes.find(status => status.Id === Status);
    return clientStatus ? clientStatus.Description : '';
  }

  setClientStatusColor(Status) {
    switch (Status) {
      case 1:
        return 'blue';
      case 2:
        return 'red';
    }
  }
  // canCreateClientInformation() {
  //   this.accountService.userHasPermission(Permission.createClientInformation);
  // }
  private getMemberTradeParameters(): NotificationParms {
    const params = new NotificationParms();
    params.MemberClientTradeId = this.memberClientTradeId;
    params.Lang = this.currentLang;
    params.PageIndex = this.paginationService.page;
    params.PageSize = this.paginationService.pageCount;
    return params;
  }
  public switchPage(event: PageEvent) {
    this.paginationService.change(event);
    this.getAllMemberClientInformationById();
  }
}
