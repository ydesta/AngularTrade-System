import { environment } from "src/environments/environment";

export const applicationApis = {
  followup: `${environment.baseUrl}api/OversightReport/`,
  lookup: `${environment.baseUrl}api/Lookup/`,
  regionsUrl: `${environment.baseUrl}api/Region/`,
  zonesUrl: `${environment.baseUrl}api/Zone/`,
  woredasUrl: `${environment.baseUrl}api/Woreda/`,
  kebelesUrl: `${environment.baseUrl}api/Kebele/`,
  complaintUrl: `${environment.baseUrl}api/Complaint/`,
  violationUrl: `${environment.baseUrl}api/Violation/`,
  issueUrl: `${environment.baseUrl}api/Issue/`,
  issueStatusFeedBackUrl: `${environment.baseUrl}api/IssueStatusFeedBack/`,
  caseAttachmentUrl: `${environment.baseUrl}api/CaseAttachment/`,
  issueInvestigationUrl: `${environment.baseUrl}api/IssueInvestigation/`,
  customerSearchUrl: `${environment.baseUrl}api/CustomerSearch/`,
  legalCaseUrl: `${environment.baseUrl}api/LegalCase`,
  justicBodyCaseUrl: `${environment.baseUrl}api/JusticeBodyCase`,
  legalCaseTrackingUrl: `${environment.baseUrl}api/CaseTracking`,
  caseWitnessUrl: `${environment.baseUrl}api/Witness`,
  CaseJusticeTypeUrl: `${environment.baseUrl}api/CaseJusticeType`,
  commodityTypeUrl: `${environment.baseUrl}api/CommodityType`,
  commodityUrl: `${environment.baseUrl}api/Commodity`,
  convertingQuantityUrl: `${environment.baseUrl}api/ConvertingQuantity`,
  commodityGradeUrl: `${environment.baseUrl}api/CommodityGrade`,
  reportTypeUrl: `${environment.baseUrl}api/ReportType`,
  memberClientUrl: `${environment.baseUrl}api/MemberClientTrade`,
  memberClientTradeDetailUrl: `${environment.baseUrl}api/MemberClientTradeDetail`,
  unitMeasurementUrl: `${environment.baseUrl}api/UnitMeasurement`,
  tradeAttachmentClientUrl: `${environment.baseUrl}api/MemberTradeEvidence`,
  clientInformationUrl: `${environment.baseUrl}api/ClientInformation`,
  fiancialTradeUrl: `${environment.baseUrl}api/MemberTradeFinancial`,
  customerLegalBodyUrl: `${environment.baseUrl}api/OwnerManager`,
  repotPeriodUrl: `${environment.baseUrl}api/ReportPeriod`,
  tradeExcutionStatusUrl: `${environment.baseUrl}api/TradeExcutionStatus`,
  tradeExcutionViolationRecordUrl: `${environment.baseUrl}api/TradeExcutionViolation`,
  memberTradeViolationUrl: `${environment.baseUrl}api/MemberTradeViolation`,
  financialPerformanceUrl: `${environment.baseUrl}api/ExchangeActorFinanicial`,
  clientInformationReminderUrl: `${environment.baseUrl}api/ClientInformationReminder`,
  financialReportReminderUrl: `${environment.baseUrl}api/FinancialReportReminder`,
  generalSetting: `${environment.baseUrl}api/generalSetting`,
  RenewalSetting: `${environment.baseUrl}api/generalSetting/renewal`,
  LookupSetting: `${environment.baseUrl}api/lookup/SaveLookup`,
  transactionsUrl: `${environment.baseUrl}api/BankTransaction`,
  siteUrl: `${environment.baseUrl}api/Site`,
  LookupTypeSetting: `${environment.baseUrl}api/lookup/SaveLookupType`,
  dashboardUrl: `${environment.baseUrl}api/EceaDashboard`,
  memberFinancialAuditorUrl: `${environment.baseUrl}api/FinancialAuditor`,
  uploadFileFinancialAuditorUrl: `${environment.baseUrl}api/UploadFileFinancialAuditor`,
  offSiteMonitoringReportUrl: `${environment.baseUrl}api/OffSiteMonitoring`,
  offSiteMonitoringReporDetailtUrl: `${environment.baseUrl}api/OffSiteMonitoringDetail`,
  annualBudgetCloserUrl: `${environment.baseUrl}api/AnnualBudgetCloser`,
  memberAuditorAgreementUrl: `${environment.baseUrl}api/MemberAuditorAgrement`,
  overSightScheduletUrl: `${environment.baseUrl}api/schedule`,
  lookupUrl: `${environment.baseUrl}api/lookup`,
  exchangeactorUrl:`${environment.baseUrl}api/exchangeactor`
};