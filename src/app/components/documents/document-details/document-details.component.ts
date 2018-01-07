import {Component, OnInit, ViewChild} from '@angular/core';
import {Document} from '../../../model/project';
import {ActivatedRoute, Router} from '@angular/router';
import {DocumentService} from '../../../services/document/document.service';
import {debug} from 'util';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import {EndPointsSettings} from '../../../shared/end-points-settings';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.css']
})
export class DocumentDetailsComponent implements OnInit {

  document: Document;
  documentId: number;

  private url = EndPointsSettings.UPLOAD;

  progress: number;
  maxSize: number = 2000000;

  @ViewChild('uploadComponent') child;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private documentService: DocumentService,
              private router: Router) {
    route.params
      .subscribe(
        (params: { id }) => {
          documentService.getById(params.id).then((response) => {
            this.document = response;
            this.documentId = params.id;
          });
        });
  }

  ngOnInit() {

  }


  onUpload(event) {
    const files = event.files;

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
      this.child.clear();
    });


  }

}
