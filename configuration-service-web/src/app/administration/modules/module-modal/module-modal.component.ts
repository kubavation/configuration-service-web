import {Component, Inject} from '@angular/core';
import {DialogComponent} from "../../../shared/components/dialog-component";
import {AbstractControl, AsyncValidatorFn, FormBuilder, ValidationErrors, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ConfigPattern} from "../model/config-pattern";
import {FormMode} from "../../../shared/forms/form-mode";
import {map, Observable} from "rxjs";
import {ModuleValidatorService} from "../service/module-validator.service";

@Component({
  selector: 'app-module-modal',
  templateUrl: './module-modal.component.html',
  styleUrls: ['./module-modal.component.scss']
})
export class ModuleModalComponent extends DialogComponent<ModuleModalComponent> {

  static moduleNameValidator(service: ModuleValidatorService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return service.moduleAlreadyExists(control.value)
        .pipe(
          map(result => result ? {moduleAlreadyExists: true} : null)
        )
    }
  }

  form = this.fb.group({
    name: ['', {
      validators: [Validators.required],
      asyncValidators: [ModuleModalComponent.moduleNameValidator(this.moduleValidationService)],
      updateOn: 'blur'
    }],
    description: ['', Validators.required]
  })

  constructor(public override dialogRef: MatDialogRef<ModuleModalComponent>,
              private moduleValidationService: ModuleValidatorService,
              @Inject(MAT_DIALOG_DATA) public data: ConfigPattern | undefined,
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
    return this.mode == FormMode.ADD ? "Add module": `Edit module ${this.form.get('name')?.value}`;
  }

  get moduleNameInvalid(): boolean {
    return this.form.get('name').hasError('moduleAlreadyExists');
  }


}
