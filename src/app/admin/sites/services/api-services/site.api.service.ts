import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SiteModel, SiteViewModel} from '../../model/site.model';
import { EndpointFactory } from 'src/@custor/services/security/endpoint-factory.service';
import { ConfigurationService } from 'src/@custor/services/configuration.service';

@Injectable({
    providedIn: 'root'
})
export class SiteApiService extends EndpointFactory {
    private readonly siteUrl: string = 'api/Sites';

    constructor(private httpClient: HttpClient,
                private config: ConfigurationService,
                injector: Injector) {
        super(httpClient, config, injector);

    }

    get getSiteUrl() {
        return this.config.baseUrl + this.siteUrl;
    }

    getSite(id) {
        const endpointUrl = `${this.getSiteUrl}/${id}`;
        return this.httpClient.get<SiteModel>(endpointUrl);
    }


    getSiteByLang(byActive, lang) {
        const endpointUrl = `${this.getSiteUrl}/${byActive}/${lang}`;
        return this.httpClient.get<Array<SiteViewModel>>(endpointUrl);
    }

    saveSite(data) {
        const endpointUrl = `${this.getSiteUrl}`;
        return this.httpClient.post<SiteModel>(endpointUrl, data);
    }

    updateSite(data) {
        const endpointUrl = `${this.getSiteUrl}`;
        return this.httpClient.put<SiteModel>(endpointUrl, data);
    }

    deleteSiteById(id) {
        const endpointUrl = `${this.getSiteUrl}/${id}`;
        return this.httpClient.delete<SiteModel>(endpointUrl);
    }


}
