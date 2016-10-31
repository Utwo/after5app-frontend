import {Component, OnInit} from '@angular/core';
import {StateService} from "../../shared/state.service";
import {ProfileService} from "../shared/profile.service";
import {ResponseHandlerService} from "../../shared/response-handler.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  providers: [ProfileService]
})
export class SettingsComponent implements OnInit {
  private user = {name: '', workplace: '', website: '', twitter: '', skill: []};
  private selectedSkill;

  constructor(private state: StateService, private profileService: ProfileService, private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.profileService.getLoggedInUser()
      .subscribe(
        user => {
          let skills = [];
          for (let skill of user.skill) {
            skills.push(skill.name);
          }
          this.user = user;
          this.user.skill = skills;
          if (!this.user.website) {
            this.user.website = '';
          }
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  onSelect(skill) {
    this.selectedSkill = skill.name;
  }

  addSkill() {
    this.user.skill.push(this.selectedSkill);
  }

  removeSkill(index) {
    this.user.skill.splice(index, 1);
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
