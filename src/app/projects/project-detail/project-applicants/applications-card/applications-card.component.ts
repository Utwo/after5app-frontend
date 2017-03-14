import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {ApplicationService} from '../../../shared/application.service';
import {ResponseHandlerService} from '../../../../shared/response-handler.service';

@Component({
  selector: 'app-applications-card',
  templateUrl: 'applications-card.component.html'
})
export class ApplicationsCardComponent implements OnInit {
  @Input() user;
  @Output() onResponse = new EventEmitter<number>();

  constructor(private applicationService: ApplicationService,
              private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
  }


  acceptApplication(application_id, index) {
    // this.applicationService.acceptApplication(application_id)
    //   .subscribe(
    //     () => {
    //       this.applications.splice(index, 1);
    //       this.onResponse.emit(application_id);
    //     },
    //     error => this.responseHandler.errorMessage('An error occured!', error));
  }

  declineApplication(application_id, index) {
    // this.applicationService.declineApplication(application_id)
    //   .subscribe(
    //     () => {
    //       this.applications.splice(index, 1);
    //       this.onResponse.emit(application_id);
    //     },
    //     error => this.responseHandler.errorMessage('An error occured!', error));
   }
}
