import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PublicationsComponent} from './components/publications/publications.component';
import {FilesComponent} from './components/files/files.component';
import {TasksComponent} from './components/tasks/tasks.component';
import {ProjectsComponent} from './components/projects/projects.component';

const routes: Routes = [
  {path: 'publications', component: PublicationsComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'files', component: FilesComponent},
  {path: '**', redirectTo: '/publications'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
