import { Component } from '@angular/core';
import {ContextService} from "../service/context.service";
import {Observable} from "rxjs";
import {Context} from "../model/context";

@Component({
  selector: 'app-context-list',
  templateUrl: './context-list.component.html',
  styleUrls: ['./context-list.component.scss']
})
export class ContextListComponent {

  constructor(private contextService: ContextService) {}


}
