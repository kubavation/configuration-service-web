import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  public success(message: string): void {
    this._snackBar.open(message, null, {
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ["snackbar-success"],
      duration: 2000
    })
  }

  public error(message: string): void {
    this._snackBar.open(message, null, {
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ["snackbar-error"],
      duration: 2000
    })
  }

}
