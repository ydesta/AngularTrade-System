import { Component, OnInit} from '@angular/core';
import {locale as ethiopic} from './lang/et';
import {locale as english} from './lang/en';
import { TranslationLoaderService } from 'src/@custor/services/translation-loader.service';
import { ConfigurationService } from 'src/@custor/services/configuration.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  language: string;

  constructor(private translationLoadService: TranslationLoaderService, private config: ConfigurationService ) { 
    this.translationLoadService.loadTranslations(english, ethiopic);
    this.language = this.config.language;
  }

  ngOnInit() {
  }

}
