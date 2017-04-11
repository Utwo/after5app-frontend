import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectService} from '../shared/project.service';
import {ResponseHandlerService} from '../../shared/response-handler.service';
import {StateService} from '../../shared/state.service';

@Component({
  selector: 'app-start-project',
  templateUrl: 'start-project.component.html',
})

export class StartProjectComponent {
  project = {title: '', description: '', position: [], application_questions: [], assets: []};
  steps = ['title', 'description', 'skills', 'assets', 'questions', 'overview'];
  activeStep = 'title';

  constructor(private projectService: ProjectService,
              private state: StateService,
              private router: Router,
              private responseHandler: ResponseHandlerService) {
    if (!!localStorage['project']) {
      this.project = JSON.parse(localStorage.getItem('project'));
      this.activeStep = 'overview';
    }
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
    } else {
      const title = step === 'title';
      const description = step === 'description' && this.project.title;
      const skills = step === 'skills' && this.project.title && this.project.description;
      const others = (step === 'assets' || step === 'questions' || step === 'overview')
        && this.project.position.length > 0 && this.project.title && this.project.description;

      if (title || description || skills || others) {
        this.activeStep = step;
      }
    }
  }

  goToStep(step) {
    this.activeStep = step;
  }

  storeProject() {
    if (!!localStorage['project']) {
      localStorage.removeItem('project');
    }
      if (!this.state.isLoggedIn()) {
      localStorage.setItem('project', JSON.stringify(this.project));
    } else {
      this.projectService.addProject(this.project)
        .subscribe(
          data => {
            this.router.navigate(['/project', data.project.id]);
          },
          error => this.responseHandler.errorMessage('An error occured!', error));
    }
  }
}

