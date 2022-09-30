import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInstructionComponent } from './user-instruction.component';

describe('UserInstructionComponent', () => {
  let component: UserInstructionComponent;
  let fixture: ComponentFixture<UserInstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
