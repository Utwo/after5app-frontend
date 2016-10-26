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
    page = {current_page: null, prev: null, next: null};

    constructor(private projectService: ProjectService, private state: StateService) {
    }

    ngOnInit() {
    }

    getComments() {
        this.projectService.getProjectComments(this.project_id)
            .subscribe(
                comments => {
                    this.comments = comments.data[0].comment;
                },
                error => this.errorMessage = <any>error);
    }

    addComment(text) {
        if (!text.value || !this.state.isLoggedIn()) {
            return;
        }
        let comment = {text: text.value, project_id: this.project_id};
        this.projectService.addComment(comment)
            .subscribe(
                data => {
                    text.value='';
                    this.getComments();
                },
                error => this.errorMessage = <any>error);
    }

}
