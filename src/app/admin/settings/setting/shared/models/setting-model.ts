export class ReportPeriod {
  public ReportPeriodId: number;
  public DescriptionAmh: string;
  public DescriptionEng: string;
  public DeadLine: string;
  public StartDate: string;
  public StartMonthAmh: string;
  public StartMonthEng: string;
  public EndMonthAmh: string;
  public EndMonthEng: string;
}
export class AnnualBudgetCloser {
  public AnnualBudgetCloserId: number;
  public DescriptionAmh: string;
  public DescriptionEng: string;
  public StartDate: Date;
  public EndDate: Date;
}
export class AnnualBudgetNewCloser {
  public AnnualBudgetCloserId: number;
  public DescriptionAmh: string;
  public DescriptionEng: string;
  public StartDate: string;
  public EndDate: string;
}

export class FinancialPerformance {
  public ExchangeActorFinanicialId: number;
  public CustomerTypeId: string;
  public Amount: number;
}

export class ClientInformationReminder {
  public ClientInformationReminderId: number;
  public DescriptionAmh: string;
  public DescriptionEng: string;
}

export class FinancialReportReminder {
  public FinancialReportReminderId: number;
  public DescriptionAmh: string;
  public DescriptionEng: string;
}

export class Commodity {
  public CommodityId: number;
  public DescriptionAmh: string;
  public DesciptionEng: string;
  public UnitMeasurementId: number;
  public PriceTollerance: number;
  public WeightedAverage?: number;
}

export class CommodityType {
  public CommodityTypeId: number;
  public DescriptionAmh: string;
  public DescriptionEng: string;
  public CommodityId: number;
}
export class ReportType {
  public ReportTypeId: number;
  public DescriptionAmh: string;
  public DescriptionEng: string;
}

export class CommodityGrade {
  public CommodityGradeId: number;
  public DescriptionAmh: string;
  public DescriptoinEng: string;
  public CommodityTypeId: number;
}
export class ConvertingQuantityMeasurement {
  public Id: number;
  public Lot: number;
  public Qunital: number;
  public KiloGram: number;
  public CommodityId: number;
}
export class FinancialPerformanceCustomerType {
  DecisionNameAmh: string;
  DecisionNameEng: string;
  Id: number;
}
