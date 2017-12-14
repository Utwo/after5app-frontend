import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectDetailComponent} from './project-detail/project-detail.component';
import {ProjectApplicantsComponent} from './project-detail/project-applicants/project-applicants.component';
import {ApplicationsCardComponent} from './project-detail/project-applicants/applications-card/applications-card.component';
import {CommentsComponent} from './project-detail/comments/comments.component';
import {ProjectAssetsComponent} from './project-detail/project-assets/project-assets.component';
import {ProjectAssetsService} from './project-detail/project-assets/project-assets.service';
import {ProjectBriefComponent} from './project-detail/project-brief/project-brief.component';
import {ApplyModalComponent} from './project-detail/project-brief/apply-modal/apply-modal.component';
import {PositionCardComponent} from './project-detail/project-brief/position-card/position-card.component';
import {ShareModalComponent} from './project-detail/project-brief/share-modal/share-modal.component';
import {ProjectHeaderComponent} from './project-detail/project-header/project-header.component';
import {ProjectListComponent} from './project-list/project-list.component';
import {ApplicationService} from './shared/application.service';
import {MessageService} from './shared/message.service';
import {ProjectService} from './shared/project.service';
import {SharedModule} from '../shared/shared.module';
import {TabsModule, ModalModule} from 'ngx-bootstrap';
import {DeleteModalComponent} from './project-detail/project-brief/delete-modal/delete-modal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
  ],
  declarations: [
    CommentsComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    ProjectApplicantsComponent,
    ApplicationsCardComponent,
    ProjectAssetsComponent,
    ProjectBriefComponent,
    ApplyModalComponent,
    PositionCardComponent,
    ShareModalComponent,
    ProjectHeaderComponent,
    DeleteModalComponent,
  ],
  providers: [
    ApplicationService,
    MessageService,
    ProjectService,
    ProjectAssetsService,
  ]
})
export class ProjectsModule {
}
