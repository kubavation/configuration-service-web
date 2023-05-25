import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {ContextService} from "../../../shared/context/service/context.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Context} from "../../../shared/context/model/context";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-contexts',
  templateUrl: './contexts.component.html',
  styleUrls: ['./contexts.component.scss']
})
export class ContextsComponent {

  dataSource$: Observable<MatTableDataSource<Context>> = this.contextService.contexts$
    .pipe(
      map((contexts) => this.toDataSource(contexts))
    );

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Context>;

  readonly displayedColumns = ['position', 'name'];

  selected: Context | undefined;

  @Output() public afterSelection = new EventEmitter<Context>();

  constructor(private contextService: ContextService) {}

  private toDataSource(contexts: Context[]): MatTableDataSource<Context> {
    this.dataSource = new MatTableDataSource<Context>(contexts);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    return this.dataSource;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSelect(context: Context): void {
    this.selected = context;
    this.afterSelection.emit(context);
  }
}
