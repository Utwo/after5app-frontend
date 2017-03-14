import {Component, OnInit, Input} from '@angular/core';
import {ApplicationService} from '../../shared/application.service';
import {ResponseHandlerService} from '../../../shared/response-handler.service';
import {ProjectService} from '../../shared/project.service';
import {Router} from '@angular/router';
import {StateService} from '../../../shared/state.service';

@Component({
  selector: 'app-project-applicants',
  templateUrl: './project-applicants.component.html',
  styles: []
})
export class ProjectApplicantsComponent implements OnInit {

  @Input() project_id;
  private user;
  private myProject = false;
  private members = [];
  private applying = [];

  constructor(private applicationService: ApplicationService,
              private projectService: ProjectService,
              private state: StateService,
              private router: Router,
              private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
      this.getProject();
      this.getApplications();
  }

  // TODO just get the user not the whole project
  getProject() {
    this.projectService.getProjectById(this.project_id)
      .subscribe(
        project => {
          if (project.data.length === 0) {
            this.router.navigate(['/not-found']);
            return;
          }
          this.user = project.data[0].user;

          if (this.state.isLoggedIn()) {
            this.verifyIfMyProject();
          }
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
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
