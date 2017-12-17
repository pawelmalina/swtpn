import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../../services/project/project.service';
import {Project, Message, NewMessage} from '../../../model/project';
import {PanelModule} from 'primeng/primeng';
import {Constants} from '../../../model/constants';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  dateFormat: string = Constants.DATE_FORMAT;

  project: Project;
  messages: Message[];
  newCommentText: string = 'asdasd';

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private router: Router) {
    route.params
      .subscribe(
        (params: { id }) => {
          projectService.getById(params.id).then((response) => {
            this.project = response;
            this.loadMessages();
          });
        });
  }

  ngOnInit() {
  }

  loadMessages() {
    this.projectService.getAllMessages(this.project.id)
      .then((messages) => {
        this.messages = messages;
      });
  }

  addComment() {
    const message = new NewMessage(1, this.project.id, this.newCommentText);
    this.projectService.addMessage(message).then(() => {
      this.loadMessages();
     });
  }

  goBack() {
    this.router.navigate(['/items']);
  }

}
