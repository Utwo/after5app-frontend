import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddApplicationComponent} from './project-details/add-application/add-application.component';
import {CommentsComponent} from './project-details/comments/comments.component';
import {EditProjectComponent} from './project-details/edit-project/edit-project.component';
import {MessagesComponent} from './project-details/messages/messages.component';
import {ProjectApplicationsComponent} from './project-details/project-applications/project-applications.component';
import {ProjectListComponent} from './project-list/project-list.component';
import {ApplicationService} from './shared/application.service';
import {MessageService} from './shared/message.service';
import {ProjectService} from './shared/project.service';
import { ProjectComponent } from './project-details/project.component';
import { SharedModule } from '../shared/shared.module';
import { TabsModule, ModalModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
  ],
  declarations: [
    AddApplicationComponent,
    CommentsComponent,
    EditProjectComponent,
    MessagesComponent,
    ProjectApplicationsComponent,
    ProjectListComponent,
    ProjectComponent
  ],
  providers: [
    ApplicationService,
    MessageService,
    ProjectService
  ]
})
export class ProjectsModule {
}
