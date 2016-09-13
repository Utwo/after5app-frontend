import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../services/project.service";

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html'
})
export class ProjectListComponent implements OnInit {
    errorMessage:string;
    projects = [];

    constructor(private projectService:ProjectService) {
    }

    ngOnInit() {
        this.getProjects();
    }

    getProjects() {
        this.projectService.getProjects()
            .subscribe(
                projects => this.projects = projects,
                error => this.errorMessage = <any>error);
    }

}
