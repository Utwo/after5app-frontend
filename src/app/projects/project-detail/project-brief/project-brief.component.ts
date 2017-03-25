import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../shared/project.service';
import {ApplicationService} from '../../shared/application.service';
import {StateService} from '../../../shared/state.service';
import {ResponseHandlerService} from '../../../shared/response-handler.service';

@Component({
  selector: 'app-project-brief',
  templateUrl: './project-brief.component.html',
  styles: []
})
export class ProjectBriefComponent implements OnInit {
  @Input() project_id;
  project = null;
  private myProject = false;
  public related = null;

  constructor(
              private projectService: ProjectService,
              private state: StateService,
              private router: Router,
              private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
    this.getProject();
  }

  getProject() {
    this.projectService.getProjectById(this.project_id)
      .subscribe(
        project => {
          if (project.data.length === 0) {
            this.router.navigate(['/not-found']);
            return;
          }
          this.project = project.data[0];
          if (this.state.isLoggedIn()) {
            this.verifyIfMyProject();
          }
           this.getRelatedProjects();
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  verifyIfMyProject() {
    if (this.state.getUser().id === this.project.user_id) {
      this.myProject = true;
      // this.getApplications();
    } else {
      this.myProject = false;
    }
  }

  scrollDown() {
    // $location.hash('positionsInfo');
    // $anchorScroll();
  }

  getRelatedProjects() {
    let skills = [];
    this.project.position.map(item => {
      skills.push(item.skill.id);
    });
    this.projectService.filterBySkill(skills.join(','), this.project.id)
      .subscribe(
        project => {
          this.related = project.data.sort(() => {
            return 0.5 - Math.random();
          }).splice(0, 3);
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }
}
