import {Component, Input, OnInit} from '@angular/core';
import {Project, Publication} from '../../../model/project';
import {PublicationService} from '../../../services/publication/publication.service';
import {EndPointsSettings} from '../../../shared/end-points-settings';

@Component({
  selector: 'app-publications-list',
  templateUrl: './publications-list.component.html',
  styleUrls: ['./publications-list.component.css'],
  providers: []
})
export class PublicationsListComponent implements OnInit {

  private downloadUrl = EndPointsSettings.DOWNLOAD;

  publications: Publication[];

  constructor(private publicationService: PublicationService) {
    this.loadPublications();
  }

  ngOnInit() {
  }

  download(fileId) {
    window.open(this.downloadUrl + fileId);
  }

  loadPublications() {
    this.publicationService.getAll().then((res) => {
      this.publications = res;
    });
  }

}
