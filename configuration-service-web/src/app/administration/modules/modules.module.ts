import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulesComponent } from './modules.component';
import {SharedModule} from "../../shared/shared.module";
import {ModuleService} from "./service/module.service";



@NgModule({
  declarations: [
    ModulesComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [ModuleService]
})
export class ModulesModule { }
