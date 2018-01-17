import {Component, Input, OnInit} from '@angular/core';
import {ProjectsNames, UpdateObject} from '../../../model/project';
import {ProjectService} from '../../../services/project/project.service';
import {AuthService} from '../../../services/auth/auth.service';
import {Role} from '../../../model/user';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  @Input() projectsNames: ProjectsNames[];

  isManager: boolean = false;

  constructor(public authService: AuthService,
              private projectService: ProjectService) {

    this.refresh();
  }

  private refresh() {
      this.projectService.getProjectNames().then((resp) => {
      this.projectsNames = resp;
      this.isManager = this.authService.isManager;
    });
  }


  ngOnInit() {
  }

  acceptProjectDialog(updateObject: UpdateObject) {
    this.projectService.add(updateObject).then((res) => {
      this.refresh();
    });
  }
}
