import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PublicationsComponent} from './components/publications/publications.component';
import {FilesComponent} from './components/documents/documents.component';
import {TasksComponent} from './components/tasks/tasks.component';
import {ProjectsComponent} from './components/projects/projects.component';
import {ProjectDetailsComponent} from './components/projects/project-details/project-details.component';
import {DocumentDetailsComponent} from './components/documents/document-details/document-details.component';
import {UserRoleGuard} from './shared/user-role-guard';


const routes: Routes = [
  {path: 'publications', component: PublicationsComponent},
  {path: 'projects', component: ProjectsComponent, canActivate: [UserRoleGuard]},
  {path: 'tasks', component: TasksComponent, canActivate: [UserRoleGuard]},
  {path: 'documents', component: FilesComponent, canActivate: [UserRoleGuard]},
  {path: 'project-details/:id', component: ProjectDetailsComponent, canActivate: [UserRoleGuard]},
  {path: 'document-details/:id', component: DocumentDetailsComponent, canActivate: [UserRoleGuard]},
  {path: '**', redirectTo: '/publications'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
