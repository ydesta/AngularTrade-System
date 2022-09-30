import {Injectable, Injector} from '@angular/core';
import {EndpointFactory} from '../../../@custor/services/security/endpoint-factory.service';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from '../../../@custor/services/configuration.service';
import {StaticData} from 'src/app/common/models/static-data.model';

@Injectable({
  providedIn: 'root'
})
export class CommodityService extends EndpointFactory {

  private readonly _commodityUrl : string = 'api/commodity';

  constructor(private httpClient: HttpClient,
              private config: ConfigurationService,
              injector: Injector) {
    super(httpClient, config, injector);
  }

  get commodityEndpoint() {
    return this.config.baseUrl + this._commodityUrl;
  }

  getAllCommodity(lang: string) {
    const endpointUrl = `${this.commodityEndpoint}/GetAllCommodity/${lang}`;
    return this.httpClient.get<StaticData[]>(endpointUrl);
  }
}
