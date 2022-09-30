import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReportTypeComponent } from './edit-report-type.component';

describe('EditReportTypeComponent', () => {
  let component: EditReportTypeComponent;
  let fixture: ComponentFixture<EditReportTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReportTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReportTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
