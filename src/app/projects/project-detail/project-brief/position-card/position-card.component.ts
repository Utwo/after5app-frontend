import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap';
import {ProjectService} from '../../../shared/project.service';
import {StateService} from '../../../../shared/state.service';
import {ResponseHandlerService} from '../../../../shared/response-handler.service';

@Component({
  selector: 'app-position-card',
  templateUrl: './position-card.component.html',
  styles: []
})
export class PositionCardComponent implements OnInit {
  @Input() position;
  @Input() project;
  myProject = false;
  private member = null;
  hasMember = false;

  constructor(  private projectService: ProjectService,
                private state: StateService,
                private responseHandler: ResponseHandlerService) { }

  ngOnInit() {
    if(this.position.member.length > 0 ) {
      this.hasMember = true;
      this.member = this.position.member[0];
    }
    this.verifyIfMyProject();
  }

  verifyIfMyProject() {
    if (this.state.getUser().id === this.project.user_id) {
      this.myProject = true;
    } else {
      this.myProject = false;
    }
  }

  applicationSent(error) {
    if (error) {
      this.responseHandler.errorMessage('An error occured!', error);
    } else {
      this.responseHandler.successMessage('Your application was sent!');
    }
  }
}
