import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {Context} from "../../model/context";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-context-list',
  templateUrl: './context-list.component.html',
  styleUrls: ['./context-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextListComponent {

  private sourceSubject = new BehaviorSubject<Context[]>([]);

  dataSource$: Observable<MatTableDataSource<Context>> = this.sourceSubject
    .pipe(
      map((contexts) => this.toDataSource(contexts))
    );

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  readonly displayedColumns = ['position', 'name'];

  selected: Context | undefined;

  @Input() public set source(contexts: Context[]) {
    this.sourceSubject.next(contexts);
  }

  @Output() public afterSelection = new EventEmitter<Context>();

  constructor() {}

  private toDataSource(contexts: Context[]): MatTableDataSource<Context> {
    const dataSource = new MatTableDataSource<Context>(contexts);
    dataSource.sort = this.sort;
    dataSource.paginator = this.paginator;
    return dataSource;
  }

  onSelect(context: Context): void {
    this.selected = context;
    this.afterSelection.emit(context);
  }

}
