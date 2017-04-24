import {
  Component, OnInit, Input, Output, ViewChild,
  EventEmitter,
} from '@angular/core';
import {ApplicationService} from '../../../shared/application.service';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-apply-modal',
  templateUrl: './apply-modal.component.html',
  styles: []
})

export class ApplyModalComponent implements OnInit {
  @Input() project;
  @Input() position;
  @Output() onApply = new EventEmitter<number>();
  application = {message: '', position_id: null, answers: []};
  @ViewChild('applyModal') public applyModal: ModalDirective;

  constructor(private applicationService: ApplicationService) {
  }

  ngOnInit() {
  }

  sendApplication() {
    this.application.position_id = this.position.id;
    this.applicationService.applyForProject(this.application)
      .subscribe(
        () => {
          this.application = {message: '', position_id: null, answers: []};
          this.onApply.emit(0);
        },
        error => {
          this.onApply.emit(error);
        });
    this.close();
  }

  open() {
    this.applyModal.show();
  }

  close() {
    this.applyModal.hide();
  }
}
