import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from 'src/@custor/services/configuration.service';
import { ReportSetting, RenewalSetting } from '../model/report.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { applicationApis } from 'src/app/main/services/applicationApis';
import { LookUp, LookUpType } from 'src/app/common/models/static-data.model';

@Injectable({
  providedIn: 'root'
})
export class ReportSettingService {

  constructor(
   private httpClient: HttpClient,
    private config: ConfigurationService
  ) {
    this.httpClient = httpClient;
  }

  // updateCommodityType(postData: ReportSetting): Observable<any> {
  //   const endpointUrl = `${applicationApis.generalSetting}`;
  //   return this.httpClient.put<any>(endpointUrl, postData, this.httpOptions)
  //     .pipe(map(data => {
  //       return data;
  //     }));
  // }
  updateSetting(data) {
    const endpointUrl = `${applicationApis.generalSetting}`;
    return this.httpClient.post<ReportSetting>(endpointUrl, data);
}

updateRenewalSetting(data) {
  const endpointUrl = `${applicationApis.RenewalSetting}`;
  return this.httpClient.post<RenewalSetting>(endpointUrl, data);
}
  getSetting(): Observable<any> {
    const endpointUrl = `${applicationApis.generalSetting}`;
        return this.httpClient.get(endpointUrl).pipe(
      map(result => result as ReportSetting[]));
  }
  getRenewalSetting(): Observable<any> {
    const endpointUrl = `${applicationApis.RenewalSetting}`;
        return this.httpClient.get(endpointUrl).pipe(
      map(result => result as RenewalSetting[]));
  }

  saveLookup(postData:LookUp ): Observable<any> {
    const endpointUrl = `${applicationApis.LookupSetting}`;
    return this.httpClient.post<any>(endpointUrl, postData)
      .pipe(map(data => {
        return data;
      }));
      
  }

  saveLookupType(postData:LookUpType ): Observable<any> {
    const endpointUrl = `${applicationApis.LookupTypeSetting}`;
    return this.httpClient.post<any>(endpointUrl, postData)
      .pipe(map(data => {
        return data;
      }));
    }

}
