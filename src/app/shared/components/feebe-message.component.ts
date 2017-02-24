import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-feebe-message',
  template: `
    <div class="row">
      <div class="col-md-1 col-2">
        <div class="feebe-head">
          <span class="febee-eyes"></span>
        </div>
      </div>
      <div class="col-md-11 col-10">
        <p class="info-message">
          {{message}}
        </p>
      </div>
    </div>
  `
})

export class FeebeMessageComponent {
  @Input('message') message;
}
