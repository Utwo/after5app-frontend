import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import {EditProjectComponent} from './edit-project.component';
import {SharedFormsModule} from '../shared/sharedForms.modules';
import {LoginModalComponent} from '../shared/login-modal/login-modal.component';

export const routerConfig = [{
  path: '',
  component: EditProjectComponent
}];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SharedFormsModule,
    RouterModule.forChild(routerConfig)
  ],
  declarations: [
    EditProjectComponent,
  ]
})
export class EditProjectModule {
}
