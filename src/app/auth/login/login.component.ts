import { Component, ViewChild } from "@angular/core";
import { LoginControlComponent } from "./login-control.component";
import { TranslateService } from "@ngx-translate/core";
import { locale as langEnglish } from "../lang/et";
import { locale as langEthiopic } from "../lang/en";
import { Router } from "@angular/router";
import { ConfigurationService } from 'src/@custor/services/configuration.service';
import { AuthService } from 'src/@custor/services/security/auth.service';
import { TranslationLoaderService } from 'src/@custor/services/translation-loader.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  @ViewChild(LoginControlComponent, { static: true })
  loginControl: LoginControlComponent;
  currentLang: string;

  constructor(
    public configService: ConfigurationService,
    public translationService: TranslateService,
    private authService: AuthService,
    private router: Router,
    private translationLoaderService: TranslationLoaderService
  ) {
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    if (!this.configService.language) {
      this.translationService.setDefaultLang('et');
      this.configService.language = 'et';
    } else {
      this.translationService.use(this.configService.language);
    }
    this.currentLang = this.configService.language;

    // if (this.authService.isLoggedIn) {
    //     // if (this.authService.currentUser.Roles.indexOf(SUPER_ADMIN)) {
    //     //     this.router.navigate(['/admin']);
    //     // } else if (this.authService.currentUser.Roles.indexOf(RECOGNITION_USER)) {
    //     //     this.router.navigate(['/main']);
    //     // }else{
    //       this.authService.redirectLoginUser();
    //     // }
    // }
  }
}
