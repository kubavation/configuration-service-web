import {Component, ViewChild} from '@angular/core';
import {ModuleService} from "./service/module.service";
import {MatTableDataSource} from "@angular/material/table";
import {Module} from "./model/module";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent {

  dataSource$: Observable<MatTableDataSource<Module>> = this.moduleService.modules$
    .pipe(
      map((contexts) => this.toDataSource(contexts))
    );

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Module>;

  readonly displayedColumns = ['name', 'description'];

  constructor(private moduleService: ModuleService) {
  }


  private toDataSource(modules: Module[]): MatTableDataSource<Module> {
    this.dataSource = new MatTableDataSource<Module>(modules);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    return this.dataSource;
  }


}
