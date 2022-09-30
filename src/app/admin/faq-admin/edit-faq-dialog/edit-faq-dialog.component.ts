import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {locale as langEnglish} from '../lang/en';
import {locale as langEthiopic} from '../lang/et';
import {ConfigurationService} from 'src/@custor/services/configuration.service';
import {TranslationLoaderService} from 'src/@custor/services/translation-loader.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {
    ALPHABET_WITHSPACE_REGEX,
    ET_ALPHABET_WITHSPACE_REGEX,
    ET_ALPHABET_WITHSPACE_QUESTION_REGEX,
    ALPHABET_WITHSPACE_QUESTION_REGEX
} from 'src/app/common/constants/consts';
import {FaqApiService} from '../services/api-services/faq.api.service';
import {FaqModel} from '../model/faq.model';

@Component({
    selector: 'app-edit-faq-dialog',
    templateUrl: './edit-faq-dialog.component.html',
    styleUrls: ['./edit-faq-dialog.component.scss']
})
export class EditFaqDialogComponent {
    public confirmMessage: string;
    private currentLang: string;
    faq: FaqModel;
    private faqToBeUpdated: FaqModel;
    editFaqForm: FormGroup;
    isUpdate: boolean;


    constructor(public dialogRef: MatDialogRef<EditFaqDialogComponent>,
                private translationLoaderService: TranslationLoaderService,
                private configService: ConfigurationService,
                private faqApiService: FaqApiService,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private fb: FormBuilder) {
        this.currentLang = this.configService.language;
        this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
        this.initModels();
        this.createForm();

        if (this.data.isUpdate) {
            this.isUpdate = true;
            this.getFaq();
        }
    }

    private initModels() {
        this.faq = new FaqModel();
    }

    private createForm() {
        this.editFaqForm = this.fb.group({
            Question: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(ALPHABET_WITHSPACE_QUESTION_REGEX)]],
            QuestionAmh: ['', [Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50),
                Validators.pattern(ET_ALPHABET_WITHSPACE_QUESTION_REGEX)])]],
            Answer: ['', [Validators.compose([Validators.required, Validators.minLength(20), Validators.maxLength(255),
                Validators.pattern(ALPHABET_WITHSPACE_REGEX)])]],
            AnswerAmh: ['', [Validators.compose([Validators.required, Validators.minLength(20), Validators.maxLength(255),
                Validators.pattern(ET_ALPHABET_WITHSPACE_REGEX)])]],
        });
    }

    private getFaq() {
        this.faqApiService.getFaq(this.data.faqId).subscribe(res => {
            this.faqToBeUpdated = res;
            this.editFaqForm.patchValue(res);
        });
    }

    saveFaq() {
        if (this.isUpdate) {
            this.faqApiService.updateFaq(this.getEditedFaq())
                .subscribe(res => {
                    this.dialogRef.close();
                });
        } else {
            this.faqApiService.saveFaq(this.getEditedFaq())
                .subscribe(res => {
                    this.dialogRef.close();
                });
        }
    }

    private getEditedFaq() {
        this.faq = this.editFaqForm.value;
        if (this.isUpdate) {
            this.faq.Id = this.faqToBeUpdated.Id;
        } else {
            this.faq.Id = 0;
        }

        return this.faq;
    }

    get QuestionAmh() {
        return this.editFaqForm.get('QuestionAmh');
    }

    get Question() {
        return this.editFaqForm.get('Question');
    }

    get Answer() {
        return this.editFaqForm.get('Answer');
    }

    get AnswerAmh() {
        return this.editFaqForm.get('AnswerAmh');
    }
}
