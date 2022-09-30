import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {TradeAttachmentDialogModel} from '../../shared/models/member-trade-upload-model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {RegisterTradeService} from '../../shared/services/register-trade.service';
import {MatTableDataSource} from '@angular/material/table';
import {locale as langEnglish} from '../../lang/en';
import {locale as langEthiopic} from '../../lang/et';
import {MemberTradeAttachmentComponent} from '../member-trade-attachment/member-trade-attachment.component';
import {ConfigurationService} from '../../../../../../@custor/services/configuration.service';
import {TranslationLoaderService} from '../../../../../../@custor/services/translation-loader.service';
import {DataSharingService} from '../../shared/services/dataSharingService';

@Component({
  selector: 'app-member-trade-attachment-list',
  templateUrl: './member-trade-attachment-list.component.html',
  styleUrls: ['./member-trade-attachment-list.component.css']
})
export class MemberTradeAttachmentListComponent implements OnInit {
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  @Input() parentObject: TradeAttachmentDialogModel;
  memberClientTradeId: number;
  dataSource: any;
  currentLang = '';
  displayedColumns = [
    // 'FileType', 'GroupType',
    'AttachmentContent', 'SelectedWord', 'CreatedDate', 'UpdatedDate', 'AuditorId', 'previewButton'
    // ,'editButton'
  ];

  constructor(
    public dialog: MatDialog,
    private configService: ConfigurationService,
    private translationLoaderService: TranslationLoaderService,
    private dataSharingService: DataSharingService,
    private registerService: RegisterTradeService
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    // this.dataSharingService.valueAdd.subscribe(res => {
    //   this.getAllAttachementFile(res);
    // });
  }


  openAttachmentDialogForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '1000px';
    dialogConfig.position = {
      top: '5%',
      left: '25%',
    };
    dialogConfig.width = '80%';
    dialogConfig.data = {
     // ParentId: this.parentId
    }
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(MemberTradeAttachmentComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getAllAttachementFile(memberClientTradeId: number) {
    this.registerService.getUploadeTradeExcution(memberClientTradeId).subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
}
