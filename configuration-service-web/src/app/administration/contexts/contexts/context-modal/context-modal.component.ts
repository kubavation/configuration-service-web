import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormMode} from "../../../../shared/forms/form-mode";
import {DialogComponent} from "../../../../shared/components/dialog-component";
import {Context} from "../../../../shared/context/model/context";

@Component({
  selector: 'app-context-modal',
  templateUrl: './context-modal.component.html',
  styleUrls: ['./context-modal.component.scss']
})
export class ContextModalComponent extends DialogComponent<ContextModalComponent> {

  form = this.fb.group({
    name: ['', Validators.required]
  })

  constructor(public override dialogRef: MatDialogRef<ContextModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Context | undefined,
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
