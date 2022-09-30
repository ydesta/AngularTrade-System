import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {ConfigurationService} from 'src/@custor/services/configuration.service';
import {EndpointFactory} from 'src/@custor/services/security/endpoint-factory.service';
import {LegalStatus} from '../model/legalsstatus.model';
@Injectable({
    providedIn: 'root'
})
export class LegalStatusService extends EndpointFactory {
    status: LegalStatus = new LegalStatus();
    private readonly _legalStatusUrl: string = 'api/LegalStatus';
    private readonly _legalStatusForDocumentUrl: string = 'api/LegalStatus/GetLegalCondtionsForDocument';
    constructor(private httpClient: HttpClient,
                private config: ConfigurationService,
                injector: Injector) {
        super(httpClient, config, injector);
    }
    get legalStatusUrl() {
        return this.config.baseUrl + this._legalStatusUrl;
    }
    get legalStatusForDocumentUrl() {
        return this.config.baseUrl + this._legalStatusForDocumentUrl;
    }
    getLegalStatusByLang(lang): Observable<any> {
        const endpointUrl = `${this.legalStatusUrl}/${lang}`;
        return this.httpClient.get<LegalStatus>(endpointUrl).pipe(
            map(status => {
                this.status = status;
                return this.status;
            }),
        );
    }
    getLegalStatusForDocument(lang): Observable<any> {
        const endpointUrl = `${this.legalStatusForDocumentUrl}/${lang}`;
        return this.httpClient.get<LegalStatus>(endpointUrl).pipe(
            map(status => {
                this.status = status;
                return this.status;
            }),
        );
    }
}
