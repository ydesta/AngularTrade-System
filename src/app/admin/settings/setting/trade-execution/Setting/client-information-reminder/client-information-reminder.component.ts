import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ConfigurationService } from "../../../../../../../@custor/services/configuration.service";
import { TranslationLoaderService } from "../../../../../../../@custor/services/translation-loader.service";
import { TranslateService } from "@ngx-translate/core";
import { locale as langEnglish } from "../../../../../../lang/en";
import { locale as langEthiopic } from "../../../../../../lang/et";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {
  AngConfirmDialogComponent,
  ConfirmDialogModel,
} from "src/@custor/components/confirm-dialog/confirm-dialog.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { RegisterTradeService } from "src/app/main/components/register-trade/shared/services/register-trade.service";
import { AccountService } from "src/@custor/services/security/account.service";
import { Permission } from "src/@custor/models/permission.model";
import { EditClientInformationReminderComponent } from "./edit-client-information-reminder/edit-client-information-reminder.component";
import { TradeExecutionSettingService } from "../../../shared/services/trade-execution-setting.service";
import { ClientInformationReminder } from "../../../shared/models/setting-model";

@Component({
  selector: "app-client-information-reminder",
  templateUrl: "./client-information-reminder.component.html",
  styleUrls: ["./client-information-reminder.component.scss"],
})
export class ClientInformationReminderComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  currentLang = "";
  dataSource: any;
  clientInformationId = 0;
  displayedColumns = ["sn", "DescriptionAmh", "Action"];

  constructor(
    private registerService: TradeExecutionSettingService,
    private toaster: ToastrService,
    private configService: ConfigurationService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private translationLoaderService: TranslationLoaderService,
    private translate: TranslateService,
    private accountService: AccountService
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
  }

  ngOnInit() {
    this.getClientInformationReminderList();
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
      EditClientInformationReminderComponent,
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
        this.getClientInformationReminderList();
      }
    });
  }

  getClientInformationReminderList() {
    this.registerService
      .getClientInformationReminder(this.currentLang)
      .subscribe((result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  deleteClientInformationReminder(
    clientInformation: ClientInformationReminder
  ) {
    const message = `Are you sure you want to delete this record?`;
    const information: ClientInformationReminder = {
      ClientInformationReminderId:
        clientInformation.ClientInformationReminderId,
      DescriptionAmh: clientInformation.DescriptionAmh,
      DescriptionEng: clientInformation.DescriptionEng,
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
          .deleteClientInformationReminder(information)
          .subscribe((result) => {
            this.getClientInformationReminderList();
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
