import { Component } from '@angular/core';
import { fadeInOut } from '../../../@custor/services/animations';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
  animations: [fadeInOut]
})
export class ConfirmComponent {
}