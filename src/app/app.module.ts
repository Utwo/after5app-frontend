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
//directives
import { FocusDirective } from './shared/focus.directive';
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
import {AddProjectComponent} from './projects/add-project/add-project.component';
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
import {LoginModalComponent} from './shared/login-modal/login-modal.component';
import {PersonalInfoComponent} from './profile/personal-info/personal-info.component';
import {SkillsComponentComponent} from './profile/skills-component/skills-component.component';
import {BadgesComponent} from './profile/badges/badges.component';
import {NotificationComponent} from './navigation/user-nav/notification/notification.component';
import {ProjectCardComponent} from './shared/project-card/project-card.component';
import { ProjectsOverviewComponent } from './profile/projects-overview/projects-overview.component';
import { FeebeInfoComponent } from './shared/components/feebe-info.component';
import { HomeCardComponent } from './home/home-card/home-card.component';
import { HomeSectionComponent } from './home/home-section/home-section.component';
import { HomeParagraphComponent } from './home/home-section/home-paragraph/home-paragraph.component';
import { ProjectsListOverviewComponent } from './profile/projects-overview/projects-list-overview/projects-list-overview.component';

// pipes
import {TimeAgoPipe} from './time-ago.pipe';
import { ProjectHeaderComponent } from './projects/project-detail/project-header/project-header.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectBriefComponent } from './projects/project-detail/project-brief/project-brief.component';
import { ProjectAssetsComponent } from './projects/project-detail/project-assets/project-assets.component';
import { PositionCardComponent } from './projects/project-detail/project-brief/position-card/position-card.component';
import { ApplicationsCardComponent } from './projects/project-detail/project-brief/applications-card/applications-card.component';
import { ProjectApplicantsComponent } from './projects/project-detail/project-applicants/project-applicants.component';
import { ApplyModalComponent } from './projects/project-detail/project-brief/apply-modal/apply-modal.component';

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
    AddProjectComponent,
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
    SkillsComponentComponent,
    PersonalInfoComponent,
    ProjectDetailComponent,
    ProjectHeaderComponent,
    ProjectDetailComponent,
    ProjectBriefComponent,
    ProjectAssetsComponent,
    PositionCardComponent,
    ApplicationsCardComponent,
    NotificationComponent,
    ProjectApplicantsComponent,
    ApplyModalComponent,
    FeebeMessageComponent,
    LoaderComponent
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
