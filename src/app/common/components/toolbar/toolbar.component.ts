import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from 'src/@custor/services/configuration.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationLoaderService } from 'src/@custor/services/translation-loader.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  currentLang: any;

  constructor(
    public configService: ConfigurationService,
    public translationService: TranslateService,
    private translationLoaderService: TranslationLoaderService) {
    // this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    if (!this.configService.language) {
      this.translationService.setDefaultLang('et');
      this.configService.language = 'et';
    } else {
      this.translationService.use(this.configService.language);
    }
    this.currentLang = this.configService.language;
  }

  ngOnInit() {
  }

}
