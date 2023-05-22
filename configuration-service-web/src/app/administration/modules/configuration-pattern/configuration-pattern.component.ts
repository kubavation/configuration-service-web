import { Component } from '@angular/core';
import {ModuleService} from "../service/module.service";

@Component({
  selector: 'app-configuration-pattern',
  templateUrl: './configuration-pattern.component.html',
  styleUrls: ['./configuration-pattern.component.scss']
})
export class ConfigurationPatternComponent {

  constructor(private moduleService: ModuleService) {}




}
