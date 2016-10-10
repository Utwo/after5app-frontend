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
import {NavigationComponent} from './navigation/navigation.component';
import {LoginService} from "./services/login.service";
import {StateService} from "./services/state.service";
import {ProjectService} from "./services/project.service";
import {CommentsComponent} from './comments/comments.component';
import {SettingsComponent} from './settings/settings.component';
import { ApplicationComponent } from './application/application.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { TimeAgoPipe } from './time-ago.pipe';
import { AddProjectComponent } from './add-project/add-project.component';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from './footer/footer.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NotFoundComponent,
        ProjectListComponent,
        ProjectComponent,
        AboutComponent,
        ProfileComponent,
        NavigationComponent,
        CommentsComponent,
        SettingsComponent,
        ApplicationComponent,
        AutocompleteComponent,
        TimeAgoPipe,
        AddProjectComponent, SearchComponent, FooterComponent, NotificationsComponent
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
