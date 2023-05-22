import {Component, ViewChild} from '@angular/core';
import {ModuleService} from "../service/module.service";
import {ActivatedRoute} from "@angular/router";
import {filter, map, switchMap} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Module} from "../model/module";
import {ConfigPattern} from "../model/config-pattern";

@Component({
  selector: 'app-configuration-pattern',
  templateUrl: './configuration-pattern.component.html',
  styleUrls: ['./configuration-pattern.component.scss']
})
export class ConfigurationPatternComponent {

  dataSource$ = this.route.params
    .pipe(
      filter(params => !!params['module']),
      switchMap(params => this.moduleService.configurationPatterns(params['module'])),
      map(patterns => this.toDataSource(patterns))
    )

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<ConfigPattern>;

  readonly displayedColumns = ['position', 'name', 'description', 'defaultValue'];

  constructor(private moduleService: ModuleService,
              private route: ActivatedRoute) {

  }

  private toDataSource(configurationPatterns: ConfigPattern[]): MatTableDataSource<ConfigPattern> {
    this.dataSource = new MatTableDataSource<ConfigPattern>(configurationPatterns);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    return this.dataSource;
  }


}
