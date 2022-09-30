import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTableModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatDividerModule,
  MatTooltipModule,
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { PrerequisiteComponent } from './prerequisite/Edit/prerequisite.component';
import { PrerequisiteListComponent } from './prerequisite/List/prerequisite-list.component';
import { PrerequisiteService } from './Service/prerequisite.service';
import { PaginationService } from '../../../@custor/services/pagination.service';
import { AngConfirmDialogComponent } from '../../../@custor/components/confirm-dialog/confirm-dialog.component';
import { AngConfirmDialogModule } from '../../../@custor/components/confirm-dialog/confirm-dialog.module';
import { ServicePrerequisiteComponent } from './service-prerequisite/service-prerequisite.component';
import { SharedComponentModule } from 'src/@custor/modules/shared-component.module';
import { LookUpService } from 'src/app/common/services/look-up.service';

export const routes = [
  { path: '', component: PrerequisiteListComponent, pathMatch: 'full' },
  { path: 'list', component: PrerequisiteListComponent, pathMatch: 'full' },
  { path: ':id', component: PrerequisiteComponent, pathMatch: 'full' },
  { path: 'servicepreprerequisite/assighnment', component: ServicePrerequisiteComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [PrerequisiteComponent, PrerequisiteListComponent, ServicePrerequisiteComponent],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    FlexLayoutModule,
    SharedComponentModule,
    TranslateModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatRadioModule,
    MatPaginatorModule,
    MatDividerModule,
    AngConfirmDialogModule,
    MatTooltipModule
  ]
  , entryComponents: [
    PrerequisiteComponent,
    ServicePrerequisiteComponent,
    AngConfirmDialogComponent
  ],
  providers: [PrerequisiteService, PaginationService, LookUpService]
})
export class PreRequisiteModule {
}
