import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {combineLatest, filter, map, Subscription, switchMap, tap} from "rxjs";
import {ContextBsService} from "../../shared/context/service/context-bs.service";
import {ContextModuleConfigurationService} from "./service/context-module-configuration.service";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Configuration} from "./model/configuration";
import {FormArray, FormBuilder, FormControl} from "@angular/forms";

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

  dataSource$ = combineLatest([this.activatedRoute.params, this.contextBsService.context$])
    .pipe(
      filter(([params, _]) => !!params['module']),
      switchMap(([params, context]) => this.contextModuleConfigurationService.moduleConfiguration(context.name, params['module'])),
      map(moduleConfiguration => this.toDataSource(moduleConfiguration.configuration))
    )

  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Configuration>;

  private editContextSubscription = new Subscription();

  readonly displayedColumns = ['position', 'name', 'description', 'value'];

  constructor(private activatedRoute: ActivatedRoute,
              private contextModuleConfigurationService: ContextModuleConfigurationService,
              private contextBsService: ContextBsService,
              private fb: FormBuilder) {

  }

  private toDataSource(configurations: Configuration[]): MatTableDataSource<Configuration> {

    const controls: FormArray = new FormArray(configurations.map(config => this.asControl(config)));
    this.form.setControl('configurations', controls);

    this.dataSource = new MatTableDataSource<any>((this.form.get('configurations') as FormArray).controls);
    this.dataSource.sort = this.sort;

    this.editContextSubscription = this.editContextControl.valueChanges
      .subscribe(value => this.configurations.controls.forEach(c => value ? c.enable() : c.disable()))
    this.editContextControl.setValue(false);

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

  get editContextValue(): boolean {
    return this.editContextControl.value
  }

  ngOnDestroy(): void {
    this.editContextSubscription?.unsubscribe();
  }



}
