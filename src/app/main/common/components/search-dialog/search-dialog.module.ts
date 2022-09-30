import { NgModule } from "@angular/core";
import { SearchDialogComponent } from "./search-dialog.component";
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
} from "@angular/material";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateLanguageLoader } from "src/@custor/services/translation.service";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PaginationService } from "src/@custor/services/pagination.service";

@NgModule({
  declarations: [SearchDialogComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    FlexLayoutModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateLanguageLoader,
      },
    }),
    MatToolbarModule,
  ],
  entryComponents: [SearchDialogComponent],
  providers: [PaginationService],
})
export class SearchDialogModule {}
