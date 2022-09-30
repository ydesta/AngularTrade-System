import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
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
import { Permission } from "src/@custor/models/permission.model";
import { AccountService } from "src/@custor/services/security/account.service";
import { EditCommodityGradeComponent } from "./edit-commodity-grade/edit-commodity-grade.component";
import {
  StaticData,
  StaticData2,
} from "src/app/common/models/static-data.model";
import { TradeExecutionSettingService } from "../../../shared/services/trade-execution-setting.service";
import { CommodityGrade } from "../../../shared/models/setting-model";

@Component({
  selector: "app-commodity-grade",
  templateUrl: "./commodity-grade.component.html",
  styleUrls: ["./commodity-grade.component.scss"],
})
export class CommodityGradeComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  currentLang = "";
  dataSource: any;
  commodityGradeId = 0;
  commudityList: StaticData[];
  commidityTypeList: StaticData2[];
  displayedColumns = [
    "sn",
    "CommodityName",
    "CommodityTypeName",
    "DescriptionAmh",
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
    this.getCommudityList();
    this.getCommodityGradeList();
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

  openEditCommodityGradeDialog(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "mat-dialog-lg";
    dialogConfig.width = "700px";
    dialogConfig.height = "500px";
    dialogConfig.data = {
      isNew: id === 0,
      commodityGradeId: id,
    };
    const dialogRef = this.dialog.open(
      EditCommodityGradeComponent,
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
        this.getCommodityGradeList();
      }
    });
  }

  private getCommudityList() {
    this.registerService.getCommudityList(this.currentLang).subscribe((res) => {
      this.commudityList = res;
    });
  }

  private getCommudityType(commodityId: number) {
    this.registerService
      .getCommudityTypess(commodityId, this.currentLang)
      .subscribe((res) => {
        this.commidityTypeList = res;
      });
  }

  getCommodityGradeList() {
    this.registerService
      .getAllCommodityGradeList(this.currentLang)
      .subscribe((result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  deleteCommodityGrade(commodity: CommodityGrade) {
    const message = `Are you sure you want to delete this record?`;
    const item: CommodityGrade = {
      CommodityGradeId: commodity.CommodityGradeId,
      DescriptionAmh: commodity.DescriptionAmh,
      DescriptoinEng: commodity.DescriptoinEng,
      CommodityTypeId: commodity.CommodityTypeId,
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
        this.registerService.deleteCommodityGrade(item).subscribe((result) => {
          this.getCommodityGradeList();
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
