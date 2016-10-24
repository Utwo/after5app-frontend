import {Component, OnInit} from '@angular/core';
import {StateService} from "../../shared/state.service";
import {ProfileService} from "../shared/profile.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  providers: [ProfileService]
})
export class SettingsComponent implements OnInit {
  private errorMessage;
  private user = {name:'', workplace:'', website:'', twitter:'', skill:[]};
  private selectedSkill;

  constructor(private state: StateService, private profileService: ProfileService) {
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
        error => this.errorMessage = <any>error);
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
        },
        error => this.errorMessage = <any>error);
  }
}
