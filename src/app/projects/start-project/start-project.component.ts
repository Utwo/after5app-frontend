import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectService} from '../shared/project.service';
import {ResponseHandlerService} from '../../shared/response-handler.service';

@Component({
  selector: 'app-start-project',
  templateUrl: 'start-project.component.html',
})

export class StartProjectComponent {
  constructor(private projectService: ProjectService,
              private router: Router,
              private responseHandler: ResponseHandlerService) {
  }

  // storeProject() {
  //   if (this.project.position.length < 1) {
  //     this.positionError = 'You have to add at least one position!';
  //     return;
  //   }
  //   this.projectService.addProject(this.project)
  //     .subscribe(
  //       data => {
  //         this.router.navigate(['/project', data.project.id]);
  //       },
  //       error => this.responseHandler.errorMessage('An error occured!', error));
  // }
}

