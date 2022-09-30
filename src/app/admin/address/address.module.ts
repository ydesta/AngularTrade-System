import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/@custor/modules/shared.module";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SidebarModule } from "src/app/common/components/sidebar/sidebar.module";
import { TranslateModule } from "@ngx-translate/core";
import { ToolbarModule } from "src/app/common/components/toolbar/toolbar.module";
import { AuthGuardAdmin } from "src/@custor/services/security/auth-guard-admin.service";
import { AddressComponent } from "./address.component";
import { AngConfirmDialogModule } from "src/@custor/components/confirm-dialog/confirm-dialog.module";

import { ListRegionComponent } from "./region/region-list/list-region.component";
import { EditRegionComponent } from "./region/region-edit/edit-region.component";
import { RegionService } from "./services/region.service";
import { ListZoneComponent } from "./zone/zone-list/list-zone.component";
import { ZoneService } from './services/zone.service';
import { EditZoneComponent } from './zone/zone-edit/edit-zone.component';
import { AngConfirmDialogComponent } from 'src/@custor/components/confirm-dialog/confirm-dialog.component';
import { EditWoredaComponent } from './woreda/woreda-edit/edit-woreda.component';
import { ListWoredaComponent } from './woreda/woreda-list/list-woreda.component';
import { WoredaService } from './services/woreda.service';
import { ListKebeleComponent } from './kebele/kebele-list/list-kebele.component';
import { EditKebeleComponent } from './kebele/kebele-edit/edit-kebele.component';
import { KebeleService } from './services/kebele.service';

export const routes = [
  {
    path: "",
    // canActivate: [AuthGuardAdmin],
    children: [
      {
        path: "region",
        component: ListRegionComponent,
      },
      {
        path: "zone",
        component: ListZoneComponent,
      },
      {
        path: 'woreda',
        component: ListWoredaComponent
      },
      {
        path: 'kebele',
        component: ListKebeleComponent
      }
    ],
  },
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ToolbarModule,
    SidebarModule,
    AngConfirmDialogModule,
  ],
  declarations: [
    ListRegionComponent,
    EditRegionComponent,
    ListZoneComponent,
    EditZoneComponent,
    EditWoredaComponent,
    ListWoredaComponent,
    EditKebeleComponent,
    ListKebeleComponent,
    AddressComponent,
  ],
  entryComponents: [
    EditRegionComponent,
    EditZoneComponent,
    EditWoredaComponent,
    EditKebeleComponent,
    AngConfirmDialogComponent
  ],
  providers: [RegionService, ZoneService, WoredaService, KebeleService, AuthGuardAdmin],
})
export class AddressModule {}
