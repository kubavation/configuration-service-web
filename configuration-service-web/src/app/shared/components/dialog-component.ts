import {MatDialogRef} from "@angular/material/dialog";

export class DialogComponent<T> {

  public dialogRef: MatDialogRef<T>;

  constructor(dialogRef: MatDialogRef<T>) {
    this.dialogRef = dialogRef;
  }

  public cancel() {
    this.dialogRef.close();
  }
}
