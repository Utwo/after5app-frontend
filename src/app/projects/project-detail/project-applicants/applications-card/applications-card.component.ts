import {Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {ApplicationService} from '../../../shared/application.service';
import {ResponseHandlerService} from '../../../../core/response-handler.service';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-applications-card',
  templateUrl: 'applications-card.component.html'
})

export class ApplicationsCardComponent {
  @ViewChild('viewApplicationModal') public viewApplicationModal: ModalDirective;
  @Input() project;
  @Input() application;
  @Input() owner = false;
  @Output() onAccept = new EventEmitter<number>();
  @Output() onReject = new EventEmitter<number>();

  constructor(private applicationService: ApplicationService,
              private responseHandler: ResponseHandlerService) {
  }

  viewApplication() {
    this.viewApplicationModal.show();
  }

  closeModal() {
    this.viewApplicationModal.hide();
  }

  acceptApplication() {
    this.applicationService.acceptApplication(this.application.id)
      .subscribe(
        () => {
          this.viewApplicationModal.hide();
          this.onAccept.emit(this.application.id);
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }


  declineApplication() {
    this.applicationService.declineApplication(this.application.id)
      .subscribe(
        () => {
          this.viewApplicationModal.hide();
          this.onReject.emit(this.application.id);
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }
}
