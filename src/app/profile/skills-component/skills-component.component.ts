import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from '../shared/profile.service';
import {StateService} from '../../shared/state.service';
import {ResponseHandlerService} from '../../shared/response-handler.service';
import {Skill} from './skill';

@Component({
  selector: 'app-skills-component',
  templateUrl: './skills-component.component.html',
  providers: [ProfileService],
  styles: []
})
export class SkillsComponentComponent implements OnInit {
  @Input() user;
  private editing = false;
  private newSkill: Skill = new Skill();
  private skills: Skill[];
  private isMe = false;

  constructor(private route: ActivatedRoute, private profileService: ProfileService, private state: StateService,
              private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
    this.verifyIfMe(this.user.id);
    this.skills = this.user.skills;
  }

  verifyIfMe(id) {
    if (this.state.isLoggedIn() && this.state.getUser().id === id) {
      this.isMe = true;
    }
  }
  toggleEditing() {
    this.editing = !this.editing;
  }

  saveChanges() {
    this.profileService.updateUser({skills: this.skills})
      .subscribe(
        (data) => {
          this.responseHandler.successMessage(`Changes have been saved`);
          this.state.setUser(data.user);
          this.user.skills = data.user.skills;
        },
        error => {this.responseHandler.errorMessage('An error occured!', error); console.log("Error", error)});
  }

  addNewSkill() {
    if(this.newSkill.name != "") {
      this.newSkill.pivot = {skill_level : 80};
      this.skills.push(this.newSkill);
      this.newSkill = null;
    }
  }

  removeSkill(id) { //TODO wait for right skill update on backend
    this.skills.splice(this.skills.findIndex(elem => elem.name == this.newSkill.name),1);
  }

}
