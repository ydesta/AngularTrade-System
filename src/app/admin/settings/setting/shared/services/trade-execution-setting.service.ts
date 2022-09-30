import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import {
  StaticData,
  StaticData2,
} from "src/app/common/models/static-data.model";
import { applicationApis } from "src/app/main/services/applicationApis";
import {
  AnnualBudgetCloser,
  AnnualBudgetNewCloser,
  ClientInformationReminder,
  Commodity,
  CommodityGrade,
  CommodityType,
  ConvertingQuantityMeasurement,
  FinancialPerformance,
  FinancialReportReminder,
  ReportPeriod,
  ReportType,
} from "../models/setting-model";

@Injectable({
  providedIn: "root",
})
export class TradeExecutionSettingService {
  httpClient: HttpClient;
  httpOptions = {
    headers: new HttpHeaders(),
  };

  constructor(httpClient: HttpClient, private config: ConfigurationService) {
    this.httpClient = httpClient;
  }
  getReportType(lang: string): Observable<any> {
    const endpointUrl = `${applicationApis.reportTypeUrl}/${lang}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as StaticData2[]));
  }

  getCommudityType(commodityId: number): Observable<any> {
    const endpointUrl = `${applicationApis.commodityTypeUrl}/GetCommodityTypeById/${commodityId}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as StaticData2[]));
  }
  getCommudityTypess(commodityId: number, lang: string): Observable<any> {
    const endpointUrl = `${applicationApis.commodityTypeUrl}/GetCommodityTypeById/${commodityId}/${lang}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as StaticData2[]));
  }
  saveCommudityType(postData: CommodityType): Observable<any> {
    const endpointUrl = `${applicationApis.commodityTypeUrl}/create`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  updateCommodityType(postData: CommodityType): Observable<any> {
    const endpointUrl = `${applicationApis.commodityTypeUrl}/update`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  deleteCommodityType(postData: CommodityType) {
    const endpointUrl = `${applicationApis.commodityTypeUrl}/delete`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getCommodityTypeById(commodityId: number) {
    const endPonitUrl = `${applicationApis.commodityTypeUrl}/getCommodityById/${commodityId}`;
    return this.httpClient.get(endPonitUrl).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getAllCommodityTypeList(lang: string) {
    const endPointUrl = `${applicationApis.commodityTypeUrl}/getAllCommodityList/${lang}`;
    return this.httpClient
      .get(endPointUrl)
      .pipe(map((result) => result as any[]));
  }

  getCommudityList(lang: string): Observable<any> {
    const endpointUrl = `${applicationApis.commodityUrl}/GetAllCommodity/${lang}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as StaticData2[]));
  }

  saveCommudity(postData: Commodity): Observable<any> {
    const endpointUrl = `${applicationApis.commodityUrl}/Create`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  updateCommodity(postData: Commodity): Observable<any> {
    const endpointUrl = `${applicationApis.commodityUrl}/Update`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  deleteCommodity(postData: Commodity) {
    const endpointUrl = `${applicationApis.commodityUrl}/Delete`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getCommodityById(commodityId: number) {
    const endPonitUrl = `${applicationApis.commodityUrl}/GetCommodityById/${commodityId}`;
    return this.httpClient.get(endPonitUrl).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getAllCommodityList(lang: string): Observable<any> {
    const endPointUrl = `${applicationApis.commodityUrl}/GetAllCommodityList/${lang}`;
    return this.httpClient
      .get(endPointUrl)
      .pipe(map((result) => result as any[]));
  }
  getCommudityGradeList(customerId: number): Observable<any> {
    const endpointUrl = `${applicationApis.commodityGradeUrl}/GetCommodityGradeById/${customerId}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as StaticData2[]));
  }

  saveCommudityGrade(postData: CommodityGrade): Observable<any> {
    const endpointUrl = `${applicationApis.commodityGradeUrl}/create`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  updateCommodityGrade(postData: CommodityGrade): Observable<any> {
    const endpointUrl = `${applicationApis.commodityGradeUrl}/update`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  deleteCommodityGrade(postData: CommodityGrade) {
    const endpointUrl = `${applicationApis.commodityGradeUrl}/delete`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getCommodityGradeById(commodityId: number) {
    const endPonitUrl = `${applicationApis.commodityGradeUrl}/getCommodityById/${commodityId}`;
    return this.httpClient.get(endPonitUrl).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getAllCommodityGradeList(lang: string) {
    const endPointUrl = `${applicationApis.commodityGradeUrl}/getAllCommodityGradeList/${lang}`;
    return this.httpClient
      .get(endPointUrl)
      .pipe(map((result) => result as any[]));
  }
  getReportPeriodList(lang: string) {
    const endPointUrl = `${applicationApis.repotPeriodUrl}/GetAllReportPeriodList/${lang}`;
    return this.httpClient
      .get(endPointUrl)
      .pipe(map((result) => result as any));
  }

  saveReportPeriod(postData: ReportPeriod) {
    const endpointUrl = `${applicationApis.repotPeriodUrl}/Create`;
    return this.httpClient
      .post<ReportPeriod>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getReportPeriodById(reportPeriodId: number) {
    const endpointUrl = `${applicationApis.repotPeriodUrl}/GetReportPeriodById/${reportPeriodId}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as any));
  }

  updateReportPeriod(reportPeriod: ReportPeriod) {
    const endPointUrl = `${applicationApis.repotPeriodUrl}/Update`;
    return this.httpClient
      .post<ReportPeriod>(endPointUrl, reportPeriod, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  deleteReportPeriod(postData: ReportPeriod) {
    const endpointUrl = `${applicationApis.repotPeriodUrl}/Delete`;
    return this.httpClient
      .post<ReportPeriod>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getFinancialPerformanceById(financialId: number) {
    const endPonitUrl = `${applicationApis.financialPerformanceUrl}/GetFinancialAmountById/${financialId}`;
    return this.httpClient.get(endPonitUrl).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getFinancialPerformanceList() {
    const endPointUrl = `${applicationApis.financialPerformanceUrl}/GetAllFinancialList`;
    return this.httpClient.get(endPointUrl).pipe(
      map((data) => {
        return data;
      })
    );
  }

  saveFinancialPerformance(postData: FinancialPerformance) {
    const endPointUrl = `${applicationApis.financialPerformanceUrl}/Create`;
    return this.httpClient
      .post<FinancialPerformance>(endPointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  updateFinanicialPerformance(postData: FinancialPerformance) {
    const endPointUrl = `${applicationApis.financialPerformanceUrl}/Update`;
    return this.httpClient
      .post<FinancialPerformance>(endPointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  deleteFinanicialPerformance(postData: FinancialPerformance) {
    const endPointUrl = `${applicationApis.financialPerformanceUrl}/Delete`;
    return this.httpClient
      .post<FinancialPerformance>(endPointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  saveClientInformationReminder(postData: ClientInformationReminder) {
    const endPointUrl = `${applicationApis.clientInformationReminderUrl}/Create`;
    return this.httpClient
      .post<FinancialPerformance>(endPointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  saveFinancialReportReminder(postData: FinancialReportReminder) {
    const endPointUrl = `${applicationApis.financialReportReminderUrl}/Create`;
    return this.httpClient
      .post<FinancialPerformance>(endPointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  updateClientInformationReminder(postData: ClientInformationReminder) {
    const endPointUrl = `${applicationApis.clientInformationReminderUrl}/Update`;
    return this.httpClient
      .post<FinancialPerformance>(endPointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  updateFinancialReportReminder(postData: FinancialReportReminder) {
    const endPointUrl = `${applicationApis.financialReportReminderUrl}/Update`;
    return this.httpClient
      .post<FinancialPerformance>(endPointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  deleteClientInformationReminder(postData: ClientInformationReminder) {
    const endPointUrl = `${applicationApis.clientInformationReminderUrl}/Delete`;
    return this.httpClient
      .post<FinancialPerformance>(endPointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  deleteFinancialReportReminder(postData: FinancialReportReminder) {
    const endPointUrl = `${applicationApis.financialReportReminderUrl}/Delete`;
    return this.httpClient
      .post<FinancialPerformance>(endPointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getClientInformationReminder(lang: string): Observable<any> {
    const endPointUrl = `${applicationApis.clientInformationReminderUrl}/GetClientInformationReminderList/${lang}`;
    return this.httpClient.get<any>(endPointUrl).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getFinancialReportReminder(lang: string): Observable<any> {
    const endPointUrl = `${applicationApis.financialReportReminderUrl}/GetFinancialReportReminderList/${lang}`;
    return this.httpClient.get<any>(endPointUrl).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getFinancialReportReminderById(financialId: number) {
    const endPonitUrl = `${applicationApis.financialReportReminderUrl}/GetFinancialReportReminderId/${financialId}`;
    return this.httpClient.get(endPonitUrl).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getClientInformationReminderById(financialId: number) {
    const endPonitUrl = `${applicationApis.clientInformationReminderUrl}/GetClientInformationReminderId/${financialId}`;
    return this.httpClient.get(endPonitUrl).pipe(
      map((data) => {
        return data;
      })
    );
  }
  getAnnualBudgetCloserList(lang: string) {
    const endPointUrl = `${applicationApis.annualBudgetCloserUrl}/getAnnualBudgetCloserList/${lang}`;
    return this.httpClient
      .get(endPointUrl)
      .pipe(map((result) => result as any));
  }
  getAnnualBudgetCloser(lang: string) {
    const endPointUrl = `${applicationApis.annualBudgetCloserUrl}/getAnnualBudgetCloser/${lang}`;
    return this.httpClient
      .get(endPointUrl)
      .pipe(map((result) => result as any));
  }
  deleteAnnualBudgetCloser(id) {
    const endpointUrl = `${applicationApis.annualBudgetCloserUrl}/${id}`;
    return this.httpClient.delete<AnnualBudgetCloser>(endpointUrl);
  }
  saveAnnualBudgetCloser(postData: AnnualBudgetNewCloser) {
    const endpointUrl = `${applicationApis.annualBudgetCloserUrl}/Create`;
    return this.httpClient
      .post<ReportPeriod>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  updateAnnualBudgetCloser(postData: AnnualBudgetNewCloser): Observable<any> {
    const endpointUrl = `${applicationApis.annualBudgetCloserUrl}/Update`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  getAnnualBudgetCloserId(annualBudgetCloserId: number) {
    const endPonitUrl = `${applicationApis.annualBudgetCloserUrl}/getAnnualBudgetCloserId/${annualBudgetCloserId}`;
    return this.httpClient.get(endPonitUrl).pipe(
      map((data) => {
        return data;
      })
    );
  }
  getUnitMeasurementList(lang: string) {
    const endPointUrl = `${applicationApis.unitMeasurementUrl}/${lang}`;
    return this.httpClient
      .get(endPointUrl)
      .pipe(map((result) => result as StaticData[]));
  }
  getCommodityGradeByIda(commoditygradeId: number, lang: string) {
    const endPonitUrl = `${applicationApis.commodityGradeUrl}/GetCommodityGradeByIda/${commoditygradeId}/${lang}`;
    return this.httpClient.get(endPonitUrl).pipe(
      map((data) => {
        return data;
      })
    );
  }
  SaveReportType(postData: ReportType): Observable<any> {
    const endpointUrl = `${applicationApis.reportTypeUrl}/create`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  updateReportType(postData: ReportType): Observable<any> {
    const endpointUrl = `${applicationApis.reportTypeUrl}/Update`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  getReportTypeById(reportTypeId: number) {
    const endPonitUrl = `${applicationApis.reportTypeUrl}/GetReportTypeById/${reportTypeId}`;
    return this.httpClient.get(endPonitUrl).pipe(
      map((data) => {
        return data;
      })
    );
  }
  getAllConvertingFromLotToOther(lang: string): Observable<any> {
    const endPointUrl = `${applicationApis.convertingQuantityUrl}/getAllConvertingFromLotToOther/${lang}`;
    return this.httpClient
      .get(endPointUrl)
      .pipe(map((result) => result as any[]));
  }
  deleteConvertingQuantity(postData: ConvertingQuantityMeasurement) {
    const endpointUrl = `${applicationApis.convertingQuantityUrl}/Delete`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  saveConvertingQuan(postData: ConvertingQuantityMeasurement): Observable<any> {
    const endpointUrl = `${applicationApis.convertingQuantityUrl}/create`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  updateConvertingQuan(
    postData: ConvertingQuantityMeasurement
  ): Observable<any> {
    const endpointUrl = `${applicationApis.convertingQuantityUrl}/update`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  getConveringQuantityById(id: number) {
    const endPonitUrl = `${applicationApis.convertingQuantityUrl}/getConveringQuantityById/${id}`;
    return this.httpClient.get(endPonitUrl).pipe(
      map((data) => {
        return data;
      })
    );
  }
}
