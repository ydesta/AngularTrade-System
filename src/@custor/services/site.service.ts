import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from 'src/@custor/services/configuration.service';
import {StaticData2} from 'src/app/common/models/static-data.model';
import {EndpointFactory} from 'src/@custor/services/security/endpoint-factory.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SiteService extends EndpointFactory {
  private readonly _siteUrl: string = 'api/Sites';
  siteList: StaticData2[];

  constructor(private httpClient: HttpClient, private config: ConfigurationService, injector: Injector) {
    super(httpClient, config, injector);
  }

  get siteUrl() {
    return this.config.baseUrl + this._siteUrl;
  }

  getSites(byActive, lang: string): Observable<StaticData2[]> {
    const endpointUrl = `${this.siteUrl}/${byActive}/${lang}`;
    return this.httpClient.get<[]>(endpointUrl, this.getRequestHeaders()).pipe(
      map(siteList => this.siteList = siteList));
  }

}
