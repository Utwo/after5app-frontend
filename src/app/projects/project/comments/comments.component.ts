import {Component, OnInit, Input} from '@angular/core';
import {ProjectService} from "../../shared/project.service";
import {StateService} from "../../../shared/state.service";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent implements OnInit {
  @Input('project_id') project_id;
  @Input('comments') comments;
  private errorMessage: string;

  constructor(private projectService: ProjectService, private state: StateService) {
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
        error => this.errorMessage = <any>error);
  }

}
