import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ConfigurationPatternComponent} from "../configuration-pattern.component";

@Component({
  selector: 'app-configuration-pattern-modal',
  templateUrl: './configuration-pattern-modal.component.html',
  styleUrls: ['./configuration-pattern-modal.component.scss']
})
export class ConfigurationPatternModalComponent {

  constructor(public dialogRef: MatDialogRef<ConfigurationPatternComponent>) {
  }


}
