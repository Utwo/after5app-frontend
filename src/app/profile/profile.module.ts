import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { BadgesComponent } from './badges/badges.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ProfileService } from './shared/profile.service';
import { SharedModule } from '../shared/shared.module';
import { SkillsComponent } from './skills/skills.component';
import { TabsModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TabsModule.forRoot()
  ],
  declarations: [
    ProfileComponent,
    BadgesComponent,
    PersonalInfoComponent,
    SkillsComponent
  ],
  providers: [
    ProfileService
  ]
})
export class ProfileModule {
}
