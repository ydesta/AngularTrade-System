import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
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
import { Permission } from "src/@custor/models/permission.model";
import { AccountService } from "src/@custor/services/security/account.service";
import { EditCommodityComponent } from "./edit-commodity/edit-commodity.component";
import { StaticData } from "src/app/common/models/static-data.model";
import { TradeExecutionSettingService } from "../../../shared/services/trade-execution-setting.service";
import { Commodity } from "../../../shared/models/setting-model";

@Component({
  selector: "app-commodity",
  templateUrl: "./commodity.component.html",
  styleUrls: ["./commodity.component.scss"],
})
export class CommodityComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  commodityForm: FormGroup;
  currentLang = "";
  dataSource: any;
  unitMeasurementList: StaticData[] = [];
  commodityId = 0;
  expandClose: boolean;
  displayedColumns = [
    "sn",
    "DescriptionAmh",
    "CommodityUnitDesc",
    "PriceTollerance",
    "WeightedAverage",
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
    this.getCommodityList();
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

  openEditCommodityDialog(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "mat-dialog-lg";
    dialogConfig.width = "800px";
    dialogConfig.height = "400px";
    dialogConfig.data = {
      isNew: id === 0,
      commodityId: id,
    };
    const dialogRef = this.dialog.open(EditCommodityComponent, dialogConfig);

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
        this.getCommodityList();
      }
    });
  }

  getCommodityList() {
    this.registerService
      .getAllCommodityList(this.currentLang)
      .subscribe((result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  deleteCommodity(commodity: Commodity) {
    const message = `Are you sure you want to delete this record?`;
    const item: Commodity = {
      CommodityId: commodity.CommodityId,
      DescriptionAmh: commodity.DescriptionAmh,
      DesciptionEng: commodity.DesciptionEng,
      UnitMeasurementId: commodity.UnitMeasurementId,
      PriceTollerance: commodity.PriceTollerance,
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
        this.registerService.deleteCommodity(item).subscribe((result) => {
          this.getCommodityList();
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
