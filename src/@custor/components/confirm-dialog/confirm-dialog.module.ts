import { NgModule } from '@angular/core';
import {MatButtonModule, MatDialogModule, MatDividerModule, MatToolbarModule} from '@angular/material';

import { AngConfirmDialogComponent } from './confirm-dialog.component';
import { TranslateModule} from '@ngx-translate/core';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    AngConfirmDialogComponent
  ],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    TranslateModule,
    MatDividerModule,
    FlexLayoutModule
  ],
  entryComponents: [
    AngConfirmDialogComponent
  ],
})
export class AngConfirmDialogModule {
}
