import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MemberAuditorDTO } from '../member-auditor/_interface/memberauditor.model';
import { EndpointFactory } from 'src/@custor/services/security/endpoint-factory.service';
import { ConfigurationService } from 'src/@custor/services/configuration.service';
//import { PaginationService } from 'src/@custor/services/pagination.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberAuditorService extends EndpointFactory {

  constructor(public http: HttpClient,
    private config: ConfigurationService, 
    //private paginationService: PaginationService,
    injector: Injector) {
super(http, config, injector);
 }
 
  public getData = (route: string) => {
    return this.http.get(this.createCompleteRoute(route));
  }
  public create = (route: string, body) => {
    return this.http.post(this.createMemberAuditorRoute(route), body, this.generateHeaders());
  }
  public update = (route: string, body) => {
    return this.http.put(this.createCompleteRoute(route), body, this.generateHeaders());
  }
  private createCompleteRoute = (route: string) => {
    return `${environment.baseUrl}${route}`;
  }
  private createMemberAuditorRoute = (route: string) => {
    return `${environment.baseUrl}${route}`;
  }
  memberAuditor: MemberAuditorDTO = new MemberAuditorDTO();
  private readonly _memberAuditorUrl: string = 'api/MemberAuditorAgrement';
  get memberAuditorUrl() {return this.config.baseUrl + this._memberAuditorUrl; }
  getMemberAuditor(id): Observable<any> {
    const endpointUrl = `${this.memberAuditorUrl}/${id}`;
    return this.http.get<MemberAuditorDTO>(endpointUrl, this.getRequestHeaders()).pipe(
      map(data => {
        this.memberAuditor = data;
        return this.memberAuditor;
      }));
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }

}
