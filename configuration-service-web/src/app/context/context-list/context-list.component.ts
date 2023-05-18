import { Component } from '@angular/core';
import {ContextService} from "../service/context.service";

@Component({
  selector: 'app-context-list',
  templateUrl: './context-list.component.html',
  styleUrls: ['./context-list.component.scss']
})
export class ContextListComponent {

  contexts$ = this.contextService.contexts$;

  constructor(private contextService: ContextService) {}


}
