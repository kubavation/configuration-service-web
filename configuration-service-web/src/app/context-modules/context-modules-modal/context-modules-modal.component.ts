import {Component, Inject, ViewChild} from '@angular/core';
import {DialogComponent} from "../../shared/components/dialog-component";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ConfigPattern} from "../../administration/modules/model/config-pattern";
import {FormMode} from "../../shared/forms/form-mode";
import {ModuleService} from "../../administration/modules/service/module.service";
import {BehaviorSubject, combineLatest, map, Observable} from "rxjs";
import {ContextModule} from "../model/context-module";
import {AvailableModule} from "./model/available-module";
import {Module} from "../../administration/modules/model/module";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ContextBsService} from "../../shared/context/service/context-bs.service";

@Component({
  selector: 'app-context-modules-modal',
  templateUrl: './context-modules-modal.component.html',
  styleUrls: ['./context-modules-modal.component.scss']
})
export class ContextModulesModalComponent extends DialogComponent<ContextModulesModalComponent>{

  form = this.fb.group({
    chosenModules: this.fb.array<AvailableModule>([])
  })

  private contextModulesSubject = new BehaviorSubject<ContextModule[]>([]);

  dataSource$: Observable<MatTableDataSource<any>> = combineLatest([this.modulesService.modules$, this.contextModulesSubject])
    .pipe(
      map(([modules, contextModules]) => {
        return modules.map(module => {
          return {
            name: module.name,
            active: contextModules.find(contextModule => contextModule.name == module.name) != null
          }
        });
      }),
       map(availableModules => this.toDataSource(availableModules))
    )

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<AvailableModule>;

  readonly displayedColumns = ['position', 'name', 'enabled'];

  constructor(public override dialogRef: MatDialogRef<ContextModulesModalComponent>,
              private modulesService: ModuleService,
              private contextBsService: ContextBsService,
              @Inject(MAT_DIALOG_DATA) public data: ContextModule[],
              private fb: FormBuilder) {
    super(dialogRef);

    if (data) {
      this.contextModulesSubject.next(data);
    }
  }

  save(): void {
    const modules = this.form.value.chosenModules
      .filter(module => module.active)
      .map(module => module.name);

    this.dialogRef.close(modules);
  }

  private toDataSource(modules: AvailableModule[]): MatTableDataSource<AvailableModule> {

    const controls: FormArray = new FormArray(modules.map(module => this.asControl(module)));
    this.form.setControl('chosenModules', controls);

    this.dataSource = new MatTableDataSource<any>((this.form.get('chosenModules') as FormArray).controls);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator

    return this.dataSource;
  }

  public get context(): string {
    return this.contextBsService.value()?.name;
  }

  get chosenModules(): FormArray {
    return this.form.get('chosenModules') as FormArray;
  }

  private asControl(availableModule: AvailableModule) {
    return this.fb.group<AvailableModule>({
      name: availableModule.name,
      active: availableModule.active
    });
  }


}
