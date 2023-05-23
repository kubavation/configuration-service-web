import {Component, ViewChild} from '@angular/core';
import {ModuleService} from "../service/module.service";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, combineLatest, filter, map, Observable, switchMap, tap, withLatestFrom} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ConfigPattern} from "../model/config-pattern";
import {MatDialog} from "@angular/material/dialog";
import {ConfigurationPatternModalComponent} from "./configuration-pattern-modal/configuration-pattern-modal.component";
import {SnackbarService} from "../../../shared/snackbar/snackbar.service";
import {ConfirmationModalComponent} from "../../../shared/components/confirmation-modal/confirmation-modal.component";

@Component({
  selector: 'app-configuration-pattern',
  templateUrl: './configuration-pattern.component.html',
  styleUrls: ['./configuration-pattern.component.scss']
})
export class ConfigurationPatternComponent {

  private refreshSubject$ = new BehaviorSubject<void>(null);

  dataSource$ = combineLatest([this.route.params, this.refreshSubject$])
    .pipe(
      map(([params, _]) => params),
      filter(params => !!params['module']),
      switchMap(params => this.moduleService.configurationPatterns(params['module'])),
      map(patterns => this.toDataSource(patterns))
    )

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<ConfigPattern>;

  selected: ConfigPattern | undefined;

  readonly displayedColumns = ['position', 'name', 'description', 'defaultValue'];

  constructor(private moduleService: ModuleService,
              private route: ActivatedRoute,
              private snackbarService: SnackbarService,
              private dialog: MatDialog) {

  }

  private toDataSource(configurationPatterns: ConfigPattern[]): MatTableDataSource<ConfigPattern> {
    this.dataSource = new MatTableDataSource<ConfigPattern>(configurationPatterns);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    return this.dataSource;
  }


  openModal(configurationPattern: ConfigPattern | undefined = null): void {
    this.dialog.open(ConfigurationPatternModalComponent, {
      data: configurationPattern
    })
      .afterClosed()
      .pipe(
        filter(pattern => !!pattern),
        withLatestFrom(this.route.params),
        switchMap(([pattern, params]) => this.saveConfigurationPattern(params['module'], pattern, configurationPattern?.name))
      ).subscribe(_ => {
        this.snackbarService.success("Configuration pattern successfully created.");
        this.refreshSubject$.next();
      }, error => this.snackbarService.error("Error while creating configuration pattern."));
  }

  onSelect(row: ConfigPattern): void {
    this.selected = row;
  }

  private saveConfigurationPattern(module: string, configPattern: ConfigPattern, configName: string = null): Observable<void> {
    if (configPattern) {
      return this.moduleService.editConfigurationPattern(module, configName, configPattern);
    }
    return this.moduleService.addConfigurationPattern(module, configPattern);
  }

  openConfirmationModal(): void {
    this.dialog.open(ConfirmationModalComponent)
      .afterClosed()
      .pipe(
        filter(result => !!result),
        withLatestFrom(this.route.params),
        switchMap(([_, params]) => this.moduleService.deleteConfigurationPattern(params['module'], this.selected?.name))
      )
      .subscribe(_ => {
        this.snackbarService.success("Configuration pattern successfully created.");
        this.refreshSubject$.next();
      }, error => this.snackbarService.error("Error while creating configuration pattern."));
  }

}
