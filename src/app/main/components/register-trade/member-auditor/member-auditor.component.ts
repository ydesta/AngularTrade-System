import { Component, OnInit, ViewChild } from "@angular/core";
import { MemberAuditor } from "./_interface/memberauditor.model";
import {
  MatTableDataSource,
  MatSort,
  MatDialog,
  MatDialogConfig,
} from "@angular/material";
import { MatPaginator } from "@angular/material/paginator";
import { MemberAuditorService } from "../shared/member-auditor.service";
import { Router } from "@angular/router";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { locale as langEnglish } from "../lang/en";
import { locale as langEthiopic } from "../lang/et";
import { DataSharingService } from "../shared/services/dataSharingService";
import { RegisterTradeService } from "../shared/services/register-trade.service";
import { MemberAndAuditorAgreementComponent } from "./member-and-auditor-agreement/member-and-auditor-agreement.component";
import { AuthService } from "src/@custor/services/security/auth.service";
import { CommonConfirmDialogComponent } from "src/@custor/components/common-confirm-dialog/common-confirm-dialog.component";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: "app-member-auditor",
  templateUrl: "./member-auditor.component.html",
  styleUrls: ["./member-auditor.component.scss"],
})
export class MemberAuditorComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  public memberAuditors: MemberAuditor[];
  public errorMessage: string = "";
  public displayedColumns = [
    "id",
    "OrganiztionName",
    "EcxCode",
    "FromDate",
    "ToDate",
    "Action",
  ];
  public dataSource = new MatTableDataSource<MemberAuditor>();
  currentLang = "";
  isUpdate: boolean;
  parentId = 0;
  selectExchangeActorId = this.authService.currentUser.ExchangeActorId;
  constructor(
    public service: MemberAuditorService,
    private router: Router,
    private configService: ConfigurationService,
    private dataSharingService: DataSharingService,
    private registerService: RegisterTradeService,
    private dialog: MatDialog,
    private authService: AuthService,
    private translate: TranslateService,
    private toster: ToastrService,
    private translationLoaderService: TranslationLoaderService
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
  }

  ngOnInit(): void {
    this.dataSharingService.valueAdd.subscribe((res) => {
      if (res != 0) {
        this.getMemberAuditoragreementList(res);
      }
    });
    if (this.selectExchangeActorId !== "") {
      this.getMemberAuditoragreementList(this.selectExchangeActorId);
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  getMemberAuditoragreementList(exchangeActorId: string) {
    this.registerService
      .getMemberAuditoragreementList(exchangeActorId, this.currentLang)
      .subscribe((res) => {
        if (res) {
          this.dataSource.data = res as MemberAuditor[];
        }
      });
  }
  public getAllMemberAuditors = () => {
    this.service
      .getData("api/MemberAuditorAgrement/GetAllMemberAuditor")
      .subscribe((res) => {
        if (res) {
          this.dataSource.data = res as MemberAuditor[];
        }
      });
  };

  public redirectToUpdatePage = (id) => {
    const updateUrl: string = `/main/registertrade/agreementupdate/${id}`;
    this.router.navigate([updateUrl]);
  };
  public redirectToDelete = (id: string) => {};
  EditMemeberAuditer() {
    this.isUpdate = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "62%";
    dialogConfig.height = "55%";
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      isUpdate: this.isUpdate,
      id: this.parentId,
    };
    this.dialog.open(MemberAndAuditorAgreementComponent, dialogConfig);
  }

  AddMemeberAuditor() {
    this.isUpdate = false;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "64%";
    dialogConfig.height = "55%";
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      isUpdate: this.isUpdate,
      // ExchangeActorId: this.s,
    };
    this.dialog.open(MemberAndAuditorAgreementComponent, dialogConfig);
  }
  editMemberAuditorAgreement(memberAuditor: MemberAuditor) {
    this.parentId = memberAuditor.id;
    if (this.parentId != 0) {
      this.EditMemeberAuditer();
    }
  }
  sendAnnualAuditor(auditor: MemberAuditor) {
    const updateStatus: MemberAuditor = {
      ExchangeActorId: this.selectExchangeActorId,
      EcxCode: auditor.EcxCode,
      AgreementStatus: auditor.AgreementStatus,
      FromDate: auditor.FromDate,
      OrganiztionName: "",
      PreparedBy: this.authService.currentUser.FullName,
      ReportDate: auditor.ReportDate,
      Status: 1,
      ToDate: auditor.ToDate,
      id: auditor.id,
      StartDate: "",
      EndDate: "",
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "25%";
    dialogConfig.height = "30%";
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      message: this.translate.instant(
        "registerTrade.editor.MemberSendReportConfirmMessage"
      ),
    };
    const dialogRef = this.dialog.open(
      CommonConfirmDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult === true) {
        this.registerService
          .updateMemberAuditorAgreement(updateStatus)
          .subscribe(() => {
            this.toster.success(
              this.translate.instant("common.messages.SendSuccess"),
              "",
              {
                closeButton: true,
              }
            );
            this.getMemberAuditoragreementList(this.selectExchangeActorId);
          });
      }
    });
  }
}
