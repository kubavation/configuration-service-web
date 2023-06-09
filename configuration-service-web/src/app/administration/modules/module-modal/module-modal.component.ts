import {Component, Inject} from '@angular/core';
import {DialogComponent} from "../../../shared/components/dialog-component";
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ConfigPattern} from "../model/config-pattern";
import {FormMode} from "../../../shared/forms/form-mode";
import {ModuleValidatorService} from "../service/module-validator.service";
import {FormValidators} from "../../../shared/validation/form-validators";

@Component({
  selector: 'app-module-modal',
  templateUrl: './module-modal.component.html',
  styleUrls: ['./module-modal.component.scss']
})
export class ModuleModalComponent extends DialogComponent<ModuleModalComponent> {

  form = this.fb.group({
    name: ['', {
      validators: [Validators.required],
      asyncValidators: [FormValidators.alreadyExistsValidator(this.moduleValidationService)],
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
    return this.form.get('name').hasError('alreadyExists');
  }


}
