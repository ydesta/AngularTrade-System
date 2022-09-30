import { EndpointFactory } from 'src/@custor/services/security/endpoint-factory.service';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from 'src/@custor/services/configuration.service';

@Injectable({
    providedIn: 'root'
})

export class SettingService extends EndpointFactory {
    private readonly OversightReportSettingsUrl: string = 'api/OversightReportSetting';
    constructor(private httpClient: HttpClient,
        private config: ConfigurationService,
        injector: Injector) {
        super(httpClient, config, injector);
    }
    get OversightReportSettingsEndpoint() {
        return this.config.baseUrl + this.OversightReportSettingsUrl;
    }
    saveDecisionType(data: any) {
        return this.httpClient.post<number>(this.OversightReportSettingsEndpoint, data);
    }
    getDecisionTypes() {
        return this.httpClient.get(this.OversightReportSettingsEndpoint);
    }
}