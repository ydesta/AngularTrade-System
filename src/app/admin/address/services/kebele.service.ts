import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { KebeleModel } from "../models/kebele.model";
import { Observable } from "rxjs";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { EndpointFactory } from "src/@custor/services/security/endpoint-factory.service";

@Injectable()
export class KebeleService extends EndpointFactory {
  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationService,
    injector: Injector
  ) {
    super(httpClient, config, injector);
  }
  private readonly _kebeleUrl: string = "api/Kebele";
  get kebeleUrl() {
    return this.config.baseUrl + this._kebeleUrl;
  }

  getKebele(id: number): Observable<any> {
    const endpointUrl = `${this.kebeleUrl}/${id}`;
    return this.http.get(endpointUrl);
  }

  getKebelesByStatus(isActive: boolean) {
    const endpointUrl = `${this.kebeleUrl}/${"GetKebeles"}/${isActive}`;
    return this.httpClient.get<[]>(endpointUrl);
  }

  GetKebelesByParentId(parentId: number) {
    const endpointUrl = `${
      this.kebeleUrl
    }/${"GetKebelesByParentId"}/${parentId}`;
    return this.httpClient.get<[]>(endpointUrl);
  }
  addKebele(data: KebeleModel): Observable<KebeleModel> {
    const endpointUrl = `${this.kebeleUrl}`;
    return this.http.post<KebeleModel>(endpointUrl, data);
  }

  updateKebele(data: KebeleModel): Observable<KebeleModel> {
    const endpointUrl = `${this.kebeleUrl}`;
    return this.httpClient.put<KebeleModel>(endpointUrl, data);
  }

  deleteKebele(id: number) {
    const endpointUrl = `${this.kebeleUrl}/${id}`;
    return this.httpClient.delete<KebeleModel>(endpointUrl);
  }
}
