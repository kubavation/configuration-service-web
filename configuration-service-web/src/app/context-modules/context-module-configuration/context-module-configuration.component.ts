import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, combineLatest, filter, map, of, Subscription, switchMap, tap} from "rxjs";
import {ContextBsService} from "../../shared/context/service/context-bs.service";
import {ContextModuleConfigurationService} from "./service/context-module-configuration.service";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Configuration} from "./model/configuration";
import {AbstractControl, FormArray, FormBuilder, FormControl} from "@angular/forms";
import {SnackbarService} from "../../shared/snackbar/snackbar.service";
import {ModuleConfiguration} from "./model/module-configuration";

@Component({
  selector: 'app-context-module-configuration',
  templateUrl: './context-module-configuration.component.html',
  styleUrls: ['./context-module-configuration.component.scss']
})
export class ContextModuleConfigurationComponent implements OnDestroy {

  editContextControl = new FormControl(false);

  form = this.fb.group({
    configurations: this.fb.array<Configuration>([])
  })

  context$ = this.contextBsService.context$;

  module$ = this.activatedRoute.params
    .pipe(
      filter(params => !!params['module']),
      map(params => params['module'])
    )

  dataSource$ = combineLatest([this.module$, this.context$])
    .pipe(
      tap(([module, _]) => this.module = module),
      switchMap(([module, context]) => this.contextModuleConfigurationService.moduleConfiguration(context.name, module)
        .pipe(
          catchError(_ => {
            this.router.navigateByUrl('/modules');
            return of(null);
          })
        )
      ),
      map(moduleConfiguration => this.toDataSource(moduleConfiguration?.configuration ?? []))
    )

  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Configuration>;

  private editContextSubscription = new Subscription();
  private module: string | undefined;

  readonly displayedColumns = ['position', 'name', 'description', 'value'];

  constructor(private activatedRoute: ActivatedRoute,
              private contextModuleConfigurationService: ContextModuleConfigurationService,
              private contextBsService: ContextBsService,
              private snackbarService: SnackbarService,
              private router: Router,
              private fb: FormBuilder) {

  }

  private toDataSource(configurations: Configuration[]): MatTableDataSource<Configuration> {

    const controls: FormArray = new FormArray(configurations.map(config => this.asControl(config)));
    this.form.setControl('configurations', controls);

    this.dataSource = new MatTableDataSource<any>((this.form.get('configurations') as FormArray).controls);
    this.dataSource.sort = this.sort;

    this.initEditContext();
    return this.dataSource;
  }

  public get context(): string {
    return this.contextBsService.value()?.name;
  }

  get configurations(): FormArray {
    return this.form.get('configurations') as FormArray;
  }

  private asControl(configuration: Configuration) {
    return this.fb.group<Configuration>({
      name: configuration.name,
      description: configuration.description,
      value: configuration.value
    });
  }

  private fromControl(control: AbstractControl): Configuration {
    return {
      name: control.get('name').value,
      description: control.get('description').value,
      value: control.get('value').value
    }
  }

  get editContextValue(): boolean {
    return this.editContextControl.value
  }

  ngOnDestroy(): void {
    this.editContextSubscription?.unsubscribe();
  }

  private initEditContext(): void {
    this.editContextSubscription = this.editContextControl.valueChanges
      .subscribe(value => this.configurations.controls.forEach(c => value ? c.enable() : c.disable()))
    this.editContextControl.setValue(false);
  }

  saveConfig(): void {

    const moduleConfiguration: ModuleConfiguration = {
      configuration: this.configurations.controls.map(control => this.fromControl(control))
    };

    this.contextModuleConfigurationService.setModuleConfiguration(this.context, this.module, moduleConfiguration)
      .subscribe(_ => {
        this.snackbarService.success(`Successfully changed configuration for module ${this.module}`)
      })
  }
}
