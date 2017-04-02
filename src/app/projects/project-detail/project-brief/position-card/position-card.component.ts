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
  @Input() myApplications;

  myProject = false;
  private member = null;
  hasMember = false;
  showDetails = false;
  hasApplied = false;

  constructor (private state: StateService,
               private responseHandler: ResponseHandlerService) { }

  ngOnInit() {
    if (this.position.member.length > 0 ) {
      this.hasMember = true;
      this.member = this.position.member[0];
    }
    if (this.state.isLoggedIn()) {
      this.verifyIfMyProject();
      this.verifyIfApplied();
    }
  }

  verifyIfMyProject() {
    if (this.state.getUser().id === this.project.user_id) {
      this.myProject = true;
    } else {
      this.myProject = false;
    }
  }

  verifyIfApplied() {
    console.log(this.myApplications)
  }

  applicationSent(error) {
    if (error) {
      this.responseHandler.errorMessage('An error occured!', error);
    } else {
      this.responseHandler.successMessage('Your application was sent!');
    }
  }

  hover() {
    this.showDetails = true;
  }

  out() {
    this.showDetails = false;

  }
}
