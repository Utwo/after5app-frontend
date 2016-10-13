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

    constructor(private projectService: ProjectService) {
    }

    ngOnInit() {
    }

    editProject() {
        this.projectService.addProject(this.project)
            .subscribe(
                data => {
                    this.onEdit.emit(data);
                },
                error => {//error handling
                })
    }
}
