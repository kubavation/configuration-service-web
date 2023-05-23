import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ConfirmationModalConfig} from "./model/confirmation-modal-config";

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {

  title = 'Confirm';
  content = 'TODO';

  constructor(public dialogRef: MatDialogRef<ConfirmationModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmationModalConfig) {
    this.prepareModal(data);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }

  private prepareModal(data: ConfirmationModalConfig) {
    if (data) {
      this.title = data.title ?? this.title;
      this.content = data.content ?? this.content;
    }
  }
}
