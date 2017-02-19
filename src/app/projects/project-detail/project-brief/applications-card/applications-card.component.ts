import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {ApplicationService} from '../../../shared/application.service';
import {ResponseHandlerService} from '../../../../shared/response-handler.service';

@Component({
  selector: 'app-applications-card',
  templateUrl: './applications-card.component.html'
})
export class ApplicationsCardComponent implements OnInit {
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
          this.applications = data;
            console.log(data,"applications")
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
