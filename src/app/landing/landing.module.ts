import { LandingComponent } from './landing.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActionsComponent } from './actions/actions.component';
import { CommonModule } from '@angular/common';
import { OurServicesComponent } from './our-services/our-services.component';
import {CustomerService} from './our-services/customer-services.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule, MatSidenavModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {LangSwitcherModule} from '../../@custor/components/lang-switcher/lang-switcher.component';
import {AuthService} from "../../@custor/services/security/auth.service";
import { ContentHeaderModule } from 'src/@custor/components/content-header/content-header.module';
import { ToolbarModule } from '../common/components/toolbar/toolbar.module';
export const routes = [
    { path: '', component: LandingComponent, pathMatch: 'full' }
  ];
@NgModule({
    declarations: [
      LandingComponent,
      ActionsComponent,
      OurServicesComponent,
      // ContentHeaderComponent,

    ],
    imports: [
        RouterModule.forChild(routes),
        ContentHeaderModule,
        CommonModule,
        MatButtonModule, MatCardModule, MatIconModule,
        MatToolbarModule, MatSidenavModule,
        FormsModule, ReactiveFormsModule, FlexLayoutModule,
        TranslateModule,
        LangSwitcherModule,
        ToolbarModule
      ],
    providers: [
      CustomerService,AuthService
      ]
  })
  export class LandingModule { }
