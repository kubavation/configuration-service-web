import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormMode} from "../../../../shared/forms/form-mode";
import {DialogComponent} from "../../../../shared/components/dialog-component";
import {ConfigurationGroup} from "../model/configuration-group";

@Component({
  selector: 'app-configuration-group-modal',
  templateUrl: './configuration-group-modal.component.html',
  styleUrls: ['./configuration-group-modal.component.scss']
})
export class ConfigurationGroupModalComponent extends DialogComponent<ConfigurationGroupModalComponent> {

  form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  })

  constructor(public override dialogRef: MatDialogRef<ConfigurationGroupModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfigurationGroup | undefined,
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

  private patchForm(group: ConfigurationGroup): void {
    this.form.patchValue({
      ...group
    })
  }

  get modalTitle(): string {
    return this.mode == FormMode.ADD ? "Add configuration group": `Edit configuration group ${this.form.get('name')?.value}`;
  }

}
