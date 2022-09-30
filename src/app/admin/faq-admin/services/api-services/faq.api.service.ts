import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from 'src/@custor/services/configuration.service';
import {EndpointFactory} from 'src/@custor/services/security/endpoint-factory.service';
import {FaqModel, FaqViewModel} from '../../model/faq.model';

@Injectable({
    providedIn: 'root'
})
export class FaqApiService extends EndpointFactory {
    private readonly faqUrl: string = 'api/Faq';

    constructor(private httpClient: HttpClient,
                private config: ConfigurationService,
                injector: Injector) {
        super(httpClient, config, injector);

    }

    get getFaqUrl() {
        return this.config.baseUrl + this.faqUrl;
    }

    getFaq(id) {
        const endpointUrl = `${this.getFaqUrl}/${id}`;
        return this.httpClient.get<FaqModel>(endpointUrl);
    }


    getFaqByLang(lang) {
        const endpointUrl = `${this.getFaqUrl}/${lang}`;
        return this.httpClient.get<Array<FaqViewModel>>(endpointUrl);
    }

    saveFaq(data) {
        const endpointUrl = `${this.getFaqUrl}`;
        return this.httpClient.post<FaqModel>(endpointUrl, data);
    }

    updateFaq(data) {
        const endpointUrl = `${this.getFaqUrl}`;
        return this.httpClient.put<FaqModel>(endpointUrl, data);
    }

    delelteFaqById(id) {
        const endpointUrl = `${this.getFaqUrl}/${id}`;
        return this.httpClient.delete<FaqModel>(endpointUrl);
    }


}
