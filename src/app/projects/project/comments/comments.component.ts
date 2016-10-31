import {Component, OnInit, Input} from '@angular/core';
import {ProjectService} from "../../shared/project.service";
import {StateService} from "../../../shared/state.service";
import {ResponseHandlerService} from "../../../shared/response-handler.service";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent implements OnInit {
  @Input('project_id') project_id;
  @Input('comments') comments;

  constructor(private projectService: ProjectService, private state: StateService, private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
  }

  addComment(text) {
    if (!text.value || !this.state.isLoggedIn()) {
      return;
    }
    let comment = {text: text.value, project_id: this.project_id};
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
