import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartProjectComponent } from './start-project.component';
import { FormHeaderComponent } from './shared/form-header.component';
import { AssetsFormComponent } from './forms/assets-form';
import { DescriptionFormComponent } from './forms/description-form';
import { ProjectOverviewComponent } from './forms/project-overview';
import { QuestionsFormComponent } from './forms/questions-form';
import { SkillsFormComponent } from './forms/skills-form';
import { TitleFormComponent } from './forms/title-form';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

export const routerConfig = [{
  path: '',
  component: StartProjectComponent
}];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routerConfig)
  ],
  declarations: [
    StartProjectComponent,
    FormHeaderComponent,
    AssetsFormComponent,
    DescriptionFormComponent,
    ProjectOverviewComponent,
    QuestionsFormComponent,
    SkillsFormComponent,
    TitleFormComponent
  ]
})
export class StartProjectModule {
}
