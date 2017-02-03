import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  getMyProjects() {

  }

  getFollowingProjects() {

  }

  getAppliedForProjects() {

  }

}
