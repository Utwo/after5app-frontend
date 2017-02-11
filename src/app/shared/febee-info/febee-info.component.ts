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
  @Input() noProject;

  constructor() { }

  ngOnInit() {
  }

}
