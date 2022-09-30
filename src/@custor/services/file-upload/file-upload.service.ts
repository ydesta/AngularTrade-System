import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ConfigurationService } from 'src/@custor/services/configuration.service';

@Injectable()
export class FileUploadService {

  newUpload = new Subject<{ Link: '', Id: 0, Index: 0 }>();
  _documentUrl = '';
  _preRequisiteDocumentUploadUrl = 'api/Document';
  _userDocumentUploadUrl = 'api/Document/userDocument';

  constructor(private httpClient: HttpClient, private config: ConfigurationService) {
  }

  get getDocumentUrl() {
    return this.config.baseUrl + this._documentUrl;
  }

  public upload(file, index, type) {
    this._documentUrl = type === 0 ? this._userDocumentUploadUrl : this._preRequisiteDocumentUploadUrl;    
    return this.httpClient.post<any>(this.getDocumentUrl, file, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

        switch (event.type) {

          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / event.total);
            return { status: 'progress', message: progress };

          case HttpEventType.Response:
            this.newUpload.next({
              Link: event.body.KeyWords,
              Id: event.body.DocumentId,
              Index: index
            });
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
        }
      })
    );
  }

  get newlyUploadedDocument(): Observable<any> {
    return this.newUpload.asObservable();
  }
}
