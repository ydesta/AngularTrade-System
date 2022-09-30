import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatDialog,
  MatTableDataSource,
  MatDialogConfig,
} from "@angular/material";
import { FormBuilder } from "@angular/forms";
import { AccountService } from "src/@custor/services/security/account.service";
import { ToastrService } from "ngx-toastr";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { TranslateService } from "@ngx-translate/core";
import { locale as langEnglish } from "../../../../../lang/en";
import { locale as langEthiopic } from "../../../../../lang/et";

//import { AnnualBudgetCloser } from "src/../../../shared/models/register-trade-model";
import {
  AngConfirmDialogComponent,
  ConfirmDialogModel,
} from "src/@custor/components/confirm-dialog/confirm-dialog.component";
import { EditAnnualBudgetCloserComponent } from "./edit-annual-budget-closer/edit-annual-budget-closer.component";
import { Permission } from "src/@custor/models/permission.model";
import { TradeExecutionSettingService } from "../../../shared/services/trade-execution-setting.service";
import { AnnualBudgetCloser } from "../../../shared/models/setting-model";
@Component({
  selector: "app-annual-budget-closer",
  templateUrl: "./annual-budget-closer.component.html",
  styleUrls: ["./annual-budget-closer.component.scss"],
})
export class AnnualBudgetCloserComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  annualBudgetCloserId = 0;
  currentLang = "";
  dataSource: any;
  displayedColumns = [
    "sn",
    "Description",
    "BeginningDate",
    "DeadLine",
    "Action",
  ];

  constructor(
    private accountService: AccountService,
    private registerService: TradeExecutionSettingService,
    private toaster: ToastrService,
    private configService: ConfigurationService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private translationLoaderService: TranslationLoaderService,
    private translate: TranslateService
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
  }

  ngOnInit() {
    this.getAnnualBudgetCloserList();
  }

  private getAnnualBudgetCloserList() {
    this.registerService
      .getAnnualBudgetCloserList(this.currentLang)
      .subscribe((result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
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
  openEditAnuualBudgetDialog(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "mat-dialog-lg";
    dialogConfig.width = "700px";
    dialogConfig.height = "500px";
    dialogConfig.data = {
      isNew: id === 0,
      annualBudgetCloserId: id,
    };
    const dialogRef = this.dialog.open(
      EditAnnualBudgetCloserComponent,
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
        this.getAnnualBudgetCloserList();
      }
    });
  }

  deleteAnnualBudgetCloser(clientInformation: AnnualBudgetCloser) {
    const message = `Are you sure you want to delete this record?`;
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
          .deleteAnnualBudgetCloser(clientInformation.AnnualBudgetCloserId)
          .subscribe((result) => {
            this.getAnnualBudgetCloserList();
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
