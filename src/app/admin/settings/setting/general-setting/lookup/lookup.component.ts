import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { ALPHABET_WITHSPACE_REGEX, ET_ALPHABET_WITHSPACE_REGEX } from 'src/app/common/constants/consts';
import { LookUpType } from 'src/app/common/models/static-data.model';
import { LookUpService } from 'src/app/common/services/look-up.service';
import { AngConfirmDialogComponent, ConfirmDialogModel } from 'src/@custor/components/confirm-dialog/confirm-dialog.component';
import { Permission } from 'src/@custor/models/permission.model';
import { ConfigurationService } from 'src/@custor/services/configuration.service';
import { PaginationService } from 'src/@custor/services/pagination.service';
import { AccountService } from 'src/@custor/services/security/account.service';
import { TranslationLoaderService } from 'src/@custor/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { ReportSettingService } from 'src/app/admin/settings/service/report-setting.service';
import { ToastrService } from 'ngx-toastr';
import { locale as langEnglish } from "../../../../lang/en";
import { locale as langEthiopic } from "../../../../lang/et";
import { LookupValueComponent } from '../lookup-value/lookup-value.component';
@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss']
})
export class LookupComponent implements OnInit {
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  formLookupType: FormGroup;
  parentlookup:string;
  reportPeriodId = 0;
  lookUpTypeId=0;
  currentLang = '';
  dataSource: any;
  ExpandedPanel:boolean=false;
  displayedColumns = ['DescriptionEng','DescriptionAmh', 'Action'
  ];
  constructor(
    private toaster: ToastrService,
    private configService: ConfigurationService,
    private formBuilder: FormBuilder,
    private myDialog: MatDialog,
    private translationLoaderService: TranslationLoaderService,
    private translate: TranslateService,
    private lookupservice: LookUpService,
    private settingService: ReportSettingService,
    private dialog: MatDialog,
    private paginationService: PaginationService,
    private accountService:AccountService

  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.createReportPeriod();
  }

  ngOnInit() {
    this.getLookUpType();
  }
  switchPage(event: PageEvent) {
    this.paginationService.change(event);
}
  private createReportPeriod() {
    this.formLookupType = this.formBuilder.group({
      DescriptionAmh: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern(ET_ALPHABET_WITHSPACE_REGEX)])],
      DescriptionEng: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern(ALPHABET_WITHSPACE_REGEX)])],

    });
  }

  private getnewLookUpType(): LookUpType {
    const formData = this.formLookupType.getRawValue();
    const lookUpType = new LookUpType();
    lookUpType.DescriptionEng = formData.DescriptionEng;
    lookUpType.DescriptionAmh = formData.DescriptionAmh;
   
    return lookUpType;
  }
  getLookUpType() {
    this.lookupservice.getallLookUpType().subscribe(
      result => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  onSubmit() {
    const postData = this.getnewLookUpType();

    if (this.lookUpTypeId=== 0) {
      this.settingService.saveLookupType(postData).subscribe(
        result => {
          this.toaster.success(this.translate.instant('common.messages.Saved'), '', {
            closeButton: true
          });
          this.getLookUpType();
          this.clearForm();
        });
    } else {
      postData.LookupTypeId = this.lookUpTypeId;
      this.settingService.saveLookupType(postData).subscribe(
        result => {
          this.toaster.success(this.translate.instant('common.messages.UpdateSuccess'), '', {
            closeButton: true
          });
          this.getLookUpType();
          this.clearForm();
        });
    }

  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }

  private refresh() {
    // Causes the filter to refresh there by updating with recently added data.
    this.applyFilter(this.dataSource.filter);
  }
  editLookupvalue(register:LookUpType){
    this.lookUpTypeId=register.LookupTypeId;
    this.ExpandedPanel=true;
    this.formLookupType.patchValue(register);
      }
      
  cancelEditOperation(){
    this.clearForm();
    this.resetedit();
    this.ExpandedPanel = false;
  }
  private resetedit(){
    this.lookUpTypeId=0;
  }
  clearForm() {
    this.formLookupType.reset();
  }
  openlookupvalue(caseApplicationData: LookUpType = null) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '1000px';
    dialogConfig.id = "ComplaintApplication";
    dialogConfig.height = '500px';
    dialogConfig.position = {
      top: '8%',
      left: '22%',
    };
    dialogConfig.data={
      lookUpTypeId:this.lookUpTypeId,
      parentlookup:caseApplicationData.DescriptionEng
    }
    dialogConfig.width = '95%';
    //dialogConfig.height='100%';
    dialogConfig.disableClose = true;
    let cap=new LookUpType();
    dialogConfig.data = caseApplicationData == null ?cap : caseApplicationData as LookUpType;
    const dialogRef = this.myDialog.open(LookupValueComponent, dialogConfig, );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }
  deleteLookupvalue(register: LookUpType) {
    const message = `Are you sure you want to delete this record?`;
    const dialogData = new ConfirmDialogModel('Confirm', message);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '345px';
    dialogConfig.height = '220px';
    dialogConfig.data = dialogData;
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(AngConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.lookupservice.deleteLookupType(register.LookupTypeId).subscribe(result => {
          this.toaster.success(this.translate.instant('common.messages.Deleted'), '', {
            closeButton: true
          });
          this.getLookUpType();
        });
      }
    });
  }
  get DescriptionAmh() {
    return this.formLookupType.get('DescriptionAmh');
  }

  get DescriptionEng() {
    return this.formLookupType.get('DescriptionEng');
  }
  get canManageSetting() {
    return this.accountService.userHasPermission(Permission.manageSettingsPermission);
  }
  get canViewSetting() {
    return this.accountService.userHasPermission(Permission.viewSettingPermission);
  }
}
