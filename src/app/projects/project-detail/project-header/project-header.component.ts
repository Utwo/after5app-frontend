import {Component, OnInit, Input} from '@angular/core';
import {StateService} from '../../../shared/state.service';
import {ResponseHandlerService} from '../../../shared/response-handler.service';
import {ProjectService} from '../../shared/project.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-header',
  templateUrl: 'project-header.component.html',
  styles: []
})

export class ProjectHeaderComponent implements OnInit {
  private user = null;
  @Input() project;
  myProject = false;
  private isFollowed = false;

  constructor(
              private projectService: ProjectService,
              private state: StateService,
              private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
    this.user = this.project.user;
    this.loadData();
  }

  loadData() {
    if (this.state.isLoggedIn()) {
      this.verifyIfFavorite();
      this.verifyIfMyProject();
    }
  }

  verifyIfFavorite() {
    for (let user of this.project.favorite) {
      if (user.id === this.state.getUser().id) {
        this.isFollowed = true;
        break;
      }
    }
  }

  verifyIfMyProject() {
    if (this.state.getUser().id === this.project.user_id) {
      this.myProject = true;
    } else {
      this.myProject = false;
    }
  }

  follow(modal) {
    if (this.state.isLoggedIn()) {
      this.projectService.addFavorite(this.project.id)
        .subscribe(
          () => {
            this.isFollowed = !this.isFollowed;
            if (this.isFollowed) {
              this.project.favorite_count++;
            } else {
              this.project.favorite_count--;
            }
          },
          error => this.responseHandler.errorMessage('An error occured!', error));
    } else {
      modal.open();
    }
  }

  shared(error) {
    if (error) {
      this.responseHandler.errorMessage('An error occured!', error);
    } else {
      this.responseHandler.successMessage('Your project was shared!');
    }
  }


}
