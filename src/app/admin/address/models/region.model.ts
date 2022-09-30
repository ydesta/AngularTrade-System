export class RegionModel {
  public RegionId?: number;
  public DescriptionAmh: string;
  public DescriptionEng: string;
  public isDeleted: boolean;
  public isActive: boolean;

  constructor(
    RegionId?: number,
    DescriptionAmh?: string,
    DescriptionEng?: string,
    isActive?: boolean,
    isDeleted?: boolean
  ) {
    this.RegionId = RegionId;
    this.DescriptionAmh = DescriptionAmh;
    this.DescriptionAmh = DescriptionEng;
    this.isActive = isActive;
    this.isDeleted = isDeleted;
  }
}
