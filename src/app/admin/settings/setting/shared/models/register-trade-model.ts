import {WorkFlowModel} from "src/app/common/models/workFlow";
export class RegisterTradeModel {
  public MemberClientTradeId: number;
  public ReportTypeId: number;
  public ExchangeActorId: string;
  public Remark: string;
  public TradeExcutionNotAccomplish: number;
  public IsTradeExcutionAccomplished: number;
  public ReportDate: Date;
  public ReportPeriodId: number;
  public Year: number;
  public TradeExcutionStatusTypeId: number;
  public IsActive: boolean;
  public IsDeleted: boolean;
  public CreatedUserId: string;
  public UpdatedUserId: string;
  public CreatedDateTime: Date;
  public UpdatedDateTime: Date;
  ExchangeActor?: ExchangeActorModel;
  WorkFlowStatus: number;
}

export class MemberClientTrade {
  public MemberClientTradeId: number;
  public ExchangeActorId: string;
  public ReportTypeId: number;
  public Remark: string;
  public TradeExcutionNotAccomplish: number;
  public IsTradeExcutionAccomplished: number;
  public ReportDate: Date;
  public ReportPeriodId: number;
  public Year: number;
  public TradeExcutionStatusTypeId: number;
  public IsActive: boolean;
  public IsDeleted: boolean;
  public CreatedUserId: string;
  public UpdatedUserId: string;
  public CreatedDateTime: Date;
  public UpdatedDateTime: Date;
  MemberClientTradeDetail: RegisterTradeDetailModel[];
  MemberTradeFinancial: MemberTradeFinancialModel[];
  WorkFlowStatus: number;

}

export class RegisterTradeDetailModel {
  MemberClientTradeDetailId: number;
  MemberClientInformationId: number;

  MemberClientTradeId: number;
  CommodityId: number;
  CommudityTypeId: number;
  CommodityGradeId: number;
  TradeTypeId: number;
  MemberTradeRemark: string;
  TradeDate: Date;
  Quantity: number;
  UnitPrice: number;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedUserId: string;
  UpdatedUserId: string;
  CreatedDateTime: Date;
  UpdatedDateTime: Date;

  OrderPrice: number;
  CommissionInPrice: number;
  OwnerManagerId: number;
  UnitMeasurementId: number;
  Warehouse: string;
  ClientTradeRemark: string;
  TradeExcutionReport: number;
  TradeService: string;
}


export class MemberTradeFinancialModel {
  MemberTradeFinancialId: number;
  MemberClientTradeId: number;
  DepositsMoney: number;
  CollectedPayment: number;
  Stock: number;
  AdvancePayment: number;

  PerShare: number;

  Building: number;
  Vehicle: number;
  Tools: number;
  OfficeFurniture: number;

  PayableDebts: number;
  OverDraft: number;
  AccountsPriority: number;
  LongTermLoanPayable: number;
  ShortTermLoan: number;

  MortgageLoan: number;
  LongTermloanFromfinancial: number;

  ExpretName: string;
  CertifiedOfficer: string;

  Date: Date;
  PreparedDate: Date;
  ApprovedDate: Date;
  TotalIncome: number;
  TotalPerShare: number;
  TotalFixedAsset: number;
  TotalWealth: number;
  TotalTemporaryDebts: number;
  TotalLongTermDebts: number;
  TotalDebts: number;
  NetAssets: number;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedUserId: string;
  UpdatedUserId: string;
  CreatedDateTime: Date;
  UpdatedDateTime: Date;
  ReportPeriod: number;

}

export class BoughtSelfTradeExecution {
  TradeDate: Date;
  BayerCommodityType: number;
  BayerCommodityGrade: number;
  BayerOrderPrice: number;
  BayerUnitPrice: number;
  Reperesentative: number;
  Warehouse: string;
  CommissionInPercent: number;
  LotQuantity: number;
}

export class SoldSelfTradeExecution {
  TradeDate: Date;
  SellerCommodityType: string;
  SellerCommodityGrade: string;
  SellerOrderPrice: number;
  SellerUnitPrice: number;
  Reperesentative: number;
  Warehouse: string;
  CommissionInPercent: number;
  LotQuantity: number;
}

export class BoughtTradeForClient {
  TradeDate: Date;
  BayerCommodityType: string;
  BayerCommodityGrade: string;
  BayerOrderPrice: number;
  BayerUnitPrice: number;
  Reperesentative: string;
  Warehouse: string;
  CommissionInPercent: number;
  LotQuantity: number;
}

export class SoldTradeForClient {
  TradeDate: Date;
  SellerCommodityType: string;
  SellerOrderPrice: number;
  SellerUnitPrice: number;
  Reperesentative: string;
  Warehouse: string;
  CommissionInPercent: number;
  LotQuantity: number;
}

export class SelfTradeNotAccomplished {
  ReportStartDate: Date;
  ReportEndDate: Date;
  CustomerFullName: string;
  SelfReason: string;
}

export class TradeExcutionViolationRecordView {
  ExchangeActorId: string;
  CustomerFullName: string;
  OrganizationName: string;
  CustomerType: string;
  ReasonId: number;
  CreatedDate: Date;
  ViolationRecordId: number;
  Remark: string;
}

export class SearchCriteria {
  constructor() {
  }
  public Lang: string;
  From: Date;
  To: Date;
  TradeExcutionReport: number;
  ReportTypeId: number;
  CustomerTypeId: number;
  OrganizationName: string;
  TradeExcutionNotAccomplish: number;
  Status: number;
  TradeType: number;
  ReportPeriod: number;
  Year: number;
  ECXCode: string;
  ReportPeriodId: number;
  FullName: string;
  FieldBusinessId: number;
  IsTradeExcutionAccomplished: number;
  MemeberCategoryId: number;
  FinancialPerformanceId: number;
  CommodityId: number;
  CommodityTypeId: number;
  CommodityGradeId: number;
  Quantity: number;
  PriceFrom: number;
  PriceTo: number;
  DateFrom: string;
  DateTo: string;
  SiteCode: string;
  MemberType: string;
  AccountType: string;

}

export class TradeExcutionViolationRecorde {
  TradeExcutionViolationRecordId: number;
  ReasonId: number;
  ViolationRecordId: number;
  Remark: string;
  CreatedDateTime: Date;
  UpdatedDateTime: Date;
  CreatedUserId: string;
  UpdatedUserId: string;
  IsActive: boolean;
  IsDeleted: boolean;
  MemberTradeViolationId: number;
}
export class MemberTradeViolation{
  MemberTradeViolationId: number;
  ExchangeActorId: string;
  ViolationStatus: number;
  Status: number;
  CreatedDateTime: Date;
  UpdatedDateTime: Date;
  CreatedUserId: string;
  UpdatedUserId: string;
  IsActive: boolean;
  IsDeleted: boolean;
  WorkFlow: WorkFlowModel[];
  TradeExcutionViolationRecord: TradeExcutionViolationRecorde[];
}

export class ExchangeActorModel {
  ExchangeActorId = '';
  OrganizationName = '';
  CustomerFullName = '';
  CustomerType = '';
  Tin = '';
  Ecxcode = '';
}

export class ReportPeriod {
  ReportPeriodId: number;
  DescriptionAmh: string;
  DescriptionEng: string;
  DeadLine: string;
  StartDate: string;
  StartMonthAmh: string;
  StartMonthEng: string;
  EndMonthAmh: string;
  EndMonthEng: string;
}
export class AnnualBudgetCloser{
  AnnualBudgetCloserId: number;
  DescriptionAmh: string;
  DescriptionEng: string;
  StartDate: Date;
  EndDate: Date;
}

export class FinancialPerformance {
  ExchangeActorFinanicialId: number;
  CustomerTypeId: string;
  Amount: number;
}

export class ClientInformationReminder {
  ClientInformationReminderId: number;
  DescriptionAmh: string;
  DescriptionEng: string;
}

export class FinancialReportReminder {
  FinancialReportReminderId: number;
  DescriptionAmh: string;
  DescriptionEng: string;
}

export class Commodity {
  CommodityId: number;
  DescriptionAmh: string;
  DesciptionEng: string;
  UnitMeasurementId: number;
  PriceTollerance: number;
}

export class CommodityType {
  CommodityTypeId: number;
  DescriptionAmh: string;
  DescriptionEng: string;
  CommodityId: number;
}
export class ReportType {
  ReportTypeId: number;
  DescriptionAmh: string;
  DescriptionEng: string;
}

export class CommodityGrade {
  CommodityGradeId: number;
  DescriptionAmh: string;
  DescriptoinEng: string;
  CommodityTypeId: number;
}
