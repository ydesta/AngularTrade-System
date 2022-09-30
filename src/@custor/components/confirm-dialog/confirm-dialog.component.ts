import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {ConfigurationService} from '../../services/configuration.service';
import {TranslationLoaderService} from '../../services/translation-loader.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class AngConfirmDialogComponent {
  public confirmMessage: string;
  private currentLang: string;
  private title: string;

  constructor(public dialogRef: MatDialogRef<AngConfirmDialogComponent>,
              private translationLoaderService: TranslationLoaderService,
              private configService: ConfigurationService,
              private translate: TranslateService) {

    // this.currentLang = this.configService.language;
    // this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
  }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }
  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}

export class ConfirmDialogModel {

  constructor(public title: string, public confirmMessage: string) {
  }
}
