import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecognitionListModel} from '../../models/exchange-actor.model';
import { EndpointFactory } from 'src/@custor/services/security/endpoint-factory.service';
import { ConfigurationService } from 'src/@custor/services/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class RecognitionService extends EndpointFactory {

  constructor(private httpClient: HttpClient,
              private config: ConfigurationService,
              injector: Injector) {
    super(httpClient, config, injector);
  }

  private readonly _customerUrl: string = 'api/exchangeactor/getRecognitionType';

  get exchangeActorEndpoint() {
    return this.config.baseUrl + this._customerUrl;
  }

  getRecognitionInfo(lang: string, exchangeActorId: string) {
    const endpointUrl = `${this.exchangeActorEndpoint}/${lang}/${exchangeActorId}`;
    return this.httpClient.get<RecognitionListModel>(endpointUrl);
  }
}
