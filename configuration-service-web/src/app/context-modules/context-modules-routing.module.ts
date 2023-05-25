import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ContextModulesModule} from "./context-modules.module";

const routes: Routes = [
  {path: '**', component: ContextModulesModule},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContextModulesRoutingModule { }
