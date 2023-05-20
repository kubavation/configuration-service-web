import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {ModulesComponent} from "./modules/modules.component";

const routes: Routes = [
  {path: '', component: ModulesComponent},
  {path: 'modules', component: ModulesComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
