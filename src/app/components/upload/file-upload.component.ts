import {Component, Input, Output, EventEmitter} from '@angular/core';
import {EndPointsSettings} from '../../shared/end-points-settings';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import {extractStyleParams} from '@angular/animations/browser/src/util';

@Component({
  selector: 'app-file-upload',
  template: `
    <div>
      <p>File Upload - select file (max 2MB):</p>
      <input type='file' (change)='changeHandler($event)'>
      <span class='badge badge-primary' [hidden]='!progress'>{{progress}} %</span>
    </div>`
})

export class FileUploadComponent {

  @Input() documentId: number;

  // @Input() url: string;
  @Output() uploaded = new EventEmitter();
  private url = EndPointsSettings.UPLOAD;

  progress: number;
  maxSize: number = 2000000;

  constructor(private http: HttpClient) {

  }

  changeHandler(evt): void {
    const files = evt.target.files;

    if (files.length === 0) {
      return;
    }

    const file: File = files[0];
    if (file.size > this.maxSize) {
      alert('file is too big');
      return;
    }

    const formdata: FormData = new FormData();
    formdata.append('fileUpload', file);
    const req = new HttpRequest('POST', this.url, formdata, {
      reportProgress: true,
      params: new HttpParams().append('documentId', this.documentId.toString()),
      responseType: 'text'
    });

    this.http.request(req).subscribe(() => {
    });
  }
}
