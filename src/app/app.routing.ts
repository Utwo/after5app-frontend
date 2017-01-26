import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ModuleWithProviders} from '@angular/core';
import {AboutComponent} from './about/about.component';
import {ProfileComponent} from './profile/profile.component';
import {ProjectListComponent} from './projects/project-list/project-list.component';
import {ProjectComponent} from './projects/project-details/project.component';
import {AddProjectComponent} from './projects/add-project/add-project.component';
import {SettingsComponent} from './profile/settings/settings.component';
import {NotFoundComponent} from './core/not-found/not-found.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './core/auth-guard.service';


const appRoutes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'about', component: AboutComponent},
  {path: 'projects', component: ProjectListComponent},
  {path: 'project/:id', component: ProjectComponent},
  {path: 'start-project', component: AddProjectComponent, canActivate: [AuthGuard]},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'auth/:type/callback', component: LoginComponent},
  {path: '**', component: NotFoundComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
