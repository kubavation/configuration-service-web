import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {DialogComponent} from "../../../../shared/components/dialog-component";
import {ConfigPattern} from "../../model/config-pattern";

@Component({
  selector: 'app-configuration-pattern-modal',
  templateUrl: './configuration-pattern-modal.component.html',
  styleUrls: ['./configuration-pattern-modal.component.scss']
})
export class ConfigurationPatternModalComponent extends DialogComponent<ConfigurationPatternModalComponent> {

  form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    defaultValue: [false]
  })

  constructor(public override dialogRef: MatDialogRef<ConfigurationPatternModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfigPattern | undefined,
              private fb: FormBuilder) {
    super(dialogRef);

    if (data) {
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

}
