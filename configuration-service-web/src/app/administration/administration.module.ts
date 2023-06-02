import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {AdministrationRoutingModule} from "./administration-routing.module";
import {ModulesComponent} from "./modules/modules.component";
import {ModuleService} from "./modules/service/module.service";
import { ConfigurationPatternComponent } from './modules/configuration-pattern/configuration-pattern.component';
import { ConfigurationPatternModalComponent } from './modules/configuration-pattern/configuration-pattern-modal/configuration-pattern-modal.component';
import {ContextsComponent} from "./contexts/contexts/contexts.component";
import { ModuleModalComponent } from './modules/module-modal/module-modal.component';



@NgModule({
  declarations: [
    ModulesComponent,
    ConfigurationPatternComponent,
    ConfigurationPatternModalComponent,
    ContextsComponent,
    ModuleModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdministrationRoutingModule
  ],
  exports: [
    ContextsComponent
  ],
  providers: [ModuleService]
})
export class AdministrationModule { }
