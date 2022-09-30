import { Injectable } from '@angular/core';
import { TranslateService, TranslateLoader } from '@ngx-translate/core';
import { Observable, Subject, of } from 'rxjs';
declare var require: any;

@Injectable()
export class AppTranslationService {

  readonly defaultLanguage = 'en';
  private onLanguageChanged = new Subject<string>();
  languageChanged$ = this.onLanguageChanged.asObservable();

  constructor(private translate: TranslateService) {

    this.setDefaultLanguage(this.defaultLanguage);
  }

  addLanguages(lang: string[]) {
    this.translate.addLangs(lang);
  }

  setDefaultLanguage(lang: string) {
    this.translate.setDefaultLang(lang);
  }

  getDefaultLanguage() {
    return this.translate.defaultLang;
  }

  getBrowserLanguage() {
    return this.translate.getBrowserLang();
  }

  useBrowserLanguage(): string | void {
    const browserLang = this.getBrowserLanguage();

    if (browserLang.match(/en|et/)) {
      this.changeLanguage(browserLang);
      return browserLang;
    }
  }

  changeLanguage(language: string = 'en') {
    if (!language) {
      language = this.translate.defaultLang;
    }

    if (language !== this.translate.currentLang) {
      setTimeout(() => {
        this.translate.use(language);
        this.onLanguageChanged.next(language);
      });
    }

    return language;
  }

  getTranslation(key: string | Array<string>, interpolateParams?: Object): string | any {
    return this.translate.instant(key, interpolateParams);
  }

  getTranslationAsync(key: string | Array<string>, interpolateParams?: Object): Observable<string | any> {
    return this.translate.get(key, interpolateParams);
  }

}

export class TranslateLanguageLoader implements TranslateLoader {

  public getTranslation(lang: string): any {
    switch (lang) {
      case 'en':
        return of(require('../../assets/lang/en.json'));
      case 'et':
        return of(require('../../assets/lang/et.json'));
      default:
    }
  }
}
