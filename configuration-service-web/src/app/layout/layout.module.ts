import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import {SharedModule} from "../shared/shared.module";
import {RouterOutlet} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {LayoutRoutingModule} from "./layout-routing.module";



@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent
  ],
  exports: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    RouterOutlet
  ]
})
export class LayoutModule { }
