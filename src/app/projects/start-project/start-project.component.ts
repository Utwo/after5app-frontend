import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectService} from '../shared/project.service';
import {ResponseHandlerService} from '../../shared/response-handler.service';

@Component({
  selector: 'app-start-project',
  templateUrl: 'start-project.component.html',
})

export class StartProjectComponent {
  project = {title: '', description: '', position: [], application_questions: [], assets: []};
  steps = ['title', 'description', 'skills', 'assets', 'questions', 'overview'];
  activeStep = 'title';

  constructor(private projectService: ProjectService,
              private router: Router,
              private responseHandler: ResponseHandlerService) {
  }

  onNext(data) {
    this.project[this.activeStep] = data;
    this.nextStep();
    console.log(this.project);
  }

  nextStep() {
    const currentIndex = this.steps.indexOf(this.activeStep);
    if (currentIndex + 1 === this.steps.length) {
      this.storeProject();
    } else {
      this.activeStep = this.steps[currentIndex + 1];
    }
  }

  changeStep(step) {
    const currentIndex = this.steps.indexOf(this.activeStep);
    const nextIndex = this.steps.indexOf(step);
    if (nextIndex < currentIndex) {
      this.activeStep = step;
    }
  }

  storeProject() {
    this.projectService.addProject(this.project)
      .subscribe(
        data => {
          this.router.navigate(['/project', data.project.id]);
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }
}

