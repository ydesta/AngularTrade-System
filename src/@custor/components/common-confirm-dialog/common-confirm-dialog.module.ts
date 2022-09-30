import { NgModule } from '@angular/core';
import { CommonConfirmDialogComponent } from './common-confirm-dialog.component';
import {TranslateLanguageLoader} from '../../services/translation.service';
import {MatButtonModule, MatDialogModule, MatDividerModule, MatToolbarModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';



@NgModule({
  declarations: [CommonConfirmDialogComponent],
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
    FlexLayoutModule,
    MatDividerModule
  ],
  entryComponents: [
    CommonConfirmDialogComponent
  ],
})
export class CommonConfirmDialogModule { }
