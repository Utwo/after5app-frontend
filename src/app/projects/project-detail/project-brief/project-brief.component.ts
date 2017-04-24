import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectService} from '../../shared/project.service';
import {ApplicationService} from '../../shared/application.service';
import {StateService} from '../../../core/state.service';
import {ResponseHandlerService} from '../../../core/response-handler.service';

@Component({
  selector: 'app-project-brief',
  templateUrl: './project-brief.component.html',
  styles: []
})
export class ProjectBriefComponent implements OnInit {
  @Input() project;
  private myProject = false;
  public related = null;
  myApplications = [];

  constructor(
              private projectService: ProjectService,
              private state: StateService,
              private applicationService: ApplicationService,
              private router: Router,
              private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
    if (this.state.isLoggedIn()) {
      this.verifyIfMyProject();
      this.getMyApplications();
    }
    this.getRelatedProjects();
  }

  verifyIfMyProject() {
    if (this.state.getUser().id === this.project.user_id) {
      this.myProject = true;
    } else {
      this.myProject = false;
    }
  }

  scrollDown() {
    // $location.hash('positionsInfo');
    // $anchorScroll();
  }

  getMyApplications() {
    this.applicationService.getMyApplications(this.project.id)
      .subscribe(
        data => this.myApplications = data,
        error => this.responseHandler.errorMessage('An error occured!', error)
      );
  }

  getRelatedProjects() {
    const skills = [];
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
