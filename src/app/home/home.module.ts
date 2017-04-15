import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeSectionComponent } from './home-section/home-section.component';
import { HomeParagraphComponent } from './home-section/home-paragraph/home-paragraph.component';
import { HomeCardComponent } from './home-card/home-card.component';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

export const routerConfig = [{
  path: '',
  component: HomeComponent
}];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routerConfig)
  ],
  declarations: [HomeComponent, HomeSectionComponent, HomeParagraphComponent, HomeCardComponent]
})
export class HomeModule {}
