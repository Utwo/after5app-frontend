import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileComponent} from './profile.component';
import {BadgesComponent} from './badges/badges.component';
import {PersonalInfoComponent} from './personal-info/personal-info.component';
import {ProjectsOverviewComponent} from './projects-overview/projects-overview.component';
import {ProjectsListOverviewComponent} from './projects-overview/projects-list-overview/projects-list-overview.component';
import {ProfileService} from './shared/profile.service';
import { SharedModule } from '../shared/shared.module';
import { SkillsComponent } from './skills/skills.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    ProfileComponent,
    BadgesComponent,
    PersonalInfoComponent,
    ProjectsOverviewComponent,
    ProjectsListOverviewComponent,
    SkillsComponent
  ],
  providers: [
    ProfileService
  ]
})
export class ProfileModule { }
