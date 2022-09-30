import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  // observable boolean sources
  private showProgressBar = new Subject<boolean>();

  // observable boolean streams
  progressBarTriggered$ = this.showProgressBar.asObservable();

  constructor() {
  }

  // commands
  triggerProgressBar(trigger: boolean) {
    this.showProgressBar.next(trigger);
  }
}
