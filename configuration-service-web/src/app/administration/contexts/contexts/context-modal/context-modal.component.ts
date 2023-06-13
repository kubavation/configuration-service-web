import {Component, Inject} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormBuilder, ValidationErrors, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormMode} from "../../../../shared/forms/form-mode";
import {DialogComponent} from "../../../../shared/components/dialog-component";
import {Context} from "../../../../shared/context/model/context";
import {map, Observable} from "rxjs";
import {ContextValidatorService} from "../service/context-validator.service";


@Component({
  selector: 'app-context-modal',
  templateUrl: './context-modal.component.html',
  styleUrls: ['./context-modal.component.scss']
})
export class ContextModalComponent extends DialogComponent<ContextModalComponent> {

  static contextNameValidator(service: ContextValidatorService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return service.contextAlreadyExists(control.value)
        .pipe(
          map(result => result ? {contextAlreadyExists: true} : null)
        )
    }
  }

  form = this.fb.group({
    name: ['',
      {
        validators: [Validators.required],
        asyncValidators: [ContextModalComponent.contextNameValidator(this.contextValidatorService)],
        updateOn: 'blur'
      }
    ]
  })

  constructor(public override dialogRef: MatDialogRef<ContextModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Context | undefined,
              private contextValidatorService: ContextValidatorService,
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

  private patchForm(pattern: Context): void {
    this.form.patchValue({
      ...pattern
    })
  }

  get modalTitle(): string {
    return this.mode == FormMode.ADD ? "Add context": `Edit context ${this.form.get('name')?.value}`;
  }


}
