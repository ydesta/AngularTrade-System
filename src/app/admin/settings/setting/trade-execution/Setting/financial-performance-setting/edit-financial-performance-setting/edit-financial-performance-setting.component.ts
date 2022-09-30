import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ToastrService } from "ngx-toastr";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { TranslateService } from "@ngx-translate/core";
import { locale as langEnglish } from "../../../../../../lang/en";
import { locale as langEthiopic } from "../../../../../../lang/et";
import { determineId } from "src/@custor/helpers/compare";
import { MatTableDataSource } from "@angular/material/table";
import { AccountService } from "src/@custor/services/security/account.service";
import { Permission } from "src/@custor/models/permission.model";
import {
  FinancialPerformance,
  FinancialPerformanceCustomerType,
} from "../../../../shared/models/setting-model";
import { StaticData } from "src/app/common/models/static-data.model";
import { LookUpService } from "src/app/common/services/look-up.service";
import { LookupType } from "src/app/common/enums/common";
import { TradeExecutionSettingService } from "../../../../shared/services/trade-execution-setting.service";

@Component({
  selector: "app-edit-financial-performance-setting",
  templateUrl: "./edit-financial-performance-setting.component.html",
  styleUrls: ["./edit-financial-performance-setting.component.scss"],
})
export class EditFinancialPerformanceSettingComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  dataSource: any;
  formFinancialPerformance: FormGroup;
  currentLang = "";
  financialPerformanceId = 0;
  expandClose: boolean;
  oldData: any;
  isNews: boolean;
  financialPerformanceCustomerType: FinancialPerformanceCustomerType[] = [
    {
      DecisionNameEng: "Nonmember",
      DecisionNameAmh: "አባል ያልሆኑ ቀጥታ ተገበያይ",
      Id: 90,
    },
    { DecisionNameEng: "Trader", DecisionNameAmh: "ተገበያይ", Id: 88 },
    { DecisionNameEng: "Intermediary", DecisionNameAmh: "አገናኝ", Id: 72 },
  ];
  public customerTypes: StaticData[] = [];
  displayedColumns = ["sn", "CustomerTypeId", "Amount", "Action"];
  criteriasModelReportList: any;

  constructor(
    private accountService: AccountService,
    private registerService: TradeExecutionSettingService,
    private toaster: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private configService: ConfigurationService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditFinancialPerformanceSettingComponent>,
    private lookUpService: LookUpService,
    private translationLoaderService: TranslationLoaderService,
    private translate: TranslateService
  ) {
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.createFinancialPerformance();
    this.expandClose = false;
    this.oldData = this.getListOfFinanicialPerformance();
  }

  ngOnInit() {
    if (!this.data.isNew) {
      this.financialPerformanceId = this.data.financialPerformanceId;
      this.editFinancialPerformance(this.financialPerformanceId);
    }
  }

  private createFinancialPerformance() {
    this.formFinancialPerformance = this.formBuilder.group({
      CustomerTypeId: ["", Validators.compose([Validators.required])],
      Amount: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern("^[0-9]+(.[0-9]{0,2})?$"),
        ],
      ],
    });
  }

  get CustomerTypeId() {
    return this.formFinancialPerformance.get("CustomerTypeId");
  }

  get Amount() {
    return this.formFinancialPerformance.get("Amount");
  }
  get canManageSetting() {
    return this.accountService.userHasPermission(
      Permission.manageSettingsPermission
    );
  }
  get canViewSetting() {
    return this.accountService.userHasPermission(
      Permission.viewSettingPermission
    );
  }
  getCustomerType(lang: string) {
    this.lookUpService
      .getLookup(lang, LookupType.MEMBER_CATEGORY)
      .subscribe((res) => {
        this.customerTypes = res;
      });
  }

  private getEnteryFinancialPerformance(): FinancialPerformance {
    const formModel = this.formFinancialPerformance.getRawValue();
    const financialPerformance = new FinancialPerformance();
    financialPerformance.ExchangeActorFinanicialId =
      this.financialPerformanceId;
    financialPerformance.CustomerTypeId = formModel.CustomerTypeId;
    financialPerformance.Amount = formModel.Amount;
    return financialPerformance;
  }

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  cancelEditOperation() {
    this.resetEdit();
    this.clearForm();
    this.expandClose = false;
  }
  private resetEdit() {
    this.financialPerformanceId = 0;
  }
  onSubmit() {
    const postData = this.getEnteryFinancialPerformance();
    var pos = this.criteriasModelReportList.find(
      (p) => p.ExchangeActorFinanicialId === postData.ExchangeActorFinanicialId
    );
    if (pos != null && this.financialPerformanceId === 0) {
      this.toaster.success(
        this.translate.instant("common.messages.DuplicateDataError"),
        "",
        {
          closeButton: true,
        }
      );
    } else if (this.financialPerformanceId === 0) {
      this.registerService
        .saveFinancialPerformance(postData)
        .subscribe((result) => {
          this.toaster.success(
            this.translate.instant("common.messages.Saved"),
            "",
            {
              closeButton: true,
            }
          );
          this.dialogRef.close(result);
          this.getListOfFinanicialPerformance();
          this.clearForm();
          this.expandClose = false;
        });
    } else {
      postData.ExchangeActorFinanicialId = this.financialPerformanceId;
      this.registerService
        .updateFinanicialPerformance(postData)
        .subscribe((result) => {
          this.toaster.success(
            this.translate.instant("common.messages.UpdateSuccess"),
            "",
            {
              closeButton: true,
            }
          );
          this.dialogRef.close(result);

          this.getListOfFinanicialPerformance();
          this.clearForm();
        });
      this.expandClose = false;
    }
  }

  public clearForm() {
    this.createFinancialPerformance();
  }

  public getListOfFinanicialPerformance() {
    this.registerService.getFinancialPerformanceList().subscribe((result) => {
      this.criteriasModelReportList = result;
      // @ts-ignore
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  editFinancialPerformance(financialPerformance: number) {
    this.registerService
      .getFinancialPerformanceById(financialPerformance)
      .subscribe((result) => {
        this.formFinancialPerformance.patchValue(result);
      });
    this.expandClose = true;
  }

  getDescriptionCustomerType(Status: any) {
    const clientStatus = this.financialPerformanceCustomerType.find(
      (status) => status.Id === Status
    );
    return this.currentLang == "et"
      ? clientStatus.DecisionNameAmh
      : clientStatus.DecisionNameEng;
  }

  get IsEdit(): any {
    return this.data.isNew ? (this.isNews = true) : (this.isNews = false);
  }
}
