import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../../@custor/services/security/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginControlComponent } from './login-control.component';
describe('LoginControlComponent', () => {
  let component: LoginControlComponent;
  let fixture: ComponentFixture<LoginControlComponent>;
  beforeEach(() => {
    const formBuilderStub = { group: object => ({}) };
    const authServiceStub = {
      rememberMe: {},
      login: arg => ({ subscribe: () => ({}) })
    };
    const toastrServiceStub = { error: noNetworkMessageCaption => ({}) };
    const routerStub = { navigate: array => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginControlComponent],
      providers: [
        { provide: FormBuilder, useValue: formBuilderStub },
        { provide: AuthService, useValue: authServiceStub },
        { provide: ToastrService, useValue: toastrServiceStub },
        { provide: Router, useValue: routerStub }
      ]
    });
    spyOn(LoginControlComponent.prototype, 'buildForm');
    fixture = TestBed.createComponent(LoginControlComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('isLoading defaults to: false', () => {
    expect(component.isLoading).toEqual(false);
  });
  it('formResetToggle defaults to: true', () => {
    expect(component.formResetToggle).toEqual(true);
  });
  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(LoginControlComponent.prototype.buildForm).toHaveBeenCalled();
    });
  });
  describe('buildForm', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      (<jasmine.Spy>component.buildForm).and.callThrough();
      component.buildForm();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });
  describe('login', () => {
    it('makes expected calls', () => {
      const authServiceStub: AuthService = fixture.debugElement.injector.get(
        AuthService
      );
      const toastrServiceStub: ToastrService = fixture.debugElement.injector.get(
        ToastrService
      );
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(component, 'getUserLogin').and.callThrough();
      spyOn(component, 'reset').and.callThrough();
      spyOn(authServiceStub, 'login').and.callThrough();
      spyOn(toastrServiceStub, 'error').and.callThrough();
      spyOn(routerStub, 'navigate').and.callThrough();
      component.login();
      expect(component.getUserLogin).toHaveBeenCalled();
      expect(component.reset).toHaveBeenCalled();
      expect(authServiceStub.login).toHaveBeenCalled();
      expect(toastrServiceStub.error).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
