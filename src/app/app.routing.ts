import {Routes, RouterModule} from '@angular/router';
import {NotFoundComponent} from "./not-found/not-found.component";
import {HomeComponent} from "./home/home.component";
import { ModuleWithProviders } from '@angular/core';

const appRoutes:Routes = [
    {path: '', component: HomeComponent},
    {path: '**', component: NotFoundComponent}
];

export const appRoutingProviders:any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);