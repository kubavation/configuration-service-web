import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {map, Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {Context} from "../../model/context";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ContextService} from "../../service/context.service";

@Component({
  selector: 'app-context-list',
  templateUrl: './context-list.component.html',
  styleUrls: ['./context-list.component.scss']
})
export class ContextListComponent {

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

  onSelect(context: Context): void {
    this.selected = context;
    this.afterSelection.emit(context);
  }

}
