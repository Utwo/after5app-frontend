import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from './shared/profile.service';
import {StateService} from '../core/state.service';
import {ResponseHandlerService} from '../core/response-handler.service';

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
      const id = +params['id'];
      this.getUser(id);
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
