import { Component } from '@angular/core';
import {ContextService} from "../context/service/context.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  contexts$ = this.contextService.contexts$;

  constructor(private contextService: ContextService) { }

}
