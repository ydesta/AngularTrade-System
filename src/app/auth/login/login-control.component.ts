import {
  Component,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import {
  SUPER_ADMIN,
  SITE_ADMIN,
  VIEW_SETTING,
  VIEW_USER,
  VIEW_ROLE,
  MANAGE_ROLE,
  MANAGE_SETTING,
  MANAGE_USER,
  VIEW_ADMIN,
  MEMBER_DATA_OFFICER,
  DIRECT_TRADING_DATA_OFFICER,
  AUDITOR_DATA_OFFICER,
} from "src/app/common/constants/permissionConsts";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { AuthService } from 'src/@custor/services/security/auth.service';
import { UserLogin } from 'src/@custor/models/user-login.model';
import { Utilities } from 'src/@custor/helpers/utilities';

@Component({
  selector: "app-login-control",
  templateUrl: "./login-control.component.html",
  styleUrls: ["./login-control.component.scss"],
})
export class LoginControlComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;

  isLoading = false;
  formResetToggle = true;
  loginStatusSubscription: any;


  @Output()
  enterKeyPress = new EventEmitter();

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private ngxUiService: NgxUiLoaderService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.loginForm.setValue({
      userName: "",
      password: "",
      rememberMe: this.authService.rememberMe,
    });
  }

  ngOnDestroy() {
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      userName: ["", Validators.required],
      password: ["", Validators.required],
      rememberMe: "",
    });
  }

  get userName() {
    return this.loginForm.get("userName");
  }

  get password() {
    return this.loginForm.get("password");
  }

  redirectUser(user) {
    if (
      this.authService.loginRedirectUrl !== "" &&
      this.authService.loginRedirectUrl !== null &&
      this.authService.loginRedirectUrl !== undefined
    ) {
      this.authService.redirectLoginUser();
      return;
    } else {
      if (
        user.Roles.indexOf(SUPER_ADMIN) >= 0 ||
        user.Roles.indexOf(SITE_ADMIN) >= 0 ||
        user.Roles.indexOf(VIEW_ADMIN) >= 0 ||
        this.authService.currentUser.Roles.indexOf(VIEW_SETTING) >= 0 ||
        this.authService.currentUser.Roles.indexOf(VIEW_USER) >= 0 ||
        this.authService.currentUser.Roles.indexOf(VIEW_ROLE) >= 0 ||
        this.authService.currentUser.Roles.indexOf(MANAGE_ROLE) >= 0 ||
        this.authService.currentUser.Roles.indexOf(MANAGE_SETTING) >= 0 ||
        this.authService.currentUser.Roles.indexOf(MANAGE_USER) >= 0
      ) {
        if (user.Roles.indexOf(SUPER_ADMIN) >= 0)
          this.router.navigate(["/admin/users"]);
        else this.router.navigate(["/admin/"]);
      } else if (       
        user.Roles.indexOf(DIRECT_TRADING_DATA_OFFICER) >= 0|| 
        user.Roles.indexOf(MEMBER_DATA_OFFICER) >= 0 ||
        user.Roles.indexOf(AUDITOR_DATA_OFFICER) >= 0
      ) {
        this.router.navigate(["/main/registertrade/annual-financial-auditor-list"]);
      }      
      else {
        this.router.navigate(["/main"]);
      }
    }
  }

  getUserLogin(): UserLogin {
    const formModel = this.loginForm.value;
    return new UserLogin(
      formModel.userName,
      formModel.password,
      formModel.rememberMe
    );
  }

  login() {
    this.isLoading = true;
    this.ngxUiService.start();
    this.authService.login(this.getUserLogin()).subscribe(
      (user) => {
        setTimeout(() => {
          this.isLoading = false;
          this.reset();
          this.redirectUser(user);
          this.ngxUiService.stop();
        }, 500);
      },
      (error) => {
        this.ngxUiService.stop();
        if (Utilities.checkNoNetwork(error)) {          
          this.toastr.error(Utilities.noNetworkMessageCaption);
        } else {
          // tslint:disable-next-line:max-line-length
          const errorMessage =
            Utilities.findHttpResponseMessage("error_description", error) ||
            Utilities.findHttpResponseMessage("error", error);
          if (errorMessage === "invalid_username_or_password") {
            this.toastr.error("Invalid Username or Password");
          } else if (errorMessage === "invalid_grant") {
            this.toastr.error("Please enter Username and Password");
          } else if (errorMessage === "is_currently_locked_out") {
            this.toastr.error(
              Utilities.noNetworkMessageCaption,
              "your account is Locked out please contact your admin"
            );
            this.toastr.error(
              Utilities.noNetworkMessageCaption,
              "Please try again after 5 minitue"
            );
          } else if (errorMessage) {
            this.toastr.error(
              Utilities.noNetworkMessageCaption,
              "Unable to login"
            );
          } else {
            this.toastr.error(
              Utilities.getResponseBody(error),
              "Unable to login"
            );
          }
        }
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    );
  }

  reset() {
    this.formResetToggle = false;

    setTimeout(() => {
      this.formResetToggle = true;
    });
  }

  enterKeyDown() {
    this.enterKeyPress.emit();
  }
}
