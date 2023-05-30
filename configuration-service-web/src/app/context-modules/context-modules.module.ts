import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextModulesComponent } from './context-modules.component';
import {SharedModule} from "../shared/shared.module";
import {ContextModulesRoutingModule} from "./context-modules-routing.module";
import {ContextModulesService} from "./service/context-modules.service";
import { ContextModulesModalComponent } from './context-modules-modal/context-modules-modal.component';
import { ContextModuleConfigurationComponent } from './context-module-configuration/context-module-configuration.component';



@NgModule({
  declarations: [
    ContextModulesComponent,
    ContextModulesModalComponent,
    ContextModuleConfigurationComponent
  ],
  imports: [
    CommonModule,
    ContextModulesRoutingModule,
    SharedModule
  ],
  providers: [ContextModulesService]
})
export class ContextModulesModule { }
