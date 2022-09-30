import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ToastrService } from "ngx-toastr";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { TranslateService } from "@ngx-translate/core";
import {
  AngConfirmDialogComponent,
  ConfirmDialogModel,
} from "src/@custor/components/confirm-dialog/confirm-dialog.component";

import { locale as langEnglish } from "../../../../../../lang/en";
import { locale as langEthiopic } from "../../../../../../lang/et";
import { MatTableDataSource } from "@angular/material/table";
import { RegisterTradeService } from "src/app/main/components/register-trade/shared/services/register-trade.service";
import { AccountService } from "src/@custor/services/security/account.service";
import { Permission } from "src/@custor/models/permission.model";
import { EditFinancialPerformanceSettingComponent } from "./edit-financial-performance-setting/edit-financial-performance-setting.component";
import {
  FinancialPerformance,
  FinancialPerformanceCustomerType,
} from "../../../shared/models/setting-model";
import { StaticData } from "src/app/common/models/static-data.model";
import { LookUpService } from "src/app/common/services/look-up.service";
import { LookupType } from "src/app/common/enums/common";
import { TradeExecutionSettingService } from "../../../shared/services/trade-execution-setting.service";

@Component({
  selector: "app-financial-performance-setting",
  templateUrl: "./financial-performance-setting.component.html",
  styleUrls: ["./financial-performance-setting.component.scss"],
})
export class FinancialPerformanceSettingComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  dataSource: any;
  currentLang = "";
  financialPerformanceId = 0;
  expandClose: boolean;
  oldData: any;
  financialPerformanceCustomerType: FinancialPerformanceCustomerType[] = [
    {
      DecisionNameEng: "Nonmember",
      DecisionNameAmh: "አባል ያልሆኑ ቀጥታ ተገበያይ",
      Id: 90,
    },
    { DecisionNameEng: "Trader", DecisionNameAmh: "ተገበያይ", Id: 88 },
    { DecisionNameEng: "Intermediary", DecisionNameAmh: "አገናኝ", Id: 72 },
  ];

  public customerTypes: StaticData[] = [];
  displayedColumns = ["sn", "CustomerTypeId", "Amount", "Action"];
  criteriasModelReportList: any;

  constructor(
    private accountService: AccountService,
    private registerService: TradeExecutionSettingService,
    private toaster: ToastrService,
    private configService: ConfigurationService,
    private dialog: MatDialog,
    private lookUpService: LookUpService,
    private translationLoaderService: TranslationLoaderService,
    private translate: TranslateService
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.expandClose = false;
    this.oldData = this.getListOfFinanicialPerformance();
  }

  ngOnInit() {
    this.getCustomerType(this.currentLang);
    this.getListOfFinanicialPerformance();
  }

  get canManageSetting() {
    return this.accountService.userHasPermission(
      Permission.manageSettingsPermission
    );
  }
  get canViewSetting() {
    return this.accountService.userHasPermission(
      Permission.viewSettingPermission
    );
  }

  getCustomerType(lang: string) {
    this.lookUpService
      .getLookup(lang, LookupType.MEMBER_CATEGORY)
      .subscribe((res) => {
        this.customerTypes = res;
      });
  }

  openEditFinancialPerformanceDialog(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "mat-dialog-lg";
    dialogConfig.width = "500px";
    dialogConfig.height = "340px";
    dialogConfig.data = {
      isNew: id === 0,
      financialPerformanceId: id,
    };

    const dialogRef = this.dialog.open(
      EditFinancialPerformanceSettingComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result == null) {
        return;
      }
      // if (!result) {
      //   this.toastr.error('Record was not saved', 'Error', {
      //     closeButton: true,
      //   });

      //   return;
      // }
      if (result) {
        this.getListOfFinanicialPerformance();
      }
    });
  }

  public getListOfFinanicialPerformance() {
    this.registerService.getFinancialPerformanceList().subscribe((result) => {
      this.criteriasModelReportList = result;
      // @ts-ignore
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteFinancialPerformance(financialPerformance: FinancialPerformance) {
    const message = `Are you sure you want to delete this record?`;
    const financialAmount: FinancialPerformance = {
      ExchangeActorFinanicialId: financialPerformance.ExchangeActorFinanicialId,
      Amount: financialPerformance.Amount,
      CustomerTypeId: financialPerformance.CustomerTypeId,
    };
    const dialogData = new ConfirmDialogModel("Confirm", message);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "345px";
    dialogConfig.height = "220px";
    dialogConfig.data = dialogData;
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(AngConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult === true) {
        this.registerService
          .deleteFinanicialPerformance(financialAmount)
          .subscribe((result) => {
            this.toaster.success(
              this.translate.instant("common.messages.Deleted"),
              "",
              {
                closeButton: true,
              }
            );
            this.getListOfFinanicialPerformance();
          });
      }
    });
  }

  getDescriptionCustomerType(Status: any) {
    const clientStatus = this.financialPerformanceCustomerType.find(
      (status) => status.Id === Status
    );
    return this.currentLang == "et"
      ? clientStatus.DecisionNameAmh
      : clientStatus.DecisionNameEng;
  }
}
