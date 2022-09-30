import { Component, OnInit, ViewChild } from "@angular/core";
//import {RegisterTradeService} from "../../shared/services/register-trade.service";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { ConfigurationService } from "../../../../../../../@custor/services/configuration.service";
import { TranslationLoaderService } from "../../../../../../../@custor/services/translation-loader.service";
import { locale as langEnglish } from "../../../../../lang/en";
import { locale as langEthiopic } from "../../../../../lang/et";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {
  AngConfirmDialogComponent,
  ConfirmDialogModel,
} from "../../../../../../../@custor/components/confirm-dialog/confirm-dialog.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { AccountService } from "src/@custor/services/security/account.service";
import { Permission } from "src/@custor/models/permission.model";
import { EditReportPeriodComponent } from "./edit-report-period/edit-report-period.component";
import { TradeExecutionSettingService } from "../../../shared/services/trade-execution-setting.service";
import { ReportPeriod } from "../../../shared/models/setting-model";

@Component({
  selector: "app-report-period-setting",
  templateUrl: "./report-period-setting.component.html",
  styleUrls: ["./report-period-setting.component.scss"],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", visibility: "hidden" })
      ),
      state("expanded", style({ height: "*", visibility: "visible" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class ReportPeriodSettingComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  reportPeriodId = 0;
  currentLang = "";
  dataSource: any;
  displayedColumns = [
    "sn",
    "DescriptionAmh",
    "StartMonthAmh",
    "EndMonthAmh",
    "BeginningDate",
    "EndDate",
    "Action",
  ];

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
    this.getReportPeriodList();
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

  openEditRegionDialog(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "mat-dialog-lg";
    dialogConfig.width = "700px";
    dialogConfig.height = "460px";
    dialogConfig.data = {
      isNew: id === 0,
      ReportPeriodId: id,
    };
    const dialogRef = this.dialog.open(EditReportPeriodComponent, dialogConfig);

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
        this.getReportPeriodList();

        if (id > 0) {
          this.toaster.success(
            this.translate.instant("common.messages.UpdateSuccess"),
            "",
            {
              closeButton: true,
            }
          );
        } else {
          this.toaster.success(
            this.translate.instant("common.messages.Saved"),
            "",
            {
              closeButton: true,
            }
          );
        }
      }
    });
  }

  getReportPeriodList() {
    this.registerService
      .getReportPeriodList(this.currentLang)
      .subscribe((result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  deleteReportPeriod(reportPeriod: ReportPeriod) {
    const message = `Are you sure you want to delete this record?`;
    const period: ReportPeriod = {
      ReportPeriodId: reportPeriod.ReportPeriodId,
      EndMonthEng: reportPeriod.EndMonthEng,
      EndMonthAmh: reportPeriod.EndMonthAmh,
      StartMonthEng: reportPeriod.StartMonthEng,
      StartMonthAmh: reportPeriod.StartMonthAmh,
      StartDate: reportPeriod.StartDate,
      DeadLine: reportPeriod.DeadLine,
      DescriptionEng: reportPeriod.DescriptionEng,
      DescriptionAmh: reportPeriod.DescriptionAmh,
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
        this.registerService.deleteReportPeriod(period).subscribe((result) => {
          this.getReportPeriodList();
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
