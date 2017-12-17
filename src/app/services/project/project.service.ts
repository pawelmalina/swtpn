import {Injectable} from '@angular/core';
import {EndPointsSettings} from '../../shared/end-points-settings';
import {Message, NewMessage, Project, ProjectsNames} from '../../model/project';
import {Response} from '../../model/response';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs';

@Injectable()
export class ProjectService {

  private apiUrl = EndPointsSettings.PROJECT;

  private projects: Project[];

  constructor(private http: HttpClient) {
  }

  getAll(): Promise<any> {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(response => response as Response)
      // .then(res => res.embedded as Project[])
      .catch(this.handleError);
  }

  getProjectNames(): Promise<any> {
    return this.http.get(this.apiUrl + '/all-names')
      .toPromise()
      .then(response => response as ProjectsNames[])
      // .then(res => res.embedded as Project[])
      .catch(this.handleError);
  }


  getById(id: number): Promise<any> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.get(url)
      .toPromise()
      .then(response => {
        console.log(response);
        return response as Project;
      })
      .catch(this.handleError);
  }

  add(project: Project): Promise<any> {
    return this.http.post(this.apiUrl, project)
      .toPromise()
      .then(response => response as Project)
      .catch(this.handleError);
  }

  remove(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  update(project: Project): Promise<any> {
    const url = `${this.apiUrl}/${project.id}`;

    return this.http.put(url, project)
      .toPromise().then(() => project)
      .catch(this.handleError);
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
