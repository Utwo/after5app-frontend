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
                tabindex="1"
                #autocomplete
                placeholder="Type skill here"
                input_class="form-control"
                (onSelect)="onSelect($event)">
              </app-autocomplete>
              <button
                tabindex="3"
                class="btn btn-success"
                type="button" (click)="addPosition(description, autocomplete)">
                Add skill
              </button>
            </div>
            <textarea
              tabindex="2"
              (keydown.enter)="addPosition(description, autocomplete);false"
              class="form-control mt-1"
              rows="2"
              placeholder="... and then add a small description"
              #description></textarea>

            <i [hidden]="!positionError" class="form-text text-danger">{{positionError}}</i>
          </div>
          <div class="col-2">
            <button
              tabindex="4"
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
    <ul class="tray scrollable_tray mt-4 text-center">
      <li class="tray--skill" *ngFor="let skill of project_positions; let i = index">
        <div class="tray--name">{{skill.name}}</div>
        <div class="tray--button" (click)="removePosition(i)">
          <small>REMOVE SKILL</small>
        </div>
      </li>
    </ul>
    <div class="text-center text-info">
      You have opened {{project_positions.length}} team 
      <span *ngIf="project_positions.length === 1">slot</span>
      <span *ngIf="project_positions.length !== 1">slots</span>.
    </div>
  `,
})
export class SkillsFormComponent {
  @Input() project_positions = [];
  selectedSkill = '';
  positionError = null;
  @Output() onNext = new EventEmitter();

  storeSkills() {
    if (this.project_positions.length < 1) {
      this.positionError = 'Please add at least one position.';
      return;
    }
    this.onNext.emit(this.project_positions);
  }

  onSelect(skill) {
    this.selectedSkill = skill.name;
  }

  addPosition(description, autocomplete) {
    const new_position = {
      description: description.value,
      name: this.selectedSkill,
      status: 1
    };

    if (this.validatePosition(new_position)) {
      this.project_positions.push(new_position);
      autocomplete.resetValue();
      this.positionError = null;
      description.value = '';
    }
  }

  validatePosition(position) {
    if (position.name.length < 1) {
      this.positionError = 'Please choose a skill.';
      return false;
    }
    if (position.name.length > 15) {
      this.positionError = 'The skill cannot be more than 15 characters long.';
      return false;
    }
    if (position.description.length < 4) {
      this.positionError = 'The description must be at least 4 characters.';
      return false;
    }
    if (position.description.length > 250) {
      this.positionError = 'The description cannot be more than 250 characters long.';
      return false;
    }
    for (const pos of this.project_positions) {
      if (position.name === pos.name) {
        this.positionError = `You already chose the ${position.name} skill.`;
        return false;
      }
    }
    return true;
  }

  removePosition(index) {
    this.project_positions.splice(index, 1);
  }
}

