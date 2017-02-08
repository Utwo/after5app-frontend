import {Component, OnInit, Input} from '@angular/core';
import {IProject} from '../../projects/shared/project';
import {ProjectService} from '../../projects/shared/project.service';
import {ActivatedRoute} from '@angular/router';
import {StateService} from '../state.service';
import {ResponseHandlerService} from '../response-handler.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styles: []
})
export class ProjectCardComponent implements OnInit {
  @Input() project;
  footerStatement: string;
  public isFollowed = false;
  public myProject = false;


  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private state: StateService,
              private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
    if (this.state.isLoggedIn()) {
      this.verifyIfMyProject();
      this.verifyIfFavorite();
    }
    this.footerStatement = "The project has currently  " + this.project.favorite_count + " followers and 0 members";
  }

  // getProjectDetails() {
  //   this.projectService.getProjectById(this.projectId)
  //     .subscribe(
  //       data =>  this.project = data.data[0],
  //       error => this.responseHandler.errorMessage('An error occured!', error),
  //     )
  // }

  verifyIfMyProject() {
    this.myProject = this.state.getUser().id == this.project.user_id;
  }

  verifyIfFavorite() {
    for (let user of this.project.favorite) {
      if (user.id === this.state.getUser().id) {
        this.isFollowed = true;
        break;
      }
    }
  }

  follow(modal) {
    if(this.state.isLoggedIn()) {
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
    }
    else {
      modal.open();
    }
  }

  unfollow() {

  }
}
