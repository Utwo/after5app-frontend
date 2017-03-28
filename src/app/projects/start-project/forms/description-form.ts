import {Component} from '@angular/core';

@Component({
  selector: 'app-description-form',
  template: `
    <app-section-header
      [header]="'Let\\'s tell eveyone a few workds about it'"
      [subheader]="'Try and describe it as best as you can. It helps!'">
    </app-section-header>
    <div class="form-group">
      <label for="description">Description <span class="text-danger font-weight-bold">*</span></label>
      <textarea class="form-control" id="description" required minlength="4" name="description"
                placeholder="Project description"
                [(ngModel)]="project_description" #description="ngModel" rows="6"></textarea>

      <div *ngIf="description.errors && (description.dirty || description.touched)">
        <i [hidden]="!description.errors.required" class="form-text text-danger">Description is required</i>
        <i [hidden]="!description.errors.minlength" class="form-text text-danger">Description must be at least 4
          characters long.</i>
      </div>
    </div>
  `,
})
export class DescriptionFormComponent {
  project_description = '';
}

