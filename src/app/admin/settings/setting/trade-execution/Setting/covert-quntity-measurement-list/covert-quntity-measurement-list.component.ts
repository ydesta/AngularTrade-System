import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatDialogConfig,
  MatPaginator,
  MatSort,
  MatTableDataSource,
} from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { AccountService } from "src/@custor/services/security/account.service";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { StaticData } from "src/app/common/models/static-data.model";
import { TradeExecutionSettingService } from "../../../shared/services/trade-execution-setting.service";
import { locale as langEnglish } from "../../../../../../lang/en";
import { locale as langEthiopic } from "../../../../../../lang/et";
import { ConvertingQuantityMeasurement } from "../../../shared/models/setting-model";
import {
  AngConfirmDialogComponent,
  ConfirmDialogModel,
} from "src/@custor/components/confirm-dialog/confirm-dialog.component";
import { EditConvertQuantityMeasurementComponent } from "./edit-convert-quantity-measurement/edit-convert-quantity-measurement.component";
import { Permission } from "src/@custor/models/permission.model";
@Component({
  selector: "app-covert-quntity-measurement-list",
  templateUrl: "./covert-quntity-measurement-list.component.html",
  styleUrls: ["./covert-quntity-measurement-list.component.scss"],
})
export class CovertQuntityMeasurementListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  currentLang = "";
  dataSource: any;
  Id = 0;
  commudityList: StaticData[];
  displayedColumns = [
    "sn",
    "CommodityName",
    "Lot",
    "Qunital",
    "KiloGram",
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
    this.getAllConvertingFromLotToOther();
  }
  getAllConvertingFromLotToOther() {
    this.registerService
      .getAllConvertingFromLotToOther(this.currentLang)
      .subscribe((result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  deleteConvertingQuantity(converting: ConvertingQuantityMeasurement) {
    const message = `Are you sure you want to delete this record?`;
    const item: ConvertingQuantityMeasurement = {
      Id: converting.Id,
      CommodityId: converting.CommodityId,
      Lot: converting.Lot,
      Qunital: converting.Qunital,
      KiloGram: converting.KiloGram,
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
          .deleteConvertingQuantity(item)
          .subscribe((result) => {
            this.getAllConvertingFromLotToOther();
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

  openEditConvertingQuantityDialog(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "mat-dialog-lg";
    dialogConfig.width = "800px";
    dialogConfig.height = "400px";
    dialogConfig.data = {
      isNew: id === 0,
      Id: id,
    };
    const dialogRef = this.dialog.open(
      EditConvertQuantityMeasurementComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result == null) {
        return;
      }

      if (result) {
        this.getAllConvertingFromLotToOther();
      }
    });
  }
}
