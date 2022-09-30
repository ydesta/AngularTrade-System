export class KebeleModel {
  public WoredaId?: number;
  public KebeleId?: number;
  public DescriptionAmh: string;
  public DescriptionEng: string;
  public IsDeleted: boolean;
  public IsActive: boolean;

  constructor(
    WoredaId?: number,
    KebeleId?: number,
    DescriptionAmh?: string,
    DescriptionEng?: string,
    IsActive?: boolean,
    IsDeleted?: boolean
  ) {
    this.WoredaId = WoredaId;
    this.KebeleId = KebeleId;
    this.DescriptionAmh = DescriptionAmh;
    this.DescriptionAmh = DescriptionEng;
    this.IsActive = IsActive;
    this.IsDeleted = IsDeleted;
  }
}
