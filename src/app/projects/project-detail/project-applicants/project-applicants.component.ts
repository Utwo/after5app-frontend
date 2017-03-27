import {Component, OnInit, Input} from '@angular/core';
import {ApplicationService} from '../../shared/application.service';
import {ResponseHandlerService} from '../../../shared/response-handler.service';
import {StateService} from '../../../shared/state.service';

@Component({
  selector: 'app-project-applicants',
  templateUrl: './project-applicants.component.html',
  styles: []
})
export class ProjectApplicantsComponent implements OnInit {

  @Input() project_id;
  @Input() user;
  private myProject = false;
  private members = [];
  private applying = [];

  constructor(private applicationService: ApplicationService,
              private state: StateService,
              private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
    if (this.state.isLoggedIn()) {
      this.verifyIfMyProject();
    }
      this.getApplications();
  }

  verifyIfMyProject() {
    this.myProject = this.state.getUser().id === this.user.id;
  }

  getApplications() {
    this.applicationService.getApplications(this.project_id)
      .subscribe(
        data => {
          data.map(object => {
            object.accepted === true ? this.members.push(object) : this.applying.push(object);
          });
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }
}
