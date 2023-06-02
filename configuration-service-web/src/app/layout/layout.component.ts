import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {ContextListService} from "../shared/context/service/context-list.service";
import {FormControl, Validators} from "@angular/forms";
import {filter, of, Subscription, switchMap, tap} from "rxjs";
import {Context} from "../shared/context/model/context";
import {ContextStorageService} from "../shared/context/storage/context-storage.service";
import {ContextBsService} from "../shared/context/service/context-bs.service";
import {MatDialog} from "@angular/material/dialog";
import {ContextModalComponent} from "../shared/context/components/context-modal/context-modal.component";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnDestroy, AfterViewInit {

  contexts$ = this.contextService.contexts$;

  contextControl = new FormControl('', {validators: Validators.required});

  private contextSubscription = new Subscription();

  constructor(private contextService: ContextListService,
              private contextStorageService: ContextStorageService,
              private cdr: ChangeDetectorRef,
              private dialog: MatDialog,
              private contextBsService: ContextBsService) {

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

}
