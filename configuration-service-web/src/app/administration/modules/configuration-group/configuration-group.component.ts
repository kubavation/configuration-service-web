import {Component, ViewChild} from '@angular/core';
import {BehaviorSubject, combineLatest, filter, map, Observable, switchMap} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ConfigPattern} from "../model/config-pattern";
import {ModuleService} from "../service/module.service";
import {ActivatedRoute} from "@angular/router";
import {ConfirmationService} from "../../../shared/components/confirmation-modal/confirmation.service";
import {SnackbarService} from "../../../shared/snackbar/snackbar.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfigurationGroup} from "./model/configuration-group";

@Component({
  selector: 'app-configuration-group',
  templateUrl: './configuration-group.component.html',
  styleUrls: ['./configuration-group.component.scss']
})
export class ConfigurationGroupComponent {

  private refreshSubject$ = new BehaviorSubject<void>(null);

  module$: Observable<string> = this.route.params
    .pipe(
      filter(params => !!params['module']),
      map(params => params['module'])
    )

  dataSource$ = combineLatest([this.module$, this.refreshSubject$])
    .pipe(
      map(([module, _]) => module),
      switchMap(module => this.moduleService.configurationGroups(module)),
      map(groups => this.toDataSource(groups))
    )

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<ConfigurationGroup>;

  selected: ConfigurationGroup | undefined;

  readonly displayedColumns = ['position', 'name', 'description'];

  constructor(private moduleService: ModuleService,
              private route: ActivatedRoute,
              private confirmationService: ConfirmationService,
              private snackbarService: SnackbarService,
              private dialog: MatDialog) {

  }

  private toDataSource(configurationGroups: ConfigurationGroup[]): MatTableDataSource<ConfigurationGroup> {
    this.dataSource = new MatTableDataSource<ConfigPattern>(configurationGroups);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    return this.dataSource;
  }


  openModal(configurationGroup: ConfigurationGroup | undefined = null): void {

  }

  onSelect(row: ConfigurationGroup): void {
    this.selected = row;
  }

  private saveConfigurationGroup(module: string, configurationGroup: ConfigurationGroup, configGroupName: string = null): Observable<void> {
    if (configGroupName) {
      return this.moduleService.editConfigurationGroup(module, configGroupName, configurationGroup);
    }
    return this.moduleService.addConfigurationGroup(module, configurationGroup);
  }

  openConfirmationModal(): void {

  }

}
