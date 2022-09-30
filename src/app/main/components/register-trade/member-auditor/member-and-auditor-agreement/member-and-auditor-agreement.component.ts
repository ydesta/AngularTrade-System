import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { AuthService } from "src/@custor/services/security/auth.service";
import { TranslationLoaderService } from "src/@custor/services/translation-loader.service";
import { StaticData5 } from "src/app/common/models/static-data.model";
import { locale as langEnglish } from "../../lang/en";
import { locale as langEthiopic } from "../../lang/et";
import { DataSharingService } from "../../shared/services/dataSharingService";
import { RegisterTradeService } from "../../shared/services/register-trade.service";
import { MemberAuditor } from "../_interface/memberauditor.model";
@Component({
  selector: "app-member-and-auditor-agreement",
  templateUrl: "./member-and-auditor-agreement.component.html",
  styleUrls: ["./member-and-auditor-agreement.component.scss"],
})
export class MemberAndAuditorAgreementComponent implements OnInit {
  public agreementForm: FormGroup;
  currentLang = "";
  agreementId = 0;
  selectExchangeActorId = this.authService.currentUser.ExchangeActorId;
  customerTypeId = this.authService.currentUser.CustomerTypeId;
  listOfExchangeActor: StaticData5[] = [];
  exchangeActorListOptions: Observable<StaticData5[]>;
  exchangeActorId: string;
  editMemberAuditor: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private dialog: MatDialog,
    private configService: ConfigurationService,
    private authService: AuthService,
    private registerService: RegisterTradeService,
    private translationLoaderService: TranslationLoaderService,
    private dataSharingService: DataSharingService,
    private ngxUiService: NgxUiLoaderService,
    private translate: TranslateService
  ) {
    this.editMemberAuditor = this.data.isUpdate;
    this.currentLang = configService.language;
    this.translationLoaderService.loadTranslations(langEnglish, langEthiopic);
    this.memberAuditorAgreementForm();
  }

  ngOnInit() {
    this.agreementId = this.data.id;
    if (this.data.isUpdate === false) {
      this.memberAuditorAgreementForm();
      this.agreementId = 0;
    } else {
      this.getMemberAuditorById(this.data.id);
      this.agreementId = this.data.id;
    }
    this.getListOfMemberAuditorList(this.customerTypeId, this.currentLang);
  }
  private memberAuditorAgreementForm() {
    this.agreementForm = this.fb.group({
      EcxCode: [
        "",
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
      FromDate: ["", Validators.compose([Validators.required])],
      ToDate: ["", Validators.compose([Validators.required])],
    });
  }
  get EcxCode() {
    return this.agreementForm.get("EcxCode");
  }
  get FromDate() {
    return this.agreementForm.get("FromDate");
  }
  get ToDate() {
    return this.agreementForm.get("ToDate");
  }
  private getEditAgreement(): MemberAuditor {
    const formData = this.agreementForm.getRawValue();
    const memberAuditor = new MemberAuditor();
    memberAuditor.id = this.agreementId;
    memberAuditor.FromDate = formData.FromDate;
    memberAuditor.ToDate = formData.ToDate;
    if (this.editMemberAuditor == false) {
      memberAuditor.EcxCode = this.exchangeActorId;
    } else {
      memberAuditor.EcxCode = formData.EcxCode;
    }
    memberAuditor.ExchangeActorId = this.selectExchangeActorId;
    memberAuditor.Status = 0;
    memberAuditor.AgreementStatus = 1;
    memberAuditor.PreparedBy = this.authService.currentUser.FullName;
    memberAuditor.ReportDate = new Date();
    return memberAuditor;
  }
  onSubmit() {
    const postData = this.getEditAgreement();
    if (this.agreementId === 0) {
      this.ngxUiService.start();
      this.registerService
        .saveMemberAuditorAgreement(this.getEditAgreement())
        .subscribe((res) => {
          if (res) {
            this.toastr.success(
              this.translate.instant("common.messages.Saved"),
              "",
              {
                closeButton: true,
              }
            );
            this.ngxUiService.stop();
            this.dataSharingService.valueAdd.next(res);
            this.clearForm();
          } else {
            this.ngxUiService.stop();
            this.toastr.warning(
              this.translate.instant("common.messages.DuplicateDataError"),
              "",
              {
                closeButton: true,
              }
            );
          }
        });
      this.dialogRef.close();
    } else {
      postData.id = this.agreementId;
      this.ngxUiService.start();
      this.registerService
        .updateMemberAuditorAgreement(postData)
        .subscribe((res) => {
          this.toastr.success(
            this.translate.instant("common.messages.UpdateSuccess"),
            "",
            {
              closeButton: true,
            }
          );
          this.ngxUiService.stop();
          this.dataSharingService.valueAdd.next(res);
          this.clearForm();
        });
      this.dialogRef.close();
    }
  }
  public clearForm() {
    this.agreementForm.reset();
  }
  getMemberAuditorById(id: number) {
    this.registerService.getMemberAuditorById(id).subscribe((res) => {
      if (res) {
        this.agreementForm.patchValue(res);
      }
    });
  }
  onClose() {
    this.dialogRef.close();
  }
  getListOfMemberAuditorList(customerTypeId: number, lang: string) {
    this.registerService
      .getListOfMemberAuditorList(customerTypeId, lang)
      .subscribe((result) => {
        this.listOfExchangeActor = result;
        this.exchangeActorListOptions = this.EcxCode.valueChanges.pipe(
          startWith(""),
          map((value) => (typeof value === "string" ? value : value.Id)),
          map((Id) =>
            Id
              ? this._filterExchangeActor(Id)
              : this.listOfExchangeActor.slice()
          )
        );
      });
  }
  private _filterExchangeActor(exchangeActor: string): StaticData5[] {
    this.exchangeActorId = exchangeActor;
    const filterValue = exchangeActor.toLocaleLowerCase();
    return this.listOfExchangeActor.filter(
      (option) =>
        option.Description.toLocaleLowerCase().indexOf(filterValue) === 0
    );
  }
  displayExchangeActor(actor: StaticData5): string {
    if (actor) {
      this.exchangeActorId = actor.Id ? actor.Id : "";
      return actor && actor.Description ? actor.Description : "";
    }
  }
}
