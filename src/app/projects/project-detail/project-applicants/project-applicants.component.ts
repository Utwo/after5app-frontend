import {Component, OnInit, Input} from '@angular/core';
import {ApplicationService} from '../../shared/application.service';
import {ResponseHandlerService} from '../../../core/response-handler.service';
import {StateService} from '../../../core/state.service';

@Component({
  selector: 'app-project-applicants',
  templateUrl: './project-applicants.component.html'
})

export class ProjectApplicantsComponent implements OnInit {

  @Input() project_id;
  @Input() user;
  private myProject = false;
  public applications = null;
  private nr_of_members = null;
  private nr_of_applying = null;

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

  acceptApplication(application_id) {
    this.applications = this.applications.map(
      obj => {
        if (obj.id === application_id) {
          obj.accepted = true;
        }
        return obj;
      }
    );
  }

  declineApplication(application_id) {
    this.applications = this.applications.filter(
      obj => obj.id !== application_id
    );
    if (this.applications.length === 0) {
      this.nr_of_applying = 0;
    }
  }

  getCount() {
    this.nr_of_members = this.applications.filter(obj => obj.accepted).length;
    this.nr_of_applying = this.applications.length - this.nr_of_members;
  }

  getApplications() {
    this.applicationService.getApplications(this.project_id)
      .subscribe(
        data => {
          this.applications = data;
          this.getCount();
          console.log(data);
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }
}
