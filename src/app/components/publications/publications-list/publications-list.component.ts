import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../model/project';

@Component({
  selector: 'app-publications-list',
  templateUrl: './publications-list.component.html',
  styleUrls: ['./publications-list.component.css'],
  providers: []
})
export class PublicationsListComponent implements OnInit {

  @Input() list: Project[];


  constructor() { }

  ngOnInit() {
  }

}
