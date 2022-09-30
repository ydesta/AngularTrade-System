import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found.component';
import {ContentHeaderModule} from 'src/@custor/components/content-header/content-header.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule, MatIconModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import { DeniedComponent } from '../denied/denied.component';
import { TranslateModule } from '@ngx-translate/core';

export const routes = [
  { path: '', component: NotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [NotFoundComponent,DeniedComponent],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
  ]
})
export class NotFoundModule { }
