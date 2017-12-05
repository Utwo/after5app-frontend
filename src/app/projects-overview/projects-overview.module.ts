import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsOverviewComponent } from './projects-overview.component';
import { ProjectsListOverviewComponent } from './projects-list-overview/projects-list-overview.component';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap';
import { SharedModule } from '../shared/shared.module';

export const routerConfig = [{
  path: '',
  component: ProjectsOverviewComponent
}];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TabsModule.forRoot(),
    RouterModule.forChild(routerConfig)
  ],
  declarations: [ProjectsOverviewComponent, ProjectsListOverviewComponent]
})
export class ProjectsOverviewModule {
}
