import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-context-modal',
  templateUrl: './context-modal.component.html',
  styleUrls: ['./context-modal.component.scss']
})
export class ContextModalComponent {

  constructor(private dialogRef: MatDialogRef<ContextModalComponent>) {
  }


  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(null); //todo
  }
}
