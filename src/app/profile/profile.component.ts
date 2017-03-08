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

  constructor(private route: ActivatedRoute,
              private profileService: ProfileService,
              private state: StateService,
              private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.getUser(id);
      console.log(this.state.getToken());
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
