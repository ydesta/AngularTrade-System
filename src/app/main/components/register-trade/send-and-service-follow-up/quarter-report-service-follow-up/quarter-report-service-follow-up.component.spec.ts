import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterReportServiceFollowUpComponent } from './quarter-report-service-follow-up.component';

describe('QuarterReportServiceFollowUpComponent', () => {
  let component: QuarterReportServiceFollowUpComponent;
  let fixture: ComponentFixture<QuarterReportServiceFollowUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuarterReportServiceFollowUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarterReportServiceFollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
