import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-section-header',
  template: `
    <div class="text-center">
      <h1 class="font-weight-bold mb-3">
        {{header}}
      </h1>
      <h2>
        {{subheader}}
      </h2>
    </div>
  `
})

export class SectionHeaderComponent {
  @Input('header') header;
  @Input('subheader') subheader;
}
