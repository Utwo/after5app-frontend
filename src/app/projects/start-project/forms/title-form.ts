import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-title-form',
  template: `
    <app-section-header
      [header]="'Great! Let\\'s give your idea a name'"
      [subheader]="'What should it be?'">
    </app-section-header>
    <form #titleForm="ngForm" (ngSubmit)="storeTitle()">
      <div class="form-group mx-5 my-5">
        <div class="input-group">
          <input
            class="form-control"
            id="title" name="title"
            type="text"
            required minlength="4" maxlength="20"
            placeholder="Space Exploration Project"
            autocomplete="off"
            [(ngModel)]="project_title"
            #title="ngModel"
            aria-describedby="titleBtnGroup"
          />
          <button
            id="titleBtnGroup"
            class="input-group-addon btn btn-success"
            type="submit">
            >>
          </button>
        </div>

        <i *ngIf="title.length >= 20" class="form-text text-danger">
          Title cannot be more than 20 characters long.</i>
        <div *ngIf="title.errors && (title.dirty || title.touched)">
          <i [hidden]="!title.errors.required" class="form-text text-danger">
            The title is required
          </i>
          <i [hidden]="!title.errors.minlength" class="form-text text-danger">
            Title must be at least 4 characters long
          </i>
        </div>
      </div>
    </form>
  `,
})

export class TitleFormComponent {
  @Output() onNext = new EventEmitter<string>();
  project_title = '';

  storeTitle() {
    this.onNext.emit(this.project_title);
  }
}

