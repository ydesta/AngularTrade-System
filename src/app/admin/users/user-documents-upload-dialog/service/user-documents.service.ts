import {Injectable, Injector} from '@angular/core';
import {EndpointFactory} from 'src/@custor/services/security/endpoint-factory.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from 'src/@custor/services/configuration.service';

@Injectable()
export class UserDocumentsService extends EndpointFactory {
  private _userDocumentsUrl = 'api/Document';
  private readonly _userDocumentByTinAndCodeUrl: string = 'api/Document/userDocuments';

  constructor(private httpClient: HttpClient,
              private config: ConfigurationService,
              injector: Injector) {
    super(httpClient, config, injector);
  }

  get getRequiredDocumentUrl() {
    return this.config.baseUrl + this._userDocumentsUrl;
  }

  get userDocumentByTinAndCodeUrlUrl() {
    return this.config.baseUrl + this._userDocumentByTinAndCodeUrl;
  }




  getRequiredUserDocuments(): Observable<any>{
    const endpointUrl = `${this.getRequiredDocumentUrl}`;
    return this.httpClient.get(endpointUrl, this.getRequestHeaders()).pipe(
      map(result => {
        return result;
      }));
  }
  getUserDocuments(tin, documentCode): Observable<any> {
    const endpointUrl = `${this.userDocumentByTinAndCodeUrlUrl}/${tin}/${documentCode}`;
    return this.httpClient.get(endpointUrl, this.getRequestHeaders()).pipe(
      map(result => {
        return result;
      }));
  }

  deleteDocument(documentId: number, keywords: string) {
    const endpointUrl = `${this.userDocumentByTinAndCodeUrlUrl}/${documentId}/${keywords}`;
    return this.httpClient.delete(endpointUrl);
  }
}
