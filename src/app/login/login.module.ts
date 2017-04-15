import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';

export const routerConfig = [{
  path: '',
  component: LoginComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routerConfig)
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
