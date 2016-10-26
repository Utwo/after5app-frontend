import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../shared/project.service";
import {StateService} from "../../shared/state.service";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
})
export class ProjectListComponent implements OnInit {
  errorMessage: string;
  projects = null;
  page = {current_page: null, prev: null, next: null};
  maxDescriptionLength = 210;

  constructor(private projectService: ProjectService, private state: StateService) {

  }

  ngOnInit() {
    this.getProjects(1);

  }

  getProjects(page) {
    this.setActiveLink(document.getElementById("all-projects"));
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

  setActiveLink(elem) {
    var active_link = document.getElementsByClassName("btn-link-info");
    active_link[0].className = "btn font-weight-bold m-l-1";
    elem.className = "btn font-weight-bold m-l-1 btn-link-info";
  }

  getRecommendedProjects() {
    this.setActiveLink(document.getElementById("recommended-projects"));
    this.projectService.getRecommendedProjects()
      .subscribe(
        projects => this.extractData(projects),
        error => this.errorMessage = <any>error);
  }

  getPopularProjects() {
    this.setActiveLink(document.getElementById("popular-projects"));
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
      if (project.description.length > this.maxDescriptionLength) {
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
