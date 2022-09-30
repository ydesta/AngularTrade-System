import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog ,MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef, PageEvent } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslationLoaderService } from 'src/@custor/services/translation-loader.service';
import { LookUpService } from 'src/app/common/services/look-up.service';
import { TranslateService } from '@ngx-translate/core';
import { LookUp } from 'src/app/common/models/static-data.model';
import { ET_ALPHABET_WITHSPACE_REGEX, ALPHABET_WITHSPACE_REGEX } from 'src/app/common/constants/consts';
import {locale as langEnglish} from "../../../../lang/en";
import {locale as langEthiopic} from "../../../../lang/et";
import { ReportSettingService } from 'src/app/admin/settings/service/report-setting.service';
import { ConfirmDialogModel, AngConfirmDialogComponent } from 'src/@custor/components/confirm-dialog/confirm-dialog.component';
import { PaginationService } from 'src/@custor/services/pagination.service';
import { AccountService } from 'src/@custor/services/security/account.service';
import { Permission } from 'src/@custor/models/permission.model';

@Component({
  selector: "app-lookup-value",
  templateUrl: "./lookup-value.component.html",
  styleUrls: ["./lookup-value.component.scss"],
})
export class LookupValueComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @Input() parentlookup: string;
  formLookupType: FormGroup;
  lookupId = 0;
  lookUpTypeId = 0;
  currentLang = "";
  dataSource: any;
  ExpandedPanel: boolean = false;
  public totalCount = 0;

  displayedColumns = ["DescriptionEng", "DescriptionAmh", "Action"];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<LookupValueComponent>,
    private settingService: ReportSettingService,
    private toaster: ToastrService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private translationLoaderService: TranslationLoaderService,
    private translate: TranslateService,
    private lookupservice: LookUpService,
    public paginationService: PaginationService,
    private accountService:AccountService,
  ) {
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.createReportPeriod();
    this.parentlookup=data.DescriptionEng;
  }

  ngOnInit() {
    this.getLookUpType();
  }
  private createReportPeriod() {
    this.formLookupType = this.formBuilder.group({
      DescriptionAmh: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(ET_ALPHABET_WITHSPACE_REGEX),
        ]),
      ],
      DescriptionEng: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(ALPHABET_WITHSPACE_REGEX),
        ]),
      ],
    });
  }

  private getnewLookUpType(): LookUp {
    const formData = this.formLookupType.getRawValue();
    const lookUp = new LookUp();
    lookUp.DescriptionEng = formData.DescriptionEng;
    lookUp.DescriptionAmh = formData.DescriptionAmh;
    lookUp.LookupTypeId = this.data.LookupTypeId;
    return lookUp;
  }

  cancelEditOperation() {
    this.clearForm();
    this.resetedit();
    this.ExpandedPanel = false;
  }

  switchPage(event: PageEvent) {
    this.paginationService.change(event);
  }
  private resetedit() {
    this.lookupId = 0;
  }

  clearForm() {
    this.formLookupType.reset();
  }
  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }

  onSubmit() {
    const postData = this.getnewLookUpType();

    if (this.lookupId === 0) {
      this.settingService.saveLookup(postData).subscribe(() => {
        this.toaster.success(
          this.translate.instant("common.messages.Saved"),
          "",
          {
            closeButton: true,
          }
        );
        this.getLookUpType();
        this.clearForm();
      });
    } else {
      postData.LookupId = this.lookupId;
      this.settingService.saveLookup(postData).subscribe(() => {
        this.toaster.success(
          this.translate.instant("common.messages.UpdateSuccess"),
          "",
          {
            closeButton: true,
          }
        );
        this.getLookUpType();
        this.clearForm();
      });
    }
  }
  editLookupvalue(register: LookUp) {
    this.lookupId = register.LookupId;
    this.ExpandedPanel = true;
    this.formLookupType.patchValue(register);
  }
  getLookUpType() {
    this.lookupservice
      .getLookupById(this.data.LookupTypeId)
      .subscribe((result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  deleteLookupvalue(register: LookUp) {
    const message = `Are you sure you want to delete this record?`;
    const dialogData = new ConfirmDialogModel("Confirm", message);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '345px';
    dialogConfig.height = '220px';
    dialogConfig.data = dialogData;
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(AngConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult === true) {
        this.lookupservice
          .deleteLookupvalue(register.LookupId)
          .subscribe(() => {
            this.toaster.success(
              this.translate.instant("common.messages.Deleted"),
              "",
              {
                closeButton: true,
              }
            );
            this.getLookUpType();
          });
      }
    });
  }

  get DescriptionAmh() {
    return this.formLookupType.get("DescriptionAmh");
  }

  get DescriptionEng() {
    return this.formLookupType.get("DescriptionEng");
  }

  get canManageSetting() {
    return this.accountService.userHasPermission(Permission.manageSettingsPermission);
  }
  get canViewSetting() {
    return this.accountService.userHasPermission(Permission.viewSettingPermission);
  }
}
