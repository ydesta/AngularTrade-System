import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialogConfig,
} from "@angular/material";
import { AngConfirmDialogComponent } from "src/@custor/components/confirm-dialog/confirm-dialog.component";
import { ToastrService } from "ngx-toastr";
import { EditKebeleComponent } from "../kebele-edit/edit-kebele.component";
import { NgForm, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { KebeleModel } from "../../models/kebele.model";
import { RegionModel } from "../../models/region.model";
import { ZoneModel } from "../../models/zone.model";
import { WoredaModel } from "../../models/woreda.model";
import { RegionService } from "../../services/region.service";
import { ZoneService } from "../../services/zone.service";
import { WoredaService } from "../../services/woreda.service";
import { KebeleService } from "../../services/kebele.service";
import { ConfigurationService } from 'src/@custor/services/configuration.service';
import { StaticData } from 'src/app/common/models/static-data.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-list-kebele",
  templateUrl: "./list-kebele.component.html",
  styleUrls: ["./list-kebele.component.scss"],
})
export class ListKebeleComponent implements OnInit, AfterViewInit {
  kebeles: Array<KebeleModel>;
  regions: Array<StaticData>;
  zones: Array<StaticData>;
  woredas: Array<StaticData>;
  searchForm: FormGroup;
  selectedRegionId = 0;
  selectedZoneId = 0;
  @ViewChild("form", { static: false })
  private form: NgForm;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns = [
    "kebeleId",
    "descriptionEng",
    "descriptionAmh",
    "actions",
  ];

  dataSource: MatTableDataSource<KebeleModel>;
  loadingIndicator: boolean;
  dialogRef: any;
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;
  editDialogRef: MatDialogRef<EditKebeleComponent>;
  currentLang: string;

  constructor(
    private translate: TranslateService,
    private regionService: RegionService,
    private zoneService: ZoneService,
    private kebeleService: KebeleService,
    private woredaService: WoredaService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private config: ConfigurationService
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.initForm();
    this.currentLang = this.config.language;
  }

  ngOnInit() {
    this.kebeles = new Array<KebeleModel>();
    this.regions = new Array<StaticData>();
    this.zones = new Array<StaticData>();
    this.woredas = new Array<StaticData>();
    this.getRegionList();
  }

  getWoredaList(parentId: number) {
    this.woredaService
      .GetWoredasByParentIdAndLang(parentId, this.currentLang)
      .subscribe((result) => {
        this.woredas = result;
      });
  }
  getZoneList(parentId: number) {
    this.zoneService.GetZonesByParentIdAndLang(parentId, this.currentLang).subscribe((result) => {
      this.zones = result;
    });
  }
  getRegionList() {
    this.regionService.getNonCacheRegion(this.currentLang).subscribe((result) => {
      this.regions = result;
    });
  }
  initForm() {
    this.searchForm = this.fb.group({
      Region: ["", Validators.required],
      Zone: ["", Validators.required],
      Woreda: ["", Validators.required],
    });
  }

  getKebeleList() {
    if (!this.form.valid) {
      // this.form.onSubmit(null);
      return;
    }
    this.loadingIndicator = true;
    const parentId: number = this.woreda.value;
    this.kebeleService
      .GetKebelesByParentId(parentId)
      .subscribe((result) => {
        this.kebeles = result;
        if (!this.kebeles) {
          this.toastr.error("No records were found", "Error", {
            closeButton: true,
          });
        } else {
          this.dataSource.data = this.kebeles;
        }
      });
    this.loadingIndicator = false;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  filterRegion(regionId: number) {
    if (!regionId) {
      return;
    }
    this.selectedRegionId = regionId;
    this.getZoneList(regionId);
  }
  filterZone(zoneId: number) {
    if (!zoneId) {
      return;
    }
    this.selectedZoneId = zoneId;
    this.getWoredaList(zoneId);
  }
  openEditKebeleDialog(kebele: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "mat-dialog-md";
    dialogConfig.width = "500px";
    dialogConfig.height = "600px";
    dialogConfig.data = {
      isNew: kebele === null,
      woredaId: kebele === null ? 0 : kebele.WoredaId,
      zoneId: kebele === null ? 0 : this.selectedZoneId,
      regionId: this.selectedRegionId,
      kebeleId: kebele === null ? 0 : kebele.KebeleId,
    };
    const dialogRef = this.dialog.open(EditKebeleComponent, dialogConfig);

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
        this.getKebeleList();
        if (dialogConfig.data.kebeleId > 0) {
            this.toastr.success(this.translate.instant('common.messages.UpdateSuccess'), '', {
              closeButton: true
            });
           
          } 
          else {
            this.toastr.success(this.translate.instant('common.messages.Saved'), '', {
              closeButton: true
            });
          
          }
      }
    });
  }

  confirmDelete(kebele: KebeleModel) {
    this.confirmDialogRef = this.dialog.open(AngConfirmDialogComponent, {
      disableClose: false,
      height: "220px",
      width: "345px",
      backdropClass: "custom-backdrop",
    });

    this.confirmDialogRef.componentInstance.confirmMessage =
      "Are you sure you want to delete?";

    this.confirmDialogRef.afterClosed().subscribe((result) => {
      this.loadingIndicator = true;
      if (result) {
        this.kebeleService
          .deleteKebele(kebele.KebeleId)
          .subscribe((results) => {
            this.loadingIndicator = false;
            this.dataSource.data = this.dataSource.data.filter(
              (item) => item !== kebele
            );
            this.toastr.success(this.translate.instant('common.messages.Deleted'), '', {
              closeButton: true
            });
          });
      }
      this.loadingIndicator = false;
    });
  }
  get region() {
    return this.searchForm.get("Region");
  }
  get zone() {
    return this.searchForm.get("Zone");
  }
  get woreda() {
    return this.searchForm.get("Woreda");
  }
}
