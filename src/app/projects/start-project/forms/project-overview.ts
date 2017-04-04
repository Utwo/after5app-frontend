import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-overview-form',
  template: `
    <app-form-header
      [header]="'Review your project information'"
      [subheader]="'If it\\'s all good post it'">      
    </app-form-header>
    <div class="mt-5">
      <div class="row my-2">
        <div class="col-2 font-weight-bold text-info">
          Name:
        </div>
        <div class="col-10">
          {{project.title}}
        </div>
      </div>
      <div class="row my-2">
        <div class="col-2 font-weight-bold text-info">
          About:
        </div>
        <div class="col-10">
          <p>{{project.description}}</p>
        </div>
      </div>
      <div class="row my-2">
        <div class="col-2 font-weight-bold text-info">
          Your team:
        </div>
        <div class="col-10">
          
        </div>
      </div>
      <div class="row my-2">
        <div class="col-2 font-weight-bold text-info">
          Assets:
        </div>
        <div class="col-10">
          
        </div>
      </div>
      <div class="row my-2">
        <div class="col-2 font-weight-bold text-info">
          Questions:
        </div>
        <div class="col-10">
          <ul class="list-unstyled mb-5">
            <li *ngFor="let question of project.application_questions">
              {{question}}
            </li>
          </ul>
        </div>
      </div>  
    </div>
    <div class="text-center">
      <button
        (click)="storeProject()"
        class="btn btn-success"
        type="button">
        <small>ALL GOOD! POST IT!</small>
      </button>
    </div>
  `,
})
export class ProjectOverviewComponent {
  @Input() project = {};
  @Output() onStoreProject = new EventEmitter();

  storeProject() {
    this.onStoreProject.emit();
  }
}

