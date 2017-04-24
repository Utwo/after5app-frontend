import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimeAgoPipe } from './time-ago.pipe';
import { FocusDirective } from './focus.directive';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { FeebeInfoComponent } from './components/feebe-info.component';
import { FeebeMessageComponent } from './components/feebe-message.component';
import { LoaderComponent } from './components/loader.component';
import { SectionHeaderComponent } from './components/section-header.component';
import { StepsComponent } from './components/steps.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { SmallProjectCardComponent } from './small-project-card/small-project-card.component';
import { ModalModule, TypeaheadModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
  ],
  declarations: [
    FocusDirective,
    AutocompleteComponent,
    FeebeInfoComponent,
    FeebeMessageComponent,
    LoaderComponent,
    SectionHeaderComponent,
    StepsComponent,
    LoginModalComponent,
    ProjectCardComponent,
    SmallProjectCardComponent,
    TimeAgoPipe,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FocusDirective,
    AutocompleteComponent,
    FeebeInfoComponent,
    FeebeMessageComponent,
    LoaderComponent,
    SectionHeaderComponent,
    StepsComponent,
    LoginModalComponent,
    ProjectCardComponent,
    SmallProjectCardComponent,
    TimeAgoPipe
  ]
})
export class SharedModule {
}
