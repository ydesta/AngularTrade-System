import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberFinancialAuditorViewComponent } from './member-financial-auditor-view.component';

describe('MemberFinancialAuditorViewComponent', () => {
  let component: MemberFinancialAuditorViewComponent;
  let fixture: ComponentFixture<MemberFinancialAuditorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberFinancialAuditorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberFinancialAuditorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
