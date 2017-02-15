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

  private projects = null;
  private followingProjects = null;
  private appliedProjects = null;
  maxDescriptionLength = 210;
  private joinedProjects = null;

  constructor(private profileService: ProfileService, private state: StateService, private responseHandler: ResponseHandlerService) { }

  ngOnInit() {
    this.getMyProjects();
    this.getFollowingProjects();
   // this.getAppliedForProjects();
    this.getJoinedProjects();
    console.log(this.state.getToken())
  }

  getMyProjects() {
    this.profileService.getMyProjects()
      .subscribe(
        data => {console.log(data.data); this.extractData(data.data,"projects")},
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  getFollowingProjects() {
    this.profileService.getFavoriteProjects()
      .subscribe(
        data => this.extractData(data.data,"followingProjects"),
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  getAppliedForProjects() {
    this.profileService.getMyApplications()
      .subscribe(
        data => this.extractData(data,"appliedProjects"),
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  getJoinedProjects() {
    this.profileService.getJoinedProjects()
      .subscribe(
        data => this.extractData(data,"joinedProjects"),
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  extractData(projects, list) {
    switch (list) {
      case "projects":
        this.projects = projects;
        break;
      case "followingProjects":
        this.followingProjects = projects;
        break;
      case "appliedProjects":
        this.appliedProjects = projects;
        break;
      case "joinedProjects":
        this.joinedProjects = projects;
        console.log(projects,"Joined");
        break;
    }
    for (let project of list) {
      if (project.description.length > this.maxDescriptionLength) {
        project.description = project.description.substring(0, this.maxDescriptionLength) + '...';
      }
    }
  }
}
