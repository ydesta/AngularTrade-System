import {Component, OnInit} from '@angular/core';
import {locale as langEnglish} from './lang/en';
import {locale as langEthiopic} from './lang/et';
import {TranslationLoaderService} from 'src/@custor/services/translation-loader.service';
import {ConfigurationService} from 'src/@custor/services/configuration.service';
import {ServiceTypes} from 'src/app/common/constants/consts';
import {MatDialog, MatDialogRef, MatSelectChange} from '@angular/material';
import {EditFaqDialogComponent} from './edit-faq-dialog/edit-faq-dialog.component';
import {FaqApiService} from './services/api-services/faq.api.service';
import {FaqModel, FaqViewModel} from './model/faq.model';
import { AngConfirmDialogComponent } from 'src/@custor/components/confirm-dialog/confirm-dialog.component';
import { AngConfirmDialogModule } from 'src/@custor/components/confirm-dialog/confirm-dialog.module';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
    private currentLang: string;
    serviceTypes = ServiceTypes;
    displayedColumns = ['Title', 'Instruction', 'Order', 'Actions'];
    listOfFaqs: Array<FaqViewModel>;
    editFaqDialogRef: MatDialogRef<EditFaqDialogComponent>;
    deleteFaqDialogRef: MatDialogRef<AngConfirmDialogModule>;
    constructor(private translationLoaderService: TranslationLoaderService,
                public configService: ConfigurationService,
                public faqApiService: FaqApiService,
                private dialog: MatDialog) {
        this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
        this.currentLang = this.configService.language;
    }

    ngOnInit() {
        this.initModels();
    }

    private initModels() {
        this.listOfFaqs = new Array<FaqModel>();
        this.getFaq();
    }

    getFaq() {
        this.faqApiService.getFaqByLang(this.currentLang)
            .subscribe(res => {
                this.listOfFaqs = res;
            });
    }

    openEditUserInstructionDialog(id) {
        this.editFaqDialogRef = this.dialog.open(EditFaqDialogComponent,
            {
                data: {isUpdate: id !== 0, faqId: id},
                width: '800px',
                disableClose: true,
                height: '500px',
                backdropClass: 'custom-backdrop'
            });
        this.editFaqDialogRef.afterClosed().subscribe(result => {
            this.getFaq();
        });
    }
    delete(id) {
        this.deleteFaqDialogRef = this.dialog.open(AngConfirmDialogComponent,
            {
                disableClose: false,
                height: '230px',
                width: '345px',
                backdropClass: 'custom-backdrop'
            });
        this.deleteFaqDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.faqApiService.delelteFaqById(id)
                    .subscribe(results => {
                        this.getFaq();
                    });
            }
        });
    }
}
