import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { AuthGuard } from './core/auth-guard.service';

const appRoutes: Routes = [
  {path: '', loadChildren: './home/home.module#HomeModule', pathMatch: 'full'},
  {path: 'projects', component: ProjectListComponent},
  {path: 'project/:id', component: ProjectDetailComponent},
  {path: 'profile/:id', loadChildren: './profile/profile.module#ProfileModule'},
  {
    path: 'projects-overview',
    loadChildren: './projects-overview/projects-overview.module#ProjectsOverviewModule',
    canActivate: [AuthGuard]
  },
  {path: 'edit-project/:id', loadChildren: './edit-project/edit-project.module#EditProjectModule', canActivate: [AuthGuard]},
  {path: 'about', loadChildren: './about/about.module#AboutModule'},
  {path: 'start-project', loadChildren: './start-project/start-project.module#StartProjectModule'},
  {path: 'auth/:type/callback', loadChildren: './login/login.module#LoginModule'},
  {path: '404', loadChildren: './not-found/not-found.module#NotFoundModule'},
  {path: '**', redirectTo: '404'}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
