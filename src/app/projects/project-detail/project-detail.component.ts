import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../shared/project.service';
import {ApplicationService} from '../shared/application.service';
import {StateService} from '../../shared/state.service';
import {ResponseHandlerService} from '../../shared/response-handler.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styles: []
})
export class ProjectDetailComponent implements OnInit {
  @Input() id;
  private project = null;
  private myProject = false;

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private state: StateService,
              private router: Router,
              private responseHandler: ResponseHandlerService) {
  }


  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
          this.id = id;
          this.getProject();
      });
  }

  getProject() {
    this.projectService.getProjectById(this.id)
      .subscribe(
        project => {
          if (project.data.length === 0) {
            this.router.navigate(['/not-found']);
            return;
          }
          this.project = project.data[0];
          console.log(this.project)
          if (this.state.isLoggedIn()) {
            this.verifyIfMyProject();
          }
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  verifyIfMyProject() {
    if (this.state.getUser().id === this.project.user_id) {
      this.myProject = true;
    } else {
      this.myProject = false;
    }
  }
}
