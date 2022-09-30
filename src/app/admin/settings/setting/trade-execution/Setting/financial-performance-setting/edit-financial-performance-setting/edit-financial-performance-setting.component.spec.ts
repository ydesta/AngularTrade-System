import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFinancialPerformanceSettingComponent } from './edit-financial-performance-setting.component';

describe('EditFinancialPerformanceSettingComponent', () => {
  let component: EditFinancialPerformanceSettingComponent;
  let fixture: ComponentFixture<EditFinancialPerformanceSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFinancialPerformanceSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFinancialPerformanceSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
