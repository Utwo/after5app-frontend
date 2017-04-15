import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { RouterModule } from '@angular/router';

export const routerConfig = [{
  path: '',
  component: NotFoundComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routerConfig)
  ],
  declarations: [NotFoundComponent]
})
export class NotFoundModule { }
