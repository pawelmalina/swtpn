import { Component, OnInit } from '@angular/core';
import {DocumentShort, NameAndId} from '../../../model/project';
import {DocumentService} from '../../../services/document/document.service';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit {

  documentsNames: DocumentShort[];

  constructor(private documentService: DocumentService) {
    this.documentService.getDocumentAssignedWithUser().then((documents) => {
      this.documentsNames = documents as DocumentShort[];
    });
  }




  ngOnInit() {
  }

}
