import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import {InMemoryDataService} from './data/in-memory-data-service';

import { AppComponent } from './app.component';
import {MockDataService} from './services/mock-data.service';
import {AppRoutingModule} from './app-routing.module';
import { PublicationsComponent } from './components/publications/publications.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { FilesComponent } from './components/files/files.component';
import { TasksComponent } from './components/tasks/tasks.component';
import {PublicationService} from './services/publication.service';
import {UserService} from './services/user.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';



@NgModule({
  declarations: [
    AppComponent,
    PublicationsComponent,
    ProjectsComponent,
    FilesComponent,
    TasksComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    BrowserModule
  ],
  providers: [
    MockDataService,
    UserService,
    PublicationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
