import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-projects-list-overview',
  templateUrl: './projects-list-overview.component.html',
})

export class ProjectsListOverviewComponent {
  @Input() header;
  @Input() projects = null;
  @Input() feebeTitle;
  @Input() feebeDescription;
}
