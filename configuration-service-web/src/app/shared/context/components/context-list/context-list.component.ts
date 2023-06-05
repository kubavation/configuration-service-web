import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {BehaviorSubject, combineLatest, filter, map, Observable} from "rxjs";
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
  private filerSubject = new BehaviorSubject<string>(null);

  dataSource$: Observable<MatTableDataSource<Context>> = combineLatest([this.sourceSubject, this.filerSubject])
    .pipe(
      map(([contexts, filter]) => this.toDataSource(contexts, filter))
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

  private toDataSource(contexts: Context[], filterValue: string): MatTableDataSource<Context> {
    const dataSource = new MatTableDataSource<Context>(contexts);
    dataSource.sort = this.sort;
    dataSource.paginator = this.paginator;

    if (!!filterValue) {
      dataSource.filter = filterValue.trim().toLowerCase();
    }

    return dataSource;
  }

  onSelect(context: Context): void {
    this.selected = context;
    this.afterSelection.emit(context);
  }

  applyFilter(event: Event) {
     this.filerSubject.next((event.target as HTMLInputElement).value)
  }
}
