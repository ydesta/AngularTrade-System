import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ToastrService } from "ngx-toastr";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { TranslateService } from "@ngx-translate/core";
import { MatTableDataSource } from "@angular/material/table";
import {
  AngConfirmDialogComponent,
  ConfirmDialogModel,
} from "src/@custor/components/confirm-dialog/confirm-dialog.component";
import { RegisterTradeService } from "src/app/main/components/register-trade/shared/services/register-trade.service";
import { EditReportTypeComponent } from "./edit-report-type/edit-report-type.component";
import { AccountService } from "src/@custor/services/security/account.service";
import { Permission } from "src/@custor/models/permission.model";
import { locale as langEnglish } from "../../../../../lang/en";
import { locale as langEthiopic } from "../../../../../lang/et";
import { StaticData2 } from "src/app/common/models/static-data.model";
import { ReportType } from "../../../shared/models/setting-model";
@Component({
  selector: "app-report-type",
  templateUrl: "./report-type.component.html",
  styleUrls: ["./report-type.component.scss"],
})
export class ReportTypeComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  currentLang = "";
  dataSource: any;
  ReportTypeId = 0;
  ReportList: StaticData2[];
  displayedColumns = ["sn", "DescriptionEng", "DescriptionAmh", "Action"];

  constructor(
    private registerService: RegisterTradeService,
    private toaster: ToastrService,
    private accountService: AccountService,
    private configService: ConfigurationService,
    private dialog: MatDialog,
    private translationLoaderService: TranslationLoaderService,
    private translate: TranslateService
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
  }

  ngOnInit() {
    this.getReportTypeList();
  }

  getReportTypeList() {
    this.registerService.getAllReportType().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  openEditRegionDialog(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "mat-dialog-lg";
    dialogConfig.width = "500px";
    dialogConfig.height = "340px";
    dialogConfig.data = {
      isNew: id === 0,
      ReportTypeId: id,
    };
    const dialogRef = this.dialog.open(EditReportTypeComponent, dialogConfig);

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
        this.getReportTypeList();
      }
    });
  }
  deleteReportType(reportType: ReportType) {
    const message = `Are you sure you want to delete this record?`;
    const item: ReportType = {
      ReportTypeId: reportType.ReportTypeId,
      DescriptionAmh: reportType.DescriptionAmh,
      DescriptionEng: reportType.DescriptionEng,
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
        this.registerService.deleteReportType(item).subscribe((result) => {
          this.getReportTypeList();
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
}
