import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {StaticData} from 'src/app/common/models/static-data.model';
import {RegisterTradeModel} from '../shared/models/register-trade-model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterTradeService} from '../shared/services/register-trade.service';
import {DataSharingService} from '../shared/services/dataSharingService';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {locale as langEnglish} from '../../../lang/en';
import {locale as langEthiopic} from '../../../lang/et';
import {MemberFinancialTradeDetailComponent} from './member-financial-trade-detail/member-financial-trade-detail.component';
import {MatTableDataSource} from '@angular/material/table';
import { ConfigurationService } from 'src/@custor/services/configuration.service';
import { TranslationLoaderService } from 'src/@custor/services/translation-loader.service';
import {AccountService} from "../../../../../@custor/services/security/account.service";

@Component({
  selector: 'app-member-financial-trade',
  templateUrl: './member-financial-trade.component.html',
  styleUrls: ['./member-financial-trade.component.scss']
})
export class MemberFinancialTradeComponent implements OnInit {

  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;

  selectedCustomerDetail: string;
  dataSource: any;
  reportTypeList: StaticData[];
  registerTrade: RegisterTradeModel;
  formRegisterTrade: FormGroup;
  private tempData: any[] = [];
  currentLang = '';

  displayedColumns = [
    'no',
    'TotalIncome',
    'TotalPerShare',
    'TotalFixedAsset',


    'TotalWealth',
    'TotalTemporaryDebts',
    'TotalLongTermDebts',

    'TotalDebts',
    'NetAssets',
    'Action'

  ];


  constructor(
    private registerService: RegisterTradeService,
    private dataSharingService: DataSharingService,
    private formBuilder: FormBuilder,
    private router: Router,
    private configService: ConfigurationService,
    private translationLoaderService: TranslationLoaderService,
    private dialog: MatDialog,
    private accountService: AccountService,
    private toaster: ToastrService
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.createRegisterTradeForm();

  }

  ngOnInit() {
    this.getReportType();
    this.dataSharingService
      .valueAdd.subscribe(
      result => {
        this.tempData.push(result);
        this.dataSource = new MatTableDataSource(this.tempData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
  }


  private createRegisterTradeForm() {
    this.formRegisterTrade = this.formBuilder.group({
      CustomerId: [null],
      ReportTypeId: [null, [Validators.required]],
      ReportStartDate: [null, [Validators.required]],
      ReportEndDate: [null, [Validators.required]],
      TradeNotAccomplished: [null]

    });
  }

  private getMemberClientRegistration(): RegisterTradeModel {
    const formModel = this.formRegisterTrade.value;
    const memberClientTrade = new RegisterTradeModel();
    memberClientTrade.MemberClientTradeId = 0; // this.isNewClientRegistrationPostModel ? 0 : this.MemberClientTradeId;
    memberClientTrade.ExchangeActorId = formModel.ExchangeActorId;
    // memberClientTrade.ReportEndDate = formModel.ReportEndDate;
    // memberClientTrade.ReportStartDate = formModel.ReportStartDate;
    memberClientTrade.ReportTypeId = formModel.ReportTypeId;
   // memberClientTrade.MemberTradeFinancials = this.tempData;

    return memberClientTrade;
  }

  searchCustomer() {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.maxWidth = '1000px';
    // dialogConfig.position = {
    //   top: '10%',
    //   left: '30%',
    // };
    //
    // dialogConfig.disableClose = true;
    //
    // const dialogRef = this.dialog.open(SearchComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(result => {
    //   this.registerTrade = this.formRegisterTrade.value;
    //   this.registerTrade.ExchangeActorId = result.customer.ExchangeActorId;
    //
    //   this.selectedCustomerDetail = 'Organization Name(Amh): ' + result.customer.OrganizationNameAmh +
    //     ', Organization Mobile Phone: ' + result.customer.OrganizationMobilePhone +
    //     ', ECXCode: ' + result.customer.Ecxcode;
    //   this.formRegisterTrade.patchValue(this.registerTrade);
    // });
  }

  AddOrEditMemeberFinancialClient(memberClientIndex, registerTrade) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '95%';
    dialogConfig.height = '100%';
    dialogConfig.disableClose = true;
    dialogConfig.data = {memberClientIndex, registerTrade};
    this.dialog.open(MemberFinancialTradeDetailComponent, dialogConfig);
  }

  private getReportType() {
    this.registerService.getReportType(this.currentLang).subscribe(res => {
      this.reportTypeList = res;
    });
  }

  saveOrUpdateMemberClient() {
    const postData = this.getMemberClientRegistration();
    this.registerService.saveOrUpdateMemberFinancial(postData).subscribe(res => {
      if (res != null) {
        this.toaster.success('Saved Successfully');
      }
    });

  }
}
