export class ZoneModel {
  public ZoneId?: number;
  public RegionId?: number;
  public DescriptionAmh: string;
  public DescriptionEng: string;
  public IsDeleted: boolean;
  public IsActive: boolean;

  constructor(
    ZoneId?: number,
    RegionId?: number,
    DescriptionAmh?: string,
    DescriptionEng?: string,
    IsActive?: boolean,
    IsDeleted?: boolean
  ) {
    this.ZoneId = ZoneId;
    this.RegionId = RegionId;
    this.DescriptionAmh = DescriptionAmh;
    this.DescriptionAmh = DescriptionEng;
    this.IsActive = IsActive;
    this.IsDeleted = IsDeleted;
  }
}
