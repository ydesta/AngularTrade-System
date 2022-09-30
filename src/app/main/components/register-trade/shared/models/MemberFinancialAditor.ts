import { MemberTradeFinancialModel } from './register-trade-model';

export class MemberFinancialAditor {
  public MemberFinancialAuditorId: string;
  public ExchangeActorId: string;
  public Ecxcode: string;
  public Remark: string;
  public Status: number;
  public TradeExcutionStatusTypeId: number;
  public Year: number;
  public AnnualBudgetCloserId: number;
  public CustomerTypeId: number;
  public ReportTypeId: number;
  public ReportPeriodId: number;
  public StartDate: Date;
  public EndDate: Date;
  public ReportDate: Date;
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
  public IsActive: boolean;
  public IsDeleted: boolean;
  public CreatedUserId: string;
  public UpdatedUserId: string;
  public CreatedDateTime: Date;
  public UpdatedDateTime: Date;
  FinancialAuditoredFileUpload: FinancialAuditoredFileUpload[];
  MemberTradeFinancial: MemberTradeFinancialModel[];
}
export class FinancialAuditoredFileUpload {
  FinancialAuditoredFileUploadId: number;
  Url: string;
  FileLocation: string;
  MemberFinancialAuditorId: string;
}
export class FinancialAuditoredFileUploadView {
  // MemberFinancialAuditorId: string;
  Url: string;
}
