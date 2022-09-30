import {NgModule} from '@angular/core';
import {MatButtonModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatToolbarModule} from '@angular/material';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ExistingUserDialogComponent} from './existing-user-dialog.component';
import {FlexModule} from '@angular/flex-layout';
import {TranslateLanguageLoader} from '../../../../@custor/services/translation.service';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    ExistingUserDialogComponent
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
        CommonModule
    ],
  entryComponents: [
    ExistingUserDialogComponent
  ],
})
export class ExistingUserDialogModule {
}
