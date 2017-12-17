import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PublicationsComponent} from './components/publications/publications.component';
import {FilesComponent} from './components/files/files.component';
import {TasksComponent} from './components/tasks/tasks.component';
import {ProjectsComponent} from './components/projects/projects.component';
import {ProjectDetailsComponent} from './components/projects/project-details/project-details.component';


const routes: Routes = [
  {path: 'publications', component: PublicationsComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'files', component: FilesComponent},
  {path: 'project-details/:id', component: ProjectDetailsComponent},
  {path: '**', redirectTo: '/publications'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
