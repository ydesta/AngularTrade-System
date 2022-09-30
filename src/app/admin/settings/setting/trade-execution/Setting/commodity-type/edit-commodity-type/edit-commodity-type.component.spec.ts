import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommodityTypeComponent } from './edit-commodity-type.component';

describe('EditCommodityTypeComponent', () => {
  let component: EditCommodityTypeComponent;
  let fixture: ComponentFixture<EditCommodityTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCommodityTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommodityTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
