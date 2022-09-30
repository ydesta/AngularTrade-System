import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import {
    MatButtonModule,
    MatCardModule, MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {FlexModule} from '@angular/flex-layout';
import {EditFaqDialogModule} from './edit-faq-dialog/edit-faq-dialog.module';
import {FaqComponent} from './faq.component';
import { AngConfirmDialogModule } from 'src/@custor/components/confirm-dialog/confirm-dialog.module';

@NgModule({
    declarations: [FaqComponent],
    exports: [
        FaqComponent
    ],
    imports: [
        CommonModule,
        FaqRoutingModule,
        MatCardModule,
        TranslateModule,
        FlexModule,
        MatFormFieldModule,
        MatSelectModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        EditFaqDialogModule,
        MatExpansionModule,
        AngConfirmDialogModule
    ]
})
export class FaqModule { }
