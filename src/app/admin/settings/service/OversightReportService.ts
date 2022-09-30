import { Injectable, Injector } from '@angular/core';
import { EndpointFactory } from 'src/@custor/services/security/endpoint-factory.service';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from 'src/@custor/services/configuration.service';
import { CriteriasModel } from '../model/criteriasModel';

@Injectable({
  providedIn: 'root'
})
export class OversightReportService extends EndpointFactory {
  UpdateCriteria
  private readonly OversightFolloupCriteriaUrl: string = 'api/OversightReportCriteriaController';
  private readonly UpdateOversightFolloupCriteriaUrl: string = 'api/OversightReportCriteriaController/UpdateCriteria';

  private readonly OversightFollouptReportUrl: string = 'api/OversightReport';
  public currentyear: number;
  public quarter: number;
  constructor(private httpClient: HttpClient,
    private config: ConfigurationService,
    injector: Injector) {
    super(httpClient, config, injector);
    this.currentyear = new Date().getFullYear() - 1;
  }
  get oversightFollowUpCriteriaEndpoint() {
    return this.config.baseUrl + this.OversightFolloupCriteriaUrl;
  }

  get UpdateFolloupCriteriaUrl() {
    return this.config.baseUrl + this.UpdateOversightFolloupCriteriaUrl;
  }
 
  get UrlEndpoint() {
    return this.config.baseUrl + this.OversightFollouptReportUrl;
  }

  deleteCriteriaById(id) {
    const endpointUrl = `${this.oversightFollowUpCriteriaEndpoint}/${id}`;
    return this.httpClient.delete<CriteriasModel>(endpointUrl);
}
  getCriteriaList(exchangeActorType: number) {
    return this.httpClient.get(this.oversightFollowUpCriteriaEndpoint + '/' + exchangeActorType);
  }
  getAllCriteriaList() {
    return this.httpClient.get(this.oversightFollowUpCriteriaEndpoint);
  }

  saveReportCriteria(data: any) {
    return this.httpClient.post<number>(this.oversightFollowUpCriteriaEndpoint, data);
  }
  UpdateFolloupCriteria(data: any) {
    return this.httpClient.post<number>(this.UpdateFolloupCriteriaUrl, data);
  }

  nextYear() {
    return new Date().getFullYear();
  }
}


