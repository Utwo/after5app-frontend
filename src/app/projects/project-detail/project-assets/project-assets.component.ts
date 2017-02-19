import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StateService} from '../../../shared/state.service';
import {ResponseHandlerService} from '../../../shared/response-handler.service';

@Component({
  selector: 'app-project-assets',
  templateUrl: './project-assets.component.html',
  styles: []
})
export class ProjectAssetsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private state: StateService,
              private router: Router,
              private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
  }

}
