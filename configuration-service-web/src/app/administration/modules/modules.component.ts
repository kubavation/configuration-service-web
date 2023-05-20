import { Component } from '@angular/core';
import {ModuleService} from "./service/module.service";

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent {

  modules$ = this.moduleService.modules$;

  constructor(private moduleService: ModuleService) {
  }


}
