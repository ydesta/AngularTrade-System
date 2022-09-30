import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AuthService } from '../../@custor/services/security/auth.service';
import { ConfigurationService } from '../../@custor/services/configuration.service';
import { locale as langEnglish } from './lang/en';
import { locale as langEthiopic } from './lang/et';
import { TranslationLoaderService } from '../../@custor/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private currentLang: string;

  constructor(private translationService: TranslateService,
    private authService: AuthService,
    public configService: ConfigurationService,
    public router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private translationLoaderService: TranslationLoaderService) {
    this.authService.checkLogin(); // returns false if no user is loggedin or session is expired
    this.currentLang = this.configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);

    if (!this.configService.language) {
      this.translationService.setDefaultLang('et');
      this.configService.language = 'et';
    } else {
      this.translationService.use(this.configService.language);
    }
  }

  ngOnInit(): void {
  }
}
