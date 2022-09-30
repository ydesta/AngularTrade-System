import {Injectable, Injector} from '@angular/core';
import {EndpointFactory} from 'src/@custor/services/security/endpoint-factory.service';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from 'src/@custor/services/configuration.service';
import {SisterCompanyDisplayModel, SisterCompanyModel, EcxMemberSisterCompanyModel} from '../models/exchange-actor.model';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerManagerService extends EndpointFactory {
  constructor(private httpClient: HttpClient,
              private config: ConfigurationService,
              injector: Injector) {
    super(httpClient, config, injector);
  }
  private readonly _customerLegalBodyUrl: string = 'api/ownermanager';
  private readonly  _sisterCompanyUrl: string = 'api/sisterCompany';
  private readonly _sistercompanyByExchangeActorIdUrl: string = 'api/sisterCompany/GetAllSisterCompanyByActorId';
  private readonly _ownermanagerAddressUrl: string = 'api/ownermanager/getownermanageraddress';

  get ownerManagerAddressUrl() {
    return this.config.baseUrl + this._ownermanagerAddressUrl;
  }

  get sisterCompanyByExchangeActorIdUrl() {
    return this.config.baseUrl + this._sistercompanyByExchangeActorIdUrl;
  }

  get customerLegalBodyUrl() {
    return this.config.baseUrl + this._customerLegalBodyUrl;
  }

  get sisterCompanyUrl() {
    return  this.config.baseUrl + this._sisterCompanyUrl;
  }

  sisterCompanyChange = new Subject<boolean>();


  // saveCustomerLegalBody(customerLegalBody: OwnerManagerModel) {
  //   return this.httpClient.post<number>(this.customerLegalBodyUrl, customerLegalBody);
  // }

  // get customer legal body
  // getCustomerLegalBody(ExchangeActorId: string) {
  //   const endpointUrl = `${this.customerLegalBodyUrl}/ ${ExchangeActorId}`;
  //   return this.httpClient.get<OwnerManagerModel>(endpointUrl);
  // }

  // updateCustomerLegalBody(customerLegalBody: OwnerManagerModel) {
  //   return this.httpClient.put<boolean>(this.customerLegalBodyUrl, customerLegalBody);
  // }

  // update sister company

  // add sister company
  postSisterCompany(sisterCompany: SisterCompanyModel) {
    return this.httpClient.post<number>(this.sisterCompanyUrl, sisterCompany);
  }

  // post EcxMember sister company info
  postEcxMemberSisisterCompany(sisterCompanyInof: EcxMemberSisterCompanyModel){
    const endPointUrl = `${this.sisterCompanyUrl}/${'SaveEcxMemberSisterCompnay'}`;
    return this.httpClient.post<any>(endPointUrl, sisterCompanyInof);
  }

  updateSisterCompany(sisterCompany: SisterCompanyModel) {
    return this.httpClient.put<boolean>(this.sisterCompanyUrl, sisterCompany);
  }


  updateEcxMemberSisterCompany(sisterCompanyInof: EcxMemberSisterCompanyModel) {
    const endPointUrl = `${this.sisterCompanyUrl}/${'UpdateEcxMemberSisterCompany'}`;
    return this.httpClient.put<any>(endPointUrl, sisterCompanyInof);
  }

  getSisterCompany(): Observable<boolean> {
    return this.sisterCompanyChange.asObservable();
  }
  getSisterCompanyById(companyId: number) {
    const endPointUrl = `${this.sisterCompanyUrl}/ ${companyId}`;
    return this.httpClient.get<SisterCompanyModel>(endPointUrl);
  }

  deleteSisterCOmpany(companyId: number, isEcxMember: boolean) {
    const endPointUrl = `${this.sisterCompanyUrl}/${companyId}/${isEcxMember}`;
    return this.httpClient.delete<boolean>(endPointUrl);
  }

  getAllSisterCompany(exchangeActorId: string, lang: string) {
    const endPointUrl = `${this.sisterCompanyByExchangeActorIdUrl}/${exchangeActorId}/${lang}`;
    return this.httpClient.get<SisterCompanyDisplayModel[]>(endPointUrl);
  }

  getOwnerManagerAddress(ownerManagerId: string, lang: string) {
    const endPointUrl = `${this.ownerManagerAddressUrl}/${ownerManagerId}/${lang}`;
    return this.httpClient.get<any>(endPointUrl);
  }
}
