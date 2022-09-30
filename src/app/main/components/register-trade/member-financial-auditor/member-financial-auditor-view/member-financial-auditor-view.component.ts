import {
  Component,
  OnInit,
  Inject,
  ViewEncapsulation,
} from "@angular/core";
import { FinancialAuditoredFileUploadView } from "../../shared/models/MemberFinancialAditor";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { RegisterTradeService } from "../../shared/services/register-trade.service";

@Component({
  selector: "app-member-financial-auditor-view",
  templateUrl: "./member-financial-auditor-view.component.html",
  styleUrls: ["./member-financial-auditor-view.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
})
export class MemberFinancialAuditorViewComponent implements OnInit {
  slides: FinancialAuditoredFileUploadView[];
  memberAuditorId: string;
  fileUploadAuditedId: number;
  constructor(
    public dialogRef: MatDialogRef<any>,
    private registerService: RegisterTradeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.memberAuditorId = this.data.MemberFinancialAuditorId;
    if (this.memberAuditorId) {
      this.getFileUploadMemberAuditoredList(this.memberAuditorId);
    }
    this.fileUploadAuditedId = this.data.FinancialAuditoredFileUploadId;
    if (this.fileUploadAuditedId) {
      this.getFileUploadMemberAuditoredOne(this.fileUploadAuditedId);
    }
  }
  getFileUploadMemberAuditoredList(memberFinancialAuditorId: string) {
    this.registerService
      .getListOfAuditoredUploadFile(memberFinancialAuditorId)
      .subscribe((res) => {
        this.slides = res;
      });
  }
  onClose() {
    this.dialogRef.close();
  }
  getFileUploadMemberAuditoredOne(memberFinancialAuditorId: number) {
    this.registerService
      .getOneUploadFileOfAuditored(memberFinancialAuditorId)
      .subscribe((res) => {
        this.slides = res;
      });
  }
}
