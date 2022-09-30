import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInstructionRoutingModule } from './user-instruction-routing.module';
import { UserInstructionComponent } from './user-instruction.component';
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatTableModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {FlexModule} from '@angular/flex-layout';
import {EditUserInstructionDialogModule} from './edit-user-instruction-dialog/edit-user-instruction-dialog.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { AngConfirmDialogModule } from 'src/@custor/components/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [UserInstructionComponent],
    imports: [
        CommonModule,
        UserInstructionRoutingModule,
        MatCardModule,
        TranslateModule,
        FlexModule,
        MatFormFieldModule,
        MatSelectModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        EditUserInstructionDialogModule,
        DragDropModule,
        MatListModule,
        AngConfirmDialogModule
    ]
})
export class UserInstructionModule { }
