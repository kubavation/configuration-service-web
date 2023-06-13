import {Component} from '@angular/core';
import {ModuleService} from "../service/module.service";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, combineLatest, filter, map, Observable, switchMap, withLatestFrom} from "rxjs";
import {ConfigPattern} from "../model/config-pattern";
import {MatDialog} from "@angular/material/dialog";
import {ConfigurationPatternModalComponent} from "./configuration-pattern-modal/configuration-pattern-modal.component";
import {SnackbarService} from "../../../shared/snackbar/snackbar.service";
import {ConfirmationService} from "../../../shared/components/confirmation-modal/confirmation.service";

@Component({
  selector: 'app-configuration-pattern',
  templateUrl: './configuration-pattern.component.html',
  styleUrls: ['./configuration-pattern.component.scss']
})
export class ConfigurationPatternComponent {

  private refreshSubject$ = new BehaviorSubject<void>(null);

  module$: Observable<string> = this.route.params
    .pipe(
      filter(params => !!params['module']),
      map(params => params['module'])
    )

  patterns$ = combineLatest([this.module$, this.refreshSubject$])
    .pipe(
      switchMap(([module, _]) => this.moduleService.configurationPatterns(module)),
    )

  selected: ConfigPattern | undefined;

  constructor(private moduleService: ModuleService,
              private route: ActivatedRoute,
              private confirmationService: ConfirmationService,
              private snackbarService: SnackbarService,
              private dialog: MatDialog) {
  }


  openModal(configurationPattern: ConfigPattern | undefined = null): void {
    this.dialog.open(ConfigurationPatternModalComponent, {
      data: configurationPattern,
      width: '40vw'
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

  private saveConfigurationPattern(module: string, configPattern: ConfigPattern, configName: string = null): Observable<void> {
    if (configName) {
      return this.moduleService.editConfigurationPattern(module, configName, configPattern);
    }
    return this.moduleService.addConfigurationPattern(module, configPattern);
  }

  openConfirmationModal(): void {
    this.confirmationService.open({
      content: `Delete config pattern ${this.selected?.name}?`
    })
      .afterClosed()
      .pipe(
        filter(result => !!result),
        withLatestFrom(this.route.params),
        switchMap(([_, params]) => this.moduleService.deleteConfigurationPattern(params['module'], this.selected?.name))
      )
      .subscribe(_ => {
        this.snackbarService.success("Configuration pattern successfully deleted.");
        this.refreshSubject$.next();
      }, error => this.snackbarService.error("Error while deleting configuration pattern."));
  }


}
