import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { RegisterTradeService } from "../shared/services/register-trade.service";
import { locale as langEnglish } from "../../../../lang/en";
import { locale as langEthiopic } from "../../../../lang/et";
import {
  ET_ALPHABET_WITHNEWLINE_REGEX,
  ALPHABET_WITHNEWLINE_REGEX,
  ALPHABET_WITHSPAC_EBACKSLASH__REGEX,
} from "src/app/common/constants/consts";
import { MemberClientTrade } from "../shared/models/register-trade-model";
import { TranslateService } from "@ngx-translate/core";
import { PaginationService } from "src/@custor/services/pagination.service";
import { MemberFinancialAditor } from "../shared/models/MemberFinancialAditor";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { AuthService } from "src/@custor/services/security/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ReportTypeMessageService } from "../shared/services/report-type-message.service";
@Component({
  selector: "app-send-report-to-ecea",
  templateUrl: "./send-report-to-ecea.component.html",
  styleUrls: ["./send-report-to-ecea.component.scss"],
})
export class SendReportToEceaComponent implements OnInit {
  sendReportForm: FormGroup;
  currentLang = "";
  maxDate = new Date();
  totalCount = 0;
  dataSource: any;
  //memberClientTradeId = 0;
  memberAuditTradeId = "";
  reportTypeId = 0;
  selectedExchangeActorId: string;
  MemberAuditor: MemberFinancialAditor;
  MemberQuarterReport: MemberClientTrade;
  constructor(
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private translationLoaderService: TranslationLoaderService,
    private configService: ConfigurationService,
    private registerTradeService: RegisterTradeService,
    // public dialogRef: MatDialogRef<any>,
    private translate: TranslateService,
    public paginationService: PaginationService,
    private ngxUiService: NgxUiLoaderService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private reportTypeMessageService: ReportTypeMessageService
  ) {
    this.currentLang = this.configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.createFormGroup();
  }

  ngOnInit() {
    this.reportTypeMessageService.currentMessage.subscribe((res) => {
      this.reportTypeId = res;
    });
    if (this.reportTypeId == 4) {
      this.route.queryParamMap.subscribe(
        (params: any) =>
          (this.MemberAuditor = JSON.parse(params.params.annualAudit))
      );
    } else {
      this.route.queryParamMap.subscribe(
        (params: any) =>
          (this.MemberQuarterReport = JSON.parse(
            params.params.memberQuarterReport
          ))
      );
    }
    this.selectedExchangeActorId = this.authService.currentUser.ExchangeActorId;
    this.getEditMemberAnnualAuditerById(this.selectedExchangeActorId);
  }
  private createFormGroup() {
    this.sendReportForm = this.formBuilder.group({
      PreparedByFirstNameAmh: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(ET_ALPHABET_WITHNEWLINE_REGEX),
        ]),
      ],

      PreparedByFirstName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(ALPHABET_WITHNEWLINE_REGEX),
        ]),
      ],
      PreparedByFatherNameAmh: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(ET_ALPHABET_WITHNEWLINE_REGEX),
        ]),
      ],

      PreparedByFatherName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(ALPHABET_WITHNEWLINE_REGEX),
        ]),
      ],
      PreparedByGrandFatherNameAmh: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(ET_ALPHABET_WITHNEWLINE_REGEX),
        ]),
      ],

      PreparedByGrandFatherName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(ALPHABET_WITHSPAC_EBACKSLASH__REGEX),
        ]),
      ],

      ApprovedByFirstName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(ALPHABET_WITHSPAC_EBACKSLASH__REGEX),
        ]),
      ],
      ApprovedByFirstNameAmh: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(ET_ALPHABET_WITHNEWLINE_REGEX),
        ]),
      ],
      ApprovedByFatherName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(ALPHABET_WITHSPAC_EBACKSLASH__REGEX),
        ]),
      ],
      ApprovedByFatherNameAmh: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(ET_ALPHABET_WITHNEWLINE_REGEX),
        ]),
      ],

      ApprovedByGrandFatherName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(ALPHABET_WITHSPAC_EBACKSLASH__REGEX),
        ]),
      ],
      ApprovedByGrandFatherNameAmh: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(ET_ALPHABET_WITHNEWLINE_REGEX),
        ]),
      ],
      PreparedDate: new Date(),
      ApproveDate: new Date(),
    });
  }
  get ApprovedByFirstName() {
    return this.sendReportForm.get("ApprovedByFirstName");
  }
  get ApprovedByFirstNameAmh() {
    return this.sendReportForm.get("ApprovedByFirstNameAmh");
  }

  get ApprovedByFatherNameAmh() {
    return this.sendReportForm.get("ApprovedByFatherNameAmh");
  }
  get ApprovedByFatherName() {
    return this.sendReportForm.get("ApprovedByFatherName");
  }

  get ApprovedByGrandFatherName() {
    return this.sendReportForm.get("ApprovedByGrandFatherName");
  }
  get ApprovedByGrandFatherNameAmh() {
    return this.sendReportForm.get("ApprovedByGrandFatherNameAmh");
  }

  get ApproveDate() {
    return this.sendReportForm.get("ApproveDate");
  }
  get PreparedByFirstNameAmh() {
    return this.sendReportForm.get("PreparedByFirstNameAmh");
  }

  get PreparedByFirstName() {
    return this.sendReportForm.get("PreparedByFirstName");
  }

  get PreparedByFatherName() {
    return this.sendReportForm.get("PreparedByFatherName");
  }

  get PreparedByFatherNameAmh() {
    return this.sendReportForm.get("PreparedByFatherNameAmh");
  }
  get PreparedByGrandFatherNameAmh() {
    return this.sendReportForm.get("PreparedByGrandFatherNameAmh");
  }
  get PreparedByGrandFatherName() {
    return this.sendReportForm.get("PreparedByGrandFatherName");
  }
  get PreparedDate() {
    return this.sendReportForm.get("PreparedDate");
  }

  get Position() {
    return this.sendReportForm.get("Position");
  }
  get PositionAmh() {
    return this.sendReportForm.get("PositionAmh");
  }
  private sendReportToECEA(): MemberClientTrade {
    const formModel = this.sendReportForm.getRawValue();
    const tradeRegistrationData = new MemberClientTrade();
    tradeRegistrationData.MemberClientTradeId =
      this.MemberQuarterReport.MemberClientTradeId;
    tradeRegistrationData.ExchangeActorId =
      this.MemberQuarterReport.ExchangeActorId;
    tradeRegistrationData.ReportTypeId = this.MemberQuarterReport.ReportTypeId;
    tradeRegistrationData.IsActive = this.MemberQuarterReport.IsActive;
    tradeRegistrationData.IsDeleted = this.MemberQuarterReport.IsDeleted;
    tradeRegistrationData.CreatedDateTime =
      this.MemberQuarterReport.CreatedDateTime;
    tradeRegistrationData.CreatedUserId =
      this.MemberQuarterReport.CreatedUserId;
    tradeRegistrationData.UpdatedDateTime =
      this.MemberQuarterReport.UpdatedDateTime;
    tradeRegistrationData.UpdatedUserId =
      this.MemberQuarterReport.UpdatedUserId;
    tradeRegistrationData.IsTradeExcutionAccomplished =
      this.MemberQuarterReport.IsTradeExcutionAccomplished;
    tradeRegistrationData.TradeExcutionNotAccomplish =
      this.MemberQuarterReport.TradeExcutionNotAccomplish;
    tradeRegistrationData.Year = this.MemberQuarterReport.Year;
    tradeRegistrationData.Remark = this.MemberQuarterReport.Remark;
    tradeRegistrationData.ReportDate = new Date();
    tradeRegistrationData.ReportPeriodId =
      this.MemberQuarterReport.ReportPeriodId;
    tradeRegistrationData.TradeExcutionStatusTypeId = 2;
    tradeRegistrationData.WorkFlowStatus =
      this.MemberQuarterReport.WorkFlowStatus;
    tradeRegistrationData.StartDate = this.MemberQuarterReport.StartDate;
    tradeRegistrationData.DeadLine = this.MemberQuarterReport.DeadLine;
    tradeRegistrationData.PreparedByFirstName = formModel.PreparedByFirstName;
    tradeRegistrationData.PreparedByFirstNameAmh =
      formModel.PreparedByFirstNameAmh;
    tradeRegistrationData.PreparedDate = formModel.PreparedDate;
    tradeRegistrationData.PreparedByFatherName = formModel.PreparedByFatherName;
    tradeRegistrationData.PreparedByFatherNameAmh =
      formModel.PreparedByFatherNameAmh;
    tradeRegistrationData.PreparedByGrandFatherName =
      formModel.PreparedByGrandFatherName;
    tradeRegistrationData.PreparedByGrandFatherNameAmh =
      formModel.PreparedByGrandFatherNameAmh;

    tradeRegistrationData.ApproveDate = formModel.ApproveDate;
    tradeRegistrationData.ApprovedByFirstName = formModel.ApprovedByFirstName;
    tradeRegistrationData.ApprovedByFirstNameAmh =
      formModel.ApprovedByFirstNameAmh;
    tradeRegistrationData.ApprovedByFatherName = formModel.ApprovedByFatherName;
    tradeRegistrationData.ApprovedByFatherNameAmh =
      formModel.ApprovedByFatherNameAmh;
    tradeRegistrationData.ApprovedByGrandFatherName =
      formModel.ApprovedByGrandFatherName;
    tradeRegistrationData.ApprovedByGrandFatherNameAmh =
      formModel.ApprovedByGrandFatherNameAmh;

    tradeRegistrationData.Position = formModel.Position;
    tradeRegistrationData.PositionAmh = formModel.PositionAmh;
    return tradeRegistrationData;
  }
  private sendAnnualReportToECEA(): MemberFinancialAditor {
    const formModel = this.sendReportForm.getRawValue();
    const tradeRegistrationData = new MemberFinancialAditor();
    tradeRegistrationData.MemberFinancialAuditorId =
      this.MemberAuditor.MemberFinancialAuditorId;
    tradeRegistrationData.ExchangeActorId = this.MemberAuditor.ExchangeActorId;
    tradeRegistrationData.ReportTypeId = this.MemberAuditor.ReportTypeId;
    tradeRegistrationData.Year = this.MemberAuditor.Year;
    tradeRegistrationData.Remark = this.MemberAuditor.Remark;
    tradeRegistrationData.ReportDate = new Date();
    tradeRegistrationData.ReportPeriodId = this.MemberAuditor.ReportPeriodId;
    tradeRegistrationData.TradeExcutionStatusTypeId = 2;
    tradeRegistrationData.AnnualBudgetCloserId =
      this.MemberAuditor.AnnualBudgetCloserId;
    tradeRegistrationData.CustomerTypeId = this.MemberAuditor.CustomerTypeId;
    tradeRegistrationData.Ecxcode = this.MemberAuditor.Ecxcode;
    tradeRegistrationData.Status = this.MemberAuditor.Status;
    tradeRegistrationData.StartDate = this.MemberAuditor.StartDate;
    tradeRegistrationData.EndDate = this.MemberAuditor.EndDate;
    tradeRegistrationData.PreparedByFirstName = formModel.PreparedByFirstName;
    tradeRegistrationData.PreparedByFirstNameAmh =
      formModel.PreparedByFirstNameAmh;
    tradeRegistrationData.PreparedDate = formModel.PreparedDate;
    tradeRegistrationData.PreparedByFatherName = formModel.PreparedByFatherName;
    tradeRegistrationData.PreparedByFatherNameAmh =
      formModel.PreparedByFatherNameAmh;
    tradeRegistrationData.PreparedByGrandFatherName =
      formModel.PreparedByGrandFatherName;
    tradeRegistrationData.PreparedByGrandFatherNameAmh =
      formModel.PreparedByGrandFatherNameAmh;

    tradeRegistrationData.ApproveDate = formModel.ApproveDate;
    tradeRegistrationData.ApprovedByFirstName = formModel.ApprovedByFirstName;
    tradeRegistrationData.ApprovedByFirstNameAmh =
      formModel.ApprovedByFirstNameAmh;
    tradeRegistrationData.ApprovedByFatherName = formModel.ApprovedByFatherName;
    tradeRegistrationData.ApprovedByFatherNameAmh =
      formModel.ApprovedByFatherNameAmh;
    tradeRegistrationData.ApprovedByGrandFatherName =
      formModel.ApprovedByGrandFatherName;
    tradeRegistrationData.ApprovedByGrandFatherNameAmh =
      formModel.ApprovedByGrandFatherNameAmh;
    return tradeRegistrationData;
  }

  saveSendReportToECEA() {
    if (this.reportTypeId == 4) {
      this.ngxUiService.start();
      this.registerTradeService
        .updateFinancialAuditor(this.sendAnnualReportToECEA())
        .subscribe((res) => {
          if (res) {
            this.ngxUiService.stop();
            this.toaster.success(
              this.translate.instant("common.messages.SendSuccess"),
              "",
              {
                closeButton: true,
              }
            );
            this.router.navigate([
              "/main/registertrade/annual-financial-auditor-list",
            ]);
          } else {
            this.ngxUiService.stop();
            this.toaster.warning(
              this.translate.instant("common.messages.Error"),
              "",
              {
                closeButton: true,
              }
            );
          }
        });
    } else {
      this.ngxUiService.start();
      this.registerTradeService
        .updateMemberTradeExecution(this.sendReportToECEA())
        .subscribe((res) => {
          if (res) {
            if (res) {
              this.ngxUiService.stop();
              this.toaster.success(
                this.translate.instant("common.messages.SendSuccess"),
                "",
                {
                  closeButton: true,
                }
              );
              this.router.navigate([
                "/main/registertrade/send-trade-execution",
              ]);
            } else {
              this.ngxUiService.stop();
              this.toaster.warning(
                this.translate.instant("common.messages.Error"),
                "",
                {
                  closeButton: true,
                }
              );
            }
          }
        });
    }
  }
  onClose() {
    // this.dialogRef.close();
  }
  clearForm() {
    this.createFormGroup();
  }
  getEditMemberAnnualAuditerById(exchangeActorId: string) {
    if (this.reportTypeId == 4) {
      this.registerTradeService
        .getEditMemberAnnualAuditerById(exchangeActorId)
        .subscribe((res) => {
          if (res) {
            this.sendReportForm.patchValue(res);
          }
        });
    } else {
      this.registerTradeService
        .getEditMemberClientTradeById(exchangeActorId)
        .subscribe((res) => {
          if (res) {
            this.sendReportForm.patchValue(res);
          }
        });
    }
  }
}
