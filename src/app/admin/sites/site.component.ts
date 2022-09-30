import {Component, OnInit} from '@angular/core';
import {locale as langEnglish} from './lang/en';
import {locale as langEthiopic} from './lang/et';
import {TranslationLoaderService} from '../../../@custor/services/translation-loader.service';
import {ConfigurationService} from '../../../@custor/services/configuration.service';
import {MatDialog, MatDialogRef, MatSelectChange} from '@angular/material';
import {EditSiteDialogComponent} from './edit-site-dialog/edit-site-dialog.component';
import {SiteApiService} from './services/api-services/site.api.service';
import {SiteModel, SiteViewModel} from './model/site.model';
import { ServiceTypes } from 'src/app/common/constants/consts';
import { AngConfirmDialogModule } from 'src/@custor/components/confirm-dialog/confirm-dialog.module';
import { AngConfirmDialogComponent } from 'src/@custor/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-faq',
    templateUrl: './site.component.html',
    styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
    private currentLang: string;
    serviceTypes = ServiceTypes;
    displayedColumns = ['Title', 'Instruction', 'Order', 'Actions'];
    listOfSites: Array<SiteViewModel>;
    editFaqDialogRef: MatDialogRef<EditSiteDialogComponent>;
    deleteFaqDialogRef: MatDialogRef<AngConfirmDialogModule>;

    constructor(private translationLoaderService: TranslationLoaderService,
                public configService: ConfigurationService,
                public siteApiService: SiteApiService,
                private dialog: MatDialog) {
        this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
        this.currentLang = this.configService.language;
    }

    ngOnInit() {
        this.initModels();
    }

    private initModels() {
        this.listOfSites = new Array<SiteViewModel>();
        this.getSite();
    }

    getSite() {
        this.siteApiService.getSiteByLang(false, this.currentLang)
            .subscribe(res => {
                this.listOfSites = res;
            });
    }

    openEditSiteDialog(id) {
        this.editFaqDialogRef = this.dialog.open(EditSiteDialogComponent,
            {
                data: {isUpdate: id !== 0, siteId: id},
                width: '800px',
                disableClose: true,
                height: '350px',
                backdropClass: 'custom-backdrop'
            });
        this.editFaqDialogRef.afterClosed().subscribe(result => {
            this.getSite();
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
                this.siteApiService.deleteSiteById(id)
                    .subscribe(results => {
                        this.getSite();
                    });
            }
        });
    }
}
