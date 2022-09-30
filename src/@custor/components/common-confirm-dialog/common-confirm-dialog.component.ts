import {Component, Inject} from '@angular/core';
import {ConfigurationService} from '../../services/configuration.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TranslationLoaderService} from '../../services/translation-loader.service';
import {locale as langEnglish} from '../../../app/lang/en';
import {locale as langEthiopic} from '../../../app/lang/et';

@Component({
  selector: 'app-common-confirm-dialog',
  templateUrl: './common-confirm-dialog.component.html',
  styleUrls: ['./common-confirm-dialog.component.scss']
})
export class CommonConfirmDialogComponent {

  private currentLang: string;

  constructor(public dialogRef: MatDialogRef<CommonConfirmDialogComponent>,
              private translationLoaderService: TranslationLoaderService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private configService: ConfigurationService) {
    this.currentLang = this.configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
  }
}

