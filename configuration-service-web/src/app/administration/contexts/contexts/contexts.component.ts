import {Component, EventEmitter, Output} from '@angular/core';
import {Context} from "../../../shared/context/model/context";
import {BehaviorSubject, filter, Observable, switchMap} from "rxjs";
import {ContextService} from "./service/context.service";
import {MatDialog} from "@angular/material/dialog";
import {SnackbarService} from "../../../shared/snackbar/snackbar.service";
import {ContextModalComponent} from "./context-modal/context-modal.component";
import {ConfirmationService} from "../../../shared/components/confirmation-modal/confirmation.service";

@Component({
  selector: 'app-contexts',
  templateUrl: './contexts.component.html',
  styleUrls: ['./contexts.component.scss']
})
export class ContextsComponent {

  selected: Context | undefined;

  @Output() public afterSelection = new EventEmitter<Context>();

  private refreshSubject = new BehaviorSubject<void>(null);

  contexts$ = this.refreshSubject
    .pipe(
      switchMap(_ => this.contextService.contexts$)
    );

  constructor(private contextService: ContextService,
              private dialog: MatDialog,
              private confirmationService: ConfirmationService,
              private snackbarService: SnackbarService) {}


  openModal(context: Context | undefined = null): void {
    this.dialog.open(ContextModalComponent, {
      data: context,
      width: '40vw'
    })
      .afterClosed()
      .pipe(
        filter(ctx => !!ctx),
        switchMap((ctx) => this.saveContext(ctx, context?.name))
      ).subscribe(_ => {
          this.snackbarService.success("Context successfully created.");
          this.refreshSubject.next();
        },
        error => this.snackbarService.error("Error while creating configuration pattern.")
      );
  }

  openConfirmationModal(): void {
    this.confirmationService.open({
      content: `Delete context ${this.selected?.name}?`
    })
      .afterClosed()
      .pipe(
        filter(result => !!result),
        switchMap((_) => this.contextService.deleteContext(this.selected?.name))
      )
      .subscribe(_ => {
        this.snackbarService.success("Context successfully deleted.");
        this.refreshSubject.next();
      }, error => this.snackbarService.error("Error while deleting context."));
  }

  private saveContext(context: Context, name: string | undefined = null): Observable<void> {
    if (name) {
      return this.contextService.editContext(name, context);
    }
    return this.contextService.addContext(context);
  }
}
