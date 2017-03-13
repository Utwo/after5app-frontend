import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-febee-info',
  template: `
    <div class="row no-gutters my-3">
      <div class="col-md-1 col-2">
      <div class="feebe-info__image">
        <div class="feebe-head mx-auto">
          <span class="febee-eyes"></span>
        </div>
        Feebe
      </div>
      </div>
      <div class="col-md-11 col-10 text-muted">
        <div class="feebe-info__message">
          <p><b>{{title}}</b></p>
          <p> {{description}}</p>
        </div>
      </div>
    </div>
`
})
export class FeebeInfoComponent {
  @Input() title;
  @Input() description;
}
