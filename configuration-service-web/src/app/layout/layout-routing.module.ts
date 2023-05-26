import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {ContextRequiredGuard} from "../shared/guards/context-required.guard";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'modules', loadChildren: () => import('../context-modules/context-modules.module').then(m => m.ContextModulesModule), canActivate: [ContextRequiredGuard]},
  {path: 'administration', loadChildren: () => import('../administration/administration.module').then(m => m.AdministrationModule)},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
