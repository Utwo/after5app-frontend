import {Component, OnChanges, Input} from '@angular/core';
import {ProfileService} from '../shared/profile.service';
import {StateService} from '../../shared/state.service';
import {ResponseHandlerService} from '../../shared/response-handler.service';

@Component({
  selector: 'app-skills-component',
  templateUrl: './skills-component.component.html',
})

export class SkillsComponentComponent implements OnChanges {
  @Input() user;
  private editing = false;
  private newSkill;
  private newSkillLevel;
  private newSkills = [];
  private isMe = false;

  constructor(private profileService: ProfileService,
              private state: StateService,
              private responseHandler: ResponseHandlerService) {
  }

  ngOnChanges() {
    this.verifyIfMe(this.user.id);
    this.newSkills = this.user.skill.map(elem =>
      ({name: elem.name, skill_level: elem.pivot.skill_level}));
  }

  verifyIfMe(id) {
    this.isMe = this.state.isLoggedIn() && this.state.getUser().id === id;
  }

  toggleEditing() {
    this.editing = !this.editing;
  }

  saveChanges() {
    this.profileService.updateUserSkills({skill: this.newSkills})
      .subscribe(
        () => {
          this.responseHandler.successMessage('Changes have been saved');
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  addNewSkill() {
    if (this.newSkill !== '') {
      this.newSkills.push({name: this.newSkill, skill_level: this.newSkillLevel});
      this.newSkill = null;
    }
  }

  removeSkill(skill) {
    this.newSkills.splice(this.newSkills.findIndex(elem => elem === skill), 1);
  }
}
