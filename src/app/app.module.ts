import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './shared/in-memory-data-service';

import {AppComponent} from './app.component';

import {AppRoutingModule} from './app-routing.module';
import {PublicationsComponent} from './components/publications/publications.component';
import {ProjectsComponent} from './components/projects/projects.component';
import {FilesComponent} from './components/documents/documents.component';
import {TasksComponent} from './components/tasks/tasks.component';
import {PublicationService} from './services/publication/publication.service';
import {UserService} from './services/user/user.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {ProjectService} from './services/project/project.service';
import {PublicationsListComponent} from './components/publications/publications-list/publications-list.component';
import {ProjectsListComponent} from './components/projects/projects-list/projects-list.component';
import {ProjectDetailsComponent} from './components/projects/project-details/project-details.component';
import {
  ButtonModule,
  CalendarModule, CheckboxModule,
  DataListModule, DialogModule,
  FileUploadModule, GrowlModule,
  InputTextareaModule,
  InputTextModule, MessageModule,
  PanelModule, SidebarModule,
  TabViewModule
} from 'primeng/primeng';
import {MessageService} from 'primeng/components/common/messageservice';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DocumentDetailsComponent} from './components/documents/document-details/document-details.component';
import {DocumentService} from './services/document/document.service';
import {LoginComponent} from './components/login/login.component';
import {AuthService} from './services/auth/auth.service';
import {AddInterceptor} from './shared/add-Interceptor';
import {UserRoleGuard} from './shared/user-role-guard';
import {MenagerRoleGuard} from './shared/menager-role-guard';
import { MailComponent } from './components/mail/mail.component';
import {MailService} from './services/mail/mail.service';
import { DocumentsListComponent } from './components/documents/documents-list/documents-list.component';
import { ModificationPanelComponent } from './components/modification-panel/modification-panel.component';
import { CommentsComponent } from './components/comments/comments.component';


@NgModule({
  declarations: [
    AppComponent,
    PublicationsComponent,
    ProjectsComponent,
    FilesComponent,
    TasksComponent,
    PublicationsListComponent,
    ProjectsListComponent,
    ProjectDetailsComponent,
    DocumentDetailsComponent,
    LoginComponent,
    MailComponent,
    DocumentsListComponent,
    ModificationPanelComponent,
    CommentsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {
      passThruUnknownUrl: true,
      delay: 30
    }),
    AppRoutingModule,
    PanelModule,
    TabViewModule,
    DataListModule,
    ButtonModule,
    InputTextareaModule,
    FileUploadModule,
    BrowserAnimationsModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    GrowlModule,
    MessageModule,
    SidebarModule,
    CheckboxModule,
    DialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddInterceptor,
      multi: true,
    },
    UserService,
    PublicationService,
    ProjectService,
    DocumentService,
    AuthService,
    MailService,
    UserRoleGuard,
    MenagerRoleGuard,
    MessageService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
