import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {ProjectService} from '../../shared/project.service';
import {ResponseHandlerService} from '../../../shared/response-handler.service';

@Component({
  selector: 'app-user-applications',
  templateUrl: './user-applications.component.html'
})
export class UserApplicationsComponent implements OnInit {
  @Input('questions') questions;
  @Input('project_id') project_id;
  @Output() onResponse = new EventEmitter<number>();
  applications = [];

  constructor(private projectService: ProjectService,
              private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
    this.getApplications();
  }

  getApplications() {
    this.projectService.getApplications(this.project_id)
      .subscribe(
        data => {
          this.applications = data.filter((item) =>
          item.accepted === false);
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  acceptApplication(application_id, index) {
    this.projectService.acceptApplication(application_id)
      .subscribe(
        () => {
          this.applications.splice(index, 1);
          this.onResponse.emit(application_id);
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  declineApplication(application_id, index) {
    this.projectService.declineApplication(application_id)
      .subscribe(
        () => {
          this.applications.splice(index, 1);
          this.onResponse.emit(application_id);
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }
}
