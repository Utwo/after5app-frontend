import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import {EditProjectComponent} from './edit-project.component';
import {FormHeaderComponent} from '../start-project/shared/form-header.component';
import {AssetsFormComponent} from '../start-project/forms/assets-form';
import {DescriptionFormComponent} from '../start-project/forms/description-form';
import {ProjectOverviewComponent} from '../start-project/forms/project-overview';
import {QuestionsFormComponent} from '../start-project/forms/questions-form';
import {SkillsFormComponent} from '../start-project/forms/skills-form';
import {TitleFormComponent} from '../start-project/forms/title-form';

export const routerConfig = [{
  path: '',
  component: EditProjectComponent
}];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routerConfig)
  ],
  declarations: [
    EditProjectComponent,
    FormHeaderComponent,
    AssetsFormComponent,
    DescriptionFormComponent,
    ProjectOverviewComponent,
    QuestionsFormComponent,
    SkillsFormComponent,
    TitleFormComponent
  ]
})
export class EditProjectModule {
}
