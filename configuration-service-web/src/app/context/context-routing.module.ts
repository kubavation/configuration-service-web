import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ContextListComponent} from "./context-list/context-list.component";

const routes: Routes = [
  {path: '', component: ContextListComponent},
  {path: 'list', component: ContextListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContextRoutingModule { }
