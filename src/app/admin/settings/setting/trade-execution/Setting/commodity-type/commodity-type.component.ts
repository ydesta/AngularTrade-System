import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FormBuilder } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { TranslateService } from "@ngx-translate/core";
import { locale as langEnglish } from "../../../../../../lang/en";
import { locale as langEthiopic } from "../../../../../../lang/et";
import { MatTableDataSource } from "@angular/material/table";
import {
  AngConfirmDialogComponent,
  ConfirmDialogModel,
} from "src/@custor/components/confirm-dialog/confirm-dialog.component";
import { AccountService } from "src/@custor/services/security/account.service";
import { Permission } from "src/@custor/models/permission.model";
import { EditCommodityTypeComponent } from "./edit-commodity-type/edit-commodity-type.component";
import { StaticData2 } from "src/app/common/models/static-data.model";
import { TradeExecutionSettingService } from "../../../shared/services/trade-execution-setting.service";
import { CommodityType } from "../../../shared/models/setting-model";

@Component({
  selector: "app-commodity-type",
  templateUrl: "./commodity-type.component.html",
  styleUrls: ["./commodity-type.component.scss"],
})
export class CommodityTypeComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  currentLang = "";
  dataSource: any;
  commodityTypeId = 0;
  commudityList: StaticData2[];
  displayedColumns = ["sn", "CommodityName", "DescriptionAmh", "Action"];

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
    this.getCommodityTypeList();
    this.getCommudityList();
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

  private getCommudityList() {
    this.registerService.getCommudityList(this.currentLang).subscribe((res) => {
      this.commudityList = res;
    });
  }

  getCommodityTypeList() {
    this.registerService
      .getAllCommodityTypeList(this.currentLang)
      .subscribe((result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  openEditCommidyTypeDialog(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "mat-dialog-lg";
    dialogConfig.width = "600px";
    dialogConfig.height = "400px";
    dialogConfig.data = {
      isNew: id === 0,
      commodityTypeId: id,
    };
    const dialogRef = this.dialog.open(
      EditCommodityTypeComponent,
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
        this.getCommodityTypeList();
      }
    });
  }

  deleteCommodityType(commodity: CommodityType) {
    const message = `Are you sure you want to delete this record?`;
    const item: CommodityType = {
      CommodityTypeId: commodity.CommodityTypeId,
      DescriptionAmh: commodity.DescriptionAmh,
      DescriptionEng: commodity.DescriptionEng,
      CommodityId: commodity.CommodityId,
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
        this.registerService.deleteCommodityType(item).subscribe((result) => {
          this.getCommodityTypeList();
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
