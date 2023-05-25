import { Component } from '@angular/core';
import {ContextBsService} from "../shared/context/service/context-bs.service";

@Component({
  selector: 'app-context-modules',
  templateUrl: './context-modules.component.html',
  styleUrls: ['./context-modules.component.scss']
})
export class ContextModulesComponent {


  constructor(private contextBsService: ContextBsService) {
  }

}
