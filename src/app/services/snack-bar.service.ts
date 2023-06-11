import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarSuccessMessages} from "../enums/snack-bar-messages.enum";

@Injectable({ providedIn: 'root' })
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) {}

  showMessage(message: SnackBarSuccessMessages): void {
    this._snackBar.open(message, 'Ok');
  }
}
