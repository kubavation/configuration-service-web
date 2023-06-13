import {Component, ViewChild} from '@angular/core';
import {BehaviorSubject, combineLatest, filter, map, Observable, switchMap, withLatestFrom} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ModuleService} from "../service/module.service";
import {ActivatedRoute} from "@angular/router";
import {ConfirmationService} from "../../../shared/components/confirmation-modal/confirmation.service";
import {SnackbarService} from "../../../shared/snackbar/snackbar.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfigurationGroup} from "./model/configuration-group";
import {ConfigurationGroupModalComponent} from "./configuration-group-modal/configuration-group-modal.component";

@Component({
  selector: 'app-configuration-group',
  templateUrl: './configuration-group.component.html',
  styleUrls: ['./configuration-group.component.scss']
})
export class ConfigurationGroupComponent {

  private refreshSubject$ = new BehaviorSubject<void>(null);
  private configGroupSubject$ = new BehaviorSubject<ConfigurationGroup>(null);

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

  patterns$ = combineLatest([this.module$, this.configGroupSubject$, this.refreshSubject$])
    .pipe(
      filter(([module, group, _]) => !!group),
      switchMap(([module, configGroup, _]) => this.moduleService.configurationGroupPatterns(module, configGroup.name))
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
    this.dataSource = new MatTableDataSource<ConfigurationGroup>(configurationGroups);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    return this.dataSource;
  }


  openModal(configurationGroup: ConfigurationGroup | undefined = null): void {
    this.dialog.open(ConfigurationGroupModalComponent, {
      data: configurationGroup,
      width: '40vw'
    })
      .afterClosed()
      .pipe(
        filter(pattern => !!pattern),
        withLatestFrom(this.route.params),
        switchMap(([pattern, params]) => this.saveConfigurationGroup(params['module'], pattern, configurationGroup?.name))
      ).subscribe(_ => {
      this.snackbarService.success("Configuration group successfully created.");
      this.refreshSubject$.next();
    }, error => this.snackbarService.error("Error while creating configuration group."));
  }

  onSelect(row: ConfigurationGroup): void {
    this.selected = row;
    this.configGroupSubject$.next(row);
  }

  private saveConfigurationGroup(module: string, configurationGroup: ConfigurationGroup, configGroupName: string = null): Observable<void> {
    if (configGroupName) {
      return this.moduleService.editConfigurationGroup(module, configGroupName, configurationGroup);
    }
    return this.moduleService.addConfigurationGroup(module, configurationGroup);
  }

  openConfirmationModal(): void {
    this.confirmationService.open({
      content: `Delete config group ${this.selected?.name}?`
    })
      .afterClosed()
      .pipe(
        filter(result => !!result),
        withLatestFrom(this.route.params),
        switchMap(([_, params]) => this.moduleService.deleteConfigurationGroup(params['module'], this.selected?.name))
      )
      .subscribe(_ => {
        this.snackbarService.success("Configuration pattern successfully deleted.");
        this.refreshSubject$.next();
      }, error => this.snackbarService.error("Error while deleting configuration pattern."));
  }

}
