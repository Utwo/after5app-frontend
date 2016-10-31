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

  constructor(private projectService: ProjectService, private router: Router, private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
  }

  storeProject() {
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
    if (this.selectedSkill.length === 0 || position.length === 0) {
      return;
    }
    this.project.position.push({description: position, name: this.selectedSkill, status: 0})
    this.selectedSkill = '';
  }

  removePosition(index) {
    this.project.position.splice(index, 1);
  }

  addQuestion(question) {
    this.project.application_questions.push(question);
  }

  removeQuestion(index) {
    this.project.application_questions.splice(index, 1);
  }
}
