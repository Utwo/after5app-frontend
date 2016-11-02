import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ProjectService} from "../../shared/project.service";
import {ResponseHandlerService} from "../../../shared/response-handler.service";

@Component({
  selector: 'app-user-applications',
  templateUrl: './user-applications.component.html'
})
export class UserApplicationsComponent implements OnInit {
  @Input('project') project;
  @Input('user_applications') user_applications;
  @Output() onAccept = new EventEmitter<number>();
  applications = null;

  constructor(private projectService: ProjectService, private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
    this.applications = [];
    for (let application of this.user_applications) {
      if (application.accepted == 0) {
        this.applications.push(application);
      }
    }
  }

  // getApplications() {
  //   this.projectService.getApplications(this.project.id)
  //     .subscribe(
  //       data => {
  //         this.applications = [];
  //         for (let application of data) {
  //           if (application.accepted == 0) {
  //             this.applications.push(application);
  //           }
  //         }
  //       },
  //       error => this.responseHandler.errorMessage('An error occured!', error));
  // }

  respondToApplication(application_id, index, code) {
    this.projectService.respondToApplication(application_id, code)
      .subscribe(
        data => {
          this.applications.splice(index, 1);
          if (code === 1) {
            this.onAccept.emit();
          }
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }
}
