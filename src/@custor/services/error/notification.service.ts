import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

  constructor(
    public snackBar: MatSnackBar,
    private zone: NgZone) { }

  showSuccess(message: string): void {
    this.zone.run(() => {
        this.snackBar.open(message, '', {panelClass: ['success'], verticalPosition: 'top'});
    });
  }

  showError(message: string): void {
    this.zone.run(() => {
          this.snackBar.open(message, 'X', {panelClass: ['error'], verticalPosition: 'top'});
    });
  }

  // <button mat-button (click)="openSnackBar(message.value, action.value)">Show snack-bar</button>
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

}
