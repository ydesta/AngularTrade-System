import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from "@angular/common/http";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import {
  StaticData,
  StaticData2,
  StaticData5,
  StaticData9,
} from "src/app/common/models/static-data.model";
import { MemberClientRegiistrationModel } from "../models/member-client-regiistration-model";
import { applicationApis } from "src/app/main/services/applicationApis";
import { AttachmentViewModel } from "../models/member-trade-upload-model";
import {
  MemberClientTrade,
  MemberTradeFinancialModel,
  MemberTradeViolation,
  RegisterClientTradeModel,
  RegisterTradeDetailModel,
  RegisterTradeModel,
  SearchCriteria,
  TradeExcutionViolationRecorde,
  MemberClientTradeExecutionView,
  NotificationParms,
} from "../models/register-trade-model";
//import { PagedResult } from "src/app/admin/prerequisite/models/static-data.model";
import {
  MemberFinancialAditor,
  FinancialAuditoredFileUploadView,
  FinancialAuditoredFileUpload,
} from "../models/MemberFinancialAditor";
import {
  OffSiteMonitoringReport,
  ExchangeActorOffSiteReportView,
} from "../models/off-site-monitoring-report";
//import { AnnualBudgetCloser, ReportType } from "src/app/admin/settings/setting/shared/models/register-trade-model";
import { PagedResult } from "src/app/admin/prerequisite/models/static-data.model";

import { MemberAuditor } from "../../member-auditor/_interface/memberauditor.model";
import { ReportType } from "src/app/admin/settings/setting/shared/models/setting-model";
import { AuthService } from "src/@custor/services/security/auth.service";
import { Renewal } from "../models/renewal-model";

@Injectable({
  providedIn: "root",
})
export class RegisterTradeService {
  private readonly soldSelfTradeSearchUrl: string =
    "api/MemberClientTradeDetail/GetAllSoldSelfTrade";
  private readonly boughtSelfTradeSearchUrl: string =
    "api/MemberClientTradeDetail/GetAllBoughtSelfTrade";
  httpClient: HttpClient;
  httpOptions = {
    headers: new HttpHeaders(),
  };

  constructor(
    httpClient: HttpClient,
    private config: ConfigurationService,
    private auth: AuthService
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
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as StaticData2[]));
  }
  getAllReportType(): Observable<any> {
    const endpointUrl = `${applicationApis.reportTypeUrl}/getallreporttypes`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as ReportType[]));
  }
  getReportTypeById(reportTypeId: number) {
    const endPonitUrl = `${applicationApis.reportTypeUrl}/GetReportTypeById/${reportTypeId}`;
    return this.httpClient.get(endPonitUrl).pipe(
      map((data) => {
        return data;
      })
    );
  }
  getCommudityType(commodityId: number, lang: string): Observable<any> {
    const endpointUrl = `${applicationApis.commodityTypeUrl}/GetCommodityTypeById/${commodityId}/${lang}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as StaticData2[]));
  }
  getCommodityTypeListById(commodityId: number, lang: string): Observable<any> {
    const endpointUrl = `${applicationApis.commodityTypeUrl}/getCommodityTypeListById/${commodityId}/${lang}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as StaticData2[]));
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

  // updateCommodityType(postData: CommodityType): Observable<any> {
  //   const endpointUrl = `${applicationApis.commodityTypeUrl}/update`;
  //   return this.httpClient
  //     .post<any>(endpointUrl, postData, this.httpOptions)
  //     .pipe(
  //       map((data) => {
  //         return data;
  //       })
  //     );
  // }

  // deleteCommodityType(postData: CommodityType) {
  //   const endpointUrl = `${applicationApis.commodityTypeUrl}/delete`;
  //   return this.httpClient
  //     .post<any>(endpointUrl, postData, this.httpOptions)
  //     .pipe(
  //       map((data) => {
  //         return data;
  //       })
  //     );
  // }

  // saveCommudityType(postData: CommodityType): Observable<any> {
  //   const endpointUrl = `${applicationApis.commodityTypeUrl}/create`;
  //   return this.httpClient
  //     .post<any>(endpointUrl, postData, this.httpOptions)
  //     .pipe(
  //       map((data) => {
  //         return data;
  //       })
  //     );
  // }
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
  getMemberAuditoragreementList(
    exchangeActorId: string,
    lang: string
  ): Observable<any> {
    const endpointUrl = `${applicationApis.memberAuditorAgreementUrl}/getMemberAuditoragreementList/${exchangeActorId}/${lang}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as StaticData2[]));
  }
  getListOfClientProduct(
    memberclientId: number,
    lang: string
  ): Observable<any> {
    const endpointUrl = `${applicationApis.memberClientTradeDetailUrl}/getListOfClientProduct/${memberclientId}/${lang}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as StaticData[]));
  }
  getListOfMemberProduct(
    exchangeActorId: string,
    lang: string
  ): Observable<any> {
    const endpointUrl = `${applicationApis.memberClientTradeDetailUrl}/getListOfMemberProduct/${exchangeActorId}/${lang}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as StaticData[]));
  }
  // saveCommudity(postData: Commodity): Observable<any> {
  //   const endpointUrl = `${applicationApis.commodityUrl}/Create`;
  //   return this.httpClient
  //     .post<any>(endpointUrl, postData, this.httpOptions)
  //     .pipe(
  //       map((data) => {
  //         return data;
  //       })
  //     );
  // }

  saveMemberAuditorAgreement(postData: MemberAuditor): Observable<any> {
    const endpointUrl = `${applicationApis.memberAuditorAgreementUrl}/Create`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  getListOfMemberAuditorList(
    customerTypeId: number,
    lang: string
  ): Observable<any> {
    const endpointUrl = `${applicationApis.exchangeactorUrl}/getListOfMemberAuditorList/${customerTypeId}/${lang}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as StaticData5[]));
  }
  // updateCommodity(postData: Commodity): Observable<any> {
  //   const endpointUrl = `${applicationApis.commodityUrl}/Update`;
  //   return this.httpClient
  //     .post<any>(endpointUrl, postData, this.httpOptions)
  //     .pipe(
  //       map((data) => {
  //         return data;
  //       })
  //     );
  // }
  updateMemberAuditorAgreement(postData: MemberAuditor): Observable<any> {
    const endpointUrl = `${applicationApis.memberAuditorAgreementUrl}/Update`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  getMemberAuditorAgreementList(
    customerTypeId: string,
    lang: string
  ): Observable<any> {
    const endpointUrl = `${applicationApis.memberAuditorAgreementUrl}/getMemberWithAuditorAgreementList/${customerTypeId}/${lang}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as StaticData5[]));
  }
  getMemberAuditorById(memberAuditorId: number) {
    const endPonitUrl = `${applicationApis.memberAuditorAgreementUrl}/getMemberAuditorById/${memberAuditorId}`;
    return this.httpClient.get(endPonitUrl).pipe(
      map((data) => {
        return data;
      })
    );
  }
  // deleteCommodity(postData: Commodity) {
  //   const endpointUrl = `${applicationApis.commodityUrl}/Delete`;
  //   return this.httpClient
  //     .post<any>(endpointUrl, postData, this.httpOptions)
  //     .pipe(
  //       map((data) => {
  //         return data;
  //       })
  //     );
  // }

  getCommodityById(commodityId: number) {
    const endPonitUrl = `${applicationApis.commodityUrl}/GetCommodityById/${commodityId}`;
    return this.httpClient.get(endPonitUrl).pipe(
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
  // updateAnnualBudgetCloser(postData: AnnualBudgetCloser): Observable<any> {
  //   const endpointUrl = `${applicationApis.annualBudgetCloserUrl}/Update`;
  //   return this.httpClient
  //     .post<any>(endpointUrl, postData, this.httpOptions)
  //     .pipe(
  //       map((data) => {
  //         return data;
  //       })
  //     );
  // }
  getMemberViolationById(memberViolationId: number) {
    const endPonitUrl = `${applicationApis.commodityUrl}/getMemberViolationById/${memberViolationId}`;
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

  getClientInformationList(
    customerId: string,
    lang: string
  ): Observable<StaticData5[]> {
    const endpointUrl = `${applicationApis.clientInformationUrl}/getMemberClientInformation/${customerId}/${lang}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as StaticData5[]));
  }

  getClientList(): Observable<MemberClientRegiistrationModel[]> {
    const endpointUrl = `${applicationApis.clientInformationUrl}/GetClientInfoListById`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as MemberClientRegiistrationModel[]));
  }

  getCommudityGradeList(customerId: number, lang: string): Observable<any> {
    const endpointUrl = `${applicationApis.commodityGradeUrl}/GetCommodityGradeById/${customerId}/${lang}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as StaticData2[]));
  }
  getCommodityGradeListById(customerId: number, lang: string): Observable<any> {
    const endpointUrl = `${applicationApis.commodityGradeUrl}/getCommodityGradeListById/${customerId}/${lang}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as StaticData2[]));
  }
  // saveCommudityGrade(postData: CommodityGrade): Observable<any> {
  //   const endpointUrl = `${applicationApis.commodityGradeUrl}/create`;
  //   return this.httpClient
  //     .post<any>(endpointUrl, postData, this.httpOptions)
  //     .pipe(
  //       map((data) => {
  //         return data;
  //       })
  //     );
  // }

  saveMemberFinancialAuditor(postData: any): Observable<any> {
    const endpointUrl = `${applicationApis.memberFinancialAuditorUrl}/CreateUpload`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  fileUpload(
    fileItem: File,
    auditorPost: MemberFinancialAditor,
    extraData?: object
  ): any {
    const formData: FormData = new FormData();
    formData.append(
      "MemberFinancialAuditorId",
      auditorPost.MemberFinancialAuditorId
    );
    formData.append("ExchangeActorId", auditorPost.ExchangeActorId);
    formData.append("Ecxcode", auditorPost.Ecxcode);
    formData.append(
      "AnnualBudgetCloserId",
      auditorPost.AnnualBudgetCloserId.toString()
    );
    formData.append("Remark", auditorPost.Remark);
    formData.append("Year", auditorPost.Year.toString());
    formData.append("CustomerTypeId", auditorPost.CustomerTypeId.toString());
    formData.append("ReportTypeId", auditorPost.ReportTypeId.toString());
    formData.append("ReportPeriodId", auditorPost.ReportPeriodId.toString());
    formData.append("Status", auditorPost.Status.toString());
    formData.append(
      "TradeExcutionStatusTypeId",
      auditorPost.TradeExcutionStatusTypeId.toString()
    );
    formData.append("ActualFile", fileItem, fileItem.name);
    const options = {
      headers: new HttpHeaders().append(
        "Authorization",
        "Bearer " + this.auth.accessToken
      ),
      reportProgress: true,
    };

    if (extraData) {
      // tslint:disable-next-line: forin
      for (const key in extraData) {
        // iterate and set other form data
        formData.append(key, extraData[key]);
      }
    }
    const endpointUrl = `${applicationApis.memberFinancialAuditorUrl}/createFinancial`;
    const req = new HttpRequest("POST", endpointUrl, formData, options);
    return this.httpClient.request(req);
  }

  saveExchangeActorFinancialAuditor(postData: any): Observable<any> {
    const endpointUrl = `${applicationApis.memberFinancialAuditorUrl}/createFinancial`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  getExchangeActorAuditorList(parameters): Observable<any> {
    const endpointUrl = `${applicationApis.memberFinancialAuditorUrl}/getMemberFinancialAnnualAuditor`;
    const notificationParams = new HttpParams()
      .append("Lang", parameters.Lang)
      .append("ExchangeActorId", parameters.ExchangeActorId)
      .append("PageCount", parameters.PageSize.toString())
      .append("PageNumber", parameters.PageIndex.toString());
    return this.httpClient.get<PagedResult>(endpointUrl, {
      params: notificationParams,
    });
  }
  getMemberAnnulAuditor(parameters, exchangeActorId: string): Observable<any> {
    const endpointUrl = `${applicationApis.memberFinancialAuditorUrl}/getMemberAnnulAuditor/${exchangeActorId}`;
    const notificationParams = new HttpParams()
      .append("Lang", parameters.Lang)
      .append("PageCount", parameters.PageSize.toString())
      .append("PageNumber", parameters.PageIndex.toString());
    return this.httpClient.get<PagedResult>(endpointUrl, {
      params: notificationParams,
    });
  }
  // updateCommodityGrade(postData: CommodityGrade): Observable<any> {
  //   const endpointUrl = `${applicationApis.commodityGradeUrl}/update`;
  //   return this.httpClient
  //     .post<any>(endpointUrl, postData, this.httpOptions)
  //     .pipe(
  //       map((data) => {
  //         return data;
  //       })
  //     );
  // }

  deleteReportType(postData: ReportType) {
    const endpointUrl = `${applicationApis.reportTypeUrl}/delete`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  // deleteCommodityGrade(postData: CommodityGrade) {
  //   const endpointUrl = `${applicationApis.commodityGradeUrl}/delete`;
  //   return this.httpClient
  //     .post<any>(endpointUrl, postData, this.httpOptions)
  //     .pipe(
  //       map((data) => {
  //         return data;
  //       })
  //     );
  // }

  getCommodityGradeById(commodityId: number) {
    const endPonitUrl = `${applicationApis.commodityGradeUrl}/getCommodityById/${commodityId}`;
    return this.httpClient.get(endPonitUrl).pipe(
      map((data) => {
        return data;
      })
    );
  }
  getCommodityGradeByIda(commoditygradeId: number, lang: string) {
    const endPonitUrl = `${applicationApis.commodityGradeUrl}/GetCommodityGradeByIda/${commoditygradeId}/${lang}`;
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

  getTradeExcutionReportList(parameters): Observable<any> {
    const endpointUrl = `${applicationApis.memberClientUrl}/GetAllTardeExcutionReport`;
    const notificationParams = new HttpParams()
      .append("Lang", parameters.Lang)
      .append("ExchangeActorId", parameters.ExchangeActorId)
      .append("PageCount", parameters.PageSize.toString())
      .append("PageNumber", parameters.PageIndex.toString());
    return this.httpClient.get<PagedResult>(endpointUrl, {
      params: notificationParams,
    });
  }
  getMembersTotalNoOfClient(parameters): Observable<any> {
    const endpointUrl = `${applicationApis.clientInformationUrl}/getMembersTotalNoOfClient`;
    const notificationParams = new HttpParams()
      .append("Lang", parameters.Lang)
      .append("PageCount", parameters.PageSize.toString())
      .append("PageNumber", parameters.PageIndex.toString());
    return this.httpClient.get<PagedResult>(endpointUrl, {
      params: notificationParams,
    });
  }
  getUnitMeasurementList(lang: string) {
    const endPointUrl = `${applicationApis.unitMeasurementUrl}/${lang}`;
    return this.httpClient
      .get(endPointUrl)
      .pipe(map((result) => result as StaticData[]));
  }

  saveOrUpdateMemberClient(postData: any) {
    const endpointUrl = `${applicationApis.memberClientUrl}/CreateMemberClinetReg`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  saveOrUpdateQuarterlyReport(postData: RegisterTradeModel) {
    const endpointUrl = `${applicationApis.memberClientUrl}/CreateQuerterlyReport`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  saveOrUpdateTradeExcutionNotAccomplished(postData: RegisterTradeModel) {
    const endpointUrl = `${applicationApis.memberClientUrl}/CreateMemberTradeDetail`;
    return this.httpClient
      .post<RegisterTradeModel>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  saveClientInformation(postData: MemberClientRegiistrationModel) {
    const endpointUrl = `${applicationApis.clientInformationUrl}/SaveClientInformation`;
    return this.httpClient
      .post<MemberClientRegiistrationModel>(
        endpointUrl,
        postData,
        this.httpOptions
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  saveExistingMemberClient(postData: RegisterTradeModel) {
    const endpointUrl = `${applicationApis.memberClientUrl}/createUpdateMemberClinetReg`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  saveOrUpdateMemberTradeDetail(postData: any) {
    const endpointUrl = `${applicationApis.memberClientUrl}/CreateMemberTradeDetail`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  saveOrUpdateMemberFinancial(postData: RegisterTradeModel) {
    const endpointUrl = `${applicationApis.memberClientUrl}/CreateMemberFinancial`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  updateMemberTradeExecution(postData: RegisterClientTradeModel) {
    const endpointUrl = `${applicationApis.memberClientUrl}/UpdateMemberTradeDetail`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  updateMemberTradeClientInfo(postData: RegisterClientTradeModel) {
    const endpointUrl = `${applicationApis.memberClientUrl}/updateMemberTradeClientInfo`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  updateFinancialAuditor(postData: MemberFinancialAditor) {
    const endpointUrl = `${applicationApis.memberFinancialAuditorUrl}/UpdateFinancialAuditor`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  updateMemberTradeExecutionDetail(postData: RegisterTradeDetailModel) {
    const endpointUrl = `${applicationApis.memberClientTradeDetailUrl}/UpdateTradeExcution`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  deleteMemberTradeExecutionDetail(postData: RegisterTradeDetailModel) {
    const endpointUrl = `${applicationApis.memberClientTradeDetailUrl}/DeleteTradeExcution`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  updateMemberClientInformation(postData: MemberClientRegiistrationModel) {
    const endpointUrl = `${applicationApis.clientInformationUrl}/UpdateMemberClientInformation`;
    return this.httpClient
      .post<MemberClientRegiistrationModel>(
        endpointUrl,
        postData,
        this.httpOptions
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  deleteMemberClientInformation(postData: MemberClientRegiistrationModel) {
    const endpointUrl = `${applicationApis.clientInformationUrl}/DeleteMemberClientInformation`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  deleteAuditorFileUpload(postData: FinancialAuditoredFileUpload) {
    const endpointUrl = `${applicationApis.uploadFileFinancialAuditorUrl}/deleteAuditorFileUpload`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  deleteMemberViolation(postData: TradeExcutionViolationRecorde) {
    const endpointUrl = `${applicationApis.tradeExcutionViolationRecordUrl}/DeleteMemberViolation`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  updatememberFinancialTrade(financialTrade: MemberTradeFinancialModel) {
    const endPointUrl = `${applicationApis.fiancialTradeUrl}/UpdateMemberFinancial`;
    return this.httpClient
      .post<any>(endPointUrl, financialTrade, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  deleteMemberFinancialTrade(financialTrade: MemberTradeFinancialModel) {
    const endPointUrl = `${applicationApis.fiancialTradeUrl}/DeleteMemberFinancialTrade`;
    return this.httpClient
      .post<any>(endPointUrl, financialTrade, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getAllMemberClientTrade(lang: string): Observable<any> {
    const endpointUrl = `${applicationApis.memberClientUrl}/GetAllMemberClient/${lang}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as RegisterTradeModel[]));
  }

  uploadMemberTradeAttachment(file: FormData): Observable<any> {
    const endpointUrl = `${applicationApis.tradeAttachmentClientUrl}/UploadTradeEvidence`;
    return this.httpClient
      .post<FormData>(endpointUrl, file, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getAllBoughtSelfTradeExcution(): Observable<any> {
    const endpointUrl = `${applicationApis.memberClientTradeDetailUrl}/GetAllBoughtSelfTrade`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as any[]));
  }

  getMemberTardeFinancialExcution(
    searchParms: SearchCriteria
  ): Observable<any> {
    const endpointUrl = `${applicationApis.fiancialTradeUrl}/GetListOfTradeFinancial`;
    const saParams = new HttpParams()
      .append("Lang", searchParms.Lang)
      .append("PageCount", searchParms.PageSize.toString())
      .append("PageNumber", searchParms.PageIndex.toString())
      .append("MemeberCategoryId", searchParms.MemeberCategoryId.toString())
      .append("Year", searchParms.Year.toString())
      .append(
        "FinancialPerformanceId",
        searchParms.FinancialPerformanceId.toString()
      )
      .append("ReportPeriodId", searchParms.ReportPeriodId.toString());
    return this.httpClient.get<any>(endpointUrl, { params: saParams });
  }

  getAllSellerSelfTradeExcution(): Observable<any> {
    const endpointUrl = `${applicationApis.memberClientTradeDetailUrl}/GetAllSoldSelfTrade`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as any[]));
  }

  getAllTradeExcutionById(parameters) {
    const endpointUrl = `${applicationApis.memberClientTradeDetailUrl}/getTradeExcutionById`;
    const notificationParams = new HttpParams()
      .append("MemberClientTradeId", parameters.MemberClientTradeId.toString())
      .append("Lang", parameters.Lang)
      .append("PageCount", parameters.PageSize.toString())
      .append("PageNumber", parameters.PageIndex.toString());
    return this.httpClient.get<PagedResult>(endpointUrl, {
      params: notificationParams,
    });
  }

  getAllTradeFinancialById(memberClientId: number) {
    const endpointUrl = `${applicationApis.fiancialTradeUrl}/GetFinancialListById/${memberClientId}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as any[]));
  }
  getEditMemberAnnualAuditerById(memberClientId: string) {
    const endpointUrl = `${applicationApis.memberFinancialAuditorUrl}/getEditMemberAnnualAuditerById/${memberClientId}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as any[]));
  }
  getEditMemberClientTradeById(memberClientId: string) {
    const endpointUrl = `${applicationApis.memberClientUrl}/getEditMemberClientTradeById/${memberClientId}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as any[]));
  }
  getFinancialAuditListById(memberFinancialAuditorId: string) {
    const endpointUrl = `${applicationApis.fiancialTradeUrl}/getFinancialAuditListById/${memberFinancialAuditorId}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as any[]));
  }
  getMemberFinancialTradeById(financialTradeId: number) {
    const endpointUrl = `${applicationApis.fiancialTradeUrl}/GetMemberFinacialTradeById/${financialTradeId}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as any[]));
  }

  getAllMemberClientInformationById(parameters) {
    const endpointUrl = `${applicationApis.clientInformationUrl}/GetClientInfoListById`;
    const notificationParams = new HttpParams()
      .append("MemberClientTradeId", parameters.MemberClientTradeId.toString())
      .append("Lang", parameters.Lang)
      .append("PageCount", parameters.PageSize.toString())
      .append("PageNumber", parameters.PageIndex.toString());
    return this.httpClient.get<PagedResult>(endpointUrl, {
      params: notificationParams,
    });
  }

  getTradeExcutionDetailById(memberClientId: number) {
    const endpointUrl = `${applicationApis.memberClientTradeDetailUrl}/GetTradeExcutionDetailById/${memberClientId}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as any));
  }

  getMemberTradeReportList(lang: string): Observable<any> {
    const endpointUrl = `${applicationApis.memberClientUrl}/GetAllMemberClientList/${lang}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as any[]));
  }

  getListOfExchangeActor(lang: string): Observable<any> {
    const endpointUrl = `${applicationApis.tradeExcutionViolationRecordUrl}/getListOfExchangeActor/${lang}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as any[]));
  }

  getListOfAuditoredUploadFile(memberFinancialAuditorId: string) {
    const endpointUrl = `${applicationApis.uploadFileFinancialAuditorUrl}/getListOfAuditoredUploadFile/${memberFinancialAuditorId}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as FinancialAuditoredFileUploadView[]));
  }
  getOneUploadFileOfAuditored(memberFinancialAuditorId: number) {
    const endpointUrl = `${applicationApis.uploadFileFinancialAuditorUrl}/getOneUploadFileOfAuditored/${memberFinancialAuditorId}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as FinancialAuditoredFileUploadView[]));
  }
  getAllAnnualAuditedDocument(parameters) {
    const endpointUrl = `${applicationApis.uploadFileFinancialAuditorUrl}/getAllAnnualAuditedDocument`;
    const notificationParams = new HttpParams()
      .append("MemberFinancialAuditorId", parameters.MemberFinancialAuditorId)
      .append("Lang", parameters.Lang)
      .append("PageCount", parameters.PageSize.toString())
      .append("PageNumber", parameters.PageIndex.toString());
    return this.httpClient.get<PagedResult>(endpointUrl, {
      params: notificationParams,
    });
  }
  searchBoughtSelfTradeExcution(searchParms: SearchCriteria): Observable<any> {
    const endpointUrl = `${applicationApis.memberClientTradeDetailUrl}/GetAllBoughtSelfTrade`;
    const saParams = new HttpParams()
      .append("Lang", searchParms.Lang)
      .append("PageCount", searchParms.PageSize.toString())
      .append("PageNumber", searchParms.PageIndex.toString())
      .append("TradeExcutionReport", searchParms.TradeExcutionReport.toString())
      .append("TradeType", searchParms.TradeType.toString())
      .append("ExchangeActorId", searchParms.ExchangeActorId)
      .append("Year", searchParms.Year.toString())
      .append("ReportPeriodId", searchParms.ReportPeriodId.toString());
    return this.httpClient.get<any>(endpointUrl, { params: saParams });
  }
  searchMemberViolationList(searchParms: SearchCriteria): Observable<any> {
    const endpointUrl = `${applicationApis.tradeExcutionViolationRecordUrl}/getMemberViolationBySearch`;
    const saParams = new HttpParams()
      .append("Lang", searchParms.Lang.toString())
      .append("ECXCode", searchParms.ECXCode.toString())
      .append("From", searchParms.From.toString())
      .append("To", searchParms.To.toString())
      .append("ViolationTypeId", searchParms.ViolationTypeId.toString())
      .append("DecisionTypeId", searchParms.DecisionTypeId.toString());
    return this.httpClient.get<any>(endpointUrl, { params: saParams });
  }

  getListOfReportedMembers(memberTradeId: number): Observable<any> {
    const endpointUrl = `${applicationApis.memberClientUrl}/GetAllMemberClient/${memberTradeId}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as any[]));
  }

  getTradeExcutionNotAccomplished(
    searchParms: SearchCriteria
  ): Observable<any> {
    const endpointUrl = `${applicationApis.memberClientUrl}/GetTradeExcutionNotAccomplished`;
    const saParams = new HttpParams()
      .append("Lang", searchParms.Lang)
      .append("PageCount", searchParms.PageSize.toString())
      .append("PageNumber", searchParms.PageIndex.toString())
      .append(
        "TradeExcutionNotAccomplish",
        searchParms.TradeExcutionNotAccomplish.toString()
      )
      .append("ECXCode", searchParms.ECXCode.toString())
      .append("Year", searchParms.Year.toString())
      .append("ReportPeriodId", searchParms.ReportPeriodId.toString());
    return this.httpClient.get<any>(endpointUrl, { params: saParams });
  }

  getTradeNotReportList(searchParms: SearchCriteria) {
    const endpointUrl = `${applicationApis.memberClientUrl}/GetTradeNotReportList`;
    const saParams = new HttpParams()
      .append("Lang", searchParms.Lang)
      .append("Year", searchParms.Year.toString())
      .append("ReportPeriodId", searchParms.ReportPeriodId.toString());
    return this.httpClient.get<any[]>(endpointUrl, {
      params: saParams,
    });
  }
  getNotMemberFinancialAuditor(searchParms: SearchCriteria) {
    const endpointUrl = `${applicationApis.memberFinancialAuditorUrl}/getNotMemberFinancialAuditor`;
    const saParams = new HttpParams()
      .append("Lang", searchParms.Lang)
      .append("Year", searchParms.Year.toString())
      .append(
        "AnnualBudgetCloserId",
        searchParms.AnnualBudgetCloserId.toString()
      );
    return this.httpClient.get<MemberClientTradeExecutionView[]>(endpointUrl, {
      params: saParams,
    });
  }

  getTradeLateReportList(searchParms: SearchCriteria) {
    const endpointUrl = `${applicationApis.memberClientUrl}/GetLateMemberTardeList`;
    const saParams = new HttpParams()
      .append("Lang", searchParms.Lang)
      .append("Year", searchParms.Year.toString())
      .append("ReportPeriodId", searchParms.ReportPeriodId.toString());
    return this.httpClient.get<any[]>(endpointUrl, { params: saParams });
  }
  searchClientInformation(searchParms: SearchCriteria): Observable<any> {
    const endpointUrl = `${applicationApis.clientInformationUrl}/GetClientInformationList`;
    const saParams = new HttpParams()
      .append("Lang", searchParms.Lang)
      .append("PageCount", searchParms.PageSize.toString())
      .append("PageNumber", searchParms.PageIndex.toString())
      .append("ExchangeActorId", searchParms.ExchangeActorId)
      .append("Status", searchParms.Status.toString())
      .append("TradeType", searchParms.TradeType.toString());
    return this.httpClient.get<any>(endpointUrl, { params: saParams });
  }

  searchClientFullNameInformation(
    searchParms: SearchCriteria,
    customerId: string
  ): Observable<any> {
    const endpointUrl = `${applicationApis.clientInformationUrl}/GetClientFullNameList/${customerId}`;
    const saParams = new HttpParams()
      .append("FullName", searchParms.FullName.toString())
      .append("FieldBusinessId", searchParms.FieldBusinessId.toString());
    return this.httpClient.get<any>(endpointUrl, { params: saParams });
  }

  getFinancialTradeReport(searchParms: SearchCriteria): Observable<any> {
    const endpointUrl = `${applicationApis.fiancialTradeUrl}/GetMemberFinancialReport`;
    const saParams = new HttpParams()
      .append("Lang", searchParms.Lang.toString())
      .append("ReportPeriodId", searchParms.ReportPeriodId.toString())
      .append("Year", searchParms.Year.toString())
      .append("ExchangeActorId", searchParms.ExchangeActorId.toString());
    return this.httpClient.get<any>(endpointUrl, { params: saParams });
  }

  getEditMemberClientTrade(memberClientId: number) {
    const endpointUrl = `${applicationApis.memberClientUrl}/GetMemberClientById/${memberClientId}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((res) => res as RegisterTradeModel));
  }
  getMemberAnnualAuditerUploadFile(memberClientId: string) {
    const endpointUrl = `${applicationApis.memberFinancialAuditorUrl}/getMemberAnnualAuditerById/${memberClientId}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((res) => res as MemberFinancialAditor));
  }
  getMemberClientInformation(clientInformationId: number) {
    const endPointUrl = `${applicationApis.clientInformationUrl}/GetClintInformationById/${clientInformationId}`;
    return this.httpClient
      .get(endPointUrl)
      .pipe(map((res) => res as MemberClientRegiistrationModel));
  }

  getCustomerLegalBodyList(customerId: string, lang: string): Observable<any> {
    const endPointUrl = `${applicationApis.customerLegalBodyUrl}/GetCustomerLegalBodyByCustomerId/${customerId}/${lang}`;
    return this.httpClient
      .get(endPointUrl)
      .pipe(map((res) => res as StaticData9[]));
  }

  getRePortPeriod(lang: string): Observable<any> {
    const endpointUrl = `${applicationApis.repotPeriodUrl}/GetAllReportPeriod/${lang}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((res) => res as StaticData[]));
  }

  getTradeExcutionStatusType(): Observable<any> {
    const endPointUrl = `${applicationApis.tradeExcutionStatusUrl}/GetExcutionStatusList`;
    return this.httpClient
      .get(endPointUrl)
      .pipe(map((res) => res as StaticData[]));
  }

  getUploadeTradeExcution(tradeExcutionId: number): Observable<any> {
    const endpointUrl = `${applicationApis.tradeAttachmentClientUrl}/GetMemberEvidenceTrade/${tradeExcutionId}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as AttachmentViewModel[]));
  }

  getTradeExcutionViolationById(exchangeActorId: number, lang: string) {
    const endpointUrl = `${applicationApis.tradeExcutionViolationRecordUrl}/GetListOfViolationById/${exchangeActorId}/${lang}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as any));
  }

  saveTradeViolation(postData: MemberTradeViolation) {
    const endpointUrl = `${applicationApis.memberTradeViolationUrl}/createViolationRecord`;
    return this.httpClient
      .post<TradeExcutionViolationRecorde>(
        endpointUrl,
        postData,
        this.httpOptions
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  saveOffSiteMonitoringReport(postData: OffSiteMonitoringReport) {
    const endpointUrl = `${applicationApis.offSiteMonitoringReportUrl}/createOffSite`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  getMemberTradeViolationList(
    memberClientId: string,
    lang: string
  ): Observable<any> {
    const endpointUrl = `${applicationApis.tradeExcutionViolationRecordUrl}/GetAllViolation/${memberClientId}/${lang}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as any));
  }

  updateTradeViolationStatus(postData: any) {
    const endpointUrl = `${applicationApis.tradeExcutionViolationRecordUrl}/UpdateViolationRecordStatus`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  updateExchangeActorOffSiteStatus(postData: any) {
    const endpointUrl = `${applicationApis.offSiteMonitoringReporDetailtUrl}/UpdateExchangeActorOffSiteStatus`;
    return this.httpClient
      .post<any>(endpointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  getMemberAuditorList(lang: string) {
    const endpointUrl = `${applicationApis.tradeAttachmentClientUrl}/GetListOfAuditor/${lang}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as any));
  }

  getReportPeriodList(lang: string) {
    const endPointUrl = `${applicationApis.repotPeriodUrl}/GetAllReportPeriodList/${lang}`;
    return this.httpClient
      .get(endPointUrl)
      .pipe(map((result) => result as any));
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
  // saveReportPeriod(postData: ReportPeriod) {
  //   const endpointUrl = `${applicationApis.repotPeriodUrl}/Create`;
  //   return this.httpClient
  //     .post<ReportPeriod>(endpointUrl, postData, this.httpOptions)
  //     .pipe(
  //       map((data) => {
  //         return data;
  //       })
  //     );
  // }
  // saveAnnualBudgetCloser(postData: AnnualBudgetCloser) {
  //   const endpointUrl = `${applicationApis.annualBudgetCloserUrl}/Create`;
  //   return this.httpClient
  //     .post<ReportPeriod>(endpointUrl, postData, this.httpOptions)
  //     .pipe(
  //       map((data) => {
  //         return data;
  //       })
  //     );
  // }
  getReportPeriodById(reportPeriodId: number) {
    const endpointUrl = `${applicationApis.repotPeriodUrl}/GetReportPeriodById/${reportPeriodId}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as any));
  }

  // updateReportPeriod(reportPeriod: ReportPeriod) {
  //   const endPointUrl = `${applicationApis.repotPeriodUrl}/Update`;
  //   return this.httpClient
  //     .post<ReportPeriod>(endPointUrl, reportPeriod, this.httpOptions)
  //     .pipe(
  //       map((data) => {
  //         return data;
  //       })
  //     );
  // }

  // deleteReportPeriod(postData: ReportPeriod) {
  //   const endpointUrl = `${applicationApis.repotPeriodUrl}/Delete`;
  //   return this.httpClient
  //     .post<ReportPeriod>(endpointUrl, postData, this.httpOptions)
  //     .pipe(
  //       map((data) => {
  //         return data;
  //       })
  //     );
  // }

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

  // saveFinancialPerformance(postData: FinancialPerformance) {
  //   const endPointUrl = `${applicationApis.financialPerformanceUrl}/Create`;
  //   return this.httpClient
  //     .post<FinancialPerformance>(endPointUrl, postData, this.httpOptions)
  //     .pipe(
  //       map((data) => {
  //         return data;
  //       })
  //     );
  // }

  // updateFinanicialPerformance(postData: FinancialPerformance) {
  //   const endPointUrl = `${applicationApis.financialPerformanceUrl}/Update`;
  //   return this.httpClient
  //     .post<FinancialPerformance>(endPointUrl, postData, this.httpOptions)
  //     .pipe(
  //       map((data) => {
  //         return data;
  //       })
  //     );
  // }

  // deleteFinanicialPerformance(postData: FinancialPerformance) {
  //   const endPointUrl = `${applicationApis.financialPerformanceUrl}/Delete`;
  //   return this.httpClient
  //     .post<FinancialPerformance>(endPointUrl, postData, this.httpOptions)
  //     .pipe(
  //       map((data) => {
  //         return data;
  //       })
  //     );
  // }

  getCustomerType(lang: string): Observable<any> {
    const endPointUrl = `${applicationApis.financialPerformanceUrl}/GetListOfCustomerType/${lang}`;
    return this.httpClient.get<any>(endPointUrl).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getFinancialAmountById(id: number): Observable<any> {
    const endpointUrl = `${applicationApis.financialPerformanceUrl}/GetFinancialPerformanceById/${id}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as any));
  }

  // saveClientInformationReminder(postData: ClientInformationReminder) {
  //   const endPointUrl = `${applicationApis.clientInformationReminderUrl}/Create`;
  //   return this.httpClient
  //     .post<FinancialPerformance>(endPointUrl, postData, this.httpOptions)
  //     .pipe(
  //       map((data) => {
  //         return data;
  //       })
  //     );
  // }

  // saveFinancialReportReminder(postData: FinancialReportReminder) {
  //   const endPointUrl = `${applicationApis.financialReportReminderUrl}/Create`;
  //   return this.httpClient
  //     .post<FinancialPerformance>(endPointUrl, postData, this.httpOptions)
  //     .pipe(
  //       map((data) => {
  //         return data;
  //       })
  //     );
  // }

  // updateClientInformationReminder(postData: ClientInformationReminder) {
  //   const endPointUrl = `${applicationApis.clientInformationReminderUrl}/Update`;
  //   return this.httpClient
  //     .post<FinancialPerformance>(endPointUrl, postData, this.httpOptions)
  //     .pipe(
  //       map((data) => {
  //         return data;
  //       })
  //     );
  // }

  // updateFinancialReportReminder(postData: FinancialReportReminder) {
  //   const endPointUrl = `${applicationApis.financialReportReminderUrl}/Update`;
  //   return this.httpClient
  //     .post<FinancialPerformance>(endPointUrl, postData, this.httpOptions)
  //     .pipe(
  //       map((data) => {
  //         return data;
  //       })
  //     );
  // }

  // deleteClientInformationReminder(postData: ClientInformationReminder) {
  //   const endPointUrl = `${applicationApis.clientInformationReminderUrl}/Delete`;
  //   return this.httpClient
  //     .post<FinancialPerformance>(endPointUrl, postData, this.httpOptions)
  //     .pipe(
  //       map((data) => {
  //         return data;
  //       })
  //     );
  // }

  // deleteFinancialReportReminder(postData: FinancialReportReminder) {
  //   const endPointUrl = `${applicationApis.financialReportReminderUrl}/Delete`;
  //   return this.httpClient
  //     .post<FinancialPerformance>(endPointUrl, postData, this.httpOptions)
  //     .pipe(
  //       map((data) => {
  //         return data;
  //       })
  //     );
  // }

  getClientInformationReminder(lang: string): Observable<any> {
    const endPointUrl = `${applicationApis.clientInformationReminderUrl}/GetClientInformationReminderList/${lang}`;
    return this.httpClient.get(endPointUrl).pipe(map((res) => res as any[]));
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
  updateMemberTradeViolation(
    postData: TradeExcutionViolationRecorde
  ): Observable<any> {
    const endPointUrl = `${applicationApis.tradeExcutionViolationRecordUrl}/updateMemberViolation`;
    return this.httpClient
      .post<any>(endPointUrl, postData, this.httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  getTradeViolationRecordById(tradeViolationRecordId: number) {
    const endPonitUrl = `${applicationApis.tradeExcutionViolationRecordUrl}/getTradeViolationRecordById/${tradeViolationRecordId}`;
    return this.httpClient.get(endPonitUrl).pipe(
      map((data) => {
        return data;
      })
    );
  }
  getTradeViolationRecordByEXchangeId(exchangeId: string, lang: string) {
    const endPonitUrl = `${applicationApis.tradeExcutionViolationRecordUrl}/getAllViolation/${exchangeId}/${lang}`;
    return this.httpClient.get(endPonitUrl).pipe(
      map((data) => {
        return data;
      })
    );
  }
  getMembersViolationDecisionList(exchangeId: string, lang: string) {
    const endPonitUrl = `${applicationApis.tradeExcutionViolationRecordUrl}/getMembersViolationDecisionList/${exchangeId}/${lang}`;
    return this.httpClient.get(endPonitUrl).pipe(
      map((data) => {
        return data;
      })
    );
  }
  getAllMemberFinancialAuditedList(
    searchParms: SearchCriteria
  ): Observable<any> {
    const endpointUrl = `${applicationApis.memberFinancialAuditorUrl}/getAllMemberFinancialAuditedList`;
    const saParams = new HttpParams()
      .append("Lang", searchParms.Lang)
      .append("PageCount", searchParms.PageSize.toString())
      .append("PageNumber", searchParms.PageIndex.toString())
      .append("ECXCode", searchParms.ECXCode)
      .append("Start", searchParms.From.toString())
      .append("End", searchParms.To.toString());
    return this.httpClient.get<any>(endpointUrl, { params: saParams });
  }
  getOffSiteReportViewList(searchParms: NotificationParms): Observable<any> {
    const endpointUrl = `${applicationApis.offSiteMonitoringReporDetailtUrl}/getOffSiteReportViewList`;
    const saParams = new HttpParams()
      .append("Lang", searchParms.Lang)
      .append("PageCount", searchParms.PageSize.toString())
      .append("PageNumber", searchParms.PageIndex.toString())
      .append(
        "OffSiteMonitoringId",
        searchParms.OffSiteMonitoringId.toString()
      );
    return this.httpClient.get<ExchangeActorOffSiteReportView[]>(endpointUrl, {
      params: saParams,
    });
  }
  getFinancialNotReportList(searchParms: SearchCriteria) {
    const endpointUrl = `${applicationApis.memberClientUrl}/getFinancialNotReportList`;
    const saParams = new HttpParams()
      .append("Lang", searchParms.Lang)
      .append("Year", searchParms.Year.toString())
      .append("ReportPeriodId", searchParms.ReportPeriodId.toString());
    return this.httpClient.get<MemberClientTradeExecutionView[]>(endpointUrl, {
      params: saParams,
    });
  }
  getLateMemberFinancialList(searchParms: SearchCriteria) {
    const endpointUrl = `${applicationApis.memberClientUrl}/getLateMemberFinancialList`;
    const saParams = new HttpParams()
      .append("Lang", searchParms.Lang)
      .append("Year", searchParms.Year.toString())
      .append("ReportPeriodId", searchParms.ReportPeriodId.toString());
    return this.httpClient.get<MemberClientTradeExecutionView[]>(endpointUrl, {
      params: saParams,
    });
  }

  getLateFinancialAuditorList(searchParms: SearchCriteria) {
    const endpointUrl = `${applicationApis.memberFinancialAuditorUrl}/getLateFinancialAuditorList`;
    const saParams = new HttpParams()
      .append("Lang", searchParms.Lang)
      .append("Year", searchParms.Year.toString())
      .append(
        "AnnualBudgetCloserId",
        searchParms.AnnualBudgetCloserId.toString()
      );
    return this.httpClient.get<MemberClientTradeExecutionView[]>(endpointUrl, {
      params: saParams,
    });
  }

  getMemberFinancialOnTimeReportList(searchParms: SearchCriteria) {
    const endpointUrl = `${applicationApis.memberClientUrl}/getMemberFinancialOnTimeReportList`;
    const saParams = new HttpParams()
      .append("Lang", searchParms.Lang)
      // .append("PageCount", searchParms.PageSize.toString())
      // .append("PageNumber", searchParms.PageIndex.toString())
      .append("Year", searchParms.Year.toString())
      .append("ReportPeriodId", searchParms.ReportPeriodId.toString());
    return this.httpClient.get<MemberClientTradeExecutionView[]>(endpointUrl, {
      params: saParams,
    });
  }
  getMemberTradeOnTimeReportList(searchParms: SearchCriteria) {
    const endpointUrl = `${applicationApis.memberClientUrl}/getMemberTradeOnTimeReportList`;
    const saParams = new HttpParams()
      .append("Lang", searchParms.Lang)
      // .append("PageCount", searchParms.PageSize.toString())
      // .append("PageNumber", searchParms.PageIndex.toString())
      .append("Year", searchParms.Year.toString())
      .append("ReportPeriodId", searchParms.ReportPeriodId.toString());
    return this.httpClient.get<any>(endpointUrl, {
      params: saParams,
    });
  }
  getOnTimeReportFinancialAuditor(searchParms: SearchCriteria) {
    const endpointUrl = `${applicationApis.memberFinancialAuditorUrl}/getOnTimeReportFinancialAuditor`;
    const saParams = new HttpParams()
      .append("Lang", searchParms.Lang)
      .append("Year", searchParms.Year.toString())
      .append(
        "AnnualBudgetCloserId",
        searchParms.AnnualBudgetCloserId.toString()
      );
    return this.httpClient.get<any>(endpointUrl, {
      params: saParams,
    });
  }
  getMemberAnnualFinancialReport(searchParms: SearchCriteria): Observable<any> {
    const endpointUrl = `${applicationApis.fiancialTradeUrl}/getMemberAnnualFinancialReport`;
    const saParams = new HttpParams()
      .append("Lang", searchParms.Lang.toString())
      .append(
        "AnnualBudgetCloserId",
        searchParms.AnnualBudgetCloserId.toString()
      )
      .append("Year", searchParms.Year.toString())
      .append("ExchangeActorId", searchParms.ExchangeActorId.toString());
    return this.httpClient.get<any>(endpointUrl, { params: saParams });
  }

  getMemberAnnualFileUploadReport(
    searchParms: SearchCriteria
  ): Observable<any> {
    const endpointUrl = `${applicationApis.uploadFileFinancialAuditorUrl}/getMemberAnnualFileUploadReport`;
    const saParams = new HttpParams()
      .append("Lang", searchParms.Lang.toString())
      .append(
        "AnnualBudgetCloserId",
        searchParms.AnnualBudgetCloserId.toString()
      )
      .append("Year", searchParms.Year.toString())
      .append("ExchangeActorId", searchParms.ExchangeActorId.toString());
    return this.httpClient.get<any>(endpointUrl, { params: saParams });
  }
  getClintInformationByECXCode(clientInformationId: string) {
    const endPointUrl = `${applicationApis.clientInformationUrl}/getClintInformationByECXCode/${clientInformationId}`;
    return this.httpClient
      .get(endPointUrl)
      .pipe(map((res) => res as MemberClientRegiistrationModel));
  }
  getListOfWarehouse() {
    const endPointUrl = `${applicationApis.lookupUrl}/getListOfWarehouse`;
    return this.httpClient
      .get(endPointUrl)
      .pipe(map((result) => result as StaticData5[]));
  }
  getWarehouseList() {
    const endPointUrl = `${applicationApis.lookupUrl}/getWarehouseList`;
    return this.httpClient
      .get(endPointUrl)
      .pipe(map((result) => result as StaticData[]));
  }
  getExchangeActorRenewalNotification(
    ExchagneActorId: string,
    lang: string
  ): Observable<any> {
    const endPointUrl = `${applicationApis.exchangeactorUrl}/getExchangeActorRenewalNotification/${ExchagneActorId}/${lang}`;
    return this.httpClient
      .get(endPointUrl)
      .pipe(map((result) => result as any));
  }

  deleteQuarterReport(id: number) {
    const endpointUrl = `${applicationApis.memberClientUrl}/${id}`;
    return this.httpClient.delete<any>(endpointUrl, this.httpOptions).pipe(
      map((data) => {
        return data;
      })
    );
  }
}
