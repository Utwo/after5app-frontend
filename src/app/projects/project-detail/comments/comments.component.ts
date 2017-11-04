import {Component, Input} from '@angular/core';
import {ProjectService} from '../../shared/project.service';
import {StateService} from '../../../core/state.service';
import {ResponseHandlerService} from '../../../core/response-handler.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent {
  @Input('project_id') project_id;
  @Input('comments') comments;

  constructor(private projectService: ProjectService, public state: StateService, private responseHandler: ResponseHandlerService) {
  }

  addComment(text) {
    if (!text.value || !this.state.isLoggedIn()) {
      return;
    }
    const comment = {text: text.value, project_id: this.project_id};
    this.projectService.addComment(comment)
      .subscribe(
        data => {
          text.value = '';
          data.comment.user = this.state.getUser();
          this.comments.push(data.comment);
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

}
