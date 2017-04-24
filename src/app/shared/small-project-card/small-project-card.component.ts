import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../projects/shared/project.service';
import { StateService } from '../../core/state.service';
import { ResponseHandlerService } from '../../core/response-handler.service';

@Component({
  selector: 'app-small-project-card',
  templateUrl: './small-project-card.component.html'
})
export class SmallProjectCardComponent implements OnInit {
  @Input() project;
  public isFollowed = false;
  public myProject = false;

  constructor(private projectService: ProjectService,
              private state: StateService,
              private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
    if (this.state.isLoggedIn()) {
      this.verifyIfMyProject();
      this.verifyIfFavorite();
    }
  }

  verifyIfMyProject() {
    this.myProject = this.state.getUser().id === this.project.user_id;
  }

  verifyIfFavorite() {
    for (const user of this.project.favorite) {
      if (user.id === this.state.getUser().id) {
        this.isFollowed = true;
        break;
      }
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
}
