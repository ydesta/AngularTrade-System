import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualReportServiceFollowUpComponent } from './annual-report-service-follow-up.component';

describe('AnnualReportServiceFollowUpComponent', () => {
  let component: AnnualReportServiceFollowUpComponent;
  let fixture: ComponentFixture<AnnualReportServiceFollowUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualReportServiceFollowUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualReportServiceFollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
