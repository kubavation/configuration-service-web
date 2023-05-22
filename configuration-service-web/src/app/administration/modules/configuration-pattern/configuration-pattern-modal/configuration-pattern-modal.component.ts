import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {DialogComponent} from "../../../../shared/components/dialog-component";

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
              private fb: FormBuilder) {
    super(dialogRef);
  }


  save(): void {
    this.dialogRef.close(this.form.value)
  }

}
