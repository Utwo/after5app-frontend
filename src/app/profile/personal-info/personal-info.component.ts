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

  private sub;
  public applications = [];
  private isMe = false;
  private editing = false;
  private name: String = "";
  private country: String = "";
  private city: String = "";
  private workplace: String = "";
  private description: String = "";
  private hobbie: String = "";


  constructor(private route: ActivatedRoute, private profileService: ProfileService, private state: StateService,
              private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
    this.verifyIfMe(this.user.id);
    this.name = this.user.name;
    this.country = this.user.name;
    this.city = this.user.name;
    this.workplace = this.user.workplace;
    this.description = this.user.name;
  }

  verifyIfMe(id) {
    if (this.state.isLoggedIn() && this.state.getUser().id === id) {
      this.isMe = true;
    }
  }

  toggleEditing() {
    this.editing = !this.editing;
  }

}
