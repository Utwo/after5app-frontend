import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-form-header',
  template: `
    <div class="text-center">
      <h2 class="mb-3">
        {{header}}
      </h2>
      <h3 class="text-info">
        {{subheader}}
      </h3>
    </div>
  `
})

export class FormHeaderComponent {
  @Input('header') header = '';
  @Input('subheader') subheader = '';
}
