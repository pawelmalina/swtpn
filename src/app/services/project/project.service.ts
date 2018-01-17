import {Injectable} from '@angular/core';
import {EndPointsSettings} from '../../shared/end-points-settings';
import {Message, NewMessage, Project, ProjectsNames, UpdateObject} from '../../model/project';
import {Response} from '../../model/response';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class ProjectService {

  private apiUrl = EndPointsSettings.PROJECT;

  private projects: Project[];

  constructor(private state: AuthService,
              private http: HttpClient) {
  }

  getAll(): Promise<any> {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(response => response as Response)
      .catch(this.handleError);
  }

  getProjectNames(): Promise<any> {
    const id = this.state.user.id;
    return this.http.get(this.apiUrl + '/where-user-is/' + id)
      .toPromise()
      .then(response => response as ProjectsNames[])
      .catch(this.handleError);
  }

  addUsersToProject(projectId: number, usersIds: number[]) {
    const url = `${this.apiUrl}/add-users-to-project/${projectId}`;

    return this.http.post(url, usersIds)
      .toPromise();
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

  add(project: UpdateObject) {
    const url = `${this.apiUrl}/add`;

    return this.http.post(url, project)
      .toPromise()
      .then(res => res as boolean)
      .catch(this.handleError);
  }

  remove(id: number) {
    const url = `${this.apiUrl}/remove/${id}`;
    return this.http.post(url, null)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  removeUser(projectId: number, userId: number) {
    const url = `${this.apiUrl}/remove-users-from-project/${projectId}`;

    return this.http.post(url, userId).toPromise();
  }

  update(project: UpdateObject) {
    const url = `${this.apiUrl}/update-project/`;

    return this.http.post(url, project)
      .toPromise()
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
