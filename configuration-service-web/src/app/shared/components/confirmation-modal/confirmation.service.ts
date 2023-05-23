import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmationModalComponent} from "./confirmation-modal.component";

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor(private dialog: MatDialog) { }

  public open(): MatDialogRef<ConfirmationModalComponent> {
    return this.dialog.open(ConfirmationModalComponent);
  }

}
