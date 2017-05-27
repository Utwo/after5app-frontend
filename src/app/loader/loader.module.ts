import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoaderComponent} from './loader.component';
import {RouterModule} from '@angular/router';

export const routerConfig = [{
  path: 'loader',
  component: LoaderComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routerConfig)
  ],
  declarations: [LoaderComponent]
})
export class LoaderModule { }
