import {Component, OnInit, Input} from '@angular/core';
import {StateService} from '../../../core/state.service';
import {ResponseHandlerService} from '../../../core/response-handler.service';
import {ProjectAssetsService} from './project-assets.service';

@Component({
  selector: 'app-project-assets',
  templateUrl: './project-assets.component.html',
  providers: [ProjectAssetsService]
})

export class ProjectAssetsComponent implements OnInit {
  public files = [];
  @Input() project_id;
  private user_token = null;

  constructor(private state: StateService,
              private assets: ProjectAssetsService,
              private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
    this.user_token = this.state.getToken();
    this.getAllAssets();
  }

  getAllAssets() {
    this.assets.getAll(this.project_id)
      .subscribe(
        data => this.files = data,
        error => this.responseHandler.errorMessage('An error occured!', error));
  }
}
