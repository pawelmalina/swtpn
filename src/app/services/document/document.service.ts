import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {EndPointsSettings} from '../../shared/end-points-settings';
import {ResponseType} from '@angular/http';
import {toPromise} from 'rxjs/operator/toPromise';

@Injectable()
export class DocumentService {


  private apiUrl = EndPointsSettings.DOCUMENT;

  constructor(private http: HttpClient) {
  }

  getById(id: number): Promise<any> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.get(url)
      .toPromise()
      .then(response => {
        console.log(response);
        return response as Document;
      })
      .catch(this.handleError);
  }

  unlock(documentId: number): Promise<any> {
    const url = `${this.apiUrl}/unlock`;
    const params: HttpParams = new HttpParams().set('documentId', documentId.toString())
    return this.http.post(url, null, {params: params})
      .toPromise()
      .catch(this.handleError);
  }

  lock(documentId: number, lockToDate: Date) {
    const url = `${this.apiUrl}/lock`;
    const params: HttpParams = new HttpParams().set('documentId', documentId.toString())
      .set('toDate', lockToDate.getMilliseconds().toString());
    return this.http.post(url, null, {params: params})
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
