import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RegionModel } from "../models/region.model";
import { Observable } from "rxjs";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { EndpointFactory } from "src/@custor/services/security/endpoint-factory.service";

@Injectable()
export class RegionService extends EndpointFactory {
  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationService,
    injector: Injector
  ) {
    super(httpClient, config, injector);
  }
  private readonly _regionUrl: string = "api/Region";
  get regionUrl() {
    return this.config.baseUrl + this._regionUrl;
  }

  getRegion(id: number): Observable<any> {
    const endpointUrl = `${this.regionUrl}/${"GetRegion"}/${id}`;
    return this.httpClient.get(endpointUrl);
  }

  getRegionByLang(lang: string) {
    const endpointUrl = `${this.regionUrl}/${lang}`;
    return this.httpClient.get<[]>(endpointUrl);
  }

  getAllRegion() {
    const endpointUrl = `${this.regionUrl}`;
    return this.httpClient.get<[]>(endpointUrl);
  }

  addRegion(data: RegionModel): Observable<RegionModel> {
    const endpointUrl = `${this.regionUrl}`;
    return this.httpClient.post<RegionModel>(endpointUrl, data);
  }

  updateRegion(data: RegionModel): Observable<RegionModel> {
    const endpointUrl = `${this.regionUrl}`;
    return this.httpClient.put<RegionModel>(endpointUrl, data);
  }

  deleteRegion(id: number) {
    const endpointUrl = `${this.regionUrl}/${id}`;
    return this.httpClient.delete<RegionModel>(endpointUrl);
  }

  getNonCacheRegion(lang: string){
    const endpointUrl = `${this.regionUrl}/${'GetNonCacheRegion'}/${lang}`;
    return this.httpClient.get<[]>(endpointUrl);
  }
}
