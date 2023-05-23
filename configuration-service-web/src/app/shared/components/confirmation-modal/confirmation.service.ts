import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmationModalComponent} from "./confirmation-modal.component";
import {ConfirmationModalConfig} from "./model/confirmation-modal-config";

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor(private dialog: MatDialog) { }

  public open(config?: ConfirmationModalConfig): MatDialogRef<ConfirmationModalComponent> {
    return this.dialog.open(ConfirmationModalComponent, {
      data: config
    });
  }

}
