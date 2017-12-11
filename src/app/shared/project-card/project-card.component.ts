import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { ProjectService } from '../../projects/shared/project.service';
import { StateService } from '../../core/state.service';
import { ResponseHandlerService } from '../../core/response-handler.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styles: []
})
export class ProjectCardComponent implements OnInit {
  @Input() project;
  @Input() autocomplete;
  @Output() onFilter = new EventEmitter<number>();
  footerStatement: string;
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
    this.footerStatement = 'The project has currently  ' + this.project.favorite_count + ' followers and 0 members';
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

  clickSkill(skill){
    this.onFilter.emit(skill.id);
    if(this.autocomplete){
      this.autocomplete.setValue(skill.name)
    }
  }
}
