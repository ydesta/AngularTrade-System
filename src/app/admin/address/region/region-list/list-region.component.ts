import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialogConfig,
} from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { RegionModel } from "../../models/region.model";
import { ActivatedRoute, Router } from "@angular/router";
import { AngConfirmDialogComponent } from "src/@custor/components/confirm-dialog/confirm-dialog.component";
import { ToastrService } from "ngx-toastr";
import { EditRegionComponent } from "../region-edit/edit-region.component";
import { RegionService } from "../../services/region.service";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-list-region",
  templateUrl: "./list-region.component.html",
  styleUrls: ["./list-region.component.scss"],
})
export class ListRegionComponent implements OnInit, AfterViewInit {
  regions: Array<RegionModel>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns = [
    "regionId",
    "descriptionEng",
    "descriptionAmh",
    "actions",
  ];

  dataSource: MatTableDataSource<RegionModel>;
  loadingIndicator: boolean;
  dialogRef: any;
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;
  editDialogRef: MatDialogRef<EditRegionComponent>;
  currentLang: string;

  constructor(
    private translate: TranslateService,
    private http: HttpClient,
    private regionService: RegionService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private config: ConfigurationService
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.currentLang = this.config.language;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.regions = new Array<RegionModel>();
    this.getRegions();
  }

  getRegions() {
    this.loadingIndicator = true;
    this.regionService.getAllRegion().subscribe((result) => {
      this.regions = result;
      if (!this.regions) {
        this.toastr.error("No records were found", "Error", {
          closeButton: true,
        });
      } else {
        this.dataSource.data = this.regions;
      }
    });
    this.loadingIndicator = false;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  openEditRegionDialog(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "mat-dialog-lg";
    dialogConfig.width = "500px";
    dialogConfig.height = "340px";
    dialogConfig.data = {
      isNew: id === 0,
      regionId: id,
    };
    const dialogRef = this.dialog.open(EditRegionComponent, dialogConfig);

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
        this.getRegions();
        if (id > 0) {
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

  confirmDelete(region: RegionModel) {
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
        this.regionService
          .deleteRegion(region.RegionId)
          .subscribe((results) => {
            this.loadingIndicator = false;
            this.dataSource.data = this.dataSource.data.filter(
              (item) => item !== region
            );
            this.toastr.success(this.translate.instant('common.messages.Deleted'), '', {
              closeButton: true
            });
          });
      }
      this.loadingIndicator = false;
    });
  }
}
