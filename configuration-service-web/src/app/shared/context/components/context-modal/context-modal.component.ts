import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Context} from "../../model/context";

@Component({
  selector: 'app-context-modal',
  templateUrl: './context-modal.component.html',
  styleUrls: ['./context-modal.component.scss']
})
export class ContextModalComponent {

  private selected: Context;

  constructor(private dialogRef: MatDialogRef<ContextModalComponent>) {
  }


  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.selected);
  }

  onSelect(context: Context) {
    this.selected = context;
  }
}
