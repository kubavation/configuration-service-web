import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ModulesComponent} from "./modules/modules.component";
import {ConfigurationPatternComponent} from "./modules/configuration-pattern/configuration-pattern.component";
import {ContextsComponent} from "./contexts/context-list/contexts.component";

const routes: Routes = [
  {path: '', component: ModulesComponent},
  {path: 'contexts', component: ContextsComponent},
  {path: 'modules', component: ModulesComponent},
  {path: 'modules/:module/configuration-pattern', component: ConfigurationPatternComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
