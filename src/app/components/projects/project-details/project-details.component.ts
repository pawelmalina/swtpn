import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../../services/project/project.service';
import {Project, Message, NewMessage, UpdateObject} from '../../../model/project';
import {Constants} from '../../../model/constants';
import {UserService} from '../../../services/user/user.service';
import {NameAndId} from '../../../model/user';
import {AuthService} from '../../../services/auth/auth.service';
import {MessageService} from 'primeng/components/common/messageservice';
import {ModificationPanelComponent} from '../../modification-panel/modification-panel.component';
import {DocumentService} from '../../../services/document/document.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  dateFormat: string = Constants.MESSAGE_DATE_FORMAT;

  project: Project;
  projectId: number;
  messages: Message[];
  newCommentText: string = '';

  displaySidebar: boolean = false;
  selectedUsers: number[] = [];
  notAssignedUsers: NameAndId[];
  isManager: boolean = false;

  displayAddDocumentDialog: boolean = false;
  @ViewChild('documentDialog') documentDialog: ModificationPanelComponent;

  constructor(private state: AuthService,
              private route: ActivatedRoute,
              private projectService: ProjectService,
              private documentService: DocumentService,
              private userService: UserService,
              private messageService: MessageService,
              private router: Router) {
    route.params
      .subscribe(
        (params: { id }) => {
          this.projectId = params.id;
          this.refresh();
        });
  }

  private refresh() {
    this.projectService.getById(this.projectId).then((project) => {
      this.project = project;
      this.loadMessages();
      this.loadNotAssignedUsers();
      this.checkUserIsManager();
    });
  }

  private loadNotAssignedUsers() {
    this.userService.notAssignedUsers(this.projectId)
      .then((res) => {
        this.notAssignedUsers = res;
      });
  }

  private checkUserIsManager() {
    this.userService.checkUserIsProjectManager(this.projectId)
      .then((is) => {
        this.isManager = is as boolean;
      });
  }

  ngOnInit() {
  }

  acceptDocumentDialog(document: UpdateObject) {
    this.documentService.addDocument(document, this.projectId).then(() => {
      this.messageService.add({
        severity: 'info',
        summary: 'Document',
        detail: 'Pomyślnie dodano document'
      });
      this.refresh();
    });
  }

  acceptProjectDialog(project: UpdateObject) {
    this.projectService.update(project).then(() => {

      this.refresh();
    });
  }

  remove(projectId: number) {
    this.projectService.remove(projectId)
      .then((res) => {
        this.router.navigate(['/projects']);
      });
  }

  removeUser(userId: number){
    this.projectService.removeUser(this.projectId ,userId)
      .then(() => {
        this.refresh();
      });
  }

  loadMessages() {
    this.projectService.getAllMessages(this.project.id)
      .then((messages) => {
        this.messages = messages;
      });
  }

  addComment(text: string) {
    if (text === '') {
      return;
    }
    const message = new NewMessage(1, this.project.id, text);
    this.projectService.addMessage(message).then(() => {
      this.loadMessages();
    });
  }

  showSB() {
    if (this.notAssignedUsers.length > 0) {
      this.displaySidebar = true;
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Informacja',
        detail: 'Wszyscy użytkownicy są już przypisani.'
      });
    }
  }

  acceptSB() {
    if (this.selectedUsers.length > 0) {
      this.projectService.addUsersToProject(this.projectId, this.selectedUsers)
        .then(() => {
          this.refresh();
        });
    }
    this.displaySidebar = false;
  }

  closeSB() {
    this.displaySidebar = false;
    this.selectedUsers = [];
  }

}
