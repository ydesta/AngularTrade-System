import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ZoneModel } from "../models/zone.model";
import { Observable } from "rxjs";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { AuthService } from "src/@custor/services/security/auth.service";
import { EndpointFactory } from "src/@custor/services/security/endpoint-factory.service";

@Injectable()
export class ZoneService extends EndpointFactory {
  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationService,
    authService: AuthService,
    injector: Injector
  ) {
    super(httpClient, config, injector);
  }
  private readonly _zoneUrl: string = "api/Zone";
  get zoneUrl() {
    return this.config.baseUrl + this._zoneUrl;
  }

  getZone(id: number): Observable<any> {
    const endpointUrl = `${this.zoneUrl}/${'GetZoneByZoneId'}/${id}`;
    return this.http.get(endpointUrl);
  }

  getZonesByStatus(isActive: boolean) {
    const endpointUrl = `${this.zoneUrl}/${"GetZones"}/${isActive}`;
    return this.httpClient.get<[]>(endpointUrl);
  }

  GetZonesByParentIdAndLang(regionId: number, lang: string) {
    const endpointUrl = `${
      this.zoneUrl
    }/${"GetZonesByParentIdAndLang"}/${regionId}/${lang}`;
    return this.httpClient.get<[]>(endpointUrl);
  }

  GetZonesByParentId(regionId: number){
    const endpointUrl = `${
      this.zoneUrl
    }/${"GetZonesByParentId"}/${regionId}`;
    return this.httpClient.get<[]>(endpointUrl);
  }
  addZone(data: ZoneModel): Observable<ZoneModel> {
    const endpointUrl = `${this.zoneUrl}`;
    return this.http.post<ZoneModel>(
      endpointUrl,
      data
    );
  }

  updateZone(data: ZoneModel): Observable<ZoneModel> {
    const endpointUrl = `${this.zoneUrl}`;
    return this.httpClient.put<ZoneModel>(
      endpointUrl,
      data
    );
  }

  deleteZone(id: number) {
    const endpointUrl = `${this.zoneUrl}/${id}`;
    return this.httpClient.delete<ZoneModel>(
      endpointUrl
    );
  }
}
