import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectService} from '../shared/project.service';
import {ResponseHandlerService} from '../../shared/response-handler.service';

@Component({
  selector: 'app-start-project',
  templateUrl: 'start-project.component.html',
})
export class StartProjectComponent implements OnInit {
  project = {title: '', descripton: '', application_questions: [], position: []};
  selectedSkill = '';
  questionError = null;
  positionError = null;

  constructor(private projectService: ProjectService, private router: Router, private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
  }

  storeProject() {
    if (this.project.position.length < 1) {
      this.positionError = 'You have to add at least one position!';
      return;
    }
    this.projectService.addProject(this.project)
      .subscribe(
        data => {
          this.router.navigate(['/project', data.project.id]);
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  onSelect(skill) {
    this.selectedSkill = skill.name;
  }

  addPosition(pos, autocomplete) {
    const position = {description: pos.value, name: this.selectedSkill, status: 1};

    if (this.validatePosition(position)) {
      return;
    }
    this.project.position.push(position);
    autocomplete.resetValue();
    this.positionError = null;
    pos.value = '';
  }

  validatePosition(position) {
    for (let project_position of this.project.position) {
      if (position.name === project_position.name) {
        this.positionError = 'Please choose a new skill.';
        return true;
      }
    }
    if (position.description.length < 4) {
      this.positionError = 'The position description must be at least 4 characters long.';
      return true;
    }
    if (position.name.length < 1) {
      this.positionError = 'Please choose a skill.';
      return true;
    }
    if (position.name.length > 15) {
      this.positionError = 'The skill can be maximum 15 characters long.';
      return true;
    }
    return false;
  }

  removePosition(index) {
    this.project.position.splice(index, 1);
  }

  addQuestion(question) {
    if (question.value.length < 2) {
      this.questionError = 'A question must be at least 2 characters long.';
      return;
    }
    if (question.value.length > 250) {
      this.questionError = 'A question can be maximum 250 characters long.';
      return;
    }
    this.project.application_questions.push(question.value);
    this.questionError = null;
    question.value = '';
  }

  removeQuestion(index) {
    this.project.application_questions.splice(index, 1);
  }
}
