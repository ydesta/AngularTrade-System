import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ConfigurationService} from 'src/@custor/services/configuration.service';
import {EndpointFactory} from 'src/@custor/services/security/endpoint-factory.service';
import {PaginationService} from 'src/@custor/services/pagination.service';
import {Prerequisite, ServicePrerequisite} from 'src/app/admin/prerequisite/models/prerequisite.model';
import {PrerequisiteParameters, ServicePrerequisiteParameters} from '../models/serviceprerequisiteparameter';
//import {CustomerServiceParameters} from '../../../main/customer/components/customer-services/models/customer-service.model';
import {PagedResult} from '../models/static-data.model';
@Injectable()
export class PrerequisiteService extends EndpointFactory {
    constructor(private httpClient: HttpClient,
                private config: ConfigurationService, private paginationService: PaginationService,
                injector: Injector) {
        super(httpClient, config, injector);
    }
    private readonly _getPrerequisiteUrl: string = 'api/Prerequisite/GetPrerequisite';
    private readonly _getPrerequisitesUrl: string = 'api/Prerequisite/GetAllPrerequisites';
    private readonly _getPrerequisitesNotAssighnedToServicesUrl: string = 'api/Prerequisite/GetAllPrerequisitesNotAssighendToService';
    private readonly _savePrerequisiteUrl: string = 'api/Prerequisite/SavePrerequisite';
    private readonly _updatePrerequisiteUrl: string = 'api/Prerequisite/UpdatePrerequisite';
    private readonly _deletePrerequisiteUrl: string = 'api/Prerequisite';
    private readonly _alterServicePrerequisiteUrl: string = 'api/serviceprerequisite';
    private readonly _getAllPrerequisiteByServiceUrl: string = 'api/Prerequisite/GetAllPrerequisiteByService';

    preRequisiteDTO: any = [];
    get PrerequisiteURL() {
        return this.config.baseUrl + this._getPrerequisiteUrl;
    }
  protected getRequestHeaders2(): any {
    const rHeaders = new HttpHeaders()
      .append('Authorization', 'Bearer ' + this.authService.accessToken)
      .append( 'Content-Type', 'application/json')
      // tslint:disable-next-line:max-line-length
      .append('Accept',  `application/vnd.iman.v${EndpointFactory.apiVersion}+json, application/json, text/plain, */*`)
      .append('App-Version', ConfigurationService.appVersion);
    return rHeaders;
  }
    get PrerequisitesURL() {
        return this.config.baseUrl + this._getPrerequisitesUrl;
    }
    get PrerequisitesNotAssighnedToServicesURL() {
        return this.config.baseUrl + this._getPrerequisitesNotAssighnedToServicesUrl;
    }
    get postPrerequisiteURL() {
        return this.config.baseUrl + this._savePrerequisiteUrl;
    }
    get putPrerequisiteURL() {
        return this.config.baseUrl + this._updatePrerequisiteUrl;
    }
    get deletePrerequisiteURL() {
        return this.config.baseUrl + this._deletePrerequisiteUrl;
    }
    get PrerequisitesByServiceURL() {
        return this.config.baseUrl + this._getAllPrerequisiteByServiceUrl;
    }
    get alterServicePrerequisiteURL() {
        return this.config.baseUrl + this._alterServicePrerequisiteUrl;
    }

    // postedPreRequisiteDTO: Prerequisite = new Prerequisite();

    getPrerequisite(PrerequisiteId: number): Observable<any>  {
        const endpointUrl = `${this.PrerequisiteURL}/${PrerequisiteId}`;
        return this.httpClient.get<Prerequisite>(endpointUrl);
    }
    getPrerequisites(parameters: PrerequisiteParameters): Observable<any>  {
        const endpointUrl = `${this.PrerequisitesURL}`;
        const mParams = new HttpParams()
            .append('PageCount', parameters.PageSize.toString())
            .append('PageNumber', parameters.PageIndex.toString())
            .append('Lang', parameters.Lang);
        return this.httpClient.get<PagedResult>(endpointUrl, {headers: this.getRequestHeaders2(), params: mParams});
    }
    savePrerequisite(prerequisite: Prerequisite): Observable<any> {
        return this.httpClient.post<Prerequisite>(this.postPrerequisiteURL, prerequisite, this.getRequestHeaders());
    }
    editPrerequisite(prerequisite: Prerequisite): Observable<any> {
        return this.httpClient.put<Prerequisite>(this.putPrerequisiteURL, prerequisite, this.getRequestHeaders());
    }
    deletePrerequisite(PrerequisiteId: number): Observable<any> {
        const endpointUrl = `${this.deletePrerequisiteURL}/${PrerequisiteId}`;
        return this.httpClient.delete<boolean>(endpointUrl, this.getRequestHeaders()).pipe(
            map(result => {
                return result;
            })
        );
    }
    getPrerequisitesNotAsshginedToServices(parameters: ServicePrerequisiteParameters): Observable<any>  {
        const endpointUrl = `${this.PrerequisitesNotAssighnedToServicesURL}`;
        const mParams = new HttpParams()
            .append('ServiceGuid', parameters.ServiceGuid.toString())
            .append('ExchangeActorType', parameters.ExchangeActorType.toString())
            .append('PageCount', parameters.PageSize.toString())
            .append('PageNumber', parameters.PageIndex.toString())
            .append('Lang', parameters.Lang);
        return this.httpClient.get<PagedResult>(endpointUrl, {headers: this.getRequestHeaders2(), params: mParams});
    }

    getServicePrerequisites(parameters: ServicePrerequisiteParameters): Observable<any>  {
        const endpointUrl = `${this.PrerequisitesByServiceURL}`;
        const mParams = new HttpParams()
            .append('ServiceGuid', parameters.ServiceGuid.toString())
            .append('ExchangeActorType', parameters.ExchangeActorType.toString())
            .append('PageCount', parameters.PageSize.toString())
            .append('PageNumber', parameters.PageIndex.toString())
            .append('Lang', parameters.Lang);
        return this.httpClient.get<PagedResult>(endpointUrl, {headers: this.getRequestHeaders2(), params: mParams});
    }
    saveServicePrerequisite(servicePrerequisite: ServicePrerequisite): Observable<any> {
        return this.httpClient.post<ServicePrerequisite>(this.alterServicePrerequisiteURL, servicePrerequisite, this.getRequestHeaders());
    }
    deleteServicePrerequisite(ServicePrerequisiteId: number): Observable<any> {
       const endpointUrl = `${this.alterServicePrerequisiteURL}/${ServicePrerequisiteId}`;
       return this.httpClient.delete<boolean>(endpointUrl, this.getRequestHeaders()).pipe(
            map(result => {
                return result;
            })
        );
    }
    editServicePrerequisite(ServicePrerequisiteId: number, isRequired: boolean, IsActive: boolean, IsDocument: boolean): Observable<any> {
        const endpointUrl = `${this.alterServicePrerequisiteURL}/${ServicePrerequisiteId}/${isRequired}/${IsActive}/${IsDocument}`;
        return this.httpClient.put<boolean>(endpointUrl, this.getRequestHeaders()).pipe(
            map(result => {
                return result;
            })
        );
    }
}
