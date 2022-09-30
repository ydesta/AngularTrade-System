import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationService } from 'src/@custor/services/configuration.service';
import { TranslationLoaderService } from 'src/@custor/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { ET_ALPHABET_WITHSPACE_REGEX, ALPHABET_WITHSPACE_REGEX } from 'src/app/common/constants/consts';
import {locale as langEnglish} from "../../../lang/en";
import {locale as langEthiopic} from "../../../lang/et";
@Component({
  selector: 'app-general-setting',
  templateUrl: './general-setting.component.html',
  styleUrls: ['./general-setting.component.scss']
})
export class GeneralSettingComponent implements OnInit {
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  formLookupType: FormGroup;
  reportPeriodId = 0;
  currentLang = '';
  dataSource: any;

  displayedColumns = [
    'DescriptionEng',
    'DescriptionAmh',
    'Action'
  ];
  constructor(
    private toaster: ToastrService,
    private configService: ConfigurationService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private translationLoaderService: TranslationLoaderService,
    private translate: TranslateService
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.createReportPeriod();
  }

  ngOnInit() {
  }
  private createReportPeriod() {
    this.formLookupType = this.formBuilder.group({
      DescriptionAmh: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern(ET_ALPHABET_WITHSPACE_REGEX)])],
      DescriptionEng: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern(ALPHABET_WITHSPACE_REGEX)])],
     

    });
  }
}
