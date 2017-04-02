import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {routing, appRoutingProviders} from './app.routing';
// external modules
import {ToastyModule} from 'ng2-toasty';
import {ModalModule, TypeaheadModule, TabsModule} from 'ng2-bootstrap';
// services
import {AuthGuard} from './core/auth-guard.service';
import {ResponseHandlerService} from './shared/response-handler.service';
import {StateService} from './shared/state.service';
import {LoginService} from './core/login.service';
import {ProjectService} from './projects/shared/project.service';
import {ProfileService} from './profile/shared/profile.service';
import {MessageService} from './projects/shared/message.service';
import {ApplicationService} from './projects/shared/application.service';
import {NotificationsService} from './navigation/user-nav/shared/notifications.service';
// pipes
import {TimeAgoPipe} from './time-ago.pipe';
// directives
import {FocusDirective} from './shared/focus.directive';
// components
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './core/not-found/not-found.component';
import {ProjectListComponent} from './projects/project-list/project-list.component';
import {ProjectComponent} from './projects/project-details/project.component';
import {AboutComponent} from './about/about.component';
import {ProfileComponent} from './profile/profile.component';
import {CommentsComponent} from './projects/project-details/comments/comments.component';
import {AddApplicationComponent} from './projects/project-details/add-application/add-application.component';
import {StartProjectComponent} from './projects/start-project/start-project.component';
import {TitleFormComponent} from './projects/start-project/forms/title-form';
import {SkillsFormComponent} from './projects/start-project/forms/skills-form';
import {DescriptionFormComponent} from './projects/start-project/forms/description-form';
import {QuestionsFormComponent} from './projects/start-project/forms/questions-form';
import {AssetsFormComponent} from './projects/start-project/forms/assets-form';
import {ProjectOverviewComponent} from './projects/start-project/forms/project-overview';
import {FormHeaderComponent} from './projects/start-project/shared/form-header.component';
import {FooterComponent} from './footer/footer.component';
import {NavigationComponent} from './navigation/navigation.component';
import {SearchComponent} from './navigation/search/search.component';
import {UserNavComponent} from './navigation/user-nav/user-nav.component';
import {EditProjectComponent} from './projects/project-details/edit-project/edit-project.component';
import {ProjectApplicationsComponent} from './projects/project-details/project-applications/project-applications.component';
import {LoginComponent} from './login/login.component';
import {MessagesComponent} from './projects/project-details/messages/messages.component';
import {AutocompleteComponent} from './shared/autocomplete/autocomplete.component';
import {SectionHeaderComponent} from './shared/components/section-header.component';
import {FeebeMessageComponent} from './shared/components/feebe-message.component';
import {LoaderComponent} from './shared/components/loader.component';
import {StepsComponent} from './shared/components/steps.component';
import {LoginModalComponent} from './shared/login-modal/login-modal.component';
import {PersonalInfoComponent} from './profile/personal-info/personal-info.component';
import {SkillsComponent} from './profile/skills/skills.component';
import {BadgesComponent} from './profile/badges/badges.component';
import {NotificationComponent} from './navigation/user-nav/notification/notification.component';
import {ProjectCardComponent} from './shared/project-card/project-card.component';
import {ProjectsOverviewComponent} from './profile/projects-overview/projects-overview.component';
import {FeebeInfoComponent} from './shared/components/feebe-info.component';
import {HomeCardComponent} from './home/home-card/home-card.component';
import {HomeSectionComponent} from './home/home-section/home-section.component';
import {HomeParagraphComponent} from './home/home-section/home-paragraph/home-paragraph.component';
import {ProjectsListOverviewComponent} from './profile/projects-overview/projects-list-overview/projects-list-overview.component';

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
    AddApplicationComponent,
    AutocompleteComponent,
    TimeAgoPipe,
    StartProjectComponent,
    SearchComponent,
    FooterComponent,
    UserNavComponent,
    EditProjectComponent,
    ProjectApplicationsComponent,
    LoginComponent,
    MessagesComponent,
    LoginModalComponent,
    ProjectCardComponent,
    SectionHeaderComponent,
    HomeCardComponent,
    HomeSectionComponent,
    HomeParagraphComponent,
    ProjectsOverviewComponent,
    FeebeInfoComponent,
    ProjectsListOverviewComponent,
    FocusDirective,
    BadgesComponent,
    SkillsComponent,
    PersonalInfoComponent,
    NotificationComponent,
    FeebeMessageComponent,
    LoaderComponent,
    TitleFormComponent,
    DescriptionFormComponent,
    SkillsFormComponent,
    AssetsFormComponent,
    QuestionsFormComponent,
    ProjectOverviewComponent,
    StepsComponent,
    FormHeaderComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    TabsModule.forRoot(),
    ToastyModule.forRoot(),
  ],
  providers: [
    appRoutingProviders,
    StateService,
    LoginService,
    ProjectService,
    ProfileService,
    MessageService,
    ApplicationService,
    NotificationsService,
    ResponseHandlerService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
