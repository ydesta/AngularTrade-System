import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {locale as langEnglish} from '../existing-user-dialog/lang/en';
import {locale as langEthiopic} from './lang/et';
import {TranslationLoaderService} from 'src/@custor/services/translation-loader.service';
import {ConfigurationService} from 'src/@custor/services/configuration.service';
//import {RegistrationModel} from '../../../main/customer/components/principal/principal-registration/components/general-info/models/registration.model';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './existing-user-dialog.component.html',
    styleUrls: ['./existing-user-dialog.component.scss']
})
export class ExistingUserDialogComponent {
    public confirmMessage: string;
    private currentLang: string;
    public isRegistration: boolean;

    constructor(public dialogRef: MatDialogRef<ExistingUserDialogComponent>,
                private translationLoaderService: TranslationLoaderService,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private configService: ConfigurationService) {
        this.currentLang = this.configService.language;
        this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
        if (this.data.isReg) {
            this.isRegistration = true;
        }
    }
}
