import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-skills-form',
  template: `
    <app-form-header
      [header]="'Let\\'s pick the right skills for the project'">
    </app-form-header>
    <p class="text-info">
      Add a <b>Skill</b> and then a description for it. Skills are open slot positions for your future team members.
      People who are interested will apply on specific skills so make sure you add exactly what you need
      for the project. Don’t worry, you can always add more later :)
    </p>

    <form #skillsForm="ngForm" (ngSubmit)="storeSkills()">
      <div class="form-group mt-5">
        <div class="row">
          <div class="col-10">
            <div class="mb-3">
              <app-autocomplete
                #autocomplete
                placeholder="Type skill here"
                input_class="form-control"
                (onSelect)="onSelect($event)">
              </app-autocomplete>
              <button
                class="btn btn-success"
                type="button" (click)="addPosition(position, autocomplete)">
                Add skill
              </button>
            </div>
            <textarea
              class="form-control mt-1"
              type="text"
              id="position-desc"
              placeholder="... and then add a small description"
              #position
              rows="2"></textarea>
            <i [hidden]="!positionError" class="form-text text-info">{{positionError}}</i>
          </div>
          <div class="col-2">
            <button
              class="btn btn-success float-right"
              type="submit">
              <svg class="icon icon-md">
                <use xlink:href="assets/svg/icons.svg#icon-next-arrows"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </form>
    <ul class="skill_tray mt-4 text-center">
      <li class="skill_tray--item" *ngFor="let skill of project_positions; let i = index">
        <div class="skill_tray--name">{{skill.name}}</div>
        <div class="skill_tray--button" (click)="removePosition(i)">
          <small>REMOVE SKILL</small>
        </div>
      </li>
    </ul>
    <div class="text-center text-info">
      You have opened {{project_positions.length}} team slots.
    </div>
  `,
})
export class SkillsFormComponent {
  @Input() project_positions = [];
  selectedSkill = '';
  positionError = null;
  @Output() onNext = new EventEmitter();

  storeSkills() {
    // if (this.project_positions.length < 1) {
    //   this.positionError = 'You have to add at least one position!';
    //   return;
    // }
    this.onNext.emit(this.project_positions);
  }

  onSelect(skill) {
    this.selectedSkill = skill.name;
  }

  addPosition(pos, autocomplete) {
    const new_position = {description: pos.value, name: this.selectedSkill, status: 1};

    if (this.validatePosition(new_position)) {
      return;
    }
    this.project_positions.push(new_position);
    autocomplete.resetValue();
    this.positionError = null;
    pos.value = '';
  }

  validatePosition(position) {
    for (const pos of this.project_positions) {
      if (position.name === pos.name) {
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
    this.project_positions.splice(index, 1);
  }
}

