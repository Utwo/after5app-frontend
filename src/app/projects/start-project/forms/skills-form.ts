import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-skills-form',
  template: `
    <app-section-header
      [header]="'Let\\'s pick the right skills for the project'"
      [subheader]="'This is important!'">
    </app-section-header>
    <p>
      Add a <b>Skill</b> and then a description to it. Skills are open slot positions for your future team members.
      People who are interested will apply on specific skills so make sure you add exactly what you need
      for the project. Don’t worry, you can always add more later :)
    </p>

    <form #skillsForm="ngForm" (ngSubmit)="storeSkills()">
      <div class="form-group p-1">
        <app-autocomplete
          #autocomplete (onSelect)="onSelect($event)" wrap_class="form-group"
          label_message="Required skill"
          label_show="true">          
        </app-autocomplete>
        <div class="form-group">
          <textarea class="form-control mt-1" type="text"
                id="position-desc" placeholder="Position description" #position
                rows="4"></textarea>
          <i [hidden]="!positionError" class="form-text text-danger">{{positionError}}</i>
        </div>
        <div class="text-right">
          <button class="btn btn-info" type="button" (click)="addPosition(position, autocomplete)">Add Position
          </button>
        </div>
      </div>
      <button
        class="input-group-addon btn btn-success"
        type="submit">
        >>
      </button>
    </form>
  `,
})
export class SkillsFormComponent {
  position = [];
  selectedSkill = '';
  positionError = null;
  @Output() onNext = new EventEmitter();

  storeSkills() {
    this.onNext.emit(this.position);
  }

  onSelect(skill) {
    this.selectedSkill = skill.name;
  }

  addPosition(pos, autocomplete) {
    const position = {description: pos.value, name: this.selectedSkill, status: 1};

    if (this.validatePosition(position)) {
      return;
    }
    this.position.push(position);
    autocomplete.resetValue();
    this.positionError = null;
    pos.value = '';
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

