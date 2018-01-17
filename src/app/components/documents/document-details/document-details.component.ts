import {Component, OnInit, ViewChild} from '@angular/core';
import {Document, Message, NewMessage, UpdateObject} from '../../../model/project';
import {ActivatedRoute, Router} from '@angular/router';
import {DocumentService} from '../../../services/document/document.service';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {EndPointsSettings} from '../../../shared/end-points-settings';
import {Constants} from '../../../model/constants';
import {saveAs} from 'file-saver/FileSaver';
import {AuthService} from '../../../services/auth/auth.service';
import {MessageService} from 'primeng/components/common/messageservice';
import {isNumber} from 'util';
import {PublicationService} from '../../../services/publication/publication.service';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.css']
})
export class DocumentDetailsComponent implements OnInit {

  dateFormat: string = Constants.FILE_DATE_FORMAT;

  messages: Message[];

  document: Document;
  documentId: number;
  isOwner: boolean = false;
  isManagerOfProject: boolean = false;

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
              private publicationService: PublicationService,
              private messageService: MessageService,
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
      this.checkUserIsOwner();
      this.checkUserIsManagerOfProject();
    });
  }

  unlockDocument() {
    this.documentService.unlock(this.documentId)
      .then(() => {
        this.refresh();
      });
  }

  addComment(text: string) {
    if (text === '') {
      return;
    }
    const message = new NewMessage(1, this.document.id, text);
    this.documentService.addMessage(message).then(() => {
      this.loadMessages();
    });
  }

  loadMessages() {
    this.documentService.getAllMessages(this.document.id)
      .then((messages) => {
        this.messages = messages;
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

  acceptDocumentDialog(document: UpdateObject) {
    this.documentService.update(document).then(() => {
      this.refresh();
    });
  }

  acceptNewPublication(document: UpdateObject) {
    this.publicationService.new(document).then(() => {
      this.router.navigate(['/publication']);
    });
  }


  removeDocument(documentId: number) {
    this.documentService.remove(documentId).then((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'info',
          summary: 'Document',
          detail: 'Pomyślnie usunięto document'
        });
        this.router.navigate(['/documents']);
      }
    });
  }

  checkUserIsOwner() {
    this.documentService.checkUserIsOwner(this.documentId)
      .then((res) => {
        this.isOwner = res as boolean;
      });
  }

  checkUserIsManagerOfProject() {
    this.documentService.checkUserIsManagerOfProject(this.documentId)
      .then((res) => {
      debugger;
        this.isManagerOfProject = res as boolean;
      });
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
