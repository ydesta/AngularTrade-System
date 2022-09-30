import {AfterContentChecked, ChangeDetectorRef, Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {TranslationLoaderService} from 'src/@custor/services/translation-loader.service';
import {ConfigurationService} from 'src/@custor/services/configuration.service';
import {UserDocumentDetailModel, UserDocumentModel} from './models/document.model';
import {AngConfirmDialogComponent} from 'src/@custor/components/confirm-dialog/confirm-dialog.component';
import {ToastrService} from 'ngx-toastr';
import {NotificationService} from 'src/@custor/services/error/notification.service';
import {TranslateService} from '@ngx-translate/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {UserDocumentsService} from './service/user-documents.service';
import {StaticData} from 'src/app/common/models/static-data.model';
import {User} from 'src/@custor/models/user.model';
import {Role} from 'src/@custor/models/role.model';
import {locale as langEnglish} from './lang/et';
import {locale as langEthiopic} from './lang/en';
import {FileUploadService} from "src/@custor/services/file-upload/file-upload.service";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './user-documents-upload-dialog.component.html',
  styleUrls: ['./user-documents-upload-dialog.component.scss']
})
export class UserDocumentsUploadDialogComponent implements AfterContentChecked {

  uploadedDocuments: Array<StaticData> = [];
  uploadedDocumentsDetail: Array<UserDocumentDetailModel> = [];
  baseDocumentUrl: string;
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;
  displayedColumns = ['Description', 'Uploaded', 'Actions'];
  @ViewChild('file', {static: false}) file;
  formData: FormData;
  fileName: string;
  document: UserDocumentModel;
  progress: number;
  private indexOfPrerequisite: number;

  constructor(private fileUploadService: FileUploadService,
              public dialog: MatDialog,
              private translationLoaderService: TranslationLoaderService,
              private translate: TranslateService,
              public configService: ConfigurationService,
              private toaster: ToastrService,
              private ngxUiLoaderService: NgxUiLoaderService,
              private changeDetector: ChangeDetectorRef,
              private userDocumentService: UserDocumentsService,
              private translationService: TranslateService,
              @Inject(MAT_DIALOG_DATA) public data: { user: User, roles: Role[] }
  ) {
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    if (!this.configService.language) {
      this.translationService.setDefaultLang('et');
      this.configService.language = 'et';
    } else {
      this.translationService.use(this.configService.language);
    }
    this.baseDocumentUrl = this.configService.baseUrl + 'Documents/';
    this.document = new UserDocumentModel();
    this.getDocuments();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  private getDocuments() {


    this.getUserDocuments();
    // get newly uploaded document
    this.getNewlyUploadedDocument();


  }


  getUserDocuments() {
    this.ngxUiLoaderService.start();
    this.uploadedDocumentsDetail = [];
    this.userDocumentService.getRequiredUserDocuments().subscribe(res => {
      this.ngxUiLoaderService.stop();
      this.uploadedDocuments = res;
      this.uploadedDocuments.forEach(document => {
        this.checkIfDocsAreUploaded(document);
      });
    });
    // this.servicePreRequisiteApiService.getServicePreRequisiteDocuments(
    //   this.serviceApplicationService.serviceApplicationModel.RequestedServiceId,
    //   this.serviceApplicationService.serviceApplicationModel.LegalCondition,
    //   this.currentLang)
    //   .subscribe(res => {
    //     this.ngxUiLoaderService.stop();
    //     this.uploadedPreRequisiteDocuments = res;
    //     this.uploadedPreRequisiteDocuments.forEach(document => {
    //       // check if document is already uploaded
    //       this.checkIfDocumentIsAlreadyUploaded(document);
    //     });
    //     this.servicePreRequisites = res;
    //     return;
    //   });
    return;
  }


  delete(id, keywords, index) {
    this.confirmDialogRef = this.dialog.open(AngConfirmDialogComponent,
      {
        disableClose: false,
        height: '199px',
        width: '345px',
        backdropClass: 'custom-backdrop'
      });
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userDocumentService.deleteDocument(id, keywords)
          .subscribe(() => {
            this.uploadedDocumentsDetail[index].Link = '';
            this.uploadedDocumentsDetail[index].Uploaded = false;

          });
      }
    });
  }

  private checkIfRequiredDocsAreUploaded() {
    // for (const document of this.uploadedDocumentsDetail) {
    //   if (!(document.IsRequired && !document.Uploaded)) {
    //     this.disableNextButton.emit(false);
    //   } else {
    //     this.disableNextButton.emit(true);
    //     break;
    //   }
    // }
  }


  onFilesAdded(files: FileList) {
    if (files.length === 0) {
      return;
    }
    const fileTobeUploaded = this.file.nativeElement.files[0];
    this.fileName = fileTobeUploaded.name;
    this.formData = new FormData();
    this.document.File = fileTobeUploaded;
    if (fileTobeUploaded.type !== 'application/pdf' && fileTobeUploaded.type !== 'image/jpeg' && fileTobeUploaded.type !== 'image/png') {
      this.toaster.error(this.translate.instant('messages.FileTypeNotSupported'));
      return;
    }
    if (fileTobeUploaded.size > 2e+6) {
      this.toaster.error(this.translate.instant('messages.FileIsLarge'));
      return;
    }

    this.document.Name = this.fileName;
    // this.document.ServiceApplicationId = this.serviceApplicationService.serviceApplicationModel.ServiceApplicationID;
    this.formData.append('DocumentCode', this.document.DocumentCode);
    this.formData.append('File', this.document.File);
    this.formData.append('TIN', this.data.user.Tin);
    this.fileUploadService.upload(this.formData, this.indexOfPrerequisite,0).subscribe(
      (res) => {
        if (res) {
          if (res.DocumentId > 0) {
            this.toaster.success(this.translate.instant('messages.UploadSuccess'));
          }
          this.progress = res.message;
          if (this.progress === 100) {
            this.resetInput();
          }
        } else {
          this.toaster.error(this.translate.instant('messsages.UploadError'));
        }

      }
    );
  }

  private resetInput() {
    this.file.nativeElement.value = '';
  }

  addFiles(index, documentCode) {
    this.indexOfPrerequisite = index;
    this.document.DocumentCode = documentCode;
    this.file.nativeElement.click();
  }

  private getNewlyUploadedDocument() {
    this.fileUploadService.newlyUploadedDocument.subscribe(res => {
      if (res) {
        const tempDocument = this.uploadedDocumentsDetail[res.Index];
        tempDocument.Link = res.Link;
        tempDocument.DocumentId = res.Id;
        tempDocument.Uploaded = true;
        this.uploadedDocumentsDetail[res.Index] = tempDocument;
        this.checkIfRequiredDocsAreUploaded();
      }

    });
  }

  private checkIfDocsAreUploaded(document) {
    this.userDocumentService.getUserDocuments(this.data.user.Tin, document.PrerequisiteId).subscribe(res => {
      
      if (res !== null) {
        this.uploadedDocumentsDetail.push({
          DocumentId: res.DocumentId,
          Description: document.Description,
          Link: res.KeyWords,
          Uploaded: true,
          DocumentCode: document.PrerequisiteId

        });
      } else {

        this.uploadedDocumentsDetail.push({
          DocumentId: 0,
          Description: document.Description,
          Link: '',
          Uploaded: false,
          DocumentCode: document.PrerequisiteId
        });
      }
      this.uploadedDocumentsDetail = [...this.uploadedDocumentsDetail];
    });
  }
}
