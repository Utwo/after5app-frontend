import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProjectService} from "../shared/project.service";
import {ResponseHandlerService} from "../../shared/response-handler.service";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
})
export class AddProjectComponent implements OnInit {
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
          this.router.navigate(['/project', data.project.id])
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  onSelect(skill) {
    this.selectedSkill = skill.name;
  }

  addPosition(position) {
    if (this.selectedSkill.length === 0 || position.value.length === 0) {
      return;
    }
    if (position.value.length < 4) {
      this.positionError = 'The position description must be at least 4 characters long.';
      return;
    }
    this.project.position.push({description: position.value, name: this.selectedSkill, status: 0});
    this.selectedSkill = '';
    this.positionError = null;
    position.value='';
  }

  removePosition(index) {
    this.project.position.splice(index, 1);
  }

  addQuestion(question) {
    if (question.length < 2) {
      this.questionError = "A question must be at least 2 characters long.";
      return;
    }
    this.project.application_questions.push(question);
    this.questionError = null;

  }

  removeQuestion(index) {
    this.project.application_questions.splice(index, 1);
  }
}
