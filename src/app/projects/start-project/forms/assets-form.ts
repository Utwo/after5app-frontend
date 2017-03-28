import {Component} from '@angular/core';

@Component({
  selector: 'app-assets-form',
  template: `
    <app-section-header
      [header]="'Add assets from your computer to the project'"
      [subheader]="'(files like word, jpg, psd, ppt or others)'">
    </app-section-header>
  `,
})
export class AssetsFormComponent {
}

