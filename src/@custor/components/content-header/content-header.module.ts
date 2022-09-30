import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ContentHeaderComponent } from 'src/@custor/components/content-header/content-header.component';

@NgModule({
    declarations: [
        ContentHeaderComponent
    ],
    imports: [
        MatIconModule,
        CommonModule
    ],
    exports     : [
        ContentHeaderComponent
    ],
    // entryComponents: [
    //     ContentHeaderComponent
    // ],
})
export class ContentHeaderModule {
}
