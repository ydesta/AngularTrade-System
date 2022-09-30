import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ConfigurationService } from "../../../../../../@custor/services/configuration.service";
import { TranslationLoaderService } from "../../../../../../@custor/services/translation-loader.service";
import { locale as langEnglish } from "../../../../lang/en";
import { locale as langEthiopic } from "../../../../lang/et";
import { MatTableDataSource } from "@angular/material/table";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { RegisterTradeService } from "../../shared/services/register-trade.service";
import { StaticData } from "src/app/common/models/static-data.model";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { SearchCriteria } from "../../shared/models/register-trade-model";
import { LookupType } from "src/app/common/enums/common";
import { LookUpService } from "src/app/common/services/look-up.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-client-search-dialog",
  templateUrl: "./client-search-dialog.component.html",
  styleUrls: ["./client-search-dialog.component.scss"],
})
export class ClientSearchDialogComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  searchKey: string;
  currentLang = "";
  public dataSource: any;
  searchForm: FormGroup;
  clientFullNameList: any;
  customerId: string;
  businessTypes: StaticData[] = [];
  public displayedColumns = ["sno", "Description", "Action"];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private configService: ConfigurationService,
    private translationLoaderService: TranslationLoaderService,
    private formBuilder: FormBuilder,
    private lookupService: LookUpService,
    private registerTradeService: RegisterTradeService,
    public translate: TranslateService,
    public dialogRef: MatDialogRef<ClientSearchDialogComponent>
  ) {
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.currentLang = this.configService.language;
    this.initForm();
  }

  ngOnInit() {
    console.log("#####       ", this.data.ExchangeActorId);
    this.getClientInformatin(this.data.ExchangeActorId);
  }

  initForm() {
    this.searchForm = this.formBuilder.group({
      FullName: ["", []],
      FieldBusinessId: ["", []],
    });
  }
  onClose() {
    this.dialogRef.close();
  }

  getMemberClientTradeSearch(): SearchCriteria {
    const formModel = this.searchForm.getRawValue();
    const params = new SearchCriteria();
    params.FullName = formModel.FullName ? formModel.FullName : "";
    params.FieldBusinessId = formModel.FieldBusinessId
      ? formModel.FieldBusinessId
      : 0;

    return params;
  }

  onSelect(value: any) {
    this.dialogRef.close(value);
  }

  private getClientInformatin(customerId: string) {
    this.registerTradeService
      .getClientInformationList(customerId, this.currentLang)
      .subscribe((result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  getBusinessType(lang: string) {
    this.lookupService
      .getLookup(lang, LookupType.BUSINESS_TYPE)
      .subscribe((res) => {
        this.businessTypes = res;
      });
  }

  onSubmit() {
    this.registerTradeService
      .searchClientFullNameInformation(
        this.getMemberClientTradeSearch(),
        this.data.ExchangeActorId
      )
      .subscribe((res) => {
        this.clientFullNameList = res;
        if (!this.clientFullNameList) {
          this.toastr.error("No record were found to list", "Error", {
            closeButton: true,
          });
        } else {
          this.dataSource = new MatTableDataSource(this.clientFullNameList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  clearForm() {
    this.searchForm.reset();
  }

  getDescriptionBusinessSector(Status: any) {
    const clientStatus = this.businessTypes.find(
      (status) => status.Id === Status
    );
    return clientStatus ? clientStatus.Description : "";
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
}
