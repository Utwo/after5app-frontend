import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { HttpModule } from '@angular/http';
// external modules
import { ToastyModule } from 'ng2-toasty';
// components
import { AppComponent } from './app.component';
// modules
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { ProfileModule } from './profile/profile.module';
import { ProjectsModule } from './projects/projects.module';

// pipes
import {TimeAgoPipe} from './time-ago.pipe';
import { ProjectHeaderComponent } from './projects/project-detail/project-header/project-header.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectBriefComponent } from './projects/project-detail/project-brief/project-brief.component';
import { ProjectAssetsComponent } from './projects/project-detail/project-assets/project-assets.component';
import { PositionCardComponent } from './projects/project-detail/project-brief/position-card/position-card.component';
import { ApplicationsCardComponent } from './projects/project-detail/project-applicants/applications-card/applications-card.component';
import { ProjectApplicantsComponent } from './projects/project-detail/project-applicants/project-applicants.component';
import { ApplyModalComponent } from './projects/project-detail/project-brief/apply-modal/apply-modal.component';
import {CommentsComponent} from "./projects/project-detail/comments/comments.component";
import { ShareModalComponent } from './projects/project-detail/project-brief/share-modal/share-modal.component'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    routing,
    BrowserModule,
    HttpModule,
    ToastyModule.forRoot(),
    CoreModule.forRoot(),
    SharedModule,
    ProfileModule,
    ProjectsModule
  ],
  providers: [
    appRoutingProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
