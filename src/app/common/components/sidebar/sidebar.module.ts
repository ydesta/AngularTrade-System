import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import {
  MatButtonModule, MatExpansionModule, MatIconModule, MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {ExtendedModule, FlexModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';
import { ProgressBarComponent } from 'src/@custor/components/progress-bar/progress-bar.component';
import { LangSwitcherModule } from 'src/@custor/components/lang-switcher/lang-switcher.component';
import { ToolbarDashboardModule } from '../toolbar-dashboard/toolbar-dashboard.module';

@NgModule({
  declarations: [SidebarComponent, ProgressBarComponent, MenuListItemComponent],
  exports: [
    SidebarComponent
  ],
  imports: [
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
    ToolbarDashboardModule,
  ]
})
export class SidebarModule { }
