import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ContextModulesComponent} from "./context-modules.component";
import {
  ContextModuleConfigurationComponent
} from "./context-module-configuration/context-module-configuration.component";

const routes: Routes = [
  {path: '', component: ContextModulesComponent},
  {path: ':module/configuration', component: ContextModuleConfigurationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContextModulesRoutingModule { }
