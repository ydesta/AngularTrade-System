export const WORK_FLOW: any[] = [
  { Id: 0, DescriptionEng: "Prepare", DescriptionAmh: "አዘጋጅ" },
  { Id: 1, DescriptionEng: "Checker", DescriptionAmh: "አረጋጋጭ" },
  { Id: 2, DescriptionEng: "Department Director", DescriptionAmh: "ክፍል ሓላፊ" },
  { Id: 3, DescriptionEng: "Director", DescriptionAmh: "ዳሪክተር" },
  { Id: 4, DescriptionEng: "Checker Reject", DescriptionAmh: "Checker Reject" },
  {
    Id: 5,
    DescriptionEng: "Department Director Reject",
    DescriptionAmh: "Department Director Reject",
  },
  {
    Id: 6,
    DescriptionEng: "Director Reject",
    DescriptionAmh: "Director Reject",
  },
  { Id: 7, DescriptionEng: "Reporter", DescriptionAmh: "Reporter" },
  { Id: 8, DescriptionEng: "Officer Reject", DescriptionAmh: "Officer Reject" },
];

export class WorkFlowModel {
  public FinalDec: number;
  public ProcessedByName: string;
  public Comment?: string;
  public ServiceApplicationId?: string;
  public CreatedUserId: string;
  public ServiceType?: string;
  public CustomerTypeId?: number;
  public MemberTradeViolationId?: number;
  public MemberClientTradeId?: number;
  public InjunctionId?: number;
  public OffSiteMonitoringReportId: number;
}
