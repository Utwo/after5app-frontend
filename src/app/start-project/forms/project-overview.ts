import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StateService } from '../../core/state.service';

@Component({
  selector: 'app-overview-form',
  template: `
    <app-form-header
      [header]="'Review your project information'"
      [subheader]="'If it\\'s all good post it'">
    </app-form-header>
    <div class="mt-5">
      <div class="row my-3">
        <div class="col-2">
          <button
            class="btn btn-sm btn-info px-4"
            (click)="editStep('title')"
          >
            EDIT
          </button>
        </div>
        <div class="col-2 font-weight-bold text-info">
          Name:
        </div>
        <div class="col-8">
          {{project.title}}
        </div>
      </div>
      <div class="row my-3">
        <div class="col-2">
          <button
            class="btn btn-sm btn-info px-4"
            (click)="editStep('description')"
          >
            EDIT
          </button>
        </div>
        <div class="col-2 font-weight-bold text-info">
          About:
        </div>
        <div class="col-8">
          <p class="description-paragraph">{{project.description}}</p>
        </div>
      </div>
      <div class="row my-3">
        <div class="col-2">
          <button
            class="btn btn-sm btn-info px-4"
            (click)="editStep('skills')"
          >
            EDIT
          </button>
        </div>
        <div class="col-2 font-weight-bold text-info">
          Your team:
        </div>
        <div class="col-8">
          <ul class="tray scrollable_tray bg-primary">
            <li class="tray--skill" *ngFor="let skill of project.position">
              <div class="tray--name">{{skill.name}}</div>
              <div class="tray--button" (click)="editStep('skills')">
                <small>EDIT SKILL</small>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="row my-3">
        <div class="col-2">
          <button
            class="btn btn-sm btn-info px-4"
            (click)="editStep('assets')"
          >
            EDIT
          </button>
        </div>
        <div class="col-2 font-weight-bold text-info">
          Assets:
        </div>
        <div class="col-8">
          <ul *ngIf="assets.length > 0" class="tray scrollable_tray mt-4 text-center">
            <li class="tray--asset" *ngFor="let file of assets">
              {{file.name}}
            </li>
          </ul>
          <p class="text-info" *ngIf="assets.length < 1">
            You have no assets.
          </p>
        </div>
      </div>
      <div class="row my-3">
        <div class="col-2">
          <button
            class="btn btn-sm btn-info px-4"
            (click)="editStep('questions')"
          >
            EDIT
          </button>
        </div>
        <div class="col-2 font-weight-bold text-info">
          Questions:
        </div>
        <div class="col-8">
          <p class="text-info" *ngIf="project.application_questions.length < 1">
            You have no questions.
          </p>

          <ul class="list-unstyled mb-5">
            <li *ngFor="let question of project.application_questions">
              {{question}}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="text-center">
      <div *ngIf="!state.isLoggedIn()">
        <div>
          <i>You can only post your project once you have logged in.
            Save your project, log in and come back here to share it with everyone!</i>
        </div>
        <button
          (click)="saveProject(modal)"
          class="btn btn-success mt-3"
          type="button">
          <small>SAVE MY PROJECT!</small>
        </button>
      </div>
      <button
        *ngIf="state.isLoggedIn()"
        (click)="storeProject()"
        class="btn btn-success"
        type="button">
        <small>ALL GOOD! POST IT!</small>
      </button>
    </div>
    <app-login-modal #modal></app-login-modal>
  `,
})
export class ProjectOverviewComponent {
  @Input() project: any = {
    title: '',
    description: '',
    application_questions: [],
    positions: [],
  };
  @Input() assets = [];
  @Output() onStoreProject = new EventEmitter();
  @Output() onEditStep = new EventEmitter();

  constructor(public state: StateService) {
  }

  saveProject(modal) {
    modal.open();
    this.onStoreProject.emit();
  }

  storeProject() {
    this.onStoreProject.emit();
  }

  editStep(step_name) {
    this.onEditStep.emit(step_name);
  }
}

