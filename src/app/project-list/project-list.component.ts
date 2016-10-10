import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../services/project.service";

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
})
export class ProjectListComponent implements OnInit {
    errorMessage: string;
    projects = null;
    skills = null;
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
