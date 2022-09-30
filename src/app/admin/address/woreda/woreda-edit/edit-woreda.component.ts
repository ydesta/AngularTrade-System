import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { WoredaModel } from "../../models/woreda.model";
import { determineId } from "src/@custor/helpers/compare";
import { Subscription } from "rxjs";
import { WoredaService } from "../../services/woreda.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { RegionService } from '../../services/region.service';
import { ZoneService } from '../../services/zone.service';
import { ConfigurationService } from 'src/@custor/services/configuration.service';
import { StaticData } from 'src/app/common/models/static-data.model';
import { ET_ALPHABET_REGEX, ALPHABET_WITHNUMERIC_REGEX } from 'src/app/common/constants/consts';

@Component({
  selector: "app-edit-woreda",
  templateUrl: "./edit-woreda.component.html",
  styleUrls: ["./edit-woreda.component.scss"],
})
export class EditWoredaComponent implements OnInit {
  woredaForm: FormGroup;

  woredaSub: Subscription;
  title: string;
  isNew = false;
  woreda: WoredaModel;
  regions: StaticData[] = [];
  zones: StaticData[] = [];

  loadingIndicator: boolean;
  currentLang: string;

  constructor(
    private woredaService: WoredaService,
    private regionService: RegionService,
    private zoneService: ZoneService,
    public dialogRef: MatDialogRef<EditWoredaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private config: ConfigurationService
  ) {
    this.initModels();
    this.currentLang = this.config.language;
  }
  initModels() {
    this.woreda = <WoredaModel>{};
  }
  ngOnInit() {
    this.initForm();
    this.getRegionList();
    if (!this.data.isNew) {
      this.isNew = false;
      this.getWoreda(this.data.woredaId);
    } else {
      this.isNew = true;
    }
    if (this.data.regionId > 0) {
      setTimeout(() => {
        this.woredaForm.controls["cRegion"].setValue(
          this.data.regionId.toString()
        );
        this.getZoneList(this.data.regionId);
        this.woredaForm.controls["cZone"].setValue(this.data.zoneId.toString());
      }, 500);
    }
  }
  getRegionList() {
    this.regionService.getNonCacheRegion(this.currentLang).subscribe((result) => {
      this.regions = result;
    });
  }
  getZoneList(regionId: number) {
    this.zoneService.GetZonesByParentIdAndLang(regionId, this.currentLang).subscribe((result) => {
      this.zones = result;
    });
  }
  filterRegion(regionId: number) {
    if (!regionId) {
      return;
    }
    setTimeout(() => {
      this.getZoneList(regionId);
    }, 500);
  }
  getWoreda(id: number) {
    this.isNew = false;
    this.loadingIndicator = true;
    this.woredaSub = this.woredaService
      .getWoreda(id)
      .subscribe((result) => {
        this.woreda = result;
        this.updateForm();
      });
    this.loadingIndicator = false;
  }

  updateForm() {
    this.woredaForm.setValue({
      cDescription:
        this.woreda.DescriptionAmh == null
          ? ""
          : this.woreda.DescriptionAmh.toString(),
      cDescriptionEnglish:
        this.woreda.DescriptionEng == null
          ? ""
          : this.woreda.DescriptionEng.toString(),
      cRegion: "",
      cZone: "",
    });
    this.isNew = false;
  }

  initForm() {
    this.woredaForm = this.fb.group({
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
      cZone: ["", Validators.required],
    });
  }

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  saveRecord() {
    if (!this.woredaForm.valid) {
      return;
    }
    if (!this.isNew) {
      this.woredaService
        .updateWoreda(this.getEditedWoreda())
        .subscribe((res) => {
          this.dialogRef.close(res);
        });
    } else {
      this.woredaService.addWoreda(this.getEditedWoreda()).subscribe((res) => {
        this.dialogRef.close(res);
      });
    }
  }

  private getEditedWoreda(): WoredaModel {
    const formModel = this.woredaForm.value;
    return {
      ZoneId: formModel.cZone.toString(),
      WoredaId: this.isNew ? 0 : this.woreda.WoredaId,
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
    return this.woredaForm.get("cDescription");
  }

  get DescriptionEnglish() {
    return this.woredaForm.get("cDescriptionEnglish");
  }
  get Region() {
    return this.woredaForm.get("cRegion");
  }
  get Zone() {
    return this.woredaForm.get("cZone");
  }
}
