import {Subject} from "rxjs";
import {MatSnackBar} from "@angular/material";
import {Injectable} from "@angular/core";

@Injectable()
export class UiService {
  loadingStateChanged = new Subject<boolean>();

  constructor(private snackbar: MatSnackBar) {
  }

  showSnackBar(message, action, duration) {
    this.snackbar.open(message, action, duration);
  }
}
