import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {EndPointsSettings} from '../../shared/end-points-settings';
import {ResponseType} from '@angular/http';
import {toPromise} from 'rxjs/operator/toPromise';
import {UpdateObject, NameAndId, DocumentShort, Message, NewMessage} from '../../model/project';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DocumentService {


  private apiUrl = EndPointsSettings.DOCUMENT;

  constructor(private authService: AuthService,
              private http: HttpClient) {
  }

  getById(id: number): Promise<any> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.get(url)
      .toPromise()
      .then(response => {
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
      .set('toDate', lockToDate.getTime().toString());
    return this.http.post(url, null, {params: params})
      .toPromise()
      .catch(this.handleError);
  }

  addDocument(documentObject: UpdateObject, projectId: number) {
    const url = `${this.apiUrl}/add-document/${projectId}`;

    return this.http.post(url, documentObject).toPromise();
  }

  update(documentObject: UpdateObject) {
    const url = `${this.apiUrl}/update-document`;

    return this.http.post(url, documentObject).toPromise();
  }

  remove(documentId: number) {
    const url = `${this.apiUrl}/remove/${documentId}`;
    return this.http.post(url, null).toPromise();
  }


  getDocumentAssignedWithUser() {
    const url = `${this.apiUrl}/assigned-with-user/${this.authService.user.id}`;

    return this.http.get(url).toPromise();
  }

  checkUserIsOwner(documentId: number) {
    const url = `${this.apiUrl}/check-user-is-owner/${documentId}`;

    return this.http.get(url).toPromise();
  }

  checkUserIsManagerOfProject(documentId: number) {
    const url = `${this.apiUrl}/check-user-is-manager-of-project/${documentId}`;

    return this.http.get(url).toPromise();
  }

  getAllMessages(projectId: number) {
    const url = `${this.apiUrl}/all-messages/${projectId}`;

    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response as Message[];
      })
      .catch(this.handleError);
  }

  addMessage(message: NewMessage): Promise<any> {
    const url = `${this.apiUrl}/add-message`;

    return this.http.post(url, message)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
