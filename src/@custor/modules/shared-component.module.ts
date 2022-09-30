import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BreadcrumbComponent } from "../components/breadcrumb/breadcrumb.component";
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
} from "@angular/material";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule,
    RouterModule,
    FlexLayoutModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatProgressBarModule,
    MatCardModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatInputModule,
    MatCheckboxModule,
    MatTooltipModule,
  ],
  exports: [BreadcrumbComponent],
})
export class SharedComponentModule {}
