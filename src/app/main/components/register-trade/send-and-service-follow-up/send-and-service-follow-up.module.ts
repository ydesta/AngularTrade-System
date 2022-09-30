import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnualReportServiceFollowUpComponent } from './annual-report-service-follow-up/annual-report-service-follow-up.component';
import { QuarterReportServiceFollowUpComponent } from './quarter-report-service-follow-up/quarter-report-service-follow-up.component';



@NgModule({
  declarations: [AnnualReportServiceFollowUpComponent, QuarterReportServiceFollowUpComponent],
  imports: [
    CommonModule
  ]
})
export class SendAndServiceFollowUpModule { }
