import { WorkFlowModel } from "src/app/common/models/workFlow";
import { MemberClientRegiistrationModel } from "./member-client-regiistration-model";
import { TradeNotAccomplishReason } from "./trade-not-accomplish-reason.model";

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
  public PreparedByFirstName: string;
  public PreparedByFirstNameAmh: string;
  public PreparedByFatherName: string;
  public PreparedByFatherNameAmh: string;
  public PreparedByGrandFatherName: string;
  public PreparedByGrandFatherNameAmh: string;
  public PreparedDate: Date;
  public Position: string;
  public PositionAmh: string;
  public StartDate: Date;
  public DeadLine: Date;
  public ApprovedByFirstName: string;
  public ApprovedByFirstNameAmh: string;
  public ApprovedByFatherName: string;
  public ApprovedByFatherNameAmh: string;
  public ApprovedByGrandFatherName: string;
  public ApprovedByGrandFatherNameAmh: string;
  public ApproveDate: Date;
  public DoYouHaveNewCustomerId: number;
  WorkFlow: WorkFlowModel[];
  TradeNotAccomplishReason?: TradeNotAccomplishReason[];
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
  public WorkFlowStatus: number;
  public PreparedByFirstName: string;
  public PreparedByFirstNameAmh: string;
  public PreparedByFatherName: string;
  public PreparedByFatherNameAmh: string;
  public PreparedByGrandFatherName: string;
  public PreparedByGrandFatherNameAmh: string;
  public PreparedDate: Date;
  public ApprovedByFirstName: string;
  public ApprovedByFirstNameAmh: string;
  public ApprovedByFatherName: string;
  public ApprovedByFatherNameAmh: string;
  public ApprovedByGrandFatherName: string;
  public ApprovedByGrandFatherNameAmh: string;
  public ApproveDate: Date;
  public Position: string;
  public PositionAmh: string;
  public StartDate: Date;
  public DeadLine: Date;
  public DoYouHaveNewCustomerId: number;
  MemberClientTradeDetail: RegisterTradeDetailModel[];
  MemberTradeFinancial: MemberTradeFinancialModel[];
  MemberClientInformation: MemberClientRegiistrationModel[];
  WorkFlow: WorkFlowModel[];
  TradeNotAccomplishReason?: TradeNotAccomplishReason[];
}

export class RegisterClientTradeModel {
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
  public PreparedByFirstName: string;
  public PreparedByFirstNameAmh: string;
  public PreparedByFatherName: string;
  public PreparedByFatherNameAmh: string;
  public PreparedByGrandFatherName: string;
  public PreparedByGrandFatherNameAmh: string;
  public PreparedDate: Date;
  public ApprovedByFirstName: string;
  public ApprovedByFirstNameAmh: string;
  public ApprovedByFatherName: string;
  public ApprovedByFatherNameAmh: string;
  public ApprovedByGrandFatherName: string;
  public ApprovedByGrandFatherNameAmh: string;
  public ApproveDate: Date;
  public Position: string;
  public PositionAmh: string;
  ExchangeActor?: ExchangeActorModel;
  WorkFlowStatus: number;
  public DoYouHaveNewCustomerId: number;
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

  OrderPrice: string;
  CommissionInPrice: number;
  OwnerManagerId: number;
  UnitMeasurementId: number;
  Warehouse: string;
  WarehouseId: number;
  ClientTradeRemark: string;
  TradeExcutionReport: number;
  TradeService: string;
  ExchangeActorId: string;
  Lot: number;
  Quintal: number;
  KiloGram: number;
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
  InJectedStatus: number;
  Computerandaccessories: number;
  MemberFinancialAuditorId: string;
  InvestOthers: number;
  CurrentAssetsOthers: number;
  TangibaleAssetsOthers: number;
  CurrentLiabilityOthers: number;
  LongTermLiabilityOthers: number;
}

export class BoughtSelfTradeExecution {
  TradeDate: Date;
  BayerCommodityType: number;
  BayerCommodityGrade: number;
  BayerOrderPrice: string;
  BayerUnitPrice: number;
  Reperesentative: number;
  Warehouse: string;
  CommissionInPercent: number;
  LotQuantity: number;
  Lot: number;
  Quintal: number;
  KiloGram: number;
}

export class SoldSelfTradeExecution {
  TradeDate: Date;
  SellerCommodityType: string;
  SellerCommodityGrade: string;
  SellerOrderPrice: string;
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
  BayerOrderPrice: string;
  BayerUnitPrice: number;
  Reperesentative: string;
  Warehouse: string;
  CommissionInPercent: number;
  LotQuantity: number;
}

export class SoldTradeForClient {
  TradeDate: Date;
  SellerCommodityType: string;
  SellerOrderPrice: string;
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
export class MemberClientTradeExecutionView {
  ExchangeActorId: string;
  OrganizationName: string;
  CustomerFullName: string;
  CustomerType: string;
  MobliePhone: string;
  RegularPhone: string;
  ItemsCount: number;
  Items: number[];
  ReportTypeId: number;
}
export class SearchCriteria {
  constructor() {}

  public Lang: string;
  From: Date;
  To: Date;
  TradeExcutionReport: number;
  ReportTypeId: number;
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
  ViolationTypeId: number;
  DecisionTypeId: number;
  CustomerFullName: string;
  CustomerType: string;
  AnnualBudgetCloserId: number;
  CustomerTypeId: number;
  public PageIndex: number;
  public PageSize: number;
  ExchangeActorId: string;
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

export class MemberTradeViolation {
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
  ExchangeActorId = "";
  OrganizationName = "";
  CustomerFullName = "";
  CustomerType = "";
  Tin = "";
  Ecxcode = "";
}

// export class ReportPeriod {
//   ReportPeriodId: number;
//   DescriptionAmh: string;
//   DescriptionEng: string;
//   DeadLine: string;
//   StartDate: string;
//   StartMonthAmh: string;
//   StartMonthEng: string;
//   EndMonthAmh: string;
//   EndMonthEng: string;
// }

// export class FinancialPerformance {
//   ExchangeActorFinanicialId: number;
//   CustomerTypeId: string;
//   Amount: number;
// }

// export class ClientInformationReminder {
//   ClientInformationReminderId: number;
//   DescriptionAmh: string;
//   DescriptionEng: string;
// }

// export class FinancialReportReminder {
//   FinancialReportReminderId: number;
//   DescriptionAmh: string;
//   DescriptionEng: string;
// }

// export class Commodity {
//   CommodityId: number;
//   DescriptionAmh: string;
//   DesciptionEng: string;
//   UnitMeasurementId: number;
//   PriceTollerance: number;
// }

// export class CommodityType {
//   CommodityTypeId: number;
//   DescriptionAmh: string;
//   DescriptionEng: string;
//   CommodityId: number;
// }

// export class CommodityGrade {
//   CommodityGradeId: number;
//   DescriptionAmh: string;
//   DescriptoinEng: string;
//   CommodityTypeId: number;
// }
export class NotificationParms {
  public WorkFlowUserRoleId: number;
  public Lang: string;
  public PageIndex: number;
  public PageSize: number;
  public OffSiteMonitoringId: number;
  public MemberClientTradeId: number;
  public ExchangeActorId: string;
  public MemberFinancialAuditorId: string;
}
