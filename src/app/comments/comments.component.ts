import {Component, OnInit, Input} from '@angular/core';
import {ProjectService} from "../services/project.service";
import {StateService} from "../services/state.service";

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html'
})
export class CommentsComponent implements OnInit {
    @Input() project_id;
    private comments = [];
    private errorMessage:string;

    constructor(private projectService:ProjectService, private state:StateService) {
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
        if (!text) {
            return;
        }
        let comment = {text: text, project_id: this.project_id};
        this.projectService.addComment(comment)
            .subscribe(
                data => {
                    data.user.name = this.state.getUser().name;
                    this.comments.push(data.comment)
                },
                error => this.errorMessage = <any>error);
    }
}
