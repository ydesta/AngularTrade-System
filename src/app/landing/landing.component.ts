import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {locale as langEnglish} from './lang/en';
import {locale as langEthiopic} from './lang/et';
import { Router } from '@angular/router';
import { TranslationLoaderService } from 'src/@custor/services/translation-loader.service';
import { ConfigurationService } from 'src/@custor/services/configuration.service';
import { AuthService } from 'src/@custor/services/security/auth.service';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(
    private translationLoaderService: TranslationLoaderService,
    private translate: TranslateService,
    public configService: ConfigurationService,
    private authService: AuthService,
    private route: Router
  ) {
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.translate.use(this.configService.language);
  }

  ngOnInit() {
  }

  // redirect

  redirectUser(){
    if(this.authService.isLoggedIn){
      this.route.navigate(['/main'])
    }else {
      this.route.navigate(['/auth/login'])
    }
  }
}
