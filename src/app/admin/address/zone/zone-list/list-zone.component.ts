import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialogConfig,
} from "@angular/material";
import { ZoneModel } from "../../models/zone.model";
import { AngConfirmDialogComponent } from "src/@custor/components/confirm-dialog/confirm-dialog.component";
import { ToastrService } from "ngx-toastr";
import { EditZoneComponent } from "../zone-edit/edit-zone.component";
import { NgForm, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { RegionService } from "../../services/region.service";
import { ZoneService } from "../../services/zone.service";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { StaticData } from "src/app/common/models/static-data.model";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-list-zone",
  templateUrl: "./list-zone.component.html",
  styleUrls: ["./list-zone.component.scss"],
})
export class ListZoneComponent implements OnInit, AfterViewInit {
  zones: Array<ZoneModel>;
  regions: Array<StaticData>;
  searchForm: FormGroup;
  @ViewChild("form", { static: false })
  private form: NgForm;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns = ["zoneId", "descriptionEng", "descriptionAmh", "actions"];

  dataSource: MatTableDataSource<ZoneModel>;
  loadingIndicator: boolean;
  dialogRef: any;
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;
  editDialogRef: MatDialogRef<EditZoneComponent>;
  currentLang: string;

  constructor(
    private translate: TranslateService,
    private regionService: RegionService,
    private zoneService: ZoneService,
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
    this.zones = new Array<ZoneModel>();
    this.regions = new Array<StaticData>();
    this.getRegionList();
  }

  getRegionList() {
    this.regionService.getNonCacheRegion(this.currentLang).subscribe((result) => {
      this.regions = result;
    });
  }
  initForm() {
    this.searchForm = this.fb.group({
      Region: ["", Validators.required],
    });
  }

  getZoneList() {
    if (!this.form.valid) {
      // Causes validation to update.
      // this.form.onSubmit(null);
      return;
    }
    this.loadingIndicator = true;
    const parentId: number = this.region.value;
    // change this one
    this.zoneService.GetZonesByParentId(parentId).subscribe((result) => {
      this.zones = result;
      if (!this.zones) {
        this.toastr.error("No records were found", "Error", {
          closeButton: true,
        });
      } else {
        this.dataSource.data = this.zones;
      }
    });
    this.loadingIndicator = false;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  openEditZoneDialog(zone: ZoneModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "mat-dialog-md";
    dialogConfig.width = "500px";
    dialogConfig.height = "430px";
    dialogConfig.data = {
      isNew: zone.ZoneId === 0 || zone.ZoneId === undefined,
      zoneId: zone.ZoneId,
      parentId: zone.RegionId,
    };
    const dialogRef = this.dialog.open(EditZoneComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result == null) {
        return;
      }
      if (!result) {
        this.toastr.error('Record was not saved', 'Error', {
          closeButton: true,
        });

        return;
      }

      if (result) {
        this.getZoneList();
        if (zone.ZoneId > 0) {
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

  confirmDelete(zone: ZoneModel) {
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
        this.zoneService.deleteZone(zone.ZoneId).subscribe(() => {
          this.loadingIndicator = false;
          this.dataSource.data = this.dataSource.data.filter(
            (item) => item !== zone
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
}
