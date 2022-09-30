import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { AuthService } from "src/@custor/services/security/auth.service";
import { PagedResult } from "src/app/admin/prerequisite/models/static-data.model";
import { StaticData5 } from "src/app/common/models/static-data.model";
import { applicationApis } from "src/app/main/services/applicationApis";
import { MemberFinancialAditor } from "../models/MemberFinancialAditor";

@Injectable({
  providedIn: "root",
})
export class AnnualAuditReportDataServiceService {
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

  saveMemberAnnualAudit(postData: MemberFinancialAditor) {
    const endpointUrl = `${applicationApis.memberFinancialAuditorUrl}/CreateAnnualAudit`;
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

  deleteAnnualAudit(id: string) {
    const endpointUrl = `${applicationApis.memberFinancialAuditorUrl}/${id}`;
    return this.httpClient.delete<any>(endpointUrl, this.httpOptions).pipe(
      map((data) => {
        return data;
      })
    );
  }
  getMemberFinancialListById(financialTradeId: number) {
    const endpointUrl = `${applicationApis.fiancialTradeUrl}/getMemberFinancialListById/${financialTradeId}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as any[]));
  }
}
