import {Component} from '@angular/core';

@Component({
  selector: 'app-overview-form',
  template: `
    <app-section-header
      [header]="'Review your project information'"
      [subheader]="'If it\\'s all good post it'">
    </app-section-header>
  `,
})
export class ProjectOverviewComponent {
}

