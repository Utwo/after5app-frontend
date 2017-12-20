import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartProjectComponent } from './start-project.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import {SharedFormsModule} from '../shared/sharedForms.modules';

export const routerConfig = [{
  path: '',
  component: StartProjectComponent
}];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SharedFormsModule,
    RouterModule.forChild(routerConfig)
  ],
  declarations: [
    StartProjectComponent,
  ]
})
export class StartProjectModule {
}
