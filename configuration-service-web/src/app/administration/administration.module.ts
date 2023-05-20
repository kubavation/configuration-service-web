import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {AdministrationRoutingModule} from "./administration-routing.module";
import {ModulesComponent} from "./modules/modules.component";
import {ModuleService} from "./modules/service/module.service";



@NgModule({
  declarations: [
    ModulesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdministrationRoutingModule
  ],
  providers: [ModuleService]
})
export class AdministrationModule { }
