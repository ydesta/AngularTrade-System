import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatProgressBarModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {UserDocumentsUploadDialogComponent} from './user-documents-upload-dialog.component';
import {FlexModule} from '@angular/flex-layout';
import {TranslateLanguageLoader} from 'src/@custor/services/translation.service';
import {CommonModule} from '@angular/common';
import {UserDocumentsService} from './service/user-documents.service';
import {AngConfirmDialogModule} from 'src/@custor/components/confirm-dialog/confirm-dialog.module';
import {FileUploadService} from 'src/@custor/services/file-upload/file-upload.service';

@NgModule({
  declarations: [
    UserDocumentsUploadDialogComponent
  ],
  imports: [
    MatDialogModule,
    MatButtonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateLanguageLoader
      }
    }),
    MatToolbarModule,
    FlexModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    AngConfirmDialogModule
  ],
  entryComponents: [
    UserDocumentsUploadDialogComponent
  ],
  providers: [UserDocumentsService, FileUploadService ]
})
export class UserDocumentsUploadDialogModule {
}
