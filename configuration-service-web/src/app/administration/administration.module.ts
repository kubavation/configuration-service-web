import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {AdministrationRoutingModule} from "./administration-routing.module";
import {ModulesComponent} from "./modules/modules.component";
import {ModuleService} from "./modules/service/module.service";
import { ConfigurationPatternComponent } from './modules/configuration-pattern/configuration-pattern.component';
import { ConfigurationPatternModalComponent } from './modules/configuration-pattern/configuration-pattern-modal/configuration-pattern-modal.component';
import {ContextListComponent} from "./contexts/context-list/context-list.component";



@NgModule({
  declarations: [
    ModulesComponent,
    ConfigurationPatternComponent,
    ConfigurationPatternModalComponent,
    ContextListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdministrationRoutingModule
  ],
  exports: [
    ContextListComponent
  ],
  providers: [ModuleService]
})
export class AdministrationModule { }
