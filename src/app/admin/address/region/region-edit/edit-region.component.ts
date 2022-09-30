import { Component, OnDestroy, OnInit, ViewChild, Inject } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { RegionModel } from "../../models/region.model";
import { determineId } from "src/@custor/helpers/compare";
import { Subscription } from "rxjs";
import { RegionService } from "../../services/region.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-edit-region",
  templateUrl: "./edit-region.component.html",
  styleUrls: ["./edit-region.component.scss"],
})
export class EditRegionComponent implements OnInit, OnDestroy {
  @ViewChild("form", { static: false })
  regionSub: Subscription;
  private form: NgForm;
  title: string;
  isNew = false;
  region: RegionModel;
  regionForm: FormGroup;
  loadingIndicator: boolean;
  regionId: number=0;

  constructor(
    private toaster: ToastrService,
    private regionService: RegionService,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<EditRegionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.region = <RegionModel>{};
    console.info(this.data);

    // initialize the form
    this.initForm();
  }

  ngOnInit() {
    this.region = new RegionModel();
    if (!this.data.isNew) {
      this.isNew = false;
      this.getRegion(this.data.regionId);
    } else {
      this.isNew = true;
    }
  }

  getRegion(id: number) {
    this.isNew = false;
    this.loadingIndicator = true;
    this.regionSub = this.regionService.getRegion(id).subscribe((result) => {
      this.region = result;
      this.updateForm();
    });
    this.loadingIndicator = false;
  }

  updateForm() {
    this.regionForm.setValue({
      cDescription:
        this.region.DescriptionAmh == null
          ? ""
          : this.region.DescriptionAmh.toString(),
      cDescriptionEnglish:
        this.region.DescriptionEng == null
          ? ""
          : this.region.DescriptionEng.toString(),
    });
    // },4000);

    this.isNew = false;
  }

  initForm() {
    this.regionForm = this.fb.group({
      cDescription: [
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(150),
          Validators.pattern("^([ \u1200-\u137F])+$"),
        ]),
      ],
      cDescriptionEnglish: [
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(200),
          Validators.pattern("^[a-zA-Z /,]+$"),
        ]),
      ],
    });
  }

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  saveRecord() {
    // const postData = this.getEditedRegion();
    //   var pos=this.data.find(p => p.DescriptionEng === postData.DescriptionEng);

    // if(pos!=null&&this.regionId === 0){
    //   this.toaster.success(this.translate.instant('common.messages.DuplicateDataError'), '', {
    //     closeButton: true
    //   })
    // }
    if (!this.isNew) {
      this.regionService
        .updateRegion(this.getEditedRegion())
        .subscribe((res) => {
          this.dialogRef.close(res);
        });
    } else {
      this.regionService.addRegion(this.getEditedRegion()).subscribe((res) => {
        this.dialogRef.close(res);
      });
    }
  }

  private getEditedRegion(): RegionModel {
    const formModel = this.regionForm.value;
    return {
      RegionId: this.isNew ? 0 : this.region.RegionId,
      DescriptionAmh: formModel.cDescription,
      DescriptionEng: formModel.cDescriptionEnglish,
      isActive: true,
      isDeleted: false,
    };
  }

  ngOnDestroy() {
    // this.regionSub.unsubscribe();
  }

  onBack() {
    window.history.back();
  }

  get Description() {
    return this.regionForm.get("cDescription");
  }

  get DescriptionEnglish() {
    return this.regionForm.get("cDescriptionEnglish");
  }
}
