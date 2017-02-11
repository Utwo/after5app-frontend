import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-projects-list-overview',
  templateUrl: './projects-list-overview.component.html',
  styles: []
})
export class ProjectsListOverviewComponent implements OnInit {
  @Input() projects;
  @Input() joinedProjects;
  private showJoinedProjects = false;

  constructor() { }

  ngOnInit() {
    console.log("Aaaa", this.projects, this.joinedProjects);
    if(this.joinedProjects != undefined ) {
      console.log("bbbb")
      this.showJoinedProjects = true;
    }
  }

}
