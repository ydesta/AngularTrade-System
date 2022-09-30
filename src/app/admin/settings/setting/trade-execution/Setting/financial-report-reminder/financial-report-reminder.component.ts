import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
//import {RegisterTradeService} from "../../../shared/services/register-trade.service";
import { ToastrService } from "ngx-toastr";
import { ConfigurationService } from "../../../../../../../@custor/services/configuration.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { TranslationLoaderService } from "../../../../../../../@custor/services/translation-loader.service";
import { TranslateService } from "@ngx-translate/core";
import { locale as langEnglish } from "../../../../../../lang/en";
import { locale as langEthiopic } from "../../../../../../lang/et";
import { MatTableDataSource } from "@angular/material/table";
import {
  AngConfirmDialogComponent,
  ConfirmDialogModel,
} from "../../../../../../../@custor/components/confirm-dialog/confirm-dialog.component";
import { AccountService } from "src/@custor/services/security/account.service";
import { Permission } from "src/@custor/models/permission.model";
import { EditFinancialReportReminderComponent } from "./edit-financial-report-reminder/edit-financial-report-reminder.component";
import { FinancialReportReminder } from "../../../shared/models/setting-model";
import { TradeExecutionSettingService } from "../../../shared/services/trade-execution-setting.service";

@Component({
  selector: "app-financial-report-reminder",
  templateUrl: "./financial-report-reminder.component.html",
  styleUrls: ["./financial-report-reminder.component.scss"],
})
export class FinancialReportReminderComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  currentLang = "";
  dataSource: any;
  clientInformationId = 0;
  displayedColumns = ["sn", "DescriptionAmh", "Action"];

  constructor(
    private accountService: AccountService,
    private registerService: TradeExecutionSettingService,
    private toaster: ToastrService,
    private configService: ConfigurationService,
    private dialog: MatDialog,
    private translationLoaderService: TranslationLoaderService,
    private translate: TranslateService
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
  }

  ngOnInit() {
    this.getFinancialReportReminderList();
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

  getFinancialReportReminderList() {
    this.registerService
      .getFinancialReportReminder(this.currentLang)
      .subscribe((result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  openEditReminderDialog(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "mat-dialog-lg";
    dialogConfig.width = "800px";
    dialogConfig.height = "400px";
    dialogConfig.data = {
      isNew: id === 0,
      clientInformationId: id,
    };
    const dialogRef = this.dialog.open(
      EditFinancialReportReminderComponent,
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
        this.getFinancialReportReminderList();
      }
    });
  }
  deleteClientInformationReminder(
    financialReportReminder: FinancialReportReminder
  ) {
    const message = `Are you sure you want to delete this record?`;
    const information: FinancialReportReminder = {
      FinancialReportReminderId:
        financialReportReminder.FinancialReportReminderId,
      DescriptionAmh: financialReportReminder.DescriptionAmh,
      DescriptionEng: financialReportReminder.DescriptionEng,
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
          .deleteFinancialReportReminder(information)
          .subscribe((result) => {
            this.getFinancialReportReminderList();
            this.toaster.success(
              this.translate.instant("common.messages.Deleted"),
              "",
              {
                closeButton: true,
              }
            );
          });
      }
    });
  }
}
