import {Component} from '@angular/core';

@Component({
  selector: 'app-overview-form',
  template: `
    <app-form-header
      [header]="'Review your project information'"
      [subheader]="'If it\\'s all good post it'">
    </app-form-header>
  `,
})
export class ProjectOverviewComponent {
}

