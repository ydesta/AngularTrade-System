import { Component, ChangeDetectorRef, ViewChild, ViewEncapsulation, OnInit, OnDestroy, ElementRef } from '@angular/core';

import {locale as langEnglish} from 'src/app/main/lang/en';
import {locale as langEthiopic} from 'src/app/main/lang/et';

//import {TranslationLoaderService} from '../../@custor/services/translation-loader.service';
import {ConfigurationService} from 'src/@custor/services/configuration.service';
import { TranslationLoaderService } from 'src/@custor/services/translation-loader.service';
@Component({
  selector: 'app-register-trade',
  templateUrl: './register-trade.component.html',
  styleUrls: ['./register-trade.component.scss']
})
export class RegisterTradeComponent implements OnInit {

  currentLang = '';
  constructor(private translationLoadService: TranslationLoaderService,
              private configService: ConfigurationService)
  {
    this.currentLang = this.configService.language;
    this.translationLoadService.loadTranslations(langEnglish, langEthiopic);
  }

  ngOnInit() {
  }

}
