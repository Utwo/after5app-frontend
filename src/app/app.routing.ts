import {Routes, RouterModule} from '@angular/router';
import {NotFoundComponent} from "./not-found/not-found.component";
import {HomeComponent} from "./home/home.component";
import { ModuleWithProviders } from '@angular/core';
import {ProjectListComponent} from "./project-list/project-list.component";
import {ProjectComponent} from "./project/project.component";
import {AboutComponent} from "./about/about.component";
import {MyProjectsComponent} from "./my-projects/my-projects.component";
import {ProfileComponent} from "./profile/profile.component";
import {SettingsComponent} from "./settings/settings.component";
import {AddProjectComponent} from "./add-project/add-project.component";

const appRoutes:Routes = [
    {path: '', component: ProjectListComponent},
    {path: 'about', component: AboutComponent},
    {path: 'home', component: HomeComponent},
    {path: 'project/:id', component: ProjectComponent},
    {path: 'add-project', component: AddProjectComponent},
    {path: 'profile/:id', component: ProfileComponent},
    {path: 'settings', component: SettingsComponent},
    {path: '**', component: NotFoundComponent}
];

export const appRoutingProviders:any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);