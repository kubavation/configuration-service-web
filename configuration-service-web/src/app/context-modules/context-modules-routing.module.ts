import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ContextModulesModule} from "./context-modules.module";
import {ContextModulesComponent} from "./context-modules.component";

const routes: Routes = [
  {path: '', component: ContextModulesComponent},
  {path: '**', component: ContextModulesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContextModulesRoutingModule { }
