import {Component, ViewChild} from '@angular/core';
import {ContextService} from "../service/context.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Context} from "../model/context";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-context-list',
  templateUrl: './context-list.component.html',
  styleUrls: ['./context-list.component.scss']
})
export class ContextListComponent {

  dataSource$: Observable<MatTableDataSource<Context>> = this.contextService.contexts$
    .pipe(
      map((contexts) => {
          this.dataSource = new MatTableDataSource<Context>(contexts);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          return this.dataSource;
      })
    );

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Context>;

  readonly displayedColumns = ['name'];

  constructor(private contextService: ContextService) {}


}
