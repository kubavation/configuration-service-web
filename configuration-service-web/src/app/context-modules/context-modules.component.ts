import { Component } from '@angular/core';
import {ContextBsService} from "../shared/context/service/context-bs.service";
import {switchMap} from "rxjs";
import {ContextModulesService} from "./service/context-modules.service";

@Component({
  selector: 'app-context-modules',
  templateUrl: './context-modules.component.html',
  styleUrls: ['./context-modules.component.scss']
})
export class ContextModulesComponent {

  contextModules$ = this.contextBsService.context$
    .pipe(
      switchMap(context => this.contextModulesService.contextModules(context.name))
    )


  constructor(private contextBsService: ContextBsService,
              private contextModulesService: ContextModulesService) {
  }

}
