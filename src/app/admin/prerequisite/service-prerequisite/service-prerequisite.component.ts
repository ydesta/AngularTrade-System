import { Component, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MatPaginatorIntl,
  MatTableDataSource,
  PageEvent,
} from "@angular/material";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PrerequisiteService } from "../Service/prerequisite.service";
import {
  Prerequisite,
  ServicePrerequisite,
  ServicePrerequisiteDTO,
} from "../models/prerequisite.model";
import { PaginationService } from "src/@custor/services/pagination.service";
import { TranslateService } from "@ngx-translate/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import {
  PrerequisiteParameters,
  ServicePrerequisiteParameters,
} from "../models/serviceprerequisiteparameter";
import { determineId } from "src/@custor/helpers/compare";
import { SelectionModel } from "@angular/cdk/collections";
import { LookUpService } from "src/app/common/services/look-up.service";
import { LookupType } from "src/app/common/enums/common";
import { AngConfirmDialogComponent } from "src/@custor/components/confirm-dialog/confirm-dialog.component";
import { AccountService } from 'src/@custor/services/security/account.service';
import { Permission } from 'src/@custor/models/permission.model';

@Component({
  selector: "app-service-prerequisite",
  templateUrl: "./service-prerequisite.component.html",
  styleUrls: ["./service-prerequisite.component.scss"],
})
export class ServicePrerequisiteComponent implements OnInit {
  prerequisites: Prerequisite[];
  ServicePrerequisites: ServicePrerequisiteDTO[];
  displayedColumns = ["Description", "EnglishDescription", "actions"];
  servicePrerequistedisplayedColumns = [
    "Description",
    "EnglishDescription",
    "IsRequired",
    "IsActive",
    "IsDocument",
    "actions"
  ];
  dataSource: MatTableDataSource<Prerequisite>;
  dataSourceForServicePrerequisite: MatTableDataSource<ServicePrerequisiteDTO>;
  loadingIndicator: boolean;
  totalCount = 0;
  totalServiceAssignedCount = 0;
  totalCountForServicePrerequisite = 0;
  prerequisiteid: number;
  exchangeActorTypes: any;
  servicetype: any;
  servicePrerequisiteForm: FormGroup;
  selection = new SelectionModel<ServicePrerequisiteDTO>(true, []);
  private currentLang: string;
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;
  showSaveButton: boolean;
  showCancellButton: boolean;
  disableServiceSaveButton: boolean;
  servicePrerequisite: ServicePrerequisiteDTO;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private prerequisiteService: PrerequisiteService,
    public readonly translate: TranslateService,
    public paginationService: PaginationService,
    public dialog: MatDialog,
    private router: Router,
    private configService: ConfigurationService,
    private lookupService: LookUpService,
    private accountService:AccountService,

  ) {
    this.currentLang = this.configService.language;
    this.dataSource = new MatTableDataSource();
    this.dataSourceForServicePrerequisite = new MatTableDataSource();
    this.buildForm();
    this.showSaveButton = false;
    this.showCancellButton = false;
    this.disableServiceSaveButton = false;
  }

  ngOnInit() {
    this.loadingIndicator = true;
    this.getServicType();
    this.getCustomerTypes();
    this.servicePrerequisiteForm.controls.ServiceType.setValue(1);
    this.servicePrerequisiteForm.controls.ExchangeActorType.setValue(6);
    this.getPrerequisitesByService();
    this.getPrerequisitesNotAsshginedToServices();
    this.loadingIndicator = false;
  }

  private buildForm() {
    this.servicePrerequisiteForm = this.formBuilder.group({
      ServiceType: [],
      ExchangeActorType: [],
      IsActive: [],
      IsDocument: [],
      IsRequired: [],
    });
  }

  getServicType() {
    this.lookupService.getServiceType(this.currentLang).subscribe((res) => {
      this.servicetype = res;
    });
  }

  getCustomerTypes() {
    this.lookupService
      .getLookup(this.currentLang, LookupType.CUSTOMER_TYPE)
      .subscribe((res) => {
        this.exchangeActorTypes = res;
      });
  }

  addPrerequisite() {
    this.router.navigate(["./admin/prerequisite", 0]);
  }

  addServicePrerequisite(servicePrerequisite: Prerequisite) {
    this.prerequisiteid = servicePrerequisite.PrerequisiteId;
    this.saveServicePrerequisite();
  }

  removeServicePrerequisite(servicePrerequisite: ServicePrerequisiteDTO) {
    this.confirmDialogRef = this.dialog.open(AngConfirmDialogComponent, {
      disableClose: false,
      height: "220px",
      width: "345px",
    });

    this.confirmDialogRef.afterClosed().subscribe((result) => {
        if(result){
            this.loadingIndicator = true;
      this.prerequisiteService
        .deleteServicePrerequisite(servicePrerequisite.ServicePrerequisiteId)
        .subscribe(
          () => {
            this.getPrerequisitesNotAsshginedToServices();
            this.getPrerequisitesByService();
          },
          () => {
            this.toastr.error(this.translate.instant("common.messages.Error"), '', {
              closeButton: true
            });
          }
        );
        }
    });
  }

  saveEditedServicePrerequiste(){
    this.loadingIndicator = true;
    this.prerequisiteService
      .editServicePrerequisite(
        this.servicePrerequisite.ServicePrerequisiteId,
        this.servicePrerequisiteForm.get('IsRequired').value,
        this.servicePrerequisiteForm.get('IsActive').value,
        this.servicePrerequisiteForm.get('IsDocument').value
      )
      .subscribe(
        () => {
          this.getPrerequisitesNotAsshginedToServices();
          this.getPrerequisitesByService();
          this.disableServiceSaveButton = false;
          this.showCancellButton = false;
          this.showSaveButton = false;
          this.resetCheckBox();
          this.enableFormControl();
        },
        () => {
          this.toastr.error(this.translate.instant("common.messages.Error"));
        }
      );
  }

  // edit service prerequiste
  editServicePrerequisite(servicePreRequisite: ServicePrerequisiteDTO){
    this.servicePrerequisiteForm.get('ServiceType').disable();
    this.servicePrerequisiteForm.get('ExchangeActorType').disable();
    this.servicePrerequisiteForm.patchValue(servicePreRequisite);
    this.showCancellButton = true;
    this.showSaveButton = true;
    this.disableServiceSaveButton = true;
    this.servicePrerequisite = servicePreRequisite;
  }

  cancelEditOperation(){
    this.showSaveButton = false;
    this.showCancellButton = false;
    this.disableServiceSaveButton = false;
    this.enableFormControl();
    this.resetCheckBox();
  }

  private enableFormControl(){
    this.servicePrerequisiteForm.get('ServiceType').enable();
    this.servicePrerequisiteForm.get('ExchangeActorType').enable();
  }


  saveServicePrerequisite() {
    this.loadingIndicator = true;
    this.prerequisiteService
      .saveServicePrerequisite(this.getPostedServicePrerequisite())
      .subscribe(
        (servicePrerequisite: ServicePrerequisite) => {
          this.saveCompleted(servicePrerequisite);
          this.getPrerequisitesNotAsshginedToServices();
          this.getPrerequisitesByService();
          this.loadingIndicator = false;
        },
        () => {
          this.toastr.error(
            this.translate.instant("common.messages.Error"), '', {
              closeButton: true
            }
          );
          this.loadingIndicator = false;
        }
      );
    this.loadingIndicator = false;
    this.resetCheckBox();
  }

  private resetCheckBox(){
    this.servicePrerequisiteForm.get('IsRequired').setValue(false);
    this.servicePrerequisiteForm.get('IsDocument').setValue(false);
    this.servicePrerequisiteForm.get('IsActive').setValue(false);
  }

  private getPostedServicePrerequisite(): ServicePrerequisite {
    const formModel = this.servicePrerequisiteForm.value;
    return {
      ServicePrerequisiteId: 0,
      PrerequisiteId: this.prerequisiteid,
      ServiceId: this.servicePrerequisiteForm.controls.ServiceType.value,
      CustomerTypeId: this.servicePrerequisiteForm.controls.ExchangeActorType
        .value,
      IsRequired: formModel.IsRequired ? formModel.IsRequired : false,
      IsDocument: formModel.IsDocument ? formModel.IsDocument : false,
      IsActive: formModel.IsActive ? formModel.IsActive : false,
    };
  }

  private saveCompleted(servicePreRequisite?: ServicePrerequisite) {
    if (servicePreRequisite == null) {
      this.toastr.error(
        this.translate.instant('common.messages.SaveError'), '', {
          closeButton: true
        }
      );
      this.loadingIndicator = false;
      return;
    } else {
      this.toastr.success(this.translate.instant("common.messages.Saved"), '', {
        closeButton: true
      });
      this.loadingIndicator = false;
    }
  }

  refillGrids() {
    this.loadingIndicator = true;
    this.getPrerequisitesNotAsshginedToServices();
    this.getPrerequisitesByService();
    this.loadingIndicator = false;
  }

  switchPage(event: PageEvent) {
    this.paginationService.change(event);
    this.getPrerequisitesNotAsshginedToServices();
  }

  switchPageForServicePrerequisite(event: PageEvent) {
    this.paginationService.change(event);
    this.getPrerequisitesByService();
  }
  get canManageSetting() {
    return this.accountService.userHasPermission(Permission.manageSettingsPermission);
  }
  get canViewSetting() {
    return this.accountService.userHasPermission(Permission.viewSettingPermission);
  }
  getPrerequisitesNotAsshginedToServices() {
    this.loadingIndicator = true;
    this.prerequisiteService
      .getPrerequisitesNotAsshginedToServices(
        this.getServicePrerequisiteParameters()
      )
      .subscribe(
        (result) => {
          if (result != null) {
            this.prerequisites = result.Items;
            if (!this.prerequisites) {
              this.dataSource.data = null;
              this.toastr.error(
                this.translate.instant("common.messages.NoRecordFound")
              );
            } else {
              this.dataSource.data = this.prerequisites;
              this.totalCount = result.ItemsCount;
            }
          }
        },
        () => {
          this.toastr.error(this.translate.instant("common.messages.Error"));
        }
      );
    this.loadingIndicator = false;
  }

  getPrerequisitesByService() {
    this.loadingIndicator = true;
    this.prerequisiteService
      .getServicePrerequisites(this.getServicePrerequisiteParameters())
      .subscribe(
        (res) => {
          this.ServicePrerequisites = res.Items;
          this.dataSourceForServicePrerequisite.data = this.ServicePrerequisites;
          this.totalServiceAssignedCount = res.ItemsCount;
        },
        () => {
          this.toastr.error(this.translate.instant("common.messages.NoRecordFound"));
        }
      );
    this.loadingIndicator = false;
  }


  private getServicePrerequisiteParameters(): ServicePrerequisiteParameters {
    const params = new ServicePrerequisiteParameters();
    params.PageIndex = this.paginationService.page;
    params.PageSize = this.paginationService.pageCount;
    params.Lang = this.configService.language;
    params.ServiceGuid = this.servicePrerequisiteForm.controls.ServiceType.value;
    // replace with excange actor type
    params.ExchangeActorType = this.servicePrerequisiteForm.controls.ExchangeActorType.value;
    return params;
  }

  getPaginatorIntl(): MatPaginatorIntl {
    const paginatorIntl = new MatPaginatorIntl();
    paginatorIntl.itemsPerPageLabel = this.translate.instant(
      "ITEMS_PER_PAGE_LABEL"
    );
    paginatorIntl.nextPageLabel = this.translate.instant("NEXT_PAGE_LABEL");
    paginatorIntl.previousPageLabel = this.translate.instant(
      "PREVIOUS_PAGE_LABEL"
    );
    paginatorIntl.firstPageLabel = this.translate.instant("FIRST_PAGE_LABEL");
    paginatorIntl.lastPageLabel = this.translate.instant("LAST_PAGE_LABEL");
    paginatorIntl.getRangeLabel = this.getRangeLabel.bind(this);
    return paginatorIntl;
  }

  private getRangeLabel(
    page: number,
    pageSize: number,
    length: number
  ): string {
    if (length === 0 || pageSize === 0) {
      return this.translate.instant("RANGE_PAGE_LABEL_1", { length });
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return this.translate.instant("RANGE_PAGE_LABEL_2", {
      startIndex: startIndex + 1,
      endIndex,
      length,
    });
  }

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }
}
