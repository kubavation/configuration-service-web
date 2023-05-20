import {Component, OnDestroy} from '@angular/core';
import {ContextService} from "../context/service/context.service";
import {FormControl} from "@angular/forms";
import {Subscription} from "rxjs";
import {ContextBsService} from "../context/context-bs.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnDestroy {

  contexts$ = this.contextService.contexts$;

  contextControl = new FormControl();

  private contextSubscription = new Subscription();

  constructor(private contextService: ContextService,
              private contextBsService: ContextBsService) {

    this.contextSubscription = this.contextControl
      .valueChanges
      .subscribe(context => this.contextBsService.set(context));
  }

  ngOnDestroy(): void {
    this.contextSubscription?.unsubscribe();
  }

}
