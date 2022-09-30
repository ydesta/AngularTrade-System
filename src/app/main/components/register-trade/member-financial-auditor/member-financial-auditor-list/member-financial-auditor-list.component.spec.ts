import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberFinancialAuditorListComponent } from './member-financial-auditor-list.component';

describe('MemberFinancialAuditorListComponent', () => {
  let component: MemberFinancialAuditorListComponent;
  let fixture: ComponentFixture<MemberFinancialAuditorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberFinancialAuditorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberFinancialAuditorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
