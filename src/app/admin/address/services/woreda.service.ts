import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WoredaModel } from "../models/woreda.model";
import { Observable } from "rxjs";
import { ConfigurationService } from "src/@custor/services/configuration.service";
import { EndpointFactory } from "src/@custor/services/security/endpoint-factory.service";

@Injectable()
export class WoredaService extends EndpointFactory {
  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationService,
    injector: Injector
  ) {
    super(httpClient, config, injector);
  }
  private readonly _woredaUrl: string = "api/Woreda";
  get woredaUrl() {
    return this.config.baseUrl + this._woredaUrl;
  }

  getWoreda(id: number): Observable<any> {
    const endpointUrl = `${this.woredaUrl}/${"GetWoredaById"}/${id}`;
    return this.httpClient.get(endpointUrl);
  }

  getWoredasByStatus() {
    const endpointUrl = `${this.woredaUrl}/${"GetWoredas"}`;
    return this.httpClient.get<[]>(endpointUrl);
  }

  GetWoredasByParentId(parentId: number) {
    const endpointUrl = `${
      this.woredaUrl
    }/${"GetWoredasByParentId"}/${parentId}`;
    return this.httpClient.get<[]>(endpointUrl);
  }

  GetWoredasByParentIdAndLang(parentId: number, lang: string) {
    const endpointUrl = `${
      this.woredaUrl
    }/${"GetWoredasByParentIdAndLang"}/${parentId}/${lang}`;
    return this.httpClient.get<[]>(endpointUrl);
  }

  addWoreda(data: WoredaModel): Observable<WoredaModel> {
    const endpointUrl = `${this.woredaUrl}`;
    return this.httpClient.post<WoredaModel>(endpointUrl, data);
  }

  updateWoreda(data: WoredaModel): Observable<WoredaModel> {
    const endpointUrl = `${this.woredaUrl}`;
    return this.httpClient.put<WoredaModel>(endpointUrl, data);
  }

  deleteWoreda(id: number) {
    const endpointUrl = `${this.woredaUrl}/${id}`;
    return this.httpClient.delete<WoredaModel>(endpointUrl);
  }
}
