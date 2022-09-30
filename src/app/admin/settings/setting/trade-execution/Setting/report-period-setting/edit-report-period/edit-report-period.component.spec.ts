import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReportPeriodComponent } from './edit-report-period.component';

describe('EditReportPeriodComponent', () => {
  let component: EditReportPeriodComponent;
  let fixture: ComponentFixture<EditReportPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReportPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReportPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
