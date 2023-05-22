import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ModulesComponent} from "./modules/modules.component";
import {ConfigurationPatternComponent} from "./modules/configuration-pattern/configuration-pattern.component";

const routes: Routes = [
  {path: '', component: ModulesComponent},
  {path: 'modules', component: ModulesComponent},
  {path: 'modules/:module/configuration-pattern', component: ConfigurationPatternComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }