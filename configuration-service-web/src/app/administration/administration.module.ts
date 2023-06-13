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
import { ContextModalComponent } from './contexts/contexts/context-modal/context-modal.component';
import {ContextService} from "./contexts/contexts/service/context.service";
import {MatCardModule} from "@angular/material/card";
import { ConfigurationGroupComponent } from './modules/configuration-group/configuration-group.component';
import { ConfigurationGroupModalComponent } from './modules/configuration-group/configuration-group-modal/configuration-group-modal.component';
import {ContextValidatorService} from "./contexts/contexts/service/context-validator.service";



@NgModule({
  declarations: [
    ModulesComponent,
    ConfigurationPatternComponent,
    ConfigurationPatternModalComponent,
    ContextsComponent,
    ModuleModalComponent,
    ContextModalComponent,
    ConfigurationGroupComponent,
    ConfigurationGroupModalComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        AdministrationRoutingModule,
        MatCardModule
    ],
  exports: [
    ContextsComponent
  ],
  providers: [ModuleService, ContextService, ContextValidatorService]
})
export class AdministrationModule { }
