import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ProjectService} from "../../shared/project.service";
import {ResponseHandlerService} from "../../../shared/response-handler.service";

@Component({
  selector: 'app-user-applications',
  templateUrl: './user-applications.component.html'
})
export class UserApplicationsComponent implements OnInit {
  @Input() project;
  @Output() onAccept = new EventEmitter<number>();
  applications = null;

  constructor(private projectService: ProjectService, private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
    this.getApplications();
  }

  getApplications() {
    this.projectService.getApplications(this.project.id)
      .subscribe(
        data => {
          this.applications = [];
          for (let application of data) {
            if (application.accepted == 0) {
              this.applications.push(application);
            }
          }
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  acceptApplication(application_id) {
    this.projectService.acceptApplication(application_id)
      .subscribe(
        data => {
          this.getApplications();
          this.onAccept.emit();
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }
}
