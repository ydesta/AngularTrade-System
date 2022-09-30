import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserInstructionComponent} from './user-instruction.component';

const routes: Routes = [{path: '', component: UserInstructionComponent}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    entryComponents: [UserInstructionComponent]
})
export class UserInstructionRoutingModule {
}
