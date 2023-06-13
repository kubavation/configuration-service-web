import {Component, Input, ViewChild} from '@angular/core';
import {BehaviorSubject, combineLatest, filter, map, Observable, switchMap} from "rxjs";
import {ConfigurationGroup} from "../../configuration-group/model/configuration-group";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ConfigPattern} from "../../model/config-pattern";
import {ModuleService} from "../../service/module.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-configuration-pattern-list',
  templateUrl: './configuration-pattern-list.component.html',
  styleUrls: ['./configuration-pattern-list.component.scss']
})
export class ConfigurationPatternListComponent {

  private refreshSubject$ = new BehaviorSubject<void>(null);
  private configGroupSubject$ = new BehaviorSubject<ConfigurationGroup>(null);

  module$: Observable<string> = this.route.params
    .pipe(
      filter(params => !!params['module']),
      map(params => params['module'])
    )

  dataSource$ = combineLatest([this.module$, this.refreshSubject$, this.configGroupSubject$])
    .pipe(
      switchMap(([module, _, configGroup]) => this.getPatterns(module, configGroup)),
      map(patterns => this.toDataSource(patterns))
    )

  @Input() set configGroup(configGroup: ConfigurationGroup) {
    this.configGroupSubject$.next(configGroup);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<ConfigPattern>;

  selected: ConfigPattern | undefined;

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

  onSelect(row: ConfigPattern): void {
    this.selected = row;
  }

  private getPatterns(module: string, configurationGroup?: ConfigurationGroup): Observable<ConfigPattern[]> {

    if (configurationGroup) {
      return this.moduleService.configurationGroupPatterns(module, configurationGroup.name)
    }

    return this.moduleService.configurationPatterns(module)
  }

}
