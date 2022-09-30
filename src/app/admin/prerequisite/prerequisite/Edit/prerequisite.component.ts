import {Component, OnInit} from '@angular/core';
import {locale as langEthiopic} from 'src/app/main/lang/et';
import {locale as langEnglish} from 'src/app/main/lang/en';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
    ET_ALPHABET_WITHNEWLINE_REGEX,
    ALPHABET_WITHNUMERIC_REGEX
} from 'src/app/common/constants/consts';
import {TranslationLoaderService} from 'src/@custor/services/translation-loader.service';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {PrerequisiteService} from '../../Service/prerequisite.service';
import {Prerequisite} from '../../models/prerequisite.model';
import {TranslateService} from '@ngx-translate/core';
import { AccountService } from 'src/@custor/services/security/account.service';
import { Permission } from 'src/@custor/models/permission.model';

@Component({
    selector: 'app-prerequisite',
    templateUrl: './prerequisite.component.html',
})
export class PrerequisiteComponent implements OnInit {
    preRequisiteForm: FormGroup;
    isNewprerequisite = false;
    loadingIndicator: boolean;
    title: string;
    Username: string;
    prerequisite: Prerequisite;
    prerequisiteid: number;

    constructor(private accountService:AccountService,
                private translationLoaderService: TranslationLoaderService,
                private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private toastr: ToastrService,
                private prerequisiteService: PrerequisiteService,
                public readonly translate: TranslateService) {
        this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
        this.buildForm();
    }

    private buildForm() {
        this.preRequisiteForm = this.formBuilder.group({
            preRequisiteAmharic: ['', [Validators.compose([Validators.required, Validators.minLength(2),
                Validators.pattern(ET_ALPHABET_WITHNEWLINE_REGEX)])]],
            preRequisiteEnglish: ['', [Validators.compose([Validators.required, Validators.minLength(2),
                Validators.pattern(ALPHABET_WITHNUMERIC_REGEX)])]],
        });
    }

    ngOnInit() {
        this.prerequisiteid = this.activatedRoute.snapshot.params['id'];
        if (this.prerequisiteid < 1) {
            this.isNewprerequisite = true;
            this.title = 'Create new Prerequisite';
            return;
        }
        if (this.prerequisiteid) {
            this.isNewprerequisite = false;
            this.getPrerequisite(this.prerequisiteid);
        }
    }

    getPrerequisite(id) {
        this.prerequisiteService
            .getPrerequisite(id)
            .subscribe(result => {
                    this.prerequisite = result;
                    this.updateForm();
                },
                error => this.toastr.error(this.translate.instant(error)));
        this.loadingIndicator = false;
    }

    updateForm() {
        this.preRequisiteForm.patchValue({
            preRequisiteEnglish: this.prerequisite.DescriptionEng == null ? '' : this.prerequisite.DescriptionEng.toString(),
            preRequisiteAmharic: this.prerequisite.DescriptionAmh == null ? '' : this.prerequisite.DescriptionAmh.toString(),
        });
    }

    public onSubmit() {
        if (!this.preRequisiteForm.valid) {
            return;
        }
        this.loadingIndicator = true;
        this.prerequisite = this.getPostedPrerequisite();
        if (this.isNewprerequisite) {
            this.prerequisiteService.savePrerequisite(this.getPostedPrerequisite())
                .subscribe((prerequisite: Prerequisite) => {
                    this.saveCompleted(prerequisite);
                    this.loadingIndicator = false;
                }, () => {
                    this.toastr.error(this.translate.instant('common.messages.SaveError'), '', {
                        closeButton: true
                    });
                    this.loadingIndicator = false;
                });
        }
        else {
            this.prerequisiteService.editPrerequisite(this.getPostedPrerequisite())
                .subscribe((prerequisite: Prerequisite) => {
                    this.saveCompleted(prerequisite);
                    this.loadingIndicator = false;
                }, () => {
                    this.toastr.error(this.translate.instant('common.messages.SaveError'), '', {
                        closeButton: true
                    });
                    this.loadingIndicator = false;
                });
        }
    }

    private getPostedPrerequisite(): Prerequisite {
        const formModel = this.preRequisiteForm.value;
        return {
            PrerequisiteId: this.prerequisiteid,
            DescriptionAmh: formModel.preRequisiteAmharic,
            DescriptionEng: formModel.preRequisiteEnglish,
        };
    }

    private saveCompleted(prerequisite?: Prerequisite) {
        if (prerequisite == null) {
            this.toastr.error(this.translate.instant('common.messages.SaveError'), '', {
                closeButton: true
            });
            this.loadingIndicator = false;
            return;
        } else {
            this.toastr.success(this.translate.instant('common.messages.Saved'), '', {
                closeButton: true
            });
            this.loadingIndicator = false;
            window.history.back();
        }
    }

    onBack() {
        window.history.back();
    }

    get preRequisiteAmharic() {
        return this.preRequisiteForm.get('preRequisiteAmharic');
    }

    get preRequisiteEnglish() {
        return this.preRequisiteForm.get('preRequisiteEnglish');
    }
    get canManageSetting() {
        return this.accountService.userHasPermission(Permission.manageSettingsPermission);
      }
      get canViewSetting() {
        return this.accountService.userHasPermission(Permission.viewSettingPermission);
      }
}
