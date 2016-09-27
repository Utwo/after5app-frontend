import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../services/project.service";
import {AutocompleteComponent} from "../autocomplete/autocomplete.component";

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    directives: [AutocompleteComponent]
})
export class ProjectListComponent implements OnInit {
    errorMessage: string;
    projects = [];
    skills = [];
    page = {current_page: null, prev: null, next: null};

    constructor(private projectService: ProjectService) {
    }

    ngOnInit() {
        this.getProjects(1);
        this.getSkills();
    }

    getProjects(page) {
        this.projectService.getProjects(page)
            .subscribe(
                projects => this.extractData(projects),
                error => this.errorMessage = <any>error);
    }

    getSkills() {
        this.projectService.getSkills()
            .subscribe(
                skills => this.skills = skills,
                error => this.errorMessage = <any>error);
    }

    filterProjects(skill) {
        this.projectService.filterBySkill(skill)
            .subscribe(
                projects => this.extractData(projects),
                error => this.errorMessage = <any>error);
    }

    searchByName(name) {
        this.projectService.searchByName(name)
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
        }
    }

    selectedSkill(skill) {
        console.log(skill);
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
