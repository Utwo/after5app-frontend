import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {routing, appRoutingProviders} from './app.routing';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './core/not-found/not-found.component';
import {ProjectListComponent} from './projects/project-list/project-list.component';
import {ProjectComponent} from './projects/project/project.component';
import {AboutComponent} from './about/about.component';
import {ProfileComponent} from './profile/profile.component';
import {CommentsComponent} from './projects/project/comments/comments.component';
import {SettingsComponent} from './profile/settings/settings.component';
import {ApplicationComponent} from './projects/project/application/application.component';
import {AutocompleteComponent} from './shared/autocomplete/autocomplete.component';
import {TimeAgoPipe} from './time-ago.pipe';
import {AddProjectComponent} from './projects/add-project/add-project.component';
import {FooterComponent} from './footer/footer.component';
import {StateService} from './shared/state.service';
import {LoginService} from './core/login.service';
import {ProjectService} from './projects/shared/project.service';
import {NavigationComponent} from './navigation/navigation.component';
import {SearchComponent} from './navigation/search/search.component';
import {UserNavComponent} from './navigation/user-nav/user-nav.component';
import {NotificationsService} from './navigation/user-nav/shared/notifications.service';
import {EditProjectComponent} from './projects/project/edit-project/edit-project.component';
import {ModalModule, TypeaheadModule, TabsModule} from 'ng2-bootstrap/ng2-bootstrap';
import {UserApplicationsComponent} from './projects/project/user-applications/user-applications.component';
import {LoginComponent} from './login/login.component';
import {MessagesComponent} from './projects/project/messages/messages.component';
import {AuthGuard} from './core/auth-guard.service';
import {ResponseHandlerService} from './shared/response-handler.service';
import {ToastyModule} from 'ng2-toasty';
import {LoginModalComponent} from './shared/login-modal/login-modal.component';

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
    AddProjectComponent,
    SearchComponent,
    FooterComponent,
    UserNavComponent,
    EditProjectComponent,
    UserApplicationsComponent,
    LoginComponent,
    MessagesComponent,
    LoginModalComponent,
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    ModalModule,
    TypeaheadModule,
    TabsModule,
    ToastyModule.forRoot()
  ],
  providers: [
    appRoutingProviders,
    StateService,
    LoginService,
    ProjectService,
    NotificationsService,
    ResponseHandlerService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
