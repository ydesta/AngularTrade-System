import { Injectable, Injector } from "@angular/core";
import {
  StaticData,
  StaticData2,
  StaticData4,
  StaticData5,
  LookUp,
  LookUpType,
} from "../models/static-data.model";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { EndpointFactory } from "src/@custor/services/security/endpoint-factory.service";
import { applicationApis } from "../../main/services/applicationApis";

@Injectable()
export class LookUpService extends EndpointFactory {
  private readonly _allcountries: string = "api/nationalities";
  private readonly _alllookup: string = "api/lookup";
  private readonly _alllookup2: string = "api/lookup/GetLookups";
  private readonly _allservice: string = "api/service";
  private readonly _alllookupType: string = "api/lookup/GetAllLookUpType";

  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationService,
    injector: Injector
  ) {
    super(httpClient, config, injector);
  }

  get allCountryUrl() {
    return this.config.baseUrl + this._allcountries;
  }
  get allServiceUrl() {
    return this.config.baseUrl + this._allservice;
  }
  get allLookup() {
    return this.config.baseUrl + this._alllookup;
  }

  // get allLookupReport() {
  //   return this.config.reportUrl + this._alllookup;
  // }

  get allLookup2() {
    return this.config.baseUrl + this._alllookup2;
  }

  get alllookupType() {
    return this.config.baseUrl + this._alllookupType;
  }

  getAllCountry(lang: string): Observable<StaticData[]> {
    const endpointUrl = `${this.allCountryUrl}/${lang}`;
    return this.httpClient
      .get<StaticData[]>(endpointUrl, this.getRequestHeaders())
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  getLookup(lang: string, lookupTypeId: number) {
    const endpointUrl = `${this.allLookup}/${lang}/${lookupTypeId}`;
    return this.httpClient.get<StaticData[]>(endpointUrl).pipe(
      map((result) => {
        return result;
      })
    );
  }

  getLookupById(lookupTypeId: number) {
    const endpointUrl = `${this.allLookup}/${lookupTypeId}`;
    return this.httpClient.get<LookUp[]>(endpointUrl).pipe(
      map((result) => {
        return result;
      })
    );
  }
  getallLookUpType(): Observable<any> {
    const endpointUrl = `${this.alllookupType}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as LookUpType[]));
  }
  // getLookupOfFieldType(lang: string, lookupTypeId: number) {
  //   const endpointUrl = `${this.allLookupReport}/${lang}/${lookupTypeId}`;
  //   return this.httpClient.get<StaticData[]>(endpointUrl).pipe(
  //     map(result => {
  //       return result;
  //     }));
  // }
  // using GUID
  getLookup2(lang: string, lookupTypeId: number) {
    const endpointUrl = `${this.allLookup}/${lang}/${lookupTypeId}`;
    return this.httpClient.get<StaticData5[]>(endpointUrl).pipe(
      map((result) => {
        return result;
      })
    );
  }

  getServiceType(lang: string) {
    const endpointUrl = `${this.allServiceUrl}/${lang}`;
    return this.httpClient.get<StaticData[]>(endpointUrl);
  }

  // For Yeman
  getRegions(lang: string): Observable<any> {
    // remove
    // if (lang === null){
    //   lang = 'et';
    // }
    const endpointUrl = `${applicationApis.regionsUrl}${lang}`;
    return this.httpClient
      .get(endpointUrl)
      .pipe(map((result) => result as StaticData2[]));
  }

  getZonesByRegion(lang: string, regionID: number): Observable<StaticData2[]> {
    const endpointUrl = applicationApis.zonesUrl;
    return this.httpClient
      .get(`${endpointUrl}?lang=${lang}&regionId=${regionID}`)
      .pipe(map((result) => result as StaticData2[]));
  }
  getZones(lang: string): Observable<StaticData2[]> {
    const endpointUrl = applicationApis.zonesUrl;
    return this.httpClient
      .get(`${endpointUrl}/GetAll?lang=${lang}`)
      .pipe(map((result) => result as StaticData2[]));
  }
  getWoredasByZone(lang: string, zoneID: number): Observable<StaticData2[]> {
    const endpointUrl = applicationApis.woredasUrl;
    return this.httpClient
      .get(`${endpointUrl}?lang=${lang}&zoneId=${zoneID}`)
      .pipe(map((result) => result as StaticData2[]));
  }
  getWoredas(lang: string): Observable<StaticData2[]> {
    const endpointUrl = applicationApis.woredasUrl;
    return this.httpClient
      .get(`${endpointUrl}/GetAll?lang=${lang}`)
      .pipe(map((result) => result as StaticData2[]));
  }
  getKebelesByWoreda(
    lang: string,
    woredaID: number
  ): Observable<StaticData2[]> {
    const endpointUrl = applicationApis.kebelesUrl;
    return this.httpClient
      .get(`${endpointUrl}?lang=${lang}&woredaID=${woredaID}`)
      .pipe(map((result) => result as StaticData2[]));
  }
  getKebeles(lang: string): Observable<StaticData2[]> {
    const endpointUrl = applicationApis.kebelesUrl;
    return this.httpClient
      .get(`${endpointUrl}/GetAll?lang=${lang}`)
      .pipe(map((result) => result as StaticData2[]));
  }
  deleteLookupvalue(lookupid: number) {
    const endpointUrl = `${this.allLookup}/delete/${lookupid}`;
    return this.httpClient.delete<LookUp>(endpointUrl);
  }
  deleteLookupType(lookupTypeid: number) {
    const endpointUrl = `${this.allLookup}/deleteLookupType/${lookupTypeid}`;
    return this.httpClient.delete<LookUpType>(endpointUrl);
  }
}
