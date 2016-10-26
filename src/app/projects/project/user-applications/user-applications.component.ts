import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ProjectService} from "../../shared/project.service";

@Component({
  selector: 'app-user-applications',
  templateUrl: './user-applications.component.html'
})
export class UserApplicationsComponent implements OnInit {
  @Input() project;
  @Output() onAccept = new EventEmitter<number>();
  applications = null;
  errorMessage = '';

  constructor(private projectService: ProjectService) {
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
        error => this.errorMessage = <any>error);
  }

  acceptApplication(application_id) {
    this.projectService.acceptApplication(application_id)
      .subscribe(
        data => {
          this.getApplications();
          this.onAccept.emit();
        },
        error => this.errorMessage = <any>error);
  }
}
