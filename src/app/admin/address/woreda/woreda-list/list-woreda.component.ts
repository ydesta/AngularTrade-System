import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialogConfig,
} from "@angular/material";
import { WoredaModel } from "../../models/woreda.model";
import { ToastrService } from "ngx-toastr";
import { EditWoredaComponent } from "../woreda-edit/edit-woreda.component";
import { NgForm, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { WoredaService } from "../../services/woreda.service";
import { AngConfirmDialogComponent } from 'src/@custor/components/confirm-dialog/confirm-dialog.component';
import { RegionService } from '../../services/region.service';
import { ZoneService } from '../../services/zone.service';
import { ConfigurationService } from 'src/@custor/services/configuration.service';
import { StaticData } from 'src/app/common/models/static-data.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-list-woreda",
  templateUrl: "./list-woreda.component.html",
  styleUrls: ["./list-woreda.component.scss"],
})
export class ListWoredaComponent implements OnInit, AfterViewInit {
  woredas: Array<WoredaModel>;
  regions: Array<StaticData>;
  zones: Array<StaticData>;
  searchForm: FormGroup;
  selectedRegionId = 0;
  @ViewChild("form", { static: false })
  private form: NgForm;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns = [
    "woredaId",
    "descriptionEng",
    "descriptionAmh",
    "actions",
  ];

  dataSource: MatTableDataSource<WoredaModel>;
  loadingIndicator: boolean;
  dialogRef: any;
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;
  editDialogRef: MatDialogRef<EditWoredaComponent>;
  currentLnag: string;

  constructor(
    private translate: TranslateService,
    private regionService: RegionService,
    private zoneService: ZoneService,
    private woredaService: WoredaService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private config: ConfigurationService
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.initForm();
    this.currentLnag = this.config.language;
  }

  ngOnInit() {
    this.woredas = new Array<WoredaModel>();
    this.regions = new Array<StaticData>();
    this.zones = new Array<StaticData>();
    this.getRegionList();
  }
  getZoneList(parentId: number) {
    this.zoneService.GetZonesByParentIdAndLang(parentId, this.currentLnag).subscribe((result) => {
      this.zones = result;
    });
  }
  getRegionList() {
    this.regionService.getNonCacheRegion(this.currentLnag).subscribe((result) => {
      this.regions = result;
    });
  }
  initForm() {
    this.searchForm = this.fb.group({
      Region: ["", Validators.required],
      Zone: ["", Validators.required],
    });
  }

  getWoredaList() {
    if (!this.form.valid) {
      // this.form.onSubmit(null);
      return;
    }
    this.loadingIndicator = true;
    const parentId: number = this.zone.value;
    this.woredaService
      .GetWoredasByParentId(parentId)
      .subscribe((result) => {
        this.woredas = result;
        if (!this.woredas) {
          this.toastr.error("No records were found", "Error", {
            closeButton: true,
          });
        } else {
          this.dataSource.data = this.woredas;
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

  openEditWoredaDialog(woreda: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "mat-dialog-md";
    dialogConfig.width = "500px";
    dialogConfig.height = "510px";
    dialogConfig.data = {
      isNew: woreda === null,
      woredaId: woreda === null ? 0 : woreda.WoredaId,
      zoneId: woreda === null ? 0 : woreda.ZoneId,
      regionId: this.selectedRegionId,
    };
    const dialogRef = this.dialog.open(EditWoredaComponent, dialogConfig);

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
        this.getWoredaList();
        if (dialogConfig.data.woredaId > 0) {
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

  confirmDelete(woreda: WoredaModel) {
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
        this.woredaService
          .deleteWoreda(woreda.WoredaId)
          .subscribe(() => {
            this.loadingIndicator = false;
            this.dataSource.data = this.dataSource.data.filter(
              (item) => item !== woreda
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
}
