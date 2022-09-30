import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { ZoneModel } from "../../models/zone.model";
import { determineId } from "src/@custor/helpers/compare";
import { Subscription } from "rxjs";
import { ZoneService } from "../../services/zone.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { RegionService } from "../../services/region.service";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { StaticData } from "src/app/common/models/static-data.model";
import { ET_ALPHABET_REGEX, ALPHABET_WITHNUMERIC_REGEX } from 'src/app/common/constants/consts';
// import { RegionService } from 'app/address/services/region.service';
// import { RegionModel } from 'app/address/models/region.model';

@Component({
  selector: "app-edit-zone",
  templateUrl: "./edit-zone.component.html",
  styleUrls: ["./edit-zone.component.scss"],
})
export class EditZoneComponent implements OnInit {
  @ViewChild("form", { static: false })
  zoneSub: Subscription;
  title: string;
  isNew = false;
  zone: ZoneModel;
  regions: StaticData[] = [];
  zoneForm: FormGroup;
  loadingIndicator: boolean;
  currentLang: string;

  constructor(
    private zoneService: ZoneService,
    private regionService: RegionService,
    public dialogRef: MatDialogRef<EditZoneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private config: ConfigurationService
  ) {
    this.initModels();
    this.currentLang = this.config.language;
  }
  initModels() {
    this.zone = <ZoneModel>{};
  }
  ngOnInit() {
    this.initForm();
    this.getRegionList();
    if (!this.data.isNew) {
      this.isNew = false;
      this.getZone(this.data.zoneId);
    } else {
      this.isNew = true;
    }
    if (this.data.parentId > 0) {
      this.zoneForm.controls["cRegion"].setValue(this.data.parentId.toString());
    }
  }
  getRegionList() {
    this.regionService.getNonCacheRegion(this.currentLang).subscribe((result) => {
      this.regions = result;
    });
  }
  getZone(id: number) {
    this.isNew = false;
    this.loadingIndicator = true;
    this.zoneSub = this.zoneService.getZone(id).subscribe((result) => {
      this.zone = result;
      this.updateForm();
    });
    this.loadingIndicator = false;
  }

  updateForm() {
    this.zoneForm.setValue({
      cDescription:
        this.zone.DescriptionAmh == null
          ? ""
          : this.zone.DescriptionAmh.toString(),
      cDescriptionEnglish:
        this.zone.DescriptionEng == null
          ? ""
          : this.zone.DescriptionEng.toString(),
      cRegion: this.zone.RegionId.toString(),
    });
    this.isNew = false;
  }

  initForm() {
    this.zoneForm = this.fb.group({
      cDescription: [
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(150),
          Validators.pattern(ET_ALPHABET_REGEX),
        ]),
      ],
      cDescriptionEnglish: [
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(200),
          Validators.pattern(ALPHABET_WITHNUMERIC_REGEX),
        ]),
      ],
      cRegion: ["", Validators.required],
    });
  }

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  saveRecord() {
    if (!this.zoneForm.valid) {
      return;
    }
    if (!this.isNew) {
      this.zoneService.updateZone(this.getEditedZone()).subscribe((res) => {
        this.dialogRef.close(res);
      });
    } else {
      this.zoneService.addZone(this.getEditedZone()).subscribe((res) => {
        this.dialogRef.close(res);
      });
    }
  }

  private getEditedZone(): ZoneModel {
    const formModel = this.zoneForm.value;
    return {
      RegionId: formModel.cRegion.toString(),
      ZoneId: this.isNew ? 0 : this.zone.ZoneId,
      DescriptionAmh: formModel.cDescription,
      DescriptionEng: formModel.cDescriptionEnglish,
      IsActive: true,
      IsDeleted: false,
    };
  }

  onBack() {
    window.history.back();
  }

  get Description() {
    return this.zoneForm.get("cDescription");
  }

  get DescriptionEnglish() {
    return this.zoneForm.get("cDescriptionEnglish");
  }
  get Region() {
    return this.zoneForm.get("cRegion");
  }
}
