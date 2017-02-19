import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-feebe-message',
  template: `
    <div class="row">
      <div class="col-1">
        <div class="feebe-head">
          <div class="febee-eyes"></div>
        </div>
      </div>
      <div class="col-11">
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
