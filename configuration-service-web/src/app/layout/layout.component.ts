import {Component, OnDestroy} from '@angular/core';
import {ContextService} from "../shared/context/service/context.service";
import {FormControl} from "@angular/forms";
import {Subscription, tap} from "rxjs";
import {Context} from "../shared/context/model/context";
import {ContextStorageService} from "../shared/context/storage/context-storage.service";
import {ContextBsService} from "../shared/context/service/context-bs.service";

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
              private contextStorageService: ContextStorageService,
              private contextBsService: ContextBsService) {

    this.contextSubscription = this.contextControl
      .valueChanges
      .pipe(
        tap(context => this.contextStorageService.store(context))
      )
      .subscribe(context => this.contextBsService.set(context));

    if (contextStorageService.storedValue() != null) {
      this.contextControl.patchValue(contextStorageService.storedValue());
    }

  }

  ngOnDestroy(): void {
    this.contextSubscription?.unsubscribe();
  }

  get contextChosen(): boolean {
    return !!this.contextBsService.value();
  }

  setContext(context: Context): void {
    this.contextControl.patchValue(context);
  }

}
