import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserInstructionModel, UserInstructionViewModel} from '../../model/user-instruction.model';
import { EndpointFactory } from 'src/@custor/services/security/endpoint-factory.service';
import { ConfigurationService } from 'src/@custor/services/configuration.service';

@Injectable({
    providedIn: 'root'
})
export class UserInstructionApiService extends EndpointFactory {
    private readonly instructionUrl: string = 'api/UserInstruction';

    constructor(private httpClient: HttpClient,
                private config: ConfigurationService,
                injector: Injector) {
        super(httpClient, config, injector);

    }

    get getUserInstructionUrl() {
        return this.config.baseUrl + this.instructionUrl;
    }

    getUserInstruction(userInstructionId) {
        const endpointUrl = `${this.getUserInstructionUrl}/${userInstructionId}`;
        return this.httpClient.get<UserInstructionModel>(endpointUrl);
    }
    getUserInstructionsByServiceId(serviceId, lang) {
        const endpointUrl = `${this.getUserInstructionUrl}/${serviceId}/${lang}`;
        return this.httpClient.get<Array<UserInstructionViewModel>>(endpointUrl);
    }

    saveUserInstructionsByServiceId(data) {
        const endpointUrl = `${this.getUserInstructionUrl}`;
        return this.httpClient.post<UserInstructionModel>(endpointUrl, data);
    }

    updateUserInstructionsByServiceId(data, isRearrange) {
        const endpointUrl = `${this.getUserInstructionUrl}/${isRearrange}`;
        return this.httpClient.put<UserInstructionModel>(endpointUrl, data);
    }

    delelteUserInstructionsById(id) {
        const endpointUrl = `${this.getUserInstructionUrl}/${id}`;
        return this.httpClient.delete<UserInstructionModel>(endpointUrl);
    }


}
