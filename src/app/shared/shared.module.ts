import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimeAgoPipe } from 'time-ago-pipe';
import { FocusDirective } from './focus.directive';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { FeebeInfoComponent } from './components/feebe-info.component';
import { FeebeMessageComponent } from './components/feebe-message.component';
import { LoaderComponent } from './components/loader.component';
import { SectionHeaderComponent } from './components/section-header.component';
import { StepsComponent } from './components/steps.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ToastyModule } from 'ng2-toasty';
import { ModalModule, TabsModule, TypeaheadModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    TabsModule.forRoot(),
    ToastyModule.forRoot(),
  ],
  declarations: [
    TimeAgoPipe,
    FocusDirective,
    AutocompleteComponent,
    FeebeInfoComponent,
    FeebeMessageComponent,
    LoaderComponent,
    SectionHeaderComponent,
    StepsComponent,
    LoginModalComponent,
    ProjectCardComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ModalModule,
    TypeaheadModule,
    TabsModule,
    ToastyModule,
    TimeAgoPipe,
    FocusDirective,
    AutocompleteComponent,
    FeebeInfoComponent,
    FeebeMessageComponent,
    LoaderComponent,
    SectionHeaderComponent,
    StepsComponent,
    LoginModalComponent,
    ProjectCardComponent,
  ]
})
export class SharedModule {
}
