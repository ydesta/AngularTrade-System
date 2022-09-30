export class OffSiteMonitoringReport {
  OffSiteMonitoringReportId: number;
  ReportPeriodId: number;
  Year: number;
  ReportTypeId: number;
  ReasonTypeId: number;
  Remark: string;
  Status: number;
  OffSiteMonitoringReportDetail: OffSiteMonitoringReportDetail[];
}
export class OffSiteMonitoringReportDetail {
  ExchangeActorId: string;
}
export class ExchangeActorId {
  ExchangeActorId: string;
}
export class ExchangeActorOffSiteReportView {
  ReasonType: string;
  Year: number;
  ReportType: string;
  ReportPeriod: string;
  Remark: string;
  ExchangeActorId: string;
  CustomerFullName: string;
  OrganizationName: string;
  CustomerType: string;
  MobliePhone: string;
  RegularPhone: string;
  OffSiteMonitoringReportId: number;
}
