import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterTradeService } from '../shared/services/register-trade.service';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterClientTradeModel, RegisterTradeModel, SearchCriteria } from '../shared/models/register-trade-model';

import { locale as langEnglish } from '../lang/en';
import { locale as langEthiopic } from '../lang/et';
import { StaticData } from 'src/app/common/models/static-data.model';
import { RegisterTradeMessageService } from '../shared/services/registerTrade-message.service';
import { ConfigurationService } from 'src/@custor/services/configuration.service';
import { TranslationLoaderService } from 'src/@custor/services/translation-loader.service';
import { TranslateService } from "@ngx-translate/core";
import { CommonConfirmDialogComponent } from 'src/@custor/components/common-confirm-dialog/common-confirm-dialog.component';
import { Permission } from "../../../../../@custor/models/permission.model";
import { AccountService } from "../../../../../@custor/services/security/account.service";
import { AuthService } from "../../../../../@custor/services/security/auth.service";
import { WORK_FLOW } from "src/app/common/models/workFlow";

@Component({
  selector: 'app-member-client-trade-list',
  templateUrl: './member-client-trade-list.component.html',
  styleUrls: ['./member-client-trade-list.component.scss']
})
export class MemberClientTradeListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  searchForm: FormGroup;
  dataSource: any;
  count: number;
  reportTypeList: StaticData[];
  reportPeriodList: StaticData[] = [];
  currentLang = '';
  organizationList: StaticData[] = [];
  memberId: number;
  memberClientTradeId: number;
  private workFlowStatus: number;
  private userId: string;
  displayedColumns = [
    'sn',
    'CustomerFullName',
    'OrganizationName',
    'CustomerType',

    'RegularPhone',
    'MobilePhone',
    'DateReport',
    'ReportTypeName',

    'Action'
  ];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    configService: ConfigurationService,
    private translationLoaderService: TranslationLoaderService,
    private registerMessageService: RegisterTradeMessageService,
    private registerTradeService: RegisterTradeService,
    private translate: TranslateService,
    private accountService: AccountService,
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.initForm();
  }

  ngOnInit() {
    this.getReportType();
    this.getRePortPeriod();
    this.getListOfMemberReport();
    this.registerMessageService.messageSource.subscribe(result => {
      if (result !== 0) {
        this.getListOfReportedMembers(result);
      }
    });
    this.registerTradeService.getMemberTradeReportList(this.currentLang).subscribe(res => {
      this.count = res.length;
    });
    this.registerMessageService.messageSource.subscribe(result => {
      this.memberClientTradeId = result;
    });
    this.getPermissionWorkFlow();
  }

  getListOfMemberReport() {
    this.registerTradeService.getMemberTradeReportList(this.currentLang).subscribe(res => {
      this.organizationList = res;
    });

  }

  getPermissionWorkFlow() {
    if (this.accountService.userHasPermission(Permission.prepare)) {
      this.workFlowStatus = WORK_FLOW[0].Id;
    } else if (this.accountService.userHasPermission(Permission.checker)) {
      this.workFlowStatus = WORK_FLOW[1].Id;
    } else if (this.accountService.userHasPermission(Permission.approverOne)) {
      this.workFlowStatus = WORK_FLOW[2].Id;
    } else if (this.accountService.userHasPermission(Permission.approverTwo)) {
      this.workFlowStatus = WORK_FLOW[3].Id;
    }
  }

  getRePortPeriod() {
    this.registerTradeService.getRePortPeriod(this.currentLang).subscribe(res => {
      this.reportPeriodList = res;
    });
  }


  getAllMemberClientTrade() {
    this.registerTradeService.getAllMemberClientTrade(this.currentLang).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  initForm() {
    this.searchForm = this.formBuilder.group({
      From: ['', []],
      To: ['', []],
      ReportTypeId: ['', []],
      ECXCode: ['', []],
      Year: [(new Date()).getFullYear()],
      ReportPeriodId: ['', []]
    });
  }

  getMemberClientTradeSearch(): SearchCriteria {
    const formModel = this.searchForm.getRawValue();
    const params = new SearchCriteria();
    params.From = formModel.From ? formModel.From.toDateString() : '';
    params.To = formModel.To ? formModel.To.toDateString() : '';
    params.ECXCode = formModel.ECXCode ? formModel.ECXCode : '';
    params.ReportTypeId = formModel.ReportTypeId ? formModel.ReportTypeId : 0;
    params.Year = formModel.Year ? formModel.Year : 0;
    params.ReportPeriodId = formModel.ReportPeriodId ? formModel.ReportPeriodId : 0;
    return params;
  }

  getListOfReportedMembers(memberClientTradeId: number) {
    this.registerTradeService.getListOfReportedMembers(memberClientTradeId).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  private getReportType() {
    this.registerTradeService.getReportType(this.currentLang).subscribe(res => {
      this.reportTypeList = res;
    });
  }

  editRegisterTrade(registerTrade: RegisterTradeModel) {
    if (registerTrade) {
      this.registerMessageService.updateMessage(registerTrade.MemberClientTradeId);
      this.router.navigate(['/main/registertrade/view-trade-execution']);
    }
  }


  sendMemberTradeExcution(tradeExcution: RegisterTradeModel) {
    const memberTrade: RegisterClientTradeModel = {
      MemberClientTradeId: tradeExcution.MemberClientTradeId,
      ExchangeActorId: tradeExcution.ExchangeActorId,
      ReportPeriodId: tradeExcution.ReportPeriodId,
      IsTradeExcutionAccomplished: tradeExcution.IsTradeExcutionAccomplished,
      ReportTypeId: tradeExcution.ReportTypeId,
      ReportDate: tradeExcution.ReportDate,
      TradeExcutionNotAccomplish: tradeExcution.TradeExcutionNotAccomplish,
      TradeExcutionStatusTypeId: 3,
      Year: tradeExcution.Year,
      Remark: tradeExcution.Remark,
      CreatedDateTime: tradeExcution.CreatedDateTime,
      CreatedUserId: this.userId,
      IsActive: tradeExcution.IsActive,
      IsDeleted: tradeExcution.IsDeleted,
      UpdatedDateTime: tradeExcution.UpdatedDateTime,
      UpdatedUserId: this.userId,
      WorkFlowStatus: this.workFlowStatus,
      Position: tradeExcution.Position,
      PositionAmh: tradeExcution.PositionAmh,
      PreparedByFatherName: tradeExcution.PreparedByFatherName,
      PreparedByFatherNameAmh: tradeExcution.PreparedByFatherNameAmh,
      PreparedByFirstName: tradeExcution.PreparedByFirstName,
      PreparedByFirstNameAmh: tradeExcution.PreparedByFirstNameAmh,
      PreparedByGrandFatherName: tradeExcution.PreparedByGrandFatherName,
      PreparedByGrandFatherNameAmh: tradeExcution.PreparedByGrandFatherNameAmh,
      PreparedDate: tradeExcution.PreparedDate,
      ApproveDate: tradeExcution.ApproveDate,
      ApprovedByFirstName: tradeExcution.ApprovedByFirstName,
      ApprovedByFatherName: tradeExcution.ApprovedByFatherName,
      ApprovedByFatherNameAmh: tradeExcution.ApprovedByFatherNameAmh,
      ApprovedByFirstNameAmh: tradeExcution.ApprovedByFirstNameAmh,
      ApprovedByGrandFatherName: tradeExcution.ApprovedByGrandFatherName,
      ApprovedByGrandFatherNameAmh: tradeExcution.ApprovedByGrandFatherNameAmh,
      DoYouHaveNewCustomerId: tradeExcution.DoYouHaveNewCustomerId

    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '25%';
    dialogConfig.height = '30%';
    dialogConfig.disableClose = true;
    dialogConfig.data = { message: this.translate.instant('registerTrade.editor.MemberCLientReportApprove') };

    const dialogRef = this.dialog.open(CommonConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.registerTradeService.updateMemberTradeExecution(memberTrade).subscribe(() => {
          this.toastr.success(this.translate.instant('common.messages.Approved'), '', {
            closeButton: true
          });
          this.getListOfMemberReport();
          this.registerTradeService.getMemberTradeReportList(this.currentLang).subscribe(result => {
            this.count = result.length;
          });
          this.getListOfReportedMembers(this.memberId);
        });
      }
    });
  }


}
