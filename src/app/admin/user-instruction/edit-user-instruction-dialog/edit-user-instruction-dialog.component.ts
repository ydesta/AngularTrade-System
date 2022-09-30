import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {locale as langEnglish} from '../lang/en';
import {locale as langEthiopic} from '../lang/et';
import {ConfigurationService} from '../../../../@custor/services/configuration.service';
import {TranslationLoaderService} from '../../../../@custor/services/translation-loader.service';
import {EditUserInstructionPostModel, UserInstructionModel} from '../model/user-instruction.model';
import {UserInstructionApiService} from '../services/api-services/user-instruction.api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ALPHABET_WITHSPACE_REGEX, ET_ALPHABET_WITHSPACE_REGEX, ALPHABET_WITHNEWLINE_REGEX, ET_ALPHABET_WITHNEWLINE_REGEX } from 'src/app/common/constants/consts';


@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './edit-user-instruction-dialog.component.html',
    styleUrls: ['./edit-user-instruction-dialog.component.scss']
})
export class EditUserInstructionDialogComponent {
    public confirmMessage: string;
    private currentLang: string;
    userInstruction: EditUserInstructionPostModel;
    private userInstructionToBeUpdated: UserInstructionModel;
    editInstructionForm: FormGroup;
    private instructionId: number;
    isUpdate: boolean;


    constructor(public dialogRef: MatDialogRef<EditUserInstructionDialogComponent>,
                private translationLoaderService: TranslationLoaderService,
                private configService: ConfigurationService,
                private userInstructionApiService: UserInstructionApiService,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private fb: FormBuilder) {
        this.currentLang = this.configService.language;
        this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
        this.initModels();
        this.createForm();

        if (this.data.isUpdate) {
            this.isUpdate = true;
            this.getUserInstruction();
        }
    }

    private initModels() {
        this.userInstruction = new EditUserInstructionPostModel();
    }

    private createForm() {
        this.editInstructionForm = this.fb.group({
            Title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(ALPHABET_WITHSPACE_REGEX)]],
            TitleAmh: ['', [Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50),
                Validators.pattern(ET_ALPHABET_WITHSPACE_REGEX)])]],
            Instruction: ['', [Validators.compose([Validators.required, Validators.minLength(20),
                Validators.pattern(ALPHABET_WITHNEWLINE_REGEX)])]],
            InstructionAmh: ['', [Validators.compose([Validators.required, Validators.minLength(20),
                Validators.pattern(ET_ALPHABET_WITHNEWLINE_REGEX)])]],
        });
    }

    private getUserInstruction() {
        this.userInstructionApiService.getUserInstruction(this.data.instructionId).subscribe(res => {
            this.userInstructionToBeUpdated = res;
            this.editInstructionForm.patchValue(res);
        });
    }

    saveInstruction() {
        if (this.isUpdate) {
            this.userInstructionApiService.updateUserInstructionsByServiceId(this.getEditedUserInstruction(), false)
                .subscribe(res => {
                    this.dialogRef.close();
                });
        } else {
            this.userInstructionApiService.saveUserInstructionsByServiceId(this.getEditedUserInstruction())
                .subscribe(res => {
                    this.dialogRef.close();
                });
        }
    }

    private getEditedUserInstruction() {
        this.userInstruction = this.editInstructionForm.value;
        if (this.isUpdate) {
            this.userInstruction.Id = this.userInstructionToBeUpdated.Id;
            this.userInstruction.OrderNo = this.userInstructionToBeUpdated.OrderNo;
            this.userInstruction.ServiceId = this.userInstructionToBeUpdated.ServiceId;
        } else {
            this.userInstruction.ServiceId = this.data.serviceId;
            this.userInstruction.Id = 0;
            this.userInstruction.OrderNo = 0;
        }

        return this.userInstruction;
    }

    get InstructionAmh() {
        return this.editInstructionForm.get('InstructionAmh');
    }

    get Instruction() {
        return this.editInstructionForm.get('Instruction');
    }

    get Title() {
        return this.editInstructionForm.get('Title');
    }

    get TitleAmh() {
        return this.editInstructionForm.get('TitleAmh');
    }
}
