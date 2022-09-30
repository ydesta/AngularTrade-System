import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import {TranslateModule} from "@ngx-translate/core";
import {LangSwitcherModule} from "../../../../@custor/components/lang-switcher/lang-switcher.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatListModule} from "@angular/material/list";
import { ToolbarDashboardComponent } from './toolbar-dashboard.component';
import { SharedModule } from 'src/@custor/modules/shared.module';
import { AppTranslationService } from 'src/@custor/services/translation.service';
import { AccountService } from 'src/@custor/services/security/account.service';
import { AuthService } from 'src/@custor/services/security/auth.service';



@NgModule({
  declarations: [
    ToolbarDashboardComponent,
  ],
  exports: [
    ToolbarDashboardComponent
  ],
  imports: [
    TranslateModule.forChild(),
    SharedModule,
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatProgressBarModule,
    RouterModule,
    FlexModule,
    TranslateModule,
    MatToolbarModule,
    MatButtonModule,
    LangSwitcherModule,
    MatMenuModule,
    ExtendedModule,
    MatTooltipModule,
  ],
//   entryComponents: [
//     ManagePasswordComponent
// ],
providers: [
  AppTranslationService,
  AccountService,
  AuthService
]

})
export class ToolbarDashboardModule { }
