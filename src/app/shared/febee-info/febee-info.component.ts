import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-febee-info',
  templateUrl: './febee-info.component.html',
  styles: []
})
export class FebeeInfoComponent implements OnInit {
  @Input() startedProjects;
  @Input() followingProjects;
  @Input() appliedForProjects;
  @Input() joinedProject;

  constructor() { }

  ngOnInit() {
    console.log("feebeComponent", this.joinedProject, this.startedProjects, this.followingProjects, this.appliedForProjects)
  }

}
