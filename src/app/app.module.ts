import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {routing, appRoutingProviders} from './app.routing';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ProjectListComponent} from './project-list/project-list.component';
import {ProjectComponent} from './project/project.component';
import {AboutComponent} from './about/about.component';
import {ProfileComponent} from './profile/profile.component';
import {MyProjectsComponent} from './my-projects/my-projects.component';
import {NavigationComponent} from './navigation/navigation.component';
import {LoginService} from "./services/login.service";
import {StateService} from "./services/state.service";
import {ProjectService} from "./services/project.service";
import {CommentsComponent} from './comments/comments.component';
import {SettingsComponent} from './settings/settings.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NotFoundComponent,
        ProjectListComponent,
        ProjectComponent,
        AboutComponent,
        ProfileComponent,
        MyProjectsComponent,
        NavigationComponent, 
        CommentsComponent,
        SettingsComponent
    ],
    imports: [
        routing,
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule
    ],
    providers: [
        appRoutingProviders,
        StateService,
        LoginService,
        ProjectService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
