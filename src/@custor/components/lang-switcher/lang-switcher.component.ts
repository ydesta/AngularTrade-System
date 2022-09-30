import { FormGroup, FormControl, FormBuilder, Validators, NgForm, Form } from '@angular/forms';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule, Input, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule, MatMenuModule, MatMenuTrigger, MatButtonModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { ConfigurationService } from '../../services/configuration.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/@custor/services/security/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lang-switcher',
  templateUrl: 'lang-switcher.component.html',
  styleUrls: ['lang-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LangSwitcherComponent {
  // @ViewChild('form')
  // langForm: FormGroup;
  selectedLanguage: string;
  selectedLanguageName: string;
  languages: UserLanguage[] = [
    { name: 'አማርኛ', locale: 'et' },
    { name: 'English', locale: 'en' }
  ];
  constructor(private config: ConfigurationService,
    private translationService: TranslateService, private authService: AuthService, private toaster: ToastrService, ) {
    config.configurationImported$.subscribe(() => this.setLang(this.currentLang));
    this.selectedLanguage = this.currentLang;
    this.selectedLanguageName = this.getLangName(this.selectedLanguage);
  }
  get currentLang(): string {
    return this.config.language || '';
  }

  setLang(lang: string) {

    if (lang) {
      this.config.language = lang;
      window.location.reload();
    }
  }
  private getLangName(locale: string): string {
    switch (locale) {
      case 'et':
        return 'አማርኛ';
      case 'en':
        return 'English';
      default:
        return 'አማርኛ';
    }
  }
}

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule
  ],
  exports: [LangSwitcherComponent],
  declarations: [LangSwitcherComponent],
  providers: [ConfigurationService],
})
export class LangSwitcherModule { }

export interface UserLanguage {
  name: string;
  locale: string;
}

