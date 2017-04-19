import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-title-form',
  template: `
    <app-form-header
      [header]="'Great! Let\\'s give your idea a name'"
      [subheader]="'What should it be?'">
    </app-form-header>
    <form #titleForm="ngForm" (ngSubmit)="storeTitle(title)">
      <div class="form-group mt-5">
        <div class="input-group">
          <input
            appFocus
            class="form-control"
            id="title"
            name="title"
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
            <svg class="icon icon-md">
              <use xlink:href="assets/svg/icons.svg#icon-next-arrows"></use>
            </svg>
          </button>
        </div>
        <div *ngIf="formSubmitted && title.errors">
          <i [hidden]="!title.errors.required" class="form-text text-danger">
            The title is required.
          </i>
          <i [hidden]="!title.errors.maxlength" class="form-text text-danger">
            Title cannot be more than 20 characters long.
          </i>
          <i [hidden]="!title.errors.minlength" class="form-text text-danger">
            Title must be at least 4 characters long.
          </i>
        </div>
      </div>
    </form>
  `,
})

export class TitleFormComponent {
  @Output() onNext = new EventEmitter<string>();
  @Input() project_title = '';
  formSubmitted = false;

  storeTitle(title) {
    this.formSubmitted = true;
    if (!title.errors) {
      this.onNext.emit(this.project_title);
    }
  }
}

