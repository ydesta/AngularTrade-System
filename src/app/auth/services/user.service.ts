import { Injectable, Injector } from '@angular/core';
import { ConfigurationService } from 'src/@custor/services/configuration.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EndpointFactory } from 'src/@custor/services/security/endpoint-factory.service';
import { map } from 'rxjs/operators';
import { UserProfile} from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService extends EndpointFactory {
    private lang: string;
    user: UserProfile = new UserProfile();
    private readonly _checkTinFromRevenueUrl: string = 'api/Tin/checkTin';
    private readonly _checkRegistraitonUrl: string = 'api/Registration/GetRegistrationFromMain';
    private readonly _checkOnlineRegistraitonUrl: string = 'api/Registration/GetRegistrationsByTin';

    get checkExistingTinFromRevenueUrl() {
        return this.config.baseUrl + this._checkTinFromRevenueUrl;
    }

    get checkIfExistingRegistrationUrl() {
        return this.config.baseUrl + this._checkRegistraitonUrl;
    }

    get checkIfExistingOnlineRegistrationUrl() {
        return this.config.baseUrl + this._checkOnlineRegistraitonUrl;
    }

    // constructor(private configService: ConfigurationService, private httpClient: HttpClient) {
    //     this.lang = this.configService.language;
    // }
    constructor(private httpClient: HttpClient,
        private config: ConfigurationService,

        injector: Injector) {
        super(httpClient, config, injector);
    }

    getUser() {
        return this.authService.currentUser;
    }


    saveProfile(user: UserProfile) {
        const endpointUrl = this.config.baseUrl + 'api/customerProfile';
        return this.httpClient.put<UserProfile>(endpointUrl, user)
            .pipe(
                map(usr => {
                    this.user = usr;
                    return this.user;
                })
            );
    }


    checkExistingRegistration(Tin) {
        const lang = 'et';
        const endpointUrl = `${this.checkIfExistingRegistrationUrl}/${Tin}/${lang}`;
        return this.httpClient.get(endpointUrl);
    }

    checkExistingOnlineRegistration(Tin) {
        const lang = 'et';
        const endpointUrl = `${this.checkIfExistingOnlineRegistrationUrl}/${Tin}`;
        return this.httpClient.get<[]>(endpointUrl);
    }

    checkExistingTinFromRevenue(tin) {
        const endpointUrl = `${this.checkExistingTinFromRevenueUrl}/${tin}`;
        return this.httpClient.get(endpointUrl);
    }
}
