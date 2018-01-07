import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EndPointsSettings} from '../../shared/end-points-settings';

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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
