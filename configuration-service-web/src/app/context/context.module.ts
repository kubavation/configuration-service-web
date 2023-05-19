import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextListComponent } from './context-list/context-list.component';
import {SharedModule} from "../shared/shared.module";
import {ContextService} from "./service/context.service";
import {ContextRoutingModule} from "./context-routing.module";

@NgModule({
  declarations: [
    ContextListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ContextRoutingModule
  ],
  providers: [
    ContextService
  ]
})
export class ContextModule { }
