import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnnualBudgetCloserComponent } from './edit-annual-budget-closer.component';

describe('EditAnnualBudgetCloserComponent', () => {
  let component: EditAnnualBudgetCloserComponent;
  let fixture: ComponentFixture<EditAnnualBudgetCloserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAnnualBudgetCloserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAnnualBudgetCloserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
