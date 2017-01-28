import { Component, OnInit } from '@angular/core';
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}