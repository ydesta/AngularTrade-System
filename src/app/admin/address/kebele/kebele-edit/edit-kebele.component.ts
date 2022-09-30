import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { KebeleModel } from "../../models/kebele.model";
import { determineId } from "src/@custor/helpers/compare";
import { Subscription } from "rxjs";
import { KebeleService } from "../../services/kebele.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { RegionService } from "../../services/region.service";
import { ZoneService } from "../../services/zone.service";
import { ConfigurationService } from 'src/@custor/services/configuration.service';
import { StaticData } from 'src/app/common/models/static-data.model';
import { WoredaService } from '../../services/woreda.service';
import { ET_ALPHABET_REGEX, ALPHABET_WITHNUMERIC_REGEX } from 'src/app/common/constants/consts';

@Component({
  selector: "app-edit-kebele",
  templateUrl: "./edit-kebele.component.html",
  styleUrls: ["./edit-kebele.component.scss"],
})
export class EditKebeleComponent implements OnInit {
  kebeleForm: FormGroup;

  kebeleSub: Subscription;
  title: string;
  isNew = false;
  kebele: KebeleModel;
  regions: StaticData[] = [];
  zones: StaticData[] = [];
  woredas: StaticData[] = [];

  loadingIndicator: boolean;
  currentLang: string;

  constructor(
    private kebeleService: KebeleService,
    private regionService: RegionService,
    private zoneService: ZoneService,
    public dialogRef: MatDialogRef<EditKebeleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private config: ConfigurationService,
    private woredaService: WoredaService
  ) {
    this.initModels();
    this.currentLang = this.config.language;
  }
  initModels() {
    this.kebele = <KebeleModel>{};
  }
  ngOnInit() {
    this.initForm();
    this.getRegionList();
    if (!this.data.isNew) {
      this.isNew = false;
      this.getKebele(this.data.kebeleId);
    } else {
      this.isNew = true;
    }
    if (this.data.regionId > 0) {
      setTimeout(() => {
        this.kebeleForm.controls["cRegion"].setValue(
          this.data.regionId.toString()
        );
        this.getZoneList(this.data.regionId);
        this.kebeleForm.controls["cZone"].setValue(this.data.zoneId.toString());
      }, 500);
    }

    if(this.data.zoneId > 0){
      setTimeout(() => {
        this.getWoredaList(this.data.zoneId);
        this.kebeleForm.controls["cWoreda"].setValue(
          this.data.woredaId.toString()
        );
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

  getWoredaList(zoneId: number){
    this.woredaService.GetWoredasByParentIdAndLang(zoneId, this.currentLang).subscribe(res => {
      this.woredas = res;
    })
  }
  filterRegion(regionId: number) {
    if (!regionId) {
      this.zones = null;
      return;
    }
    setTimeout(() => {
      this.woredas = null;
      this.getZoneList(regionId);
    }, 500);
  }

  filterZone(zoneId: number){
    if(!zoneId){
      this.woredas = null;
      return;
    }

    setTimeout(() => {
      this.getWoredaList(zoneId);
    }, 500);
  }
  getKebele(id: number) {
    this.isNew = false;
    this.loadingIndicator = true;
    this.kebeleSub = this.kebeleService
      .getKebele(id)
      .subscribe((result) => {
        this.kebele = result;
        this.updateForm();
      });
    this.loadingIndicator = false;
  }

  updateForm() {
    this.kebeleForm.setValue({
      cDescription:
        this.kebele.DescriptionAmh == null
          ? ""
          : this.kebele.DescriptionAmh.toString(),
      cDescriptionEnglish:
        this.kebele.DescriptionEng == null
          ? ""
          : this.kebele.DescriptionEng.toString(),
      cRegion: "",
      cZone: "",
      cWoreda: "",
    });
    this.isNew = false;
  }

  initForm() {
    this.kebeleForm = this.fb.group({
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
      cWoreda: ["", Validators.required],
    });
  }

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  saveRecord() {
    if (!this.kebeleForm.valid) {
      return;
    }
    
    if (!this.isNew) {
      this.kebeleService
        .updateKebele(this.getEditedKebele())
        .subscribe((res) => {
          this.dialogRef.close(res);
        });
    } else {
      this.kebeleService.addKebele(this.getEditedKebele()).subscribe((res) => {
        this.dialogRef.close(res);
      });
    }
  }

  private getEditedKebele(): KebeleModel {
    const formModel = this.kebeleForm.value;
    return {
      WoredaId: formModel.cWoreda.toString(),
      KebeleId: this.isNew ? 0 : this.kebele.KebeleId,
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
    return this.kebeleForm.get("cDescription");
  }

  get DescriptionEnglish() {
    return this.kebeleForm.get("cDescriptionEnglish");
  }
  get Region() {
    return this.kebeleForm.get("cRegion");
  }
  get Zone() {
    return this.kebeleForm.get("cZone");
  }
  get Woreda() {
    return this.kebeleForm.get("cWoreda");
  }
}
