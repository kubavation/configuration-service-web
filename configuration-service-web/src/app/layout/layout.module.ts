import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import {SharedModule} from "../shared/shared.module";
import {RouterOutlet} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {LayoutRoutingModule} from "./layout-routing.module";
import {ContextService} from "../context/service/context.service";
import {ContextModule} from "../context/context.module";
import {ContextStorageService} from "../context/storage/context-storage.service";
import {MatListModule} from "@angular/material/list";
import { MenuComponent } from './menu/menu.component';



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
        ContextModule,
        MatListModule
    ],
  providers: [ContextService, ContextStorageService]
})
export class LayoutModule { }
