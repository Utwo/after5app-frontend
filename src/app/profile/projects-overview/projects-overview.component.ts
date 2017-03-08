import {Component, OnInit} from '@angular/core';
import {StateService} from "../../shared/state.service"
import {ResponseHandlerService} from "../../shared/response-handler.service"
import {ProfileService} from "../shared/profile.service"

@Component({
  selector: 'app-projects-overview',
  templateUrl: './projects-overview.component.html',
})
export class ProjectsOverviewComponent implements OnInit {
  private projects = null;
  private followingProjects = null;
  private appliedProjects = null;
  private joinedProjects = null;
  private feebeDescription = null;

  constructor(private profileService: ProfileService,
              private state: StateService,
              private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
    this.getMyProjects();
    this.getFollowingProjects();
    this.getAppliedForProjects();
  }

  getMyProjects() {
    this.profileService.getMyProjects()
      .subscribe(
        data => this.extractData(data.data, 'projects'),
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  getFollowingProjects() {
    this.profileService.getFavoriteProjects()
      .subscribe(
        data => this.extractData(data.data, 'followingProjects'),
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  getAppliedForProjects() {
    this.profileService.getAppliedProjects()
      .subscribe(
        data => {
          this.extractData(this.memberOfProjects(data.data, true), 'joinedProjects');
          this.extractData(this.memberOfProjects(data.data, false), 'appliedProjects');
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  memberOfProjects(projects, ok) {
    return projects.filter((project) => {
      let isMember = false;
      project.position.map((position) => {
        isMember = !!position.member.find((member) => member.id === this.state.getUser().id)
      });
      return ok? isMember : !isMember;
    });
  }

  extractData(projects, list) {
    this[list] = projects;
    this.getFeebeDescription();
  }

  getFeebeDescription() {
    if (!this.projects || !this.joinedProjects || !this.appliedProjects || !this.joinedProjects) {
      return;
    }

    this.feebeDescription = `You currently have ${this.projects.length} created ${this.getProjectStr(this.projects.length)} 
    and are following  ${this.followingProjects.length} ${this.getProjectStr(this.followingProjects.length)}, 
    also you have applied for ${this.appliedProjects.length} ${this.getProjectStr(this.appliedProjects.length)} and have 
    ${this.joinedProjects.length} ongoing ${this.getProjectStr(this.joinedProjects.length)}`;
  }

  getProjectStr(number) {
    return number === 1 ? 'project' : 'projects';
  }
}
