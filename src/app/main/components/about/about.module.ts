import { NgModule } from '@angular/core';

import {
  MatCardModule,
  MatCheckboxModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatSelectModule,
  MatTableModule, MatToolbarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AboutComponent } from './about.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentModule } from 'src/@custor/modules/shared-component.module';
import { SharedModule } from 'src/@custor/modules/shared.module';
import { AuthService } from 'src/@custor/services/security/auth.service';

export const routes = [

  { path: '', component: AboutComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [AboutComponent,],
  imports: [
    ToastrModule.forRoot(), RouterModule.forChild(routes),
    FlexLayoutModule, MatIconModule,
    MatTableModule, MatSelectModule, MatCheckboxModule, MatCardModule, MatExpansionModule,
    MatDividerModule, SharedComponentModule,
    TranslateModule, MatToolbarModule,
    SharedModule,
  ],
  providers: [
    AuthService,
  ],
  exports: [],

})
export class AboutModule {

}

