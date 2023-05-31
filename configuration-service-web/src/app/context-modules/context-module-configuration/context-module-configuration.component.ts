import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {combineLatest, filter, map, switchMap} from "rxjs";
import {ContextBsService} from "../../shared/context/service/context-bs.service";
import {ContextModuleConfigurationService} from "./service/context-module-configuration.service";

@Component({
  selector: 'app-context-module-configuration',
  templateUrl: './context-module-configuration.component.html',
  styleUrls: ['./context-module-configuration.component.scss']
})
export class ContextModuleConfigurationComponent {

  configuration$ = combineLatest([this.activatedRoute.params, this.contextBsService.context$])
    .pipe(
      filter(([params, _]) => !!params['module']),
      switchMap(([params, context]) => this.contextModuleConfigurationService.moduleConfiguration(context.name, params['module']))
    )

  constructor(private activatedRoute: ActivatedRoute,
              private contextModuleConfigurationService: ContextModuleConfigurationService,
              private contextBsService: ContextBsService) {
  }

}
