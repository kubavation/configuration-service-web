import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Context} from "../../../shared/context/model/context";
import {filter, map, Observable, switchMap} from "rxjs";
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

  contexts$ = this.contextService.contexts$;
  selected: Context | undefined;

  @Output() public afterSelection = new EventEmitter<Context>();

  constructor(private contextService: ContextService,
              private dialog: MatDialog,
              private confirmationService: ConfirmationService,
              private snackbarService: SnackbarService) {}


  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openModal(context: Context | undefined = null): void {
    this.dialog.open(ContextModalComponent, {
      data: context,
      width: '40vw'
    })
      .afterClosed()
      .pipe(
        filter(ctx => !!ctx),
        switchMap((ctx) => this.saveContext(ctx, this.selected?.name))
      ).subscribe(_ => {
          this.snackbarService.success("Context successfully created.");
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
      }, error => this.snackbarService.error("Error while deleting context."));
  }

  private saveContext(context: Context, name: string | undefined = null): Observable<void> {
    if (name) {
      return this.contextService.editContext(name, context);
    }
    return this.contextService.addContext(context);
  }
}
