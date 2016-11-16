import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ProjectService} from '../../shared/project.service';
import {ResponseHandlerService} from '../../../shared/response-handler.service';

@Component({
  selector: 'app-user-applications',
  templateUrl: './user-applications.component.html'
})
export class UserApplicationsComponent {
  @Input('project') project;
  @Input('user_applications') user_applications;
  @Output() onAccept = new EventEmitter<number>();

  constructor(private projectService: ProjectService, private responseHandler: ResponseHandlerService) {
  }

  respondToApplication(application_id, index, code) {
    this.projectService.respondToApplication(application_id, code)
      .subscribe(
        () => {
          this.user_applications.splice(index, 1);
          if (code === 1) {
            this.onAccept.emit();
          }
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }
}
