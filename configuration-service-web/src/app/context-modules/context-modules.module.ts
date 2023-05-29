import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextModulesComponent } from './context-modules.component';
import {SharedModule} from "../shared/shared.module";
import {ContextModulesRoutingModule} from "./context-modules-routing.module";
import {ContextModulesService} from "./service/context-modules.service";



@NgModule({
  declarations: [
    ContextModulesComponent
  ],
  imports: [
    CommonModule,
    ContextModulesRoutingModule,
    SharedModule
  ],
  providers: [ContextModulesService]
})
export class ContextModulesModule { }
