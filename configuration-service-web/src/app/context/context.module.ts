import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextListComponent } from './context-list/context-list.component';
import {SharedModule} from "../shared/shared.module";
import {ContextService} from "./service/context.service";



@NgModule({
  declarations: [
    ContextListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    ContextService
  ]
})
export class ContextModule { }
