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
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {ProjectService} from './services/project/project.service';
import {PublicationsListComponent} from './components/publications/publications-list/publications-list.component';
import {ProjectsListComponent} from './components/projects/projects-list/projects-list.component';
import {ProjectDetailsComponent} from './components/projects/project-details/project-details.component';
import {PanelModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';
import {DataListModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FileUploadModule} from 'primeng/primeng';
import {FileService} from './services/file/file.service';
import {DocumentDetailsComponent} from './components/documents/document-details/document-details.component';


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
    DocumentDetailsComponent
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
  ],
  providers: [
    UserService,
    PublicationService,
    ProjectService,
    FileService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
