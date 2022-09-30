import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppTranslationService } from '../../../@custor/services/translation.service';
import { AccountService } from '../../../@custor/services/security/account.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../@custor/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ManagePasswordComponent } from './manage.component';
describe('ManagePasswordComponent', () => {
  let component: ManagePasswordComponent;
  let fixture: ComponentFixture<ManagePasswordComponent>;
  beforeEach(() => {
    const formBuilderStub = { group: object => ({}) };
    const appTranslationServiceStub = { getTranslation: string => ({}) };
    const accountServiceStub = {
      resetAccount: editedUser => ({ subscribe: () => ({}) })
    };
    const toastrServiceStub = {
      error: (arg, arg2) => ({}),
      success: (string, string1) => ({})
    };
    const userStub = {};
    const activatedRouteStub = { snapshot: { params: {} } };
    const routerStub = { navigate: array => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ManagePasswordComponent],
      providers: [
        { provide: FormBuilder, useValue: formBuilderStub },
        { provide: AppTranslationService, useValue: appTranslationServiceStub },
        { provide: AccountService, useValue: accountServiceStub },
        { provide: ToastrService, useValue: toastrServiceStub },
        { provide: User, useValue: userStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerStub }
      ]
    });
    fixture = TestBed.createComponent(ManagePasswordComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('isNewUser defaults to: true', () => {
    expect(component.isNewUser).toEqual(true);
  });
  it('showOldPassword defaults to: false', () => {
    expect(component.showOldPassword).toEqual(false);
  });
  it('isChangePassword defaults to: false', () => {
    expect(component.isChangePassword).toEqual(false);
  });
  it('roles defaults to: []', () => {
    expect(component.roles).toEqual([]);
  });
  it('isEditMode defaults to: false', () => {
    expect(component.isEditMode).toEqual(false);
  });
});
