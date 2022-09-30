import { catchError, map } from 'rxjs/operators';
import { Injectable, OnInit, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {StaticData2} from '../models/static-data.model';

import { Observable, throwError } from 'rxjs';
import {ConfigurationService} from 'src/@custor/services/configuration.service';
import {EndpointFactory} from 'src/@custor/services/security/endpoint-factory.service';


@Injectable()
export class AddressService extends EndpointFactory implements OnInit {
  // private readonly _lookupsUrl: string = 'api/Lookups';
  private readonly _regionsUrl: string = 'api/region';
  private readonly _zonesUrl: string = 'api/zone';
  private readonly _woredasUrl: string = 'api/woreda';
  private readonly _kebelesUrl: string = 'api/kebele';
  // private readonly _natUrl: string = 'api/nationality';

  kebeleList: StaticData2[];
  allKebeleList: StaticData2[];
  woredaList: StaticData2[];
  zoneList: StaticData2[];
  allZoneList: StaticData2[];
  allWoredaList: StaticData2[];
  regList: StaticData2[];
  // NationList: NationalityModel[];
  lang: string;

  constructor(private httpClient: HttpClient,
              private config: ConfigurationService,
              injector: Injector) {
   super(httpClient, config, injector);
  }

  ngOnInit(): void {
    // this.lang = 'et';
    this.lang = this.config.language;
  }

  getRegionsByLang(lang: string): Observable<any> {
    const endpointUrl = `${this.regionsUrl}/${lang}`;
    return this.httpClient.get<StaticData2[]>(endpointUrl, this.getRequestHeaders()).pipe(
      map(regionList => this.regList = regionList),
      catchError(err => throwError(err || 'Server error')));
  }

  getAllZonesByLang(lang: string): Observable<StaticData2[]> {
    const endpointUrl = `${this.zonesUrl}/${lang}`;
    return this.httpClient.get<StaticData2[]>(endpointUrl, this.getRequestHeaders()).pipe(
      map(zoneList => this.allZoneList = zoneList));
  }
  getZones(id: string): Observable<StaticData2[]> {
    const endpointUrl = `${this.zonesUrl}/${this.lang}/${id}`;
    return this.httpClient.get<StaticData2[]>(endpointUrl, this.getRequestHeaders()).pipe(
      map(zoneList => this.zoneList = zoneList));
  }

  getWoredas(id: string): Observable<StaticData2[]> {
    const endpointUrl = `${this.woredasUrl}/${this.lang}/${id}`;
    return this.httpClient.get<StaticData2[]>(endpointUrl, this.getRequestHeaders()).pipe(
      map(woredaList => this.woredaList = woredaList));

  }

  getAllWoredasByLang(lang: string): Observable<StaticData2[]> {
    const endpointUrl = `${this.woredasUrl}/${lang}`;
    return this.httpClient.get<StaticData2[]>(endpointUrl, this.getRequestHeaders()).pipe(
      map(woredaList => this.allWoredaList = woredaList));
  }


  getKebeles(id: string): Observable<StaticData2[]> {
    const endpointUrl = `${this.kebelesUrl}/${id}`;
    return this.httpClient.get<StaticData2[]>(endpointUrl, this.getRequestHeaders()).pipe(
      map(kebeleList => this.kebeleList = kebeleList));

  }
  getAllKebelesByLang(lang: string): Observable<StaticData2[]> {
    const endpointUrl = `${this.kebelesUrl}/${lang}`;
    return this.httpClient.get<StaticData2[]>(endpointUrl, this.getRequestHeaders()).pipe(
      map(kebeleList => this.kebeleList = kebeleList));

  }

  getKebelesByWoreda(lang: string, id: string): Observable<StaticData2[]> {
    const endpointUrl = `${this.kebelesUrl}/${lang}/${id}`;
    return this.httpClient.get<StaticData2[]>(endpointUrl, this.getRequestHeaders()).pipe(
      map(kebeleList => this.kebeleList = kebeleList));
  }

  getAllKebeles(): Observable<StaticData2[]> {
    const endpointUrl = `${this.kebelesUrl}/${this.lang}`;
    return this.httpClient.get<StaticData2[]>(endpointUrl, this.getRequestHeaders()).pipe(
      map(kebeleList => this.allKebeleList = kebeleList));
  }

  // URLS
  get regionsUrl() {return this.config.baseUrl + this._regionsUrl; }
  get zonesUrl() {return this.config.baseUrl + this._zonesUrl; }
  get woredasUrl() {return this.config.baseUrl + this._woredasUrl; }
  get kebelesUrl() {return this.config.baseUrl + this._kebelesUrl; }
}
