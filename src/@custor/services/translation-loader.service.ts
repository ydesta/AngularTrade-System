import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface Locale {
    lang: string;
    // tslint:disable-next-line:ban-types
    data: Object;
}

@Injectable({
    providedIn: 'root'
})
export class TranslationLoaderService {

    constructor(
        // tslint:disable-next-line:variable-name
        private _translateService: TranslateService
    ) {
    }

     loadTranslations(...args: Locale[]): void {
        const locales = [...args];
        locales.forEach((locale) => {
            this._translateService.setTranslation(locale.lang, locale.data, true);
        });
    }
}
