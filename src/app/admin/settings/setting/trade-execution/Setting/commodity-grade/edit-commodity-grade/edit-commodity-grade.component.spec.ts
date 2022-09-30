import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommodityGradeComponent } from './edit-commodity-grade.component';

describe('EditCommodityGradeComponent', () => {
  let component: EditCommodityGradeComponent;
  let fixture: ComponentFixture<EditCommodityGradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCommodityGradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommodityGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
