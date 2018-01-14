import {Component, Input, OnInit} from '@angular/core';
import {ProjectsNames} from '../../../model/project';
import {ProjectService} from '../../../services/project/project.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  @Input() projectsNames: ProjectsNames[];

  constructor(private projectService: ProjectService) {

    projectService.getProjectNames().then((resp) => {
      this.projectsNames = resp;
    });
  }

  ngOnInit() {
  }
}
