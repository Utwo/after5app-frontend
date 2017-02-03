import { Component, OnInit } from '@angular/core';
import {StateService} from "../../shared/state.service"
import {ResponseHandlerService} from "../../shared/response-handler.service"
import {ProfileService} from "../shared/profile.service"

@Component({
  selector: 'app-projects-overview',
  templateUrl: './projects-overview.component.html',
  styles: []
})
export class ProjectsOverviewComponent implements OnInit {

  private isProjectsActive: boolean = true;
  private isFollowingActive: boolean = false;
  private isAppliedForActive: boolean = false;
  private myProjects: any[];
  private followingProjects: any[];
  private appliedForProjects: any[];

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
        data => this.myProjects = data,
        error => this.responseHandler.errorMessage('An error occured!', error));
    console.log(this.myProjects);
  }

  getFollowingProjects() {

  }

  getAppliedForProjects() {

  }

}
