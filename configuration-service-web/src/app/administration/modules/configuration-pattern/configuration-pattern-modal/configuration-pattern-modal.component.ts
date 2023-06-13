import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {DialogComponent} from "../../../../shared/components/dialog-component";
import {ConfigPattern} from "../../model/config-pattern";
import {FormMode} from "../../../../shared/forms/form-mode";
import {ModuleService} from "../../service/module.service";
import {filter, map, Observable, of, switchMap, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ConfigurationGroup} from "../../configuration-group/model/configuration-group";

@Component({
  selector: 'app-configuration-pattern-modal',
  templateUrl: './configuration-pattern-modal.component.html',
  styleUrls: ['./configuration-pattern-modal.component.scss']
})
export class ConfigurationPatternModalComponent extends DialogComponent<ConfigurationPatternModalComponent> {

  // configurationGroups$: Observable<ConfigurationGroup[]> = this.route.params
  //   .pipe(
  //     tap(c => console.log(c)),
  //     filter(params => !!params['module']),
  //     map(params => params['module']),
  //     switchMap(module => this.moduleService.configurationGroups(module))
  //   )

  configurationGroups$: Observable<ConfigurationGroup[]> = of('COMPANY-MANAGEMENT')
    .pipe(
      tap(c => console.log(c)),
      switchMap(module => this.moduleService.configurationGroups(module))
    )

  form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    defaultValue: [false],
    configurationGroup: [null]
  })


  constructor(public override dialogRef: MatDialogRef<ConfigurationPatternModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfigPattern | undefined,
              private moduleService: ModuleService,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
    super(dialogRef);

    if (data) {
      this.mode = FormMode.EDIT;
      this.patchForm(data);
    }

  }


  save(): void {
    this.dialogRef.close(this.form.value)
  }

  private patchForm(pattern: ConfigPattern): void {
    this.form.patchValue({
      ...pattern
    })
  }

  get modalTitle(): string {
    return this.mode == FormMode.ADD ? "Add configuration pattern": `Edit configuration pattern ${this.form.get('name')?.value}`;
  }


}
