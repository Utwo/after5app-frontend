import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from '../shared/profile.service';
import {StateService} from '../../shared/state.service';
import {ResponseHandlerService} from '../../shared/response-handler.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  providers: [ProfileService]
})
export class PersonalInfoComponent implements OnInit {
  @Input() user;

  public applications = [];
  private isMe = false;
  private editing = false;
  private name: String = "";
  private city: String = "";
  private workplace: String = "";
  private description: String = "";
  private hobby: String = "";
  private hobbies: String[] = [];
  private socialInput: String = null;
  private socialOptions: String[] = ["Facebook, LinkedIn, Twitter, GitHub, Medium"];
  private link: String = "";
  private socialLinks: String[];

  constructor(private route: ActivatedRoute, private profileService: ProfileService, private state: StateService,
              private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
    this.verifyIfMe(this.user.id);
    this.name = this.user.name;
    this.city = this.user.city;
    this.workplace = this.user.workplace;
    this.description = this.user.description;
    this.hobbies = this.user.hobbies;
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
    let body = {
      name: this.name,
      city: this.city,
      description: this.description,
      workplace: this.workplace,
      hobbies: this.hobbies
    };
    this.profileService.updateUser(body)
      .subscribe(
        (data) => {
          this.responseHandler.successMessage(`Changes have been saved`);
          this.state.setUser(data.user);
          this.user = data.user;
        },
        error => {this.responseHandler.errorMessage('An error occured!', error); console.log("Error", error)});
  }

  addHobby() {
    this.hobbies.push(this.hobby);
    this.hobby = "";
  }

  removeHobby(hobby) {
    this.hobbies.splice(this.hobbies.findIndex(elem => elem == hobby),1);
    console.log(this.hobbies)
  }

  addSocial() {

  }
}
