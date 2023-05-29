import {Component, ViewChild} from '@angular/core';
import {ContextBsService} from "../shared/context/service/context-bs.service";
import {map, switchMap} from "rxjs";
import {ContextModulesService} from "./service/context-modules.service";
import {MatTableDataSource} from "@angular/material/table";
import {ContextModule} from "./model/context-module";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-context-modules',
  templateUrl: './context-modules.component.html',
  styleUrls: ['./context-modules.component.scss']
})
export class ContextModulesComponent {

  dataSource$ = this.contextBsService.context$
    .pipe(
      switchMap(context => this.contextModulesService.contextModules(context.name)),
      map(modules => this.toDataSource(modules))
    )

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<ContextModule>;

  readonly displayedColumns = ['position', 'name', 'description'];

  selected: ContextModule | undefined;


  constructor(private contextBsService: ContextBsService,
              private contextModulesService: ContextModulesService) {
  }

  private toDataSource(modules: ContextModule[]): MatTableDataSource<ContextModule> {
    this.dataSource = new MatTableDataSource<ContextModule>(modules);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    return this.dataSource;
  }

  onSelect(module: ContextModule): void {
    this.selected = module;
  }


}
