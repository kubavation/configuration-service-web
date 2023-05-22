import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ConfigurationPatternComponent} from "../configuration-pattern.component";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-configuration-pattern-modal',
  templateUrl: './configuration-pattern-modal.component.html',
  styleUrls: ['./configuration-pattern-modal.component.scss']
})
export class ConfigurationPatternModalComponent {

  form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    defaultValue: [false]
  })

  constructor(public dialogRef: MatDialogRef<ConfigurationPatternComponent>,
              private fb: FormBuilder) {
  }


  showForm() {
    console.log(this.form.value)
  }
}
