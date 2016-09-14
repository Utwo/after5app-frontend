import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../services/project.service";

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html'
})
export class ProjectListComponent implements OnInit {
    errorMessage:string;
    projects = [];
    page = {current_page: 0, prev: 0, next: 0};

    constructor(private projectService:ProjectService) {
    }

    ngOnInit() {
        this.getProjects(1);
    }

    getProjects(page) {
        this.projectService.getProjects(page)
            .subscribe(
                projects => {
                    this.projects = projects.data;
                    this.page = {
                        current_page: projects.current_page,
                        next: projects.next_page_url,
                        prev: projects.prev_page_url
                    }

                },
                error => this.errorMessage = <any>error);
    }

    private prevPage() {
        if (this.page.prev) {
            this.getProjects(this.page.current_page - 1)
        }
    }

    private nextPage() {
        if (this.page.next) {
            this.getProjects(this.page.current_page + 1)
        }
    }

}
