import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from './shared/profile.service';
import {StateService} from '../shared/state.service';
import {ResponseHandlerService} from '../shared/response-handler.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers: [ProfileService]
})

export class ProfileComponent implements OnInit, OnDestroy {
  private sub;
  public user = null;
  public isMe = false;
  public applications = [];
  public isPersonalActive = true;
  public isBadgesActive = false;

  constructor(private route: ActivatedRoute, private profileService: ProfileService, private state: StateService,
              private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.getUser(id);
      //console.log(this.state.getToken())
      this.verifyIfMe(id);
    });
  }

  getUser(id) {
    this.profileService.getUser(id)
      .subscribe(
        user => {
          this.user = user;
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  verifyIfMe(id) {
    if (this.state.isLoggedIn() && this.state.getUser().id === id) {
      this.isMe = true;
      this.getMyApplications();
    }
  }

  getMyApplications() {
    this.profileService.getMyApplications()
      .subscribe(
        applications => this.applications = applications,
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  setBadgesPage() {
    this.isPersonalActive = false;
    this.isBadgesActive = true;
  }

  setPersonalInfoPage() {
    this.isPersonalActive = true;
    this.isBadgesActive = false;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
