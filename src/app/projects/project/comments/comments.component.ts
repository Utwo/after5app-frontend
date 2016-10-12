import {Component, OnInit, Input} from '@angular/core';
import {ProjectService} from "../../shared/project.service";
import {StateService} from "../../../shared/state.service";

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
})
export class CommentsComponent implements OnInit {
    @Input() project_id;
    private comments = [];
    private errorMessage: string;

    constructor(private projectService: ProjectService, private state: StateService) {
    }

    ngOnInit() {
        this.getComments();
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
        if (!text.value) {
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
