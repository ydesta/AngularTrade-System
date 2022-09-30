import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { TradeAttachmentDialogModel } from '../../shared/models/member-trade-upload-model';

@Component({
  selector: 'case-attachment-viewer',
  templateUrl: './case-attachment-viewer.component.html',
  styleUrls: ['./case-attachment-viewer.component.scss']
})
export class CaseAttachmentViewerComponent implements OnInit {
  landScape = false;
  dialogModel: TradeAttachmentDialogModel;
  @ViewChild('imageTagContainer', { static: false }) imageTagContainer: ElementRef;
  @ViewChild('imageTag', { static: false }) imageTag: ElementRef;
  constructor(public dialogRef: MatDialogRef<any>) {
  }
  ngOnInit() {
    const dialogData = this.dialogRef._containerInstance._config.data as TradeAttachmentDialogModel;
    this.dialogModel = dialogData;
  }
  closeDialog() {
    this.dialogRef.close();
  }

}
