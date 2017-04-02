import {Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-description-form',
  template: `
    <app-form-header
      [header]="'Let\\'s tell eveyone a few words about it'"
      [subheader]="'Try and describe it as best as you can. It helps!'">
    </app-form-header>

    <form #descriptionForm="ngForm" (ngSubmit)="storeDescription()">
      <div class="form-group mx-5 my-5">
        <div class="row">
          <div class="col-11">
            <textarea
              class="form-control" id="description" name="description"
              required minlength="4"
              placeholder="I want to create ... that will do the following ... Also I will be able to help with ..."
              [(ngModel)]="project_description" #description="ngModel" rows="6">              
            </textarea>
          </div>
          <div class="col-1">
            <button
              class="btn btn-success"
              type="submit">
              <svg class="icon icon-md">
                <use xlink:href="assets/svg/icons.svg#icon-next-arrows"></use>
              </svg>
            </button>
          </div>
        </div>
        <div *ngIf="description.errors && (description.dirty || description.touched)">
        <i [hidden]="!description.errors.required" class="form-text text-danger">Description is required</i>
        <i [hidden]="!description.errors.minlength" class="form-text text-danger">Description must be at least 4
          characters long.</i>
      </div>
      </div>
    </form>
   
  `,
})
export class DescriptionFormComponent {
  project_description = '';
  @Output() onNext = new EventEmitter<string>();

  storeDescription() {
    this.onNext.emit(this.project_description);
  }
}

