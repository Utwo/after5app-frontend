import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-project-applicants',
  templateUrl: './project-applicants.component.html',
  styles: []
})
export class ProjectApplicantsComponent implements OnInit {

  @Input() project_id;

  constructor() { }

  ngOnInit() {

  }

}
