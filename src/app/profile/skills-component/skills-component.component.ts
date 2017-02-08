import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from '../shared/profile.service';
import {StateService} from '../../shared/state.service';
import {ResponseHandlerService} from '../../shared/response-handler.service';

@Component({
  selector: 'app-skills-component',
  templateUrl: './skills-component.component.html',
  providers: [ProfileService],
  styles: []
})

export class SkillsComponentComponent implements OnInit {
  @Input() user;
  private editing = false;
  private newSkill;
  private newSkills = [];
  private isMe = false;

  constructor(private route: ActivatedRoute, private profileService: ProfileService, private state: StateService,
              private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
    this.verifyIfMe(this.user.id);
    console.log(this.state.getToken())
    this.user.skill.map(elem => this.newSkills.push({name: elem.name, skill_level: elem.pivot.skill_level}));
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
    this.profileService.updateUserSkills({skill: this.newSkills})
      .subscribe(
        (data) => {
          this.responseHandler.successMessage(`Changes have been saved`);
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  addNewSkill() {
    if(this.newSkill != "") {
      this.newSkills.push({name: this.newSkill, skill_level: 80});
      this.newSkill = null;
    }
  }

  removeSkill(skill) {
    this.newSkills.splice(this.newSkills.findIndex(elem => elem == skill),1);
  }

}
