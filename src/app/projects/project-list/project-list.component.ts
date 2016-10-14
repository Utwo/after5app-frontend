import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../shared/project.service";

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
})
export class ProjectListComponent implements OnInit {
    errorMessage: string;
    projects = null;
    page = {current_page: null, prev: null, next: null};
    autocompleteType = 'list';
    maxDescriptionLength = 210;

    constructor(private projectService: ProjectService) {
    }

    ngOnInit() {
        this.getProjects(1);
    }

    getProjects(page) {
        this.projectService.getProjects(page)
            .subscribe(
                projects => this.extractData(projects),
                error => this.errorMessage = <any>error);
    }

    filterProjects(skill) {
        this.projectService.filterBySkill(skill)
            .subscribe(
                projects => this.extractData(projects),
                error => this.errorMessage = <any>error);
    }

    getRecommendedProjects() {
        this.projectService.getRecommendedProjects()
            .subscribe(
                projects => this.extractData(projects),
                error => this.errorMessage = <any>error);
    }

    getPopularProjects() {
        this.projectService.getPopularProjects()
            .subscribe(
                projects => this.extractData(projects),
                error => this.errorMessage = <any>error);
    }

    extractData(projects) {
        this.projects = projects.data;
        this.page = {
            current_page: projects.current_page,
            next: projects.next_page_url,
            prev: projects.prev_page_url
        };
        for (let project of this.projects) {
            if(project.description.length > this.maxDescriptionLength){
                project.description = project.description.substring(0, this.maxDescriptionLength) + '...';
            }
        }
    }

    onSelect(skill) {
        this.filterProjects(skill.id);
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
