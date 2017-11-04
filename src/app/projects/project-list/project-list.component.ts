import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../shared/project.service';
import {StateService} from '../../shared/state.service';
import {ResponseHandlerService} from '../../shared/response-handler.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
})
export class ProjectListComponent implements OnInit {
  projects = null;
  page = {current_page: null, prev: null, next: null};
  maxDescriptionLength = 210;
  public isRecentActive = true;
  public isPopularActive = false;
  public isRecommendedActive = false;

  constructor(private projectService: ProjectService, public state: StateService, private responseHandler: ResponseHandlerService) {

  }

  ngOnInit() {
    this.getProjects(1);
  }

  public getProjects(page) {
    this.isPopularActive = false;
    this.isRecommendedActive = false;
    this.isRecentActive = true;
    this.projectService.getProjects(page)
      .subscribe(
        projects => this.extractData(projects),
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  filterProjects(skill) {
    this.isPopularActive = false;
    this.isRecommendedActive = false;
    this.isRecentActive = false;
    this.projectService.filterBySkill(skill)
      .subscribe(
        projects => this.extractData(projects),
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  getRecommendedProjects() {
    this.isPopularActive = this.isRecentActive = false;
    this.isRecommendedActive = true;
    this.projectService.getRecommendedProjects()
      .subscribe(
        projects => this.extractData(projects),
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  getPopularProjects() {
    this.isRecommendedActive = this.isRecentActive = false;
    this.isPopularActive = true;
    this.projectService.getPopularProjects()
      .subscribe(
        projects => this.extractData(projects),
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  extractData(projects) {
    this.projects = projects.data;
    this.page = {
      current_page: projects.current_page,
      next: projects.next_page_url,
      prev: projects.prev_page_url
    };
    for (const project of this.projects) {
      if (project.description.length > this.maxDescriptionLength) {
        project.description = project.description.substring(0, this.maxDescriptionLength) + '...';
      }
    }
  }

  onSelect(skill) {
    this.filterProjects(skill.id);
  }

  public prevPage() {
    if (this.page.prev) {
      this.getProjects(this.page.current_page - 1);
    }
  }

  public nextPage() {
    if (this.page.next) {
      this.getProjects(this.page.current_page + 1);
    }
  }

}
