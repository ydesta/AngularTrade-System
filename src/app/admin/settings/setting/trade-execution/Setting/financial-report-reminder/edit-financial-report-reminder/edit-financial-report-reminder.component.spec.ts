import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFinancialReportReminderComponent } from './edit-financial-report-reminder.component';

describe('EditFinancialReportReminderComponent', () => {
  let component: EditFinancialReportReminderComponent;
  let fixture: ComponentFixture<EditFinancialReportReminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFinancialReportReminderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFinancialReportReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
