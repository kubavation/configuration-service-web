import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextModulesComponent } from './context-modules.component';
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    ContextModulesComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ContextModulesModule { }
