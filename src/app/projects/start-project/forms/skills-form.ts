import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-skills-form',
  template: `
    <app-form-header
      [header]="'Let\\'s pick the right skills for the project'">
    </app-form-header>
    <p class="text-info">
      Add a <b>Skill</b> and then a description to it. Skills are open slot positions for your future team members.
      People who are interested will apply on specific skills so make sure you add exactly what you need
      for the project. Don’t worry, you can always add more later :)
    </p>

    <form #skillsForm="ngForm" (ngSubmit)="storeSkills()">
      <div class="form-group mt-5">
        <div class="row">
          <div class="col-11">
            <div class="input-group">
              <app-autocomplete
                #autocomplete (onSelect)="onSelect($event)" wrap_class="form-group"
                label_message="Required skill"
                label_show="true"
                aria-describedby="skillBtnGroup">
              </app-autocomplete>
              <button
                id="skillBtnGroup"
                class="input-group-addon btn btn-success"
                type="button" (click)="addPosition(position, autocomplete)">
                Add skill
              </button>
            </div>
            <textarea class="form-control mt-1" type="text"
                      id="position-desc" placeholder="Position description" #position
                      rows="4"></textarea>
            <i [hidden]="!positionError" class="form-text text-danger">{{positionError}}</i>
          </div>
          <div class="col-1">
            <button
              class="btn btn-success"
              type="submit">
              <svg class="icon icon-md">
                <use xlink:href="assets/svg/icons.svg#icon-next-arrows"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </form>
  `,
})
export class SkillsFormComponent {
  @Input() position = [];
  selectedSkill = '';
  positionError = null;
  @Output() onNext = new EventEmitter();

  storeSkills() {
    // if (this.project.position.length < 1) {
    //   this.positionError = 'You have to add at least one position!';
    //   return;
    // }
    this.onNext.emit(this.position);
  }

  onSelect(skill) {
    this.selectedSkill = skill.name;
  }

  addPosition(pos, autocomplete) {
    const new_position = {description: pos.value, name: this.selectedSkill, status: 1};

    if (this.validatePosition(new_position)) {
      return;
    }
    this.position.push(new_position);
    autocomplete.resetValue();
    this.positionError = null;
    pos.value = '';
    console.log(this.position);
  }

  validatePosition(position) {
    for (const pos of this.position) {
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
    this.position.splice(index, 1);
  }
}

