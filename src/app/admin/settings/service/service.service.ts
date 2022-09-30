import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {ConfigurationService} from 'src/@custor/services/configuration.service';
import {EndpointFactory} from 'src/@custor/services/security/endpoint-factory.service';
import { Service } from '../model/service.model';
@Injectable({
    providedIn: 'root'
})
export class ServiceApiService extends EndpointFactory {
    serviceList: Service = new Service();
    private readonly _serviceUrl: string = 'api/Services/GetAllServicesByLang';
    constructor(private httpClient: HttpClient,
                private config: ConfigurationService,
                injector: Injector) {
        super(httpClient, config, injector);
    }
    get serviceUrl() {
        return this.config.baseUrl + this._serviceUrl;
    }
    getServicesByLang(lang): Observable<any> {
        const endpointUrl = `${this.serviceUrl}/${lang}`;
        return this.httpClient.get<Service>(endpointUrl).pipe(
            map(status => {
                this.serviceList = status;
                return this.serviceList;
            }),
        );
    }
}
