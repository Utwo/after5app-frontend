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

  private projects = [];
  private followingProjects = [];
  private appliedProjects = [];
  maxDescriptionLength = 210;
  private joinedProjects = [];
  private feebeTitle = null;
  private feebeDescription = null;
  private feebeTitleJoined = null;
  private feebeDescriptionJoined = null;

  constructor(private profileService: ProfileService, private state: StateService, private responseHandler: ResponseHandlerService) { }

  ngOnInit() {
    this.getAllInfo();
  }

  getAllInfo() {
    this.getMyProjects();
    this.getFollowingProjects();
    this.getAppliedForProjects();
    this.getJoinedProjects();
    if (!this.checkNoProjects()) {
      this.getFeebeTitles();
      this.getFeebeDescription();
    }
  }

  getMyProjects() {
    this.profileService.getMyProjects()
      .subscribe(
        data  => this.extractData(data.data, 'projects'),
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  getFollowingProjects() {
    this.profileService.getFavoriteProjects()
      .subscribe(
        data => this.extractData(data.data, 'followingProjects'),
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  getAppliedForProjects() {
    this.profileService.getMyApplications()
      .subscribe(
        data =>  this.extractData(data.data, 'appliedProjects'),
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  getJoinedProjects() {
    this.profileService.getJoinedProjects()
      .subscribe(
        data => this.extractData(data.data, 'joinedProjects'),
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  getFeebeTitles() {
    this.feebeTitle = 'Hi! I thought you would like to know that...';
    this.feebeTitleJoined = 'Hi. Great news! You\'ve joined a project';
  }

  checkNoProjects() {
    return this.projects.length > 0 && this.joinedProjects.length > 0 && this.appliedProjects.length > 0 && this.followingProjects.length > 0 ;
  }

  getFeebeDescription() {
      this.feebeDescription = 'You currently have ';
      this.projects.length > 0 ? this.feebeDescription += this.projects.length + ' created projects and are following '
        : this.feebeDescription += 'no created projects and are following ';
      this.followingProjects.length > 0 ? this.feebeDescription += this.followingProjects.length + ' projects, also you have applied for'
        : this.feebeDescription += 'no project, also you have applied for ';
      this.appliedProjects.length > 0 ? this.feebeDescription += this.appliedProjects.length + ' projects and have '
        : this.feebeDescription += '0 projects and have';
      this.joinedProjects.length > 0 ? this.feebeDescription += this.joinedProjects.length + ' projects ongoing'
        : this.feebeDescription += ' 0 projects ongoing';
      if (this.joinedProjects.length > 0) {
        this.joinedProjects.map(elem => {
          this.feebeDescriptionJoined += 'You joined ' + elem.name +
            ', the project has x active members, x pending members and x followers.';
        });
      }
  }

  extractData(projects, list) {
    for (let project of projects) {
      if (project.description.length > this.maxDescriptionLength) {
        project.description = project.description.substring(0, this.maxDescriptionLength) + '...';
      }
    }
    switch (list) {
      case 'projects':
        this.projects = projects;
        break;
      case 'followingProjects':
        this.followingProjects = projects;
        break;
      case 'appliedProjects':
        this.appliedProjects = projects;
        break;
      case 'joinedProjects':
        this.joinedProjects = projects;

        break;
    }
  }
}
