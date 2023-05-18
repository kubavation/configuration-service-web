import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextListComponent } from './context-list/context-list.component';
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    ContextListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ContextModule { }
