import {Component, OnInit, ViewChild} from '@angular/core';
import {Document} from '../../../model/project';
import {ActivatedRoute, Router} from '@angular/router';
import {DocumentService} from '../../../services/document/document.service';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {EndPointsSettings} from '../../../shared/end-points-settings';
import {Constants} from '../../../model/constants';
import {saveAs} from 'file-saver/FileSaver';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.css']
})
export class DocumentDetailsComponent implements OnInit {

  dateFormat: string = Constants.FILE_DATE_FORMAT;

  document: Document;
  documentId: number;

  private uploadUrl = EndPointsSettings.UPLOAD;
  private downloadUrl = EndPointsSettings.DOWNLOAD;

  progress: number;
  maxSize: number = 5000000;

  isFileUploaded: Boolean = false;
  isFileBlocked: boolean = false;

  calendarValue: Date = this.initialDate(new Date());
  calendarMinDate: Date = this.initialDate(new Date());
  calendarMaxDate: Date = this.initialDate(new Date(), 14);

  @ViewChild('uploadComponent') uploadComponent;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private authService: AuthService,
              private documentService: DocumentService,
              private router: Router) {
    route.params
      .subscribe(
        (params: { id }) => {
          this.documentId = params.id;
          this.refresh();
        });
  }

  ngOnInit() {
  }

  initialDate(date: Date, numberOfDays: number = 1): Date {
    date.setMilliseconds(new Date().getMilliseconds() + Constants.ONE_DAY_IN_MILLISECONDS * numberOfDays);
    return date;
  }

  lockDocument() {
    this.documentService.lock(this.document.id, this.calendarValue)
      .then(() => {
        this.refresh();
      });
  }

  refresh() {
    this.documentService.getById(this.documentId).then((response) => {
      this.document = response;
    });
  }

  unlockDocument() {
    this.documentService.unlock(this.documentId)
      .then(() => {
        this.refresh();
      });
  }

  canUnlock(): boolean {
    const currentId = this.authService.user.id;
    return currentId === this.document.blockedBy.id;
  }

  clearSelectedFile() {
    this.isFileUploaded = false;
    this.uploadComponent.clear();
  }

  onSelect(event) {
    this.isFileUploaded = true;
  }

  download(fileId) {
    window.open(this.downloadUrl + fileId);
  }


  onUpload(event) {
    const files = event.files;

    if (files.length === 0) {
      return;
    }

    const file: File = files[0];
    if (file.size > this.maxSize) {
      alert('file is too big'); // message here
      return;
    }

    const formdata: FormData = new FormData();
    formdata.append('fileUpload', file);
    const req = new HttpRequest('POST', this.uploadUrl, formdata, {
      reportProgress: true,
      params: new HttpParams().append('documentId', this.documentId.toString()),
      responseType: 'text'
    });

    this.http.request(req).subscribe(() => {
      this.uploadComponent.clear();
      this.isFileUploaded = false;
      this.refresh();
    });
  }
}
