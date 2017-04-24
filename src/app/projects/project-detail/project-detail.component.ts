import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../shared/project.service';
import {StateService} from '../../shared/state.service';
import {ResponseHandlerService} from '../../shared/response-handler.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styles: []
})

export class ProjectDetailComponent implements OnInit {
  @Input() id;
  public project = null;
  private myProject = false;
  private isMember = false;

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
            this.verifyIfMember();
          }
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  verifyIfMember() {
    let self = this;
    this.project.position.map (position => {
      position.member.map (member => {
        if (member.id === this.state.getUser().id) {
          self.isMember = true;
        }
      });
    });
  }

  verifyIfMyProject() {
    if (this.state.getUser().id === this.project.user_id) {
      this.myProject = true;
    } else {
      this.myProject = false;
    }
  }
}
