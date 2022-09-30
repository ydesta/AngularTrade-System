import {NgModule} from '@angular/core';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatToolbarModule} from '@angular/material';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateLanguageLoader} from 'src/@custor/services/translation.service';
import {EditUserInstructionDialogComponent} from './edit-user-instruction-dialog.component';
import {FlexModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        EditUserInstructionDialogComponent
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
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        CommonModule
    ],
    entryComponents: [
        EditUserInstructionDialogComponent
    ],
})
export class EditUserInstructionDialogModule {
}
