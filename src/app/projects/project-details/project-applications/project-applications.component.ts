import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {ResponseHandlerService} from '../../../shared/response-handler.service';
import {ApplicationService} from '../../shared/application.service';

@Component({
  selector: 'app-project-applications',
  templateUrl: './project-applications.component.html'
})
export class ProjectApplicationsComponent implements OnInit {
  @Input('questions') questions;
  @Input('project_id') project_id;
  @Output() onResponse = new EventEmitter<number>();
  applications = [];

  constructor(private applicationService: ApplicationService,
              private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
    this.getApplications();
  }

  getApplications() {
    this.applicationService.getApplications(this.project_id)
      .subscribe(
        data => {
          this.applications = data.filter((item) =>
          item.accepted === false);
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  acceptApplication(application_id, index) {
    this.applicationService.acceptApplication(application_id)
      .subscribe(
        () => {
          this.applications.splice(index, 1);
          this.onResponse.emit(application_id);
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  declineApplication(application_id, index) {
    this.applicationService.declineApplication(application_id)
      .subscribe(
        () => {
          this.applications.splice(index, 1);
          this.onResponse.emit(application_id);
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }
}
