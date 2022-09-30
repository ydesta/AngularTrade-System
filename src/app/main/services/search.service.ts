import { Injectable, Injector } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { EndpointFactory } from "src/@custor/services/security/endpoint-factory.service";
import { Observable } from "rxjs";
import {
  CustomerSearchCriteriaWithPagination,
  PaymentOrderCriteriaWithPagination,
  CustomerSearchResultModel,
} from "../models/exchange-actor.model";

@Injectable({
  providedIn: "root",
})
export class SearchService extends EndpointFactory {
  private readonly _customersearchUrl: string = "api/exchangeactor";
  private readonly _customerpaymentordersearch: string = "api/paymentauthorize";

  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationService,
    injector: Injector
  ) {
    super(httpClient, config, injector);
  }

  get customerSearchEndPoint() {
    return this.config.baseUrl + this._customersearchUrl;
  }

  get customerpaymentordersearchEndPoint() {
    return this.config.baseUrl + this._customerpaymentordersearch;
  }

  serarchCustomerByCriteria(
    customerSearchParams: CustomerSearchCriteriaWithPagination
  ): Observable<any> {
    const cParams = new HttpParams()
      .append("PageCount", customerSearchParams.PageSize.toString())
      .append("PageNumber", customerSearchParams.PageIndex.toString())
      .append("Lang", customerSearchParams.Lang)
      .append(
        "OrganizationName",
        customerSearchParams.OrganizationName
          ? customerSearchParams.OrganizationName
          : ""
      )
      .append(
        "CustomerType",
        customerSearchParams.CustomerType
          ? customerSearchParams.CustomerType.toString()
          : ""
      )
      .append(
        "MemberCategory",
        customerSearchParams.MemberCategory
          ? customerSearchParams.MemberCategory.toString()
          : ""
      )
      .append(
        "Ecxcode",
        customerSearchParams.Ecxcode
          ? customerSearchParams.Ecxcode.toString()
          : ""
      )
      .append(
        "Tin",
        customerSearchParams.Tin ? customerSearchParams.Tin.toString() : ""
      );
    return this.httpClient.get<CustomerSearchResultModel>(
      this.customerSearchEndPoint,
      { params: cParams }
    );
  }

  searchCustomerPaymentOrder(
    authorizedPaymentSearchParams: PaymentOrderCriteriaWithPagination
  ): Observable<any> {
    const apParams = new HttpParams()
      .append("PageCount", authorizedPaymentSearchParams.PageSize.toString())
      .append("PageNumber", authorizedPaymentSearchParams.PageIndex.toString())
      .append("Lang", authorizedPaymentSearchParams.Lang)
      // .append('LegalBodyName', authorizedPaymentSearchParams.LegalBodyName ? authorizedPaymentSearchParams.LegalBodyName : '')
      // .append('LegalBodyFatherName', authorizedPaymentSearchParams.LegalBodyFatherName
      //   ? authorizedPaymentSearchParams.LegalBodyFatherName : '')
      // .append('LegalBodyGrandFatherName', authorizedPaymentSearchParams.LegalBodyGrandFatherName
      //   ? authorizedPaymentSearchParams.LegalBodyGrandFatherName : '')
      .append(
        "OrganizationName",
        authorizedPaymentSearchParams.OrganizationName
          ? authorizedPaymentSearchParams.OrganizationName
          : ""
      )
      .append(
        "ServiceType",
        authorizedPaymentSearchParams.ServiceType.toString()
      )
      .append(
        "PaymentStatus",
        authorizedPaymentSearchParams.PaymentStatus.toString()
      )
      .append("From", authorizedPaymentSearchParams.From.toString())
      .append("To", authorizedPaymentSearchParams.To.toString())
      .append(
        "Ecxcode",
        authorizedPaymentSearchParams.Ecxcode
          ? authorizedPaymentSearchParams.Ecxcode.toString()
          : ""
      );

    return this.httpClient.get<any>(this.customerpaymentordersearchEndPoint, {
      params: apParams,
    });
  }
}
