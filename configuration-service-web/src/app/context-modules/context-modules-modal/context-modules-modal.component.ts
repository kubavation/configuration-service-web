import {Component, Inject} from '@angular/core';
import {DialogComponent} from "../../shared/components/dialog-component";
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ConfigPattern} from "../../administration/modules/model/config-pattern";
import {FormMode} from "../../shared/forms/form-mode";
import {ModuleService} from "../../administration/modules/service/module.service";
import {BehaviorSubject, combineLatest, map, Observable} from "rxjs";
import {ContextModule} from "../model/context-module";
import {AvailableModule} from "./model/available-module";

@Component({
  selector: 'app-context-modules-modal',
  templateUrl: './context-modules-modal.component.html',
  styleUrls: ['./context-modules-modal.component.scss']
})
export class ContextModulesModalComponent extends DialogComponent<ContextModulesModalComponent>{

  form = this.fb.group({})

  private contextModulesSubject = new BehaviorSubject<ContextModule[]>([]);

  dataSource$: Observable<AvailableModule[]> = combineLatest([this.modulesService.modules$, this.contextModulesSubject])
    .pipe(
      map(([modules, contextModules]) => {
        return modules.map(module => {
          return {
            name: module.name,
            active: contextModules.find(contextModule => contextModule.name == module.name) != null
          }
        });
      })
    )

  constructor(public override dialogRef: MatDialogRef<ContextModulesModalComponent>,
              private modulesService: ModuleService,
              @Inject(MAT_DIALOG_DATA) public data: ContextModule[],
              private fb: FormBuilder) {
    super(dialogRef);
    this.contextModulesSubject.next(data);
  }

  save(): void {
    this.dialogRef.close(this.form.value)
  }

}
