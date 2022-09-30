import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MatPaginator, MatPaginatorIntl, MatSort, MatTableDataSource, PageEvent} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {PrerequisiteService} from '../../Service/prerequisite.service';
import {Prerequisite} from '../../models/prerequisite.model';
import {AngConfirmDialogComponent} from 'src/@custor/components/confirm-dialog/confirm-dialog.component';
import {HttpClient} from '@angular/common/http';
import {PaginationService} from 'src/@custor/services/pagination.service';
import {TranslateService} from '@ngx-translate/core';
import {SelectionModel} from '@angular/cdk/collections';
import {ServicePrerequisiteParameters} from '../../models/serviceprerequisiteparameter';
import {ConfigurationService} from 'src/@custor/services/configuration.service';
import { AccountService } from 'src/@custor/services/security/account.service';
import { Permission } from 'src/@custor/models/permission.model';

@Component({
    selector: 'app-prerequisite-list',
    templateUrl: './prerequisite-list.component.html',
    styleUrls: ['./prerequisite-list.component.scss']
})
export class PrerequisiteListComponent implements OnInit {
    prerequisites: Prerequisite[];
    displayedColumns = ['Description', 'EnglishDescription', 'actions'];
    dataSource: MatTableDataSource<Prerequisite>;
    loadingIndicator: boolean;
    dialogRef: any;
    totalCount = 0;
    confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;
    selection = new SelectionModel<Prerequisite>(true, []);

    constructor(private http: HttpClient,
                private toastr: ToastrService,
                private prerequisiteService: PrerequisiteService,
                public readonly translate: TranslateService,
                public paginationService: PaginationService,
                public dialog: MatDialog,
                private configService: ConfigurationService,
                private router: Router,
                private route: ActivatedRoute,
                private accountService:AccountService,
                ) {
        this.dataSource = new MatTableDataSource();
    }

    ngOnInit() {
        this.getPrerequisites();
    }

    getPrerequisites() {
        this.loadingIndicator = true;
        this.prerequisiteService.getPrerequisites(this.getPrerequisiteParameters())
            .subscribe(result => {
                    this.prerequisites = result.Items;
                    if (this.prerequisites.length < 1) {
                        this.dataSource.data = null;
                        this.toastr.error(this.translate.instant('common.messages.NoRecordFound'));
                    } else {
                        this.dataSource.data = this.prerequisites;
                        this.totalCount = result.ItemsCount;
                    }
                },
                err => {
                    this.toastr.error(this.translate.instant('common.messages.NoRecordFound'));
                });
        // this.dataSource.data = ELEMENT_DATA;
        this.loadingIndicator = false;
    }

    editPrerequisite(prerequisite: Prerequisite) {
        if (Prerequisite) {
            this.router.navigate(['./admin/prerequisite', prerequisite.PrerequisiteId]);
        } else {
            this.router.navigate(['./admin/prerequisite', 0]);
        }
    }

    addPrerequisite() {
        this.router.navigate(['./admin/prerequisite', 0]);
    }

    confirmDelete(prerequisite: Prerequisite) {
        this.confirmDialogRef = this.dialog.open(AngConfirmDialogComponent,
            {
                disableClose: false,
                height: '220px',
                width: '345px',
            });
        this.confirmDialogRef.afterClosed().subscribe(result => {
            this.loadingIndicator = true;
            if (result) {
                this.prerequisiteService.deletePrerequisite(prerequisite.PrerequisiteId)
                    .subscribe(results => {
                            this.loadingIndicator = false;
                            // this.dataSource.data = this.dataSource.data.filter(item => item !== prerequisite);
                            this.getPrerequisites();
                        },
                        error => {
                            this.toastr.error(this.translate.instant('common.messages.Error'), '', {
                            });
                        });
            }
            this.loadingIndicator = false;
        });
    }

    switchPage(event: PageEvent) {
        this.paginationService.change(event);
        this.getPrerequisites();
    }
    get canManageSetting() {
        return this.accountService.userHasPermission(Permission.manageSettingsPermission);
      }
      get canViewSetting() {
        return this.accountService.userHasPermission(Permission.viewSettingPermission);
      }
    checkboxLabel(row?: Prerequisite): string {
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${1}`;
    }

    private getPrerequisiteParameters(): ServicePrerequisiteParameters {
        const params = new ServicePrerequisiteParameters();
        params.PageIndex = this.paginationService.page;
        params.PageSize = this.paginationService.pageCount;
        params.Lang = this.configService.language;
        return params;
    }

    getPaginatorIntl(): MatPaginatorIntl {
        const paginatorIntl = new MatPaginatorIntl();
        paginatorIntl.itemsPerPageLabel = this.translate.instant('ITEMS_PER_PAGE_LABEL');
        paginatorIntl.nextPageLabel = this.translate.instant('NEXT_PAGE_LABEL');
        paginatorIntl.previousPageLabel = this.translate.instant('PREVIOUS_PAGE_LABEL');
        paginatorIntl.firstPageLabel = this.translate.instant('FIRST_PAGE_LABEL');
        paginatorIntl.lastPageLabel = this.translate.instant('LAST_PAGE_LABEL');
        paginatorIntl.getRangeLabel = this.getRangeLabel.bind(this);
        return paginatorIntl;
    }

    private getRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0 || pageSize === 0) {
            return this.translate.instant('RANGE_PAGE_LABEL_1', {length});
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return this.translate.instant('RANGE_PAGE_LABEL_2', {startIndex: startIndex + 1, endIndex, length});
    }
}
