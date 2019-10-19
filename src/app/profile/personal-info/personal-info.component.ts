import { Component, OnChanges, Input } from "@angular/core";
import { ProfileService } from "../shared/profile.service";
import { StateService } from "../../core/state.service";
import { ResponseHandlerService } from "../../core/response-handler.service";

@Component({
  selector: "app-personal-info",
  templateUrl: "./personal-info.component.html"
})
export class PersonalInfoComponent implements OnChanges {
  @Input() user;
  public isMe = false;
  public editing = false;
  public name: String = "";
  public city: String = "";
  public workplace: String = "";
  public description: String = "";
  public hobby: String = "";
  public hobbies: String[] = [];
  public socialInput: String = "";
  public socialOptions: String[] = ["LinkedIn", "Twitter", "Medium"];
  public link: String = "";

  constructor(
    private profileService: ProfileService,
    private state: StateService,
    private responseHandler: ResponseHandlerService
  ) {}

  ngOnInit() {
    if (!this.user.facebook_id) {
      this.socialOptions.push("Facebook");
    }
    if (!this.user.github_id) {
      this.socialOptions.push("Github");
    }
  }

  ngOnChanges() {
    this.verifyIfMe(this.user.id);
    this.name = this.user.name;
    this.city = this.user.city;
    this.workplace = this.user.workplace;
    this.description = this.user.description;
    this.hobbies = this.user.hobbies || [];
  }

  verifyIfMe(id) {
    this.isMe = this.state.isLoggedIn() && this.state.getUser().id === id;
  }

  toggleEditing() {
    this.editing = !this.editing;
  }

  saveChanges() {
    const body = {
      name: this.name,
      city: this.city,
      description: this.description,
      workplace: this.workplace,
      hobbies: this.hobbies
    };
    this.profileService.updateUser(body).subscribe({
      next: (data: any) => {
        this.responseHandler.successMessage("Changes have been saved");
        this.state.setUser(data.user);
        this.user = data.user;
      },
      error: error => {
        this.responseHandler.errorMessage("An error occured!", error);
      }
    });
  }

  addHobby() {
    this.hobbies.push(this.hobby);
    this.hobby = "";
  }

  removeHobby(hobby) {
    this.hobbies.splice(this.hobbies.findIndex(elem => elem === hobby), 1);
  }

  addSocial() {
    console.log(this.socialInput, this.link);

    const social = this.user.social || [];
    social.push(this.link);
    this.profileService.updateUser({ social }).subscribe({
      next: (data: any) => {
        this.responseHandler.successMessage("Changes have been saved");
        this.state.setUser(data.user);
        this.user = data.user;
      },
      error: error => {
        this.responseHandler.errorMessage("An error occured!", error);
      }
    });
  }
}
