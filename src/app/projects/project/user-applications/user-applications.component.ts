import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {ProjectService} from '../../shared/project.service';
import {ResponseHandlerService} from '../../../shared/response-handler.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-applications',
  templateUrl: './user-applications.component.html'
})
export class UserApplicationsComponent implements OnInit {
  @Input('questions') questions;
  @Output() onAccept = new EventEmitter<number>();
  applications = [];
  project_id = null;

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (this.project_id !== params['id']) {
        this.project_id = params['id'];
        this.getApplications();
      }
    });
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
          this.onAccept.emit(application_id);
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  declineApplication(application_id, index) {
    this.projectService.declineApplication(application_id)
      .subscribe(
        () => this.applications.splice(index, 1),
        error => this.responseHandler.errorMessage('An error occured!', error));
  }
}
