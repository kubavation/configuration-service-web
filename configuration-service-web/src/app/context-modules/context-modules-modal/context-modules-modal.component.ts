import {Component, Inject} from '@angular/core';
import {DialogComponent} from "../../shared/components/dialog-component";
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ConfigPattern} from "../../administration/modules/model/config-pattern";
import {FormMode} from "../../shared/forms/form-mode";

@Component({
  selector: 'app-context-modules-modal',
  templateUrl: './context-modules-modal.component.html',
  styleUrls: ['./context-modules-modal.component.scss']
})
export class ContextModulesModalComponent extends DialogComponent<ContextModulesModalComponent>{

  form = this.fb.group({})

  constructor(public override dialogRef: MatDialogRef<ContextModulesModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder) {
    super(dialogRef);

  }

  save(): void {
    this.dialogRef.close(this.form.value)
  }

}
