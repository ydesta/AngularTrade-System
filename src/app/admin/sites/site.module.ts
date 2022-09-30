import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import {
    MatButtonModule,
    MatCardModule, MatExpansionModule,
    MatFormFieldModule,
    MatIconModule, MatListModule,
    MatSelectModule,
    MatTableModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {FlexModule} from '@angular/flex-layout';
import {EditSiteDialogModule} from './edit-site-dialog/edit-site-dialog.module';
import {SiteComponent} from './site.component';
import { AngConfirmDialogModule } from 'src/@custor/components/confirm-dialog/confirm-dialog.module';

@NgModule({
    declarations: [SiteComponent],
    exports: [
        SiteComponent
    ],
    imports: [
        CommonModule,
        SiteRoutingModule,
        MatCardModule,
        TranslateModule,
        FlexModule,
        MatFormFieldModule,
        MatSelectModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        EditSiteDialogModule,
        MatExpansionModule,
        AngConfirmDialogModule,
        MatListModule
    ]
})
export class SiteModule { }
