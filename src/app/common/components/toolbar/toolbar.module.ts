import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from './toolbar.component';
import {LangSwitcherModule} from '../../../../@custor/components/lang-switcher/lang-switcher.component';
import {MatToolbarModule, MatDialogModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [ToolbarComponent],
  exports: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    LangSwitcherModule,
    MatToolbarModule,
    FlexLayoutModule,
    RouterModule,
    MatDialogModule

  ]
})
export class ToolbarModule {
}
