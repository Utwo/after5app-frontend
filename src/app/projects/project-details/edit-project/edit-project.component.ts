import {Component, Input, Output} from '@angular/core';
import {ProjectService} from '../../shared/project.service';
import {EventEmitter} from '@angular/common/src/facade/async';
import {ResponseHandlerService} from '../../../shared/response-handler.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
})
export class EditProjectComponent {
  @Input() project;
  @Output() onEdit = new EventEmitter<string>();
  selectedSkill = '';
  positionError = null;

  constructor(private projectService: ProjectService,
              private responseHandler: ResponseHandlerService) {
  }

  editProject() {
    this.projectService.updateProject(this.project)
      .subscribe(
        data => this.onEdit.emit(data),
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  removePosition(position_id, index) {
    this.projectService.deletePosition(position_id)
      .subscribe(
        () => this.project.position.splice(index, 1),
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  addPosition(pos, autocomplete) {
    const position = {
      description: pos.value,
      name: this.selectedSkill,
      status: 1,
      project_id: this.project.id
    };

    if (this.validatePosition(position)) {
      return;
    }
    this.positionError = null;

    this.projectService.addPosition(position)
      .subscribe(
        (data) => {
          this.project.position.push({
            id: data.position.id,
            description: data.position.description,
            skill: {name: data.position.name},
            status: true
          });
          pos.value = '';
          autocomplete.resetValue();
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  onSelect(skill) {
    this.selectedSkill = skill.name;
  }

  addQuestion(question) {
    this.project.application_questions.push(question);
  }

  removeQuestion(index) {
    this.project.application_questions.splice(index, 1);
  }

  validatePosition(position) {
    for (let project_position of this.project.position) {
      if (position.name === project_position.skill.name) {
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
}
