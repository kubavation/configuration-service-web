import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import {SharedModule} from "../shared/shared.module";
import {RouterOutlet} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {LayoutRoutingModule} from "./layout-routing.module";
import {ContextService} from "../shared/context/service/context.service";
import {ContextStorageService} from "../shared/context/storage/context-storage.service";
import {MatListModule} from "@angular/material/list";
import { MenuComponent } from './menu/menu.component';
import {AdministrationModule} from "../administration/administration.module";



@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    MenuComponent
  ],
  exports: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    RouterOutlet,
    MatListModule,
    AdministrationModule
  ],
})
export class LayoutModule { }
