import {Component, OnInit} from '@angular/core';
import {StateService} from '../../shared/state.service';
import {ProfileService} from '../shared/profile.service';
import {ResponseHandlerService} from '../../shared/response-handler.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  providers: [ProfileService]
})
export class SettingsComponent implements OnInit {
  private user = {name: '', workplace: '', website: '', twitter: ''};
  private skills = [];
  private selectedSkill = '';
  private skillError = null;

  constructor(private state: StateService,
              private profileService: ProfileService,
              private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.profileService.getLoggedInUser()
      .subscribe(
        user => {
          for (let skill of user.skill) {
            this.skills.push(skill.name);
          }
          delete user.skill;
          this.user = user;
          if (!this.user.website) {
            this.user.website = '';
          }
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  onSelect(skill) {
    this.selectedSkill = skill.name;
  }

  addSkill(autocomplete) {
    this.skillError = null;
    if (this.selectedSkill.length < 1 || this.skills.indexOf(this.selectedSkill) >= 0) {
      return;
    }
    if (this.selectedSkill.length > 15) {
      this.skillError = 'A skill cannot be more that 15 characters';
      return;
    }
    this.skills.push(this.selectedSkill);
    autocomplete.resetValue();
    this.profileService.updateUser({skill: this.skills})
      .subscribe(
        () => this.responseHandler.successMessage(`The skill ${this.selectedSkill} was added.`),
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  removeSkill(index) {
    const skill = this.skills[index];
    this.skills.splice(index, 1);
    this.profileService.updateUser({skill: this.skills})
      .subscribe(
        () => this.responseHandler.successMessage(`The skill ${skill} was removed.`),
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  onSubmit() {
    this.profileService.updateUser(this.user)
      .subscribe(
        data => {
          this.state.setUser(data.user);
          this.responseHandler.successMessage('The changes were saved!');
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }
}
