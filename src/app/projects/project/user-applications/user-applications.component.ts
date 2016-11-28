import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {ProjectService} from '../../shared/project.service';
import {ResponseHandlerService} from '../../../shared/response-handler.service';

@Component({
  selector: 'app-user-applications',
  templateUrl: './user-applications.component.html'
})
export class UserApplicationsComponent implements OnInit{
  @Input('project') project;
  @Input('user_applications') user_applications;
  applications;
  @Output() onAccept = new EventEmitter<number>();

  constructor(private projectService: ProjectService,
              private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
    this.applications = this.user_applications.filter((item) => item.accepted == 0);
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
