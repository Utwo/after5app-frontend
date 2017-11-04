import {Component, Output, Input, EventEmitter} from '@angular/core';
import {ProjectService} from '../../shared/project.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
})
export class ApplicationComponent {
  @Input() project;
  @Output() onApply = new EventEmitter<number>();
  application = {message: '', position_id: null, answers: []};
  position = null;

  constructor(private projectService: ProjectService) {
  }

  sendApplication(position) {
    this.application.position_id = position;
    this.projectService.applyForProject(this.application)
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
