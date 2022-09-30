import { ClientProduct, CommodityName } from "./ClientProduct";

export class MemberClientRegiistrationModel {
  MemberClientInformationId: number;
  BusinessSector: string;
  AgreementDate: Date;
  Gender: number;
  RegionId: number;
  ZoneId: number;
  WoredaId: number;
  KebeleId: number;
  HouseNo: string;
  RegularPhone: string;
  MobilePhone: string;
  TradeService: string;
  //CommidityTypeId: number;
  // CommodityId: number;
  TradeTypeId: number;
  BusinessFiledId: number;
  MemberClientTradeId: number;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedUserId: string;
  UpdatedUserId: string;
  CreatedDateTime: Date;
  UpdatedDateTime: Date;
  Status: number;
  FirstNameAmh: string;
  FirstNameEng: string;
  FatherNameAmh: string;
  FatherNameEng: string;
  GrandFatherNameEng: string;
  GrandFatherNameAmh: string;
  ExchangeActorId: string;
  ClientProduct?: ClientProduct[];
  ClientTypeId: number;
  OrganizationNameAmh: string;
  OrganizationNameEng: string;
  EcxClientCode: string;
}

export class SearchClientInformation {
  MemberClientInformationId: number;
  FullName: string;
  BusinessSector: number;
  AgreementDate: Date;
  DateAgreement: string;
  MobilePhone: string;
  RegularPhone: string;
  CommodityName: string;
  Description: string;
  Id: number;
}
export class MemberClientInformationView {
  FullName: string;
  BusinessFiledId: number;
  DateAgreement: string;
  MobilePhone: string;
  TradeTypeId: number;
  CommodityName: Array<CommodityName>;
  Status: number;
}

export class commodity {
  // CommodityId: number;
  CommodityName: string;
}

export class xxx {
  MemberClientTradeId: number;
  public MemberClientInformationId: number;
  public FullName: string;
  public BusinessSector: number;
  public DateAgreement: string;
  public AgreementDate: string;
  public RegularPhone: string;
  public MobilePhone: string;
  public TradeTypeId: number;
  public CommidityTypeId: number;
  //public string CommodityName: string;
  public BusinessFiledId;
  public Gender: number;
  public RegionId: number;
  public ZoneId: number;
  public WoredaId: number;
  public KebeleId: number;
  public HouseNo: string;
  public Status: number;
  // public CommodityId: number;
  public CustomerFullName: string;
  public OrganizationName: string;
  public CustomerType: string;
  public FirstNameAmh: string;
  public FirstNameEng: string;
  public FatherNameAmh: string;
  public FatherNameEng: string;
  public GrandFatherNameEng: string;
  public GrandFatherNameAmh: string;
  public ExchangeActorId: string;
  public CommodityName: Array<commodity>;
}
export class ClientInformationHistory {
  public ClientInformationHistoryId: number;
  public AgreementDate: Date;
  public Gender: number;
  public RegionId: number;
  public ZoneId: number;
  public WoredaId: number;
  public KebeleId: number;
  public HouseNo: string;
  public RegularPhone: string;
  public MobilePhone: string;
  public Year: number;
  public ReportTypeId: number;
  public ReportDate: Date;
  public ReportPeriodId: number;
  public ExchangeActorId: string;
  public Status: number;
  public TradeTypeId: number;
  public FirstNameAmh: string;
  public FirstNameEng: string;
  public FatherNameAmh: string;
  public FatherNameEng: string;
  public GrandFatherNameEng: string;
  public GrandFatherNameAmh: string;
  public OrganizationNameAmh: string;
  public OrganizationNameEng: string;
  public EcxClientCode: string;
  public ClientTypeId: number;
  public BusinessFiledId: number;
  public ToWhomExchangeActorId: string;
}
