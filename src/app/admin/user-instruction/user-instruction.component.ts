import {Component, OnInit} from '@angular/core';
import {locale as langEnglish} from './lang/en';
import {locale as langEthiopic} from './lang/et';
import {TranslationLoaderService} from '../../../@custor/services/translation-loader.service';
import {ConfigurationService} from '../../../@custor/services/configuration.service';
import {MatDialog, MatDialogRef, MatSelectChange} from '@angular/material';
import {UserInstructionApiService} from './services/api-services/user-instruction.api.service';
import {EditUserInstructionModel, UserInstructionViewModel} from './model/user-instruction.model';
import {EditUserInstructionDialogComponent} from './edit-user-instruction-dialog/edit-user-instruction-dialog.component';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ServiceTypes } from 'src/app/common/constants/consts';
import { AngConfirmDialogComponent } from 'src/@custor/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-user-instruction',
    templateUrl: './user-instruction.component.html',
    styleUrls: ['./user-instruction.component.scss']
})
export class UserInstructionComponent implements OnInit {
    private currentLang: string;
    serviceTypes = ServiceTypes;
    selectedServiceId: string;
    displayedColumns = ['Title', 'Instruction', 'Order', 'Actions'];
    listOfInstructions: Array<UserInstructionViewModel>;
    editUserInstructionDialogRef: MatDialogRef<EditUserInstructionDialogComponent>;
    deleteUserInstructionDialogRef: MatDialogRef<AngConfirmDialogComponent>;
    showInstructionAddButton: boolean;

    constructor(private translationLoaderService: TranslationLoaderService,
                public configService: ConfigurationService,
                public userInstructionService: UserInstructionApiService,
                private dialog: MatDialog) {
        this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
        this.currentLang = this.configService.language;
    }

    ngOnInit() {
        this.initModels();
    }

    private initModels() {
        this.listOfInstructions = new Array<EditUserInstructionModel>();
    }

    getUserInstructionByServiceId(serviceId) {
        this.userInstructionService.getUserInstructionsByServiceId(serviceId, this.currentLang)
            .subscribe(res => {
                this.listOfInstructions = res;
            });
    }

    serviceChanged($event: MatSelectChange) {
        this.selectedServiceId = $event.value;
        this.showInstructionAddButton = true;
        this.getUserInstructionByServiceId(this.selectedServiceId);
    }

    drop(event: CdkDragDrop<string[]>) {
        event.item.data.OrderNo = event.currentIndex + 1;
        this.userInstructionService.updateUserInstructionsByServiceId(event.item.data,true)
            .subscribe(res => {
                if (res) {
                    moveItemInArray(this.listOfInstructions, event.previousIndex, event.currentIndex);
                }
            });
    }

    openEditUserInstructionDialog(id) {
        this.editUserInstructionDialogRef = this.dialog.open(EditUserInstructionDialogComponent,
            {
                data: {isUpdate: id !== 0, instructionId: id, serviceId: this.selectedServiceId},
                width: '800px',
                disableClose: true,
                height: '500px',
                backdropClass: 'custom-backdrop'
            });
        this.editUserInstructionDialogRef.afterClosed().subscribe(result => {
            this.getUserInstructionByServiceId(  this.selectedServiceId);
        });
    }

    delete(id) {
        this.deleteUserInstructionDialogRef = this.dialog.open(AngConfirmDialogComponent,
            {
                disableClose: false,
                height: '230px',
                width: '345px',
                backdropClass: 'custom-backdrop'
            });
        this.deleteUserInstructionDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.userInstructionService.delelteUserInstructionsById(id)
                    .subscribe(results => {
                        this.getUserInstructionByServiceId(this.selectedServiceId);
                    });
            }
        });
    }

}
