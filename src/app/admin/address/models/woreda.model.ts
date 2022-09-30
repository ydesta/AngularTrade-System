export class WoredaModel {
  public WoredaId?: number;
  public ZoneId?: number;
  public DescriptionAmh: string;
  public DescriptionEng: string;
  public IsDeleted: boolean;
  public IsActive: boolean;

  constructor(
    woredaId?: number,
    zoneId?: number,
    DescriptionAmh?: string,
    DescriptionEng?: string,
    IsActive?: boolean,
    IsDeleted?: boolean
  ) {
    this.WoredaId = woredaId;
    this.ZoneId = zoneId;
    this.DescriptionAmh = DescriptionAmh;
    this.DescriptionAmh = DescriptionEng;
    this.IsActive = IsActive;
    this.IsDeleted = IsDeleted;
  }
}
