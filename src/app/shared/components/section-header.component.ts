import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-section-header',
  template: `
    <h2 class="text-xs-center">
    {{header}}
    <br>
    {{subheader}}
    </h2>
  `
})

export class SectionHeaderComponent {
  @Input('header') header;
  @Input('subheader') subheader;
}
