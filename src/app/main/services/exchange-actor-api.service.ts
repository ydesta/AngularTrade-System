import {EndpointFactory} from '../../../@custor/services/security/endpoint-factory.service';
import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from '../../../@custor/services/configuration.service';
import {
  CustomerSearchResultModel, ExchangeActorModel,
} from '../models/exchange-actor.model';
import {Observable, Subject} from 'rxjs';

import {StaticData8} from "src/app/common/models/static-data.model";

@Injectable({
  providedIn: 'root'
})
export class ExchangeActorApiService extends EndpointFactory {

  customerSearchResult = new Subject<CustomerSearchResultModel>();
  customerType = new Subject<number>();

  // subscribe on that
  constructor(private httpClient: HttpClient,
              private config: ConfigurationService,
              injector: Injector) {
    super(httpClient, config, injector);
  }
  private readonly _customerUrl: string = 'api/exchangeactor';
  private readonly _exchangeActorAddressUrl: string = 'api/exchangeactor/getExchangeActorAddress';
  private readonly _memberRepresentativeUrl: string = 'api/exchangeactor/getMemberRepresentative';
  private readonly _exchangeActorInfo: string = 'api/exchangeactor/getExchangeActorGeneralInfo';
  get memberRepresentativeEndpoint(){
    return this.config.baseUrl + this._memberRepresentativeUrl;
  }
  get customerEndpoint() {
    return this.config.baseUrl + this._customerUrl;
  }

  get exchangeActorAddressUrl() {
    return this.config.baseUrl + this._exchangeActorAddressUrl;
  }
  get exchangeActorInfo() {
    return this.config.baseUrl + this._exchangeActorInfo;
  }
  saveExchangeActor(registrationData: ExchangeActorModel) {
    return this.httpClient.post<any>(this.customerEndpoint, registrationData);
  }
  updateExchangeActor(data: any) {
    return this.httpClient.put<any>(this.customerEndpoint, data);
  }
  getGeneralInfoById(lang: string, serviceApplicationId: string) {
    const endpointUrl = `${this.customerEndpoint}/${lang}/${serviceApplicationId}`;
    return this.httpClient.get<ExchangeActorModel>(endpointUrl);
  }
  getSearchedResult(): Observable<CustomerSearchResultModel> {
    return this.customerSearchResult.asObservable();
  }
  getSelectedCustomrType(): Observable<number> {
    return this.customerType.asObservable();
  }
  
  
  getExchangeActorAddress(exchangeActorId: string) {
    const endpointUrl = `${this.exchangeActorAddressUrl}/${exchangeActorId}`;
    return this.httpClient.get<any>(endpointUrl);
  }
  getExchangeActorInfo(exchangeActorId: string) {
    const endpointUrl = `${this.exchangeActorInfo}/${exchangeActorId}`;
    return this.httpClient.get<any>(endpointUrl);
  }

  getMemberReprsentative(serviceApplicationId: string){
    const endpointUrl = `${this.memberRepresentativeEndpoint}/${serviceApplicationId}`;
    return this.httpClient.get<StaticData8[]>(endpointUrl);
  }
}
