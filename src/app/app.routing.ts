import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from "./not-found/not-found.component";
import {HomeComponent} from "./home/home.component";

const appRoutes: Routes = [
    { path: '/', component: HomeComponent},
    // {
    //     path: 'heroes',
    //     component: HeroListComponent,
    //     data: {
    //         title: 'Heroes List'
    //     }
    // },
    // { path: 'hero/:id', component: HeroDetailComponent },
     { path: '**', component: NotFoundComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
