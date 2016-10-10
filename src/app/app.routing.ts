import {Routes, RouterModule} from '@angular/router';
import {NotFoundComponent} from "./not-found/not-found.component";
import {HomeComponent} from "./home/home.component";
import { ModuleWithProviders } from '@angular/core';
import {ProjectListComponent} from "./project-list/project-list.component";
import {ProjectComponent} from "./project/project.component";
import {AboutComponent} from "./about/about.component";
import {ProfileComponent} from "./profile/profile.component";
import {SettingsComponent} from "./settings/settings.component";

const appRoutes:Routes = [
    {path: '', component: ProjectListComponent},
    {path: 'about', component: AboutComponent},
    {path: 'project/:id', component: ProjectComponent},
    {path: 'profile/:id', component: ProfileComponent},
    {path: 'settings', component: SettingsComponent},
    {path: '**', component: NotFoundComponent}
];

export const appRoutingProviders:any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);