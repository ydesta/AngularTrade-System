import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClientInformationReminderComponent } from './edit-client-information-reminder.component';

describe('EditClientInformationReminderComponent', () => {
  let component: EditClientInformationReminderComponent;
  let fixture: ComponentFixture<EditClientInformationReminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClientInformationReminderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClientInformationReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
