import { Component, OnChanges, Input } from "@angular/core";
import { ProfileService } from "../shared/profile.service";
import { StateService } from "../../core/state.service";
import { ResponseHandlerService } from "../../core/response-handler.service";

@Component({
  selector: "app-skills",
  templateUrl: "./skills.component.html"
})
export class SkillsComponent implements OnChanges {
  @Input() user;
  editing = false;
  newSkill;
  newSkills = [];
  isMe = false;

  constructor(
    private profileService: ProfileService,
    private state: StateService,
    private responseHandler: ResponseHandlerService
  ) {}

  ngOnChanges() {
    this.verifyIfMe(this.user.id);
    this.newSkills = this.user.skill.map(elem => ({
      name: elem.name,
      skill_level: elem.pivot.skill_level
    }));
  }

  verifyIfMe(id) {
    this.isMe = this.state.isLoggedIn() && this.state.getUser().id === id;
  }

  toggleEditing() {
    this.editing = !this.editing;
  }

  saveChanges() {
    this.profileService.updateUserSkills({ skill: this.newSkills }).subscribe(
      () => {
        this.responseHandler.successMessage("Changes have been saved");
      },
      error => this.responseHandler.errorMessage("An error occured!", error)
    );
  }

  valueChange(skill, level) {
    console.log(skill, level, this.newSkills);
    this.newSkills = this.newSkills.map(s =>
      s.name === skill ? { ...s, skill_level: level } : s
    );
    console.log(this.newSkills);
  }

  addNewSkill() {
    if (this.newSkill) {
      if (this.newSkills.find(s => s.name === this.newSkill)) {
        this.newSkill = null;
        return;
      }
      this.newSkills.push({ name: this.newSkill, skill_level: 1 });
      this.newSkill = null;
    }
  }

  removeSkill(skill) {
    this.newSkills.splice(this.newSkills.findIndex(elem => elem === skill), 1);
  }
}
