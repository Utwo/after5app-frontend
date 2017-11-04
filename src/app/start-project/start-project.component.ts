import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ResponseHandlerService} from '../core/response-handler.service';
import {ProjectService} from '../projects/shared/project.service';
import {StateService} from '../core/state.service';

@Component({
  selector: 'app-start-project',
  templateUrl: './start-project.component.html',
})

export class StartProjectComponent {
  project = {title: '', description: '', position: [], application_questions: []};
  assets = [];
  steps = ['title', 'description', 'skills', 'assets', 'questions', 'overview'];
  activeStep = 'title';
  infoMessage = {
    'title': 'Hit ENTER once you finish typing to go to the next step',
    'description': 'You can always go back and edit your answer by clicking on the previous step',
    'skills': 'Open some position slots so that other people can join your team',
    'assets': 'Add files that help you present your idea',
    'questions': 'Add question so that your future team better understands your needs',
  };

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
          data => this.storeAssets(data.project.id),
          error => this.responseHandler.errorMessage('An error occured when saing the project!', error));
    }
  }

  storeAssets(projectId) {
    if (this.assets.length) {
      const formData: FormData = new FormData();
      for (const file of this.assets) {
        formData.append('assets', file, file.name);
      }
      formData.append('project_id', projectId);
      this.projectService.addAssets(formData)
        .subscribe(
          () => this.router.navigate(['/project', projectId]),
          error => this.responseHandler.errorMessage('An error occured when saving the files!', error));
    }
  }
}

