import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {ApplicationService} from '../../../shared/application.service';
import {ResponseHandlerService} from '../../../../shared/response-handler.service';

@Component({
  selector: 'app-applications-card',
  templateUrl: 'applications-card.component.html'
})
export class ApplicationsCardComponent implements OnInit {
  @Input() application;
  @Output() onAccept = new EventEmitter<number>();
  @Output() onReject = new EventEmitter<number>();

  constructor(private applicationService: ApplicationService,
              private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
  }


  acceptApplication(application_id) {
    this.applicationService.acceptApplication(application_id)
      .subscribe(
        () => {
          this.onAccept.emit(application_id);
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  declineApplication(application_id) {
    this.applicationService.declineApplication(application_id)
      .subscribe(
        () => {
          this.onReject.emit(application_id);
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
   }
}
