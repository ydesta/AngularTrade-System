import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ConfigurationService} from 'src/@custor/services/configuration.service';
import {StaticData, StaticData2, StaticData6} from 'src/app/common/models/static-data.model';
import {MemberClientRegiistrationModel} from '../models/member-client-regiistration-model';
import {applicationApis} from 'src/app/main/services/applicationApis';
import {AttachmentViewModel} from '../models/member-trade-upload-model';
import {
  ClientInformationReminder,
  Commodity,
  CommodityGrade,
  CommodityType, FinancialPerformance, FinancialReportReminder,
  MemberClientTrade, MemberTradeFinancialModel, MemberTradeViolation, RegisterTradeDetailModel,
  RegisterTradeModel, ReportPeriod, SearchCriteria, TradeExcutionViolationRecorde, TradeExcutionViolationRecordView
} from "../models/register-trade-model";

@Injectable({
  providedIn: 'root'
})
export class RegisterTrade2Service {
  private readonly soldSelfTradeSearchUrl: string = 'api/MemberClientTradeDetail/GetAllSoldSelfTrade';
  private readonly boughtSelfTradeSearchUrl: string = 'api/MemberClientTradeDetail/GetAllBoughtSelfTrade';
  httpClient: HttpClient;
  httpOptions = {
    headers: new HttpHeaders(),
  };

  constructor(
    httpClient: HttpClient,
    private config: ConfigurationService
  ) {
    this.httpClient = httpClient;
  }

  get getBoughtSelfTradeSearchUrl() {
    return this.config.baseUrl + this.boughtSelfTradeSearchUrl;
  }

  get getSoldSelfTradeSearchUrl() {
    return this.config.baseUrl + this.soldSelfTradeSearchUrl;
  }

  getReportType(lang: string): Observable<any> {
    const endpointUrl = `${applicationApis.reportTypeUrl}/${lang}`;
    return this.httpClient.get(endpointUrl).pipe(
      map(result => result as StaticData2[]));
  }


  getCommudityType(commodityId: number): Observable<any> {
    const endpointUrl = `${applicationApis.commodityTypeUrl}/GetCommodityTypeById/${commodityId}`;
    return this.httpClient.get(endpointUrl).pipe(
      map(result => result as StaticData2[]));
  }

  saveCommudityType(postData: CommodityType): Observable<any> {
    const endpointUrl = `${applicationApis.commodityTypeUrl}/create`;
    return this.httpClient.post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  updateCommodityType(postData: CommodityType): Observable<any> {
    const endpointUrl = `${applicationApis.commodityTypeUrl}/update`;
    return this.httpClient.post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  deleteCommodityType(postData: CommodityType) {
    const endpointUrl = `${applicationApis.commodityTypeUrl}/delete`;
    return this.httpClient.post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  getCommodityTypeById(commodityId: number) {
    const endPonitUrl = `${applicationApis.commodityTypeUrl}/getCommodityById/${commodityId}`;
    return this.httpClient.get(endPonitUrl).pipe(map(data => {
      return data;
    }));
  }

  getAllCommodityTypeList(lang: string) {
    const endPointUrl = `${applicationApis.commodityTypeUrl}/getAllCommodityList/${lang}`;
    return this.httpClient.get(endPointUrl).pipe(
      map(result => result as any[]));
  }


  getCommudityList(lang: string): Observable<any> {
    const endpointUrl = `${applicationApis.commodityUrl}/GetAllCommodity/${lang}`;
    return this.httpClient.get(endpointUrl).pipe(
      map(result => result as StaticData2[]));
  }

  saveCommudity(postData: Commodity): Observable<any> {
    const endpointUrl = `${applicationApis.commodityUrl}/Create`;
    return this.httpClient.post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  updateCommodity(postData: Commodity): Observable<any> {
    const endpointUrl = `${applicationApis.commodityUrl}/Update`;
    return this.httpClient.post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  deleteCommodity(postData: Commodity) {
    const endpointUrl = `${applicationApis.commodityUrl}/Delete`;
    return this.httpClient.post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  getCommodityById(commodityId: number) {
    const endPonitUrl = `${applicationApis.commodityUrl}/GetCommodityById/${commodityId}`;
    return this.httpClient.get(endPonitUrl).pipe(map(data => {
      return data;
    }));
  }

  getAllCommodityList(lang: string): Observable<any> {
    const endPointUrl = `${applicationApis.commodityUrl}/GetAllCommodityList/${lang}`;
    return this.httpClient.get(endPointUrl).pipe(
      map(result => result as any[]));
  }

  getClientInformationList(customerId: string,lang: string): Observable<StaticData6[]> {
    const endpointUrl = `${applicationApis.clientInformationUrl}/GetMemberClientInformation/${customerId}/${lang}`;
    return this.httpClient.get(endpointUrl).pipe(
      map(result => result as StaticData6[]));
  }

  getClientList(): Observable<MemberClientRegiistrationModel[]> {
    const endpointUrl = `${applicationApis.clientInformationUrl}/GetClientInfoListById`;
    return this.httpClient.get(endpointUrl).pipe(
      map(result => result as MemberClientRegiistrationModel[]));
  }

  getCommudityGradeList(customerId: number): Observable<any> {
    const endpointUrl = `${applicationApis.commodityGradeUrl}/GetCommodityGradeById/${customerId}`;
    return this.httpClient.get(endpointUrl).pipe(
      map(result => result as StaticData2[]));
  }

  saveCommudityGrade(postData: CommodityGrade): Observable<any> {
    const endpointUrl = `${applicationApis.commodityGradeUrl}/create`;
    return this.httpClient.post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  updateCommodityGrade(postData: CommodityGrade): Observable<any> {
    const endpointUrl = `${applicationApis.commodityGradeUrl}/update`;
    return this.httpClient.post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  deleteCommodityGrade(postData: CommodityGrade) {
    const endpointUrl = `${applicationApis.commodityGradeUrl}/delete`;
    return this.httpClient.post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  getCommodityGradeById(commodityId: number) {
    const endPonitUrl = `${applicationApis.commodityGradeUrl}/getCommodityById/${commodityId}`;
    return this.httpClient.get(endPonitUrl).pipe(map(data => {
      return data;
    }));
  }

  getAllCommodityGradeList(lang: string) {
    const endPointUrl = `${applicationApis.commodityGradeUrl}/getAllCommodityGradeList/${lang}`;
    return this.httpClient.get(endPointUrl).pipe(
      map(result => result as any[]));
  }


  getTradeExcutionReportList(lang: string): Observable<any> {
    const endpointUrl = `${applicationApis.memberClientUrl}/GetAllTardeExcutionReport/${lang}`;
    return this.httpClient.get(endpointUrl).pipe(
      map(result => result as any[]));
  }

  getUnitMeasurementList(lang: string) {
    const endPointUrl = `${applicationApis.unitMeasurementUrl}/${lang}`;
    return this.httpClient.get(endPointUrl).pipe(map(result =>
      result as StaticData2[]
    ));
  }

  saveOrUpdateMemberClient(postData: RegisterTradeModel) {
    const endpointUrl = `${applicationApis.memberClientUrl}/CreateMemberClinetReg`;
    return this.httpClient.post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  saveOrUpdateTradeExcutionNotAccomplished(postData: RegisterTradeModel) {
    const endpointUrl = `${applicationApis.memberClientUrl}/CreateMemberTradeDetail`;
    return this.httpClient.post<RegisterTradeModel>(endpointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  saveClientInformation(postData: MemberClientRegiistrationModel) {
    const endpointUrl = `${applicationApis.clientInformationUrl}/SaveClientInformation`;
    return this.httpClient.post<MemberClientRegiistrationModel>(endpointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  saveOrUpdateMemberTradeDetail(postData: MemberClientTrade) {
    const endpointUrl = `${applicationApis.memberClientUrl}/CreateMemberTradeDetail`;
    return this.httpClient.post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  saveOrUpdateMemberFinancial(postData: RegisterTradeModel) {
    const endpointUrl = `${applicationApis.memberClientUrl}/CreateMemberFinancial`;
    return this.httpClient.post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  updateMemberTradeExecution(postData: RegisterTradeModel) {
    const endpointUrl = `${applicationApis.memberClientUrl}/UpdateMemberTradeDetail`;
    return this.httpClient.post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  updateMemberTradeExecutionDetail(postData: RegisterTradeDetailModel) {
    const endpointUrl = `${applicationApis.memberClientTradeDetailUrl}/UpdateTradeExcution`;
    return this.httpClient.post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  deleteMemberTradeExecutionDetail(postData: RegisterTradeDetailModel) {
    const endpointUrl = `${applicationApis.memberClientTradeDetailUrl}/DeleteTradeExcution`;
    return this.httpClient.post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  updateMemberClientInformation(postData: MemberClientRegiistrationModel) {
    const endpointUrl = `${applicationApis.clientInformationUrl}/UpdateMemberClientInformation`;
    return this.httpClient.post<MemberClientRegiistrationModel>(endpointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  deleteMemberClientInformation(postData: MemberClientRegiistrationModel) {
    const endpointUrl = `${applicationApis.clientInformationUrl}/DeleteMemberClientInformation`;
    return this.httpClient.post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  updatememberFinancialTrade(financialTrade: MemberTradeFinancialModel) {
    const endPointUrl = `${applicationApis.fiancialTradeUrl}/UpdateMemberFinancial`;
    return this.httpClient.post<any>(endPointUrl, financialTrade, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  deleteMemberFinancialTrade(financialTrade: MemberTradeFinancialModel) {
    const endPointUrl = `${applicationApis.fiancialTradeUrl}/DeleteMemberFinancialTrade`;
    return this.httpClient.post<any>(endPointUrl, financialTrade, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  getAllMemberClientTrade(lang: string): Observable<any> {
    const endpointUrl = `${applicationApis.memberClientUrl}/GetAllMemberClient/${lang}`;
    return this.httpClient.get(endpointUrl).pipe(map(result =>
      result as RegisterTradeModel[]
    ));
  }

  uploadMemberTradeAttachment(file: FormData): Observable<any> {
    const endpointUrl = `${applicationApis.tradeAttachmentClientUrl}/UploadTradeEvidence`;
    return this.httpClient
      .post<FormData>(endpointUrl, file, this.httpOptions)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  getAllBoughtSelfTradeExcution(): Observable<any> {
    const endpointUrl = `${applicationApis.memberClientTradeDetailUrl}/GetAllBoughtSelfTrade`;
    return this.httpClient.get(endpointUrl).pipe(
      map(result => result as any[]));

  }

  getMemberTardeFinancialExcution(searchParms: SearchCriteria): Observable<any> {
    const endpointUrl = `${applicationApis.fiancialTradeUrl}/GetListOfTradeFinancial`;
    const saParams = new HttpParams()
      .append('Lang', searchParms.Lang.toString())
      .append('MemeberCategoryId', searchParms.MemeberCategoryId.toString())
      .append('FinancialPerformanceId', searchParms.FinancialPerformanceId.toString());
    return this.httpClient.get<any>(endpointUrl, {params: saParams});

  }


  getAllSellerSelfTradeExcution(): Observable<any> {
    const endpointUrl = `${applicationApis.memberClientTradeDetailUrl}/GetAllSoldSelfTrade`;
    return this.httpClient.get(endpointUrl).pipe(
      map(result => result as any[]));

  }


  getAllTradeExcutionById(memberClientId: number) {
    const endpointUrl = `${applicationApis.memberClientTradeDetailUrl}/GetTradeExcutionById/${memberClientId}`;
    return this.httpClient.get(endpointUrl).pipe(
      map(result => result as any[]));
  }

  getAllTradeFinancialById(memberClientId: number) {
    const endpointUrl = `${applicationApis.fiancialTradeUrl}/GetFinancialListById/${memberClientId}`;
    return this.httpClient.get(endpointUrl).pipe(
      map(result => result as any[]));
  }

  getMemberFinancialTradeById(financialTradeId: number) {
    const endpointUrl = `${applicationApis.fiancialTradeUrl}/GetMemberFinacialTradeById/${financialTradeId}`;
    return this.httpClient.get(endpointUrl).pipe(
      map(result => result as any[]));
  }


  getAllMemberClientInformationById(memberClientTradeId: string) {
    const endpointUrl = `${applicationApis.clientInformationUrl}/GetClientInfoListById/${memberClientTradeId}`;
    return this.httpClient.get(endpointUrl).pipe(
      map(result => result as any[]));
  }

  getTradeExcutionDetailById(memberClientId: number) {
    const endpointUrl = `${applicationApis.memberClientTradeDetailUrl}/GetTradeExcutionDetailById/${memberClientId}`;
    return this.httpClient.get(endpointUrl).pipe(
      map(result => result as any));
  }

  getMemberTradeReportList(lang: string): Observable<any> {
    const endpointUrl = `${applicationApis.memberClientUrl}/GetAllMemberClientList/${lang}`;
    return this.httpClient.get(endpointUrl).pipe(
      map(result => result as any[]));
  }

  getListOfExchangeActor(lang: string): Observable<any> {
    const endpointUrl = `${applicationApis.tradeExcutionViolationRecordUrl}/getListOfExchangeActor/${lang}`;
    return this.httpClient.get(endpointUrl).pipe(
      map(result => result as any[]));
  }

  searchBoughtSelfTradeExcution(searchParms: SearchCriteria): Observable<any> {
    const endpointUrl = `${applicationApis.memberClientTradeDetailUrl}/GetAllBoughtSelfTrade`;
    const saParams = new HttpParams()
      .append('Lang', searchParms.Lang.toString())
      .append('TradeExcutionReport', searchParms.TradeExcutionReport.toString())
      .append('TradeType', searchParms.TradeType.toString())
      .append('ECXCode', searchParms.ECXCode.toString())
      .append('Year', searchParms.Year.toString())
      .append('IsTradeExcutionAccomplished', searchParms.IsTradeExcutionAccomplished.toString())
      .append('ReportPeriodId', searchParms.ReportPeriodId.toString());
    return this.httpClient.get<any>(endpointUrl, {params: saParams});

  }

  getListOfReportedMembers(memberTradeId: number): Observable<any> {
    const endpointUrl = `${applicationApis.memberClientUrl}/GetAllMemberClient/${memberTradeId}`;
    return this.httpClient.get(endpointUrl).pipe(
      map(result => result as any[]));
  }

  getTradeExcutionNotAccomplished(searchParms: SearchCriteria): Observable<any> {
    const endpointUrl = `${applicationApis.memberClientUrl}/GetTradeExcutionNotAccomplished`;
    const saParams = new HttpParams()
      .append('Lang', searchParms.Lang.toString())
      .append('TradeExcutionNotAccomplish', searchParms.TradeExcutionNotAccomplish.toString())
      .append('ECXCode', searchParms.ECXCode.toString())
      .append('Year', searchParms.Year.toString())
      .append('ReportPeriodId', searchParms.ReportPeriodId.toString());
    return this.httpClient.get<any>(endpointUrl, {params: saParams});
  }

  getTradeNotReportList(searchParms: SearchCriteria): Observable<any> {
    const endpointUrl = `${applicationApis.memberClientUrl}/GetTradeNotReportList`;
    const saParams = new HttpParams()
      .append('Lang', searchParms.Lang.toString())
      .append('Year', searchParms.Year.toString())
      .append('ReportTypeId', searchParms.ReportTypeId.toString())
      .append('ReportPeriodId', searchParms.ReportPeriodId.toString());
    return this.httpClient.get<any>(endpointUrl, {params: saParams});
  }

  getTradeLateReportList(searchParms: SearchCriteria): Observable<any> {
    const endpointUrl = `${applicationApis.memberClientUrl}/GetLateMemberTardeList`;
    const saParams = new HttpParams()
      .append('Lang', searchParms.Lang.toString())
      .append('Year', searchParms.Year.toString())
      .append('ReportTypeId', searchParms.ReportTypeId.toString())
      .append('ReportPeriodId', searchParms.ReportPeriodId.toString());
    return this.httpClient.get<any>(endpointUrl, {params: saParams});
  }

  searchClientInformation(searchParms: SearchCriteria): Observable<any> {
    const endpointUrl = `${applicationApis.clientInformationUrl}/GetClientInformationList`;
    const saParams = new HttpParams()
      .append('ECXCode', searchParms.ECXCode.toString())
      .append('Status', searchParms.Status.toString())
      .append('TradeType', searchParms.TradeType.toString());
    return this.httpClient.get<any>(endpointUrl, {params: saParams});

  }

  searchClientFullNameInformation(searchParms: SearchCriteria, customerId: string): Observable<any> {
    const endpointUrl = `${applicationApis.clientInformationUrl}/GetClientFullNameList/${customerId}`;
    const saParams = new HttpParams()
      .append('FullName', searchParms.FullName.toString())
      .append('FieldBusinessId', searchParms.FieldBusinessId.toString());
    return this.httpClient.get<any>(endpointUrl, {params: saParams});
  }


  getFinancialTradeReport(searchParms: SearchCriteria): Observable<any> {
    const endpointUrl = `${applicationApis.fiancialTradeUrl}/GetMemberFinancialReport`;
    const saParams = new HttpParams()
      .append('Lang', searchParms.Lang.toString())
      .append('ReportPeriodId', searchParms.ReportPeriodId.toString())
      .append('Year', searchParms.Year.toString())
      .append('ECXCode', searchParms.ECXCode.toString());
    return this.httpClient.get<any>(endpointUrl, {params: saParams});
  }

  getEditMemberClientTrade(memberClientId: number) {
    const endpointUrl = `${applicationApis.memberClientUrl}/GetMemberClientById/${memberClientId}`;
    return this.httpClient.get(endpointUrl).pipe(
      map(res => res as RegisterTradeModel));

  }

  getMemberClientInformation(clientInformationId: number) {
    const endPointUrl = `${applicationApis.clientInformationUrl}/GetClintInformationById/${clientInformationId}`;
    return this.httpClient.get(endPointUrl).pipe(map(res => res as MemberClientRegiistrationModel));
  }

  getCustomerLegalBodyList(customerId: string): Observable<any> {
    const endPointUrl = `${applicationApis.customerLegalBodyUrl}/GetCustomerLegalBodyByCustomerId/${customerId}`;
    return this.httpClient.get(endPointUrl).pipe(map(
      res => res as StaticData6[]
    ));
  }

  getRePortPeriod(lang: string): Observable<any> {
    const endpointUrl = `${applicationApis.repotPeriodUrl}/GetAllReportPeriod/${lang}`;
    return this.httpClient.get(endpointUrl).pipe(map(
      res => res as StaticData[]
    ));
  }

  getTradeExcutionStatusType(): Observable<any> {
    const endPointUrl = `${applicationApis.tradeExcutionStatusUrl}/GetExcutionStatusList`;
    return this.httpClient.get(endPointUrl).pipe(map(
      res => res as StaticData[]
    ));
  }

  getUploadeTradeExcution(tradeExcutionId: number): Observable<any> {
    const endpointUrl = `${applicationApis.tradeAttachmentClientUrl}/GetMemberEvidenceTrade/${tradeExcutionId}`;
    return this.httpClient.get(endpointUrl).pipe(
      map(result => result as AttachmentViewModel[]));
  }

  getTradeExcutionViolationById(exchangeActorId: string, lang: string) {
    const endpointUrl = `${applicationApis.tradeExcutionViolationRecordUrl}/GetListOfViolationById/${exchangeActorId}/${lang}`;
    return this.httpClient.get(endpointUrl).pipe(
      map(result => result as any));
  }

  saveTradeViolation(postData: MemberTradeViolation) {
    const endpointUrl = `${applicationApis.memberTradeViolationUrl}/createViolationRecord`;
    return this.httpClient.post<TradeExcutionViolationRecorde>(endpointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  getMemberTradeViolationList(memberClientId: string, lang: string): Observable<any> {
    const endpointUrl = `${applicationApis.tradeExcutionViolationRecordUrl}/GetAllViolation/${memberClientId}/${lang}`;
    return this.httpClient.get(endpointUrl).pipe(
      map(result => result as any));
  }

  updateTradeViolationStatus(postData: any) {
    const endpointUrl = `${applicationApis.tradeExcutionViolationRecordUrl}/UpdateViolationRecordStatus`;
    return this.httpClient.post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  getMemberAuditorList(lang: string) {
    const endpointUrl = `${applicationApis.tradeAttachmentClientUrl}/GetListOfAuditor/${lang}`;
    return this.httpClient.get(endpointUrl).pipe(
      map(result => result as any));
  }

  getReportPeriodList(lang: string) {
    const endPointUrl = `${applicationApis.repotPeriodUrl}/GetAllReportPeriodList/${lang}`;
    return this.httpClient.get(endPointUrl).pipe(
      map(result => result as any));
  }

  saveReportPeriod(postData: ReportPeriod) {
    const endpointUrl = `${applicationApis.repotPeriodUrl}/Create`;
    return this.httpClient.post<ReportPeriod>(endpointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  getReportPeriodById(reportPeriodId: number) {
    const endpointUrl = `${applicationApis.repotPeriodUrl}/GetReportPeriodById/${reportPeriodId}`;
    return this.httpClient.get(endpointUrl).pipe(
      map(result => result as any));
  }

  updateReportPeriod(reportPeriod: ReportPeriod) {
    const endPointUrl = `${applicationApis.repotPeriodUrl}/Update`;
    return this.httpClient.post<ReportPeriod>(endPointUrl, reportPeriod, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  deleteReportPeriod(postData: ReportPeriod) {
    const endpointUrl = `${applicationApis.repotPeriodUrl}/Delete`;
    return this.httpClient.post<ReportPeriod>(endpointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  getFinancialPerformanceById(financialId: number) {
    const endPonitUrl = `${applicationApis.financialPerformanceUrl}/GetFinancialAmountById/${financialId}`;
    return this.httpClient.get(endPonitUrl).pipe(map(data => {
      return data;
    }));
  }

  getFinancialPerformanceList() {
    const endPointUrl = `${applicationApis.financialPerformanceUrl}/GetAllFinancialList`;
    return this.httpClient.get(endPointUrl).pipe(map(data => {
      return data;
    }));
  }

  saveFinancialPerformance(postData: FinancialPerformance) {
    const endPointUrl = `${applicationApis.financialPerformanceUrl}/Create`;
    return this.httpClient.post<FinancialPerformance>(endPointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  updateFinanicialPerformance(postData: FinancialPerformance) {
    const endPointUrl = `${applicationApis.financialPerformanceUrl}/Update`;
    return this.httpClient.post<FinancialPerformance>(endPointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  deleteFinanicialPerformance(postData: FinancialPerformance) {
    const endPointUrl = `${applicationApis.financialPerformanceUrl}/Delete`;
    return this.httpClient.post<FinancialPerformance>(endPointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  getCustomerType(lang: string): Observable<any> {
    const endPointUrl = `${applicationApis.financialPerformanceUrl}/GetListOfCustomerType/${lang}`;
    return this.httpClient.get<any>(endPointUrl).pipe(map(data => {
      return data;
    }));
  }

  getFinancialAmountById(id: number): Observable<any> {
    const endpointUrl = `${applicationApis.financialPerformanceUrl}/GetFinancialPerformanceById/${id}`;
    return this.httpClient.get(endpointUrl).pipe(
      map(result => result as StaticData2[]));
  }

  saveClientInformationReminder(postData: ClientInformationReminder) {
    const endPointUrl = `${applicationApis.clientInformationReminderUrl}/Create`;
    return this.httpClient.post<FinancialPerformance>(endPointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  saveFinancialReportReminder(postData: FinancialReportReminder) {
    const endPointUrl = `${applicationApis.financialReportReminderUrl}/Create`;
    return this.httpClient.post<FinancialPerformance>(endPointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  updateClientInformationReminder(postData: ClientInformationReminder) {
    const endPointUrl = `${applicationApis.clientInformationReminderUrl}/Update`;
    return this.httpClient.post<FinancialPerformance>(endPointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  updateFinancialReportReminder(postData: FinancialReportReminder) {
    const endPointUrl = `${applicationApis.financialReportReminderUrl}/Update`;
    return this.httpClient.post<FinancialPerformance>(endPointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  deleteClientInformationReminder(postData: ClientInformationReminder) {
    const endPointUrl = `${applicationApis.clientInformationReminderUrl}/Delete`;
    return this.httpClient.post<FinancialPerformance>(endPointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  deleteFinancialReportReminder(postData: FinancialReportReminder) {
    const endPointUrl = `${applicationApis.financialReportReminderUrl}/Delete`;
    return this.httpClient.post<FinancialPerformance>(endPointUrl, postData, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  getClientInformationReminder(lang: string): Observable<any> {
    const endPointUrl = `${applicationApis.clientInformationReminderUrl}/GetClientInformationReminderList/${lang}`;
    return this.httpClient.get<any>(endPointUrl).pipe(map(data => {
      return data;
    }));
  }

  getFinancialReportReminder(lang: string): Observable<any> {
    const endPointUrl = `${applicationApis.financialReportReminderUrl}/GetFinancialReportReminderList/${lang}`;
    return this.httpClient.get<any>(endPointUrl).pipe(map(data => {
      return data;
    }));
  }

  getFinancialReportReminderById(financialId: number) {
    const endPonitUrl = `${applicationApis.financialReportReminderUrl}/GetFinancialReportReminderId/${financialId}`;
    return this.httpClient.get(endPonitUrl).pipe(map(data => {
      return data;
    }));
  }

  getClientInformationReminderById(financialId: number) {
    const endPonitUrl = `${applicationApis.clientInformationReminderUrl}/GetClientInformationReminderId/${financialId}`;
    return this.httpClient.get(endPonitUrl).pipe(map(data => {
      return data;
    }));
  }

}
