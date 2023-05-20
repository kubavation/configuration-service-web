import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'contexts', loadChildren: () => import('../context/context.module').then(m => m.ContextModule)},
  {path: 'administration', loadChildren: () => import('../administration/administration.module').then(m => m.AdministrationModule)},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
