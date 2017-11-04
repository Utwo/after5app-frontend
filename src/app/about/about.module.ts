import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutComponent} from './about.component';
import {RouterModule} from '@angular/router';

export const routerConfig = [{
  path: '',
  component: AboutComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routerConfig)
  ],
  declarations: [AboutComponent]
})
export class AboutModule {
}
