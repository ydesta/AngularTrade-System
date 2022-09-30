import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTradeExcutionComponent } from './view-trade-excution.component';

describe('ViewTradeExcutionComponent', () => {
  let component: ViewTradeExcutionComponent;
  let fixture: ComponentFixture<ViewTradeExcutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTradeExcutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTradeExcutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
