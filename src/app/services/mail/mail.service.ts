import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EndPointsSettings} from '../../shared/end-points-settings';
import {Mail} from '../../model/user';

@Injectable()
export class MailService {

  private apiUrl = EndPointsSettings.MAIL;

  constructor(private http: HttpClient) {
  }


  send(to: string, subject: string, content: string) {
    const url = `${this.apiUrl}`;

    const mail: Mail = new Mail();
    mail.to = to;
    mail.subject = subject;
    mail.text = content;

    return this.http.post(url, mail).toPromise();
  }
}
