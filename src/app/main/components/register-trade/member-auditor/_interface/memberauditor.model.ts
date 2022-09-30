export class MemberAuditor {
  id: number;
  EcxCode: string;
  FromDate: Date;
  ToDate: Date;
  ExchangeActorId: string;
  OrganiztionName: string;
  Status: number;
  AgreementStatus: number;
  PreparedBy: string;
  ReportDate: Date;
  StartDate: string;
  EndDate: string;
}
export class MemberAuditorDTO {
  EcxCode: string;
  FromDate: Date;
  ToDate: Date;
  ExchangeActorId: string;
  Status: number;
  AgreementStatus: number;
  PreparedBy: string;
  ReportDate: Date;
}
