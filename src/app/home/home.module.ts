import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeSectionComponent } from './home-section/home-section.component';
import { HomeParagraphComponent } from './home-section/home-paragraph/home-paragraph.component';
import { HomeCardComponent } from './home-card/home-card.component';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [HomeComponent, HomeSectionComponent, HomeParagraphComponent, HomeCardComponent]
})
export class HomeModule {
}
