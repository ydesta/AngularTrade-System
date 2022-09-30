import { Component, OnInit } from '@angular/core';
import { ProgressBarService } from '../../services/progress-bar/progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  showProgressBar: boolean;
  constructor(private progressBarService: ProgressBarService) {


    // listen to progress bar triggers
    progressBarService.progressBarTriggered$.subscribe(res => {
     this.showProgressBar = res;
    });
   }

  ngOnInit() {
  }

}
