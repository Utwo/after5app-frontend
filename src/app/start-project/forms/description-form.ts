import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-description-form',
  template: `
    <app-form-header
      [header]="'Let\\'s tell eveyone a few words about it'"
      [subheader]="'Try and describe it as best as you can. It helps!'">
    </app-form-header>

    <form #descriptionForm="ngForm" (ngSubmit)="storeDescription(description)">
      <div class="form-group mt-5">
        <div class="row">
          <div class="col-10">
            <textarea
              tabindex="1"
              class="form-control" id="description" name="description"
              required minlength="4" maxlength="1000"
              placeholder="I want to create ... that will do the following ... Also I will be able to help with ..."
              [(ngModel)]="project_description" #description="ngModel" rows="6">
            </textarea>
          </div>
          <div class="col-2">
            <button
              tabindex="2"
              class="btn btn-success text-white float-right"
              type="submit">
              <svg class="icon icon-md">
                <use xlink:href="assets/svg/icons.svg#icon-next-arrows"></use>
              </svg>
            </button>
          </div>
        </div>
        <div *ngIf="formSubmitted && description.errors">
          <i [hidden]="!description.errors.required" class="form-text text-danger">Description is required</i>
          <i [hidden]="!description.errors.minlength" class="form-text text-danger">
            Description must be at least 4 characters long.</i>
          <i [hidden]="!description.errors.maxlength" class="form-text text-danger">
            Description cannot be more than 1000 characters long.</i>
        </div>
      </div>
    </form>
  `,
})
export class DescriptionFormComponent {
  @Input() project_description = '';
  @Output() onNext = new EventEmitter<string>();
  formSubmitted = false;

  storeDescription(description) {
    this.formSubmitted = true;
    if (!description.errors) {
      this.onNext.emit(this.project_description);
    }
  }
}

