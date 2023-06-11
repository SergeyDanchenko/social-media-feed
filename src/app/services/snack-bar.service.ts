import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarErrorMessages, SnackBarSuccessMessages } from '../enums/snack-bar-messages.enum';

@Injectable({ providedIn: 'root' })
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) {}

  public showMessage(message: SnackBarSuccessMessages, action: string = 'Ok'): void {
    this._snackBar.open(message, action);
  }

  public showError(error: SnackBarErrorMessages, action: string = 'Ok'): void {
    this._snackBar.open(error, action);
  }
}
