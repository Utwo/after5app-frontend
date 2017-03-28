import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {ApplicationService} from '../../shared/application.service';

@Component({
  selector: 'app-add-application',
  templateUrl: 'add-application.component.html',
})
export class AddApplicationComponent implements OnInit {
  @Input() project;
  @Output() onApply = new EventEmitter<number>();
  application = {message: '', position_id: null, answers: []};
  position = null;

  constructor(private applicationService: ApplicationService) {
  }

  ngOnInit() {
  }

  sendApplication(position) {
    this.application.position_id = position;
    this.applicationService.applyForProject(this.application)
      .subscribe(
        () => {
          this.application = {message: '', position_id: null, answers: []};
          this.onApply.emit(0);
        },
        error => {
          this.onApply.emit(error);
        });
  }
}
