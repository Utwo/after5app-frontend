import { Component, OnInit } from '@angular/core';
import {StateService} from "../../shared/state.service"
import {ResponseHandlerService} from "../../shared/response-handler.service"
import {ProfileService} from "../shared/profile.service"

@Component({
  selector: 'app-projects-overview',
  templateUrl: './projects-overview.component.html',
  providers: [ProfileService],
  styles: []
})
export class ProjectsOverviewComponent implements OnInit {

  private isProjectsActive: boolean = true;
  private isFollowingActive: boolean = false;
  private isAppliedForActive: boolean = false;
  private projects = null;
  maxDescriptionLength = 210;
  private joinedProjects = null;

  constructor(private profileService: ProfileService, private state: StateService, private responseHandler: ResponseHandlerService) { }

  ngOnInit() {
    this.getMyProjects();
  }

  getMyProjects() {
    this.isProjectsActive = true;
    this.isFollowingActive = false;
    this.isAppliedForActive = false;
    this.profileService.getMyProjects()
      .subscribe(
        data => this.extractData(data),
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  getFollowingProjects() {
    this.isProjectsActive = false;
    this.isFollowingActive = true;
    this.isAppliedForActive = false;
    this.profileService.getFavoriteProjects()
      .subscribe(
        data => this.extractData(data.favorite),
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  getAppliedForProjects() {
    this.isProjectsActive = false;
    this.isFollowingActive = false;
    this.isAppliedForActive = true;
    this.profileService.getMyApplications()
      .subscribe(
        data => this.extractData(data),
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  extractData(projects) {
    this.projects = projects;
    for (let project of this.projects) {
      if (project.description.length > this.maxDescriptionLength) {
        project.description = project.description.substring(0, this.maxDescriptionLength) + '...';
      }
    }
  }
}
