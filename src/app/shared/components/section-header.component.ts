import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-section-header',
  template: `
    <div class="text-center text-white">
      <h2 class="font-weight-bold">
        {{header}}
      </h2>
      <h3>
        {{subheader}}
      </h3>
    </div>
  `
})

export class SectionHeaderComponent {
  @Input('header') header;
  @Input('subheader') subheader;
}
