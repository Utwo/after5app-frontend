import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule, TypeaheadModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import {FormHeaderComponent} from '../start-project/shared/form-header.component';
import {AssetsFormComponent} from '../start-project/forms/assets-form';
import {DescriptionFormComponent} from '../start-project/forms/description-form';
import {ProjectOverviewComponent} from '../start-project/forms/project-overview';
import {QuestionsFormComponent} from '../start-project/forms/questions-form';
import {SkillsFormComponent} from '../start-project/forms/skills-form';
import {TitleFormComponent} from '../start-project/forms/title-form';
import {SharedModule} from './shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
  ],
  declarations: [
    FormHeaderComponent,
    AssetsFormComponent,
    DescriptionFormComponent,
    ProjectOverviewComponent,
    QuestionsFormComponent,
    SkillsFormComponent,
    TitleFormComponent
  ],
  exports: [
    FormHeaderComponent,
    AssetsFormComponent,
    DescriptionFormComponent,
    ProjectOverviewComponent,
    QuestionsFormComponent,
    SkillsFormComponent,
    TitleFormComponent
  ]
})
export class SharedFormsModule {
}
