import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ApplicationService} from '../../../shared/application.service';
import {ResponseHandlerService} from '../../../../core/response-handler.service';

@Component({
  selector: 'app-applications-card',
  templateUrl: 'applications-card.component.html'
})

export class ApplicationsCardComponent {
  @Input() application;
  @Output() onAccept = new EventEmitter<number>();
  @Output() onReject = new EventEmitter<number>();

  constructor(private applicationService: ApplicationService,
              private responseHandler: ResponseHandlerService) {
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
