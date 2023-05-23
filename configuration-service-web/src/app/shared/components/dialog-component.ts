import {MatDialogRef} from "@angular/material/dialog";
import {FormMode} from "../forms/form-mode";

export class DialogComponent<T> {

  public dialogRef: MatDialogRef<T>;

  public mode: FormMode = FormMode.ADD;

  constructor(dialogRef: MatDialogRef<T>) {
    this.dialogRef = dialogRef;
  }

  public cancel() {
    this.dialogRef.close();
  }
}
