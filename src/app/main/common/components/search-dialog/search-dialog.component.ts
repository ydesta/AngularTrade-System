import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from "@angular/core";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { locale as langEnglish } from "src/app/main/lang/en";
import { locale as langEthiopic } from "src/app/main/lang/et";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MatTableDataSource, PageEvent } from "@angular/material";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";

import {
  CustomerSearchCriteriaWithPagination,
  CustomerSearchResultModel,
} from "../../../models/exchange-actor.model";
import { PaginationService } from "src/@custor/services/pagination.service";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { SearchService } from "../../../services/search.service";
import { StaticData } from "src/app/common/models/static-data.model";
import { LookUpService } from "src/app/common/services/look-up.service";
import { LookupType } from "src/app/common/enums/common";

@Component({
  selector: "app-search",
  templateUrl: "./search-dialog.component.html",
  styleUrls: ["./search-dialog.component.scss"],
})
export class SearchDialogComponent implements OnInit {
  totalCount = 0;
  currentLang = "";
  searchForm: FormGroup;
  public dataSource = new MatTableDataSource<CustomerSearchResultModel>();
  public displayedColumns = [
    "OrganizationName",
    "FullName",
    "CustomerType",
    "MemberCategory",
    "Ecxcode",
  ];
  @Output() selectedSearchResult =
    new EventEmitter<CustomerSearchResultModel>();
  public customerTypes: StaticData[] = [];
  memberCategories: StaticData[] = [];
  customerSearchResult: CustomerSearchResultModel[];

  constructor(
    public dialogRef: MatDialogRef<SearchDialogComponent>,
    private configService: ConfigurationService,
    private translationLoaderService: TranslationLoaderService,
    private formBuilder: FormBuilder,
    private lookUpService: LookUpService,
    private searchService: SearchService,
    public paginationService: PaginationService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private changeDetectoRef: ChangeDetectorRef
  ) {
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.currentLang = this.configService.language;
    this.initForm();
  }

  ngOnInit() {
    this.getCustomerType(this.currentLang);
    this.getMemberCategory(this.currentLang);
  }

  initForm() {
    this.searchForm = this.formBuilder.group({
      OrganizationName: ["", []],
      Ecxcode: ["", []],
      Tin: ["", []],
      CustomerType: ["", []],
      MemberCategory: ["", []],
    });
  }

  onSubmit() {
    this.getSearchResult();
  }

  getSearchResult() {
    this.totalCount = 0;
    this.searchService
      .serarchCustomerByCriteria(
        this.getCustomerSearchWithPaginationParameters()
      )
      .subscribe(
        (res: any) => {
          if (res.ItemsCount > 0) {
            this.customerSearchResult = res.Items;
            if (this.totalCount === 0) {
              this.totalCount = res.ItemsCount;
            }
            this.dataSource = new MatTableDataSource(this.customerSearchResult);
            this.changeDetectoRef.detectChanges();
          } else {
            this.toastr.info(
              this.translate.instant("common.messages.NoRecordFound"),
              "",
              {}
            );
            this.dataSource = new MatTableDataSource(null);
          }
        },
        (error) => {}
      );

    // TODO Error Handling
  }

  onSelect(value: any) {
    this.dialogRef.close(value);
  }

  public clearForm() {
    this.searchForm.reset();
  }

  getCustomerType(lang: string) {
    this.lookUpService
      .getLookup(lang, LookupType.CUSTOMER_TYPE)
      .subscribe((res) => {
        this.customerTypes = res;
      });
  }

  getMemberCategory(lang: string) {
    this.lookUpService
      .getLookup(lang, LookupType.MEMBER_CATEGORY)
      .subscribe((res) => {
        this.memberCategories = res;
      });
  }

  switchPage(event: PageEvent) {
    this.paginationService.change(event);
    this.getSearchResult();
  }

  getCustomerSearchWithPaginationParameters(): CustomerSearchCriteriaWithPagination {
    const formModel = this.searchForm.getRawValue();
    const params = new CustomerSearchCriteriaWithPagination();
    // For Pagination
    params.Lang = this.currentLang;
    params.PageIndex = this.paginationService.page;
    params.PageSize = this.paginationService.pageCount;
    // For search-dialog criteria
    params.OrganizationName = formModel.OrganizationName;
    // params.LegalBodyName = formModel.Name;
    // params.LegalBodyFatherName = formModel.FatherName;
    // params.LegalBodyGrandFatherName = formModel.GrandfatherName;
    params.Ecxcode = formModel.Ecxcode;
    params.Tin = formModel.Tin;
    params.CustomerType = formModel.CustomerType
      ? formModel.CustomerType.toString()
      : "";
    params.MemberCategory = formModel.MemberCategory
      ? formModel.MemberCategory.toString()
      : "";
    // params.ServiceId = '2F7EE605-CF62-4FC6-B95A-05FD8143CDC5';
    return params;
  }
}
