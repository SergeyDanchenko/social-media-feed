import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarErrorMessages, SnackBarSuccessMessages } from '../enums/snack-bar-messages.enum';

@Injectable({ providedIn: 'root' })
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) {}

  public showMessage(message: SnackBarSuccessMessages): void {
    this._snackBar.open(message, 'Ok');
  }

  public showError(error: SnackBarErrorMessages): void {
    this._snackBar.open(error, 'Ok');
  }
}
