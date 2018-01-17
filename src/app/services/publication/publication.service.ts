import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EndPointsSettings} from '../../shared/end-points-settings';
import {Publication, UpdateObject} from '../../model/project';

@Injectable()
export class PublicationService {

  private apiUrl = EndPointsSettings.PUBLICATION;


  constructor(private http: HttpClient) {

  }

  getAll(): Promise<any> {
    const url = `${this.apiUrl}/all`;
    return this.http.get(url).toPromise().then((res) => {
      return res as Publication[];
    });
  }

  new(documentObject: UpdateObject) {
    const url = `${this.apiUrl}/new`;
    return this.http.post(url, documentObject).toPromise();
  }

}
