import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {ContextListService} from "../shared/context/service/context-list.service";
import {FormControl, Validators} from "@angular/forms";
import {BehaviorSubject, filter, map, Observable, of, Subscription, switchMap, tap} from "rxjs";
import {Context} from "../shared/context/model/context";
import {ContextStorageService} from "../shared/context/storage/context-storage.service";
import {ContextBsService} from "../shared/context/service/context-bs.service";
import {MatDialog} from "@angular/material/dialog";
import {ContextModalComponent} from "../shared/context/components/context-modal/context-modal.component";
import {ActivatedRoute, UrlSegment} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnDestroy, AfterViewInit {

  contexts$ = this.contextService.contexts$;

  contextControl = new FormControl('', {validators: Validators.required});

  private contextSubscription = new Subscription();

  private contextRequiredSubject = new BehaviorSubject<boolean>(true);
  readonly contextRequired$ = this.contextRequiredSubject.asObservable();

  constructor(private contextService: ContextListService,
              private contextStorageService: ContextStorageService,
              private cdr: ChangeDetectorRef,
              private dialog: MatDialog,
              private location: Location,
              private contextBsService: ContextBsService) {

    this.registerUrlChangedCallback();

    this.contextSubscription = this.contextControl
      .valueChanges
      .pipe(
        tap(context => this.contextStorageService.store({name: context}))
      )
      .subscribe(context => this.contextBsService.set({name: context}));

    if (this.contextStorageService.storedValue() != null) {
      this.contextControl.patchValue(this.contextStorageService.storedValue().name);
    }

  }

  ngAfterViewInit(): void {
    if (!this.contextChosen) {
      this.handleContextModalResult();
    }
  }

  private handleContextModalResult(): void {
    this.dialog.open(ContextModalComponent)
      .afterClosed()
      .pipe(
        filter(context => !!context),
      )
      .subscribe(context => this.setContext(context))
  }

  ngOnDestroy(): void {
    this.contextSubscription?.unsubscribe();
  }

  get contextChosen(): boolean {
    return !!this.contextBsService.value();
  }

  setContext(context: Context): void {
    this.contextControl.patchValue(context.name);
  }

  private registerUrlChangedCallback() {
    this.location.onUrlChange(url => this.contextRequiredSubject.next(!url.includes('/administration')))
  }

}
