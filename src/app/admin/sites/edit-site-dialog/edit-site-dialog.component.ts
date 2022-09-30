import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {locale as langEnglish} from '../lang/en';
import {locale as langEthiopic} from '../lang/et';
import {ConfigurationService} from '../../../../@custor/services/configuration.service';
import {TranslationLoaderService} from '../../../../@custor/services/translation-loader.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SiteApiService} from '../services/api-services/site.api.service';
import {SiteModel} from '../model/site.model';

@Component({
    selector: 'app-edit-site-dialog',
    templateUrl: './edit-site-dialog.component.html',
    styleUrls: ['./edit-site-dialog.component.scss']
})
export class EditSiteDialogComponent {
    public confirmMessage: string;
    private currentLang: string;
    site: SiteModel;
    private siteToBeUpdated: SiteModel;
    editSiteForm: FormGroup;
    isUpdate: boolean;
    checked: boolean;


    constructor(public dialogRef: MatDialogRef<EditSiteDialogComponent>,
                private translationLoaderService: TranslationLoaderService,
                private configService: ConfigurationService,
                private siteApiService: SiteApiService,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private fb: FormBuilder) {
        this.currentLang = this.configService.language;
        this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
        this.initModels();
        this.createForm();

        if (this.data.isUpdate) {
            this.isUpdate = true;
            this.getSite();
        }
    }

    private initModels() {
        this.site = new SiteModel();
    }

    private createForm() {
        this.editSiteForm = this.fb.group({
            NameEnglish: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            Name: ['', [Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])]],
            SiteCode: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            IsActive: [],
        });
    }

    private getSite() {
        this.siteApiService.getSite(this.data.siteId).subscribe(res => {
            this.siteToBeUpdated = res;
            this.editSiteForm.patchValue(res);
        });
    }

    saveSite() {
        if (this.isUpdate) {
            this.siteApiService.updateSite(this.getEditedSite())
                .subscribe(res => {
                    this.dialogRef.close();
                });
        } else {
            this.siteApiService.saveSite(this.getEditedSite())
                .subscribe(res => {
                    this.dialogRef.close();
                });
        }
    }

    private getEditedSite() {
        this.site = this.editSiteForm.value;
        if (this.isUpdate) {
            this.site.SiteId = this.siteToBeUpdated.SiteId;
        } else {
            this.site.SiteId = 0;
        }

        return this.site;
    }

    get Name() {
        return this.editSiteForm.get('Name');
    }

    get NameEnglish() {
        return this.editSiteForm.get('NameEnglish');
    }

    get SiteCode() {
        return this.editSiteForm.get('SiteCode');
    }

    get IsActive() {
        return this.editSiteForm.get('IsActive');
    }
}
