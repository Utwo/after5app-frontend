import {Component, OnInit, Input, Output} from '@angular/core';
import {ProjectService} from "../../shared/project.service";
import {EventEmitter} from "@angular/common/src/facade/async";

@Component({
    selector: 'app-edit-project',
    templateUrl: './edit-project.component.html',
})
export class EditProjectComponent implements OnInit {
    @Input() project;
    @Output() onEdit = new EventEmitter<string>();
    errorMessage = '';

    constructor(private projectService: ProjectService) {
    }

    ngOnInit() {
    }

    editProject() {
        this.projectService.updateProject(this.project)
            .subscribe(
                data => {
                    this.onEdit.emit(data);
                },
                error => this.errorMessage=error)
    }

    removePosition(position_id, index) {
        this.projectService.deletePosition(position_id)
            .subscribe(
                data => {
                    this.project.position.splice(index,1);
                },
                error => this.errorMessage=error)
    }

    addQuestion(question){
        this.project.application_questions.push(question);
    }

    removeQuestion(index){
        this.project.application_questions.splice(index,1);
    }
}
