import {Component, OnInit, Input} from '@angular/core';
import {IProject} from '../../projects/shared/project';


@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styles: []
})
export class ProjectCardComponent implements OnInit {
  @Input() project;
  footerStatement: string;

  constructor() { }

  ngOnInit() {
    this.footerStatement = "The project has currently " + this.project.favorite_count + " followers and 0 members"
  }
}
