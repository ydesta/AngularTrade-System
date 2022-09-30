export class MemberClientRegiistrationModel {
  MemberClientInformationId: number;
  BusinessSector: string;
  AgreementDate: Date;
  Gender: number;
  RegionId: number;
  ZoneId: number;
  WeredaId: number;
  KebeleId: number;
  HouseNo: string;
  RegularPhone: string;
  MobilePhone: string;
  TradeService: string;
  CommidityTypeId: number;
  CommodityId: number;
  TradeTypeId: number;
  BusinessFiledId: number;
  // MemberClientTradeId: number;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedUserId: string;
  UpdatedUserId: string;
  CreatedDateTime: Date;
  UpdatedDateTime: Date;
  // regionName?: any
  Status: number;

  // commudityTypeName?: any;
  // zoneName?: any;
  // weredaName?: any;
  // kebeleName?: any;
  // genderName?: any;
  FirstNameAmh: string;
  FirstNameEng: string;
  FatherNameAmh: string;
  FatherNameEng: string;
  GrandFatherNameEng: string;
  GrandFatherNameAmh: string;
  ExchangeActorId: string;

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
