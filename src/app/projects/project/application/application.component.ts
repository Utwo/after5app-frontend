import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {ProjectService} from '../../shared/project.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
})
export class ApplicationComponent implements OnInit {
  @Input() project;
  @Output() onApply = new EventEmitter<number>();
  application = {message: '', position_id: null, answers: []};
  position = null;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
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
