import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-febee-info',
  template: `
    <div class="row my-3">
      <div class="col-1 feebe-info__image">
        <div class="feebe-head">
          <span class="febee-eyes"></span>
        </div>
        Feebe
      </div>
      <div class="col-11 feebe-info__message">
        <p><b>{{title}}</b></p>
        <p> {{description}}</p>
      </div>
     </div>
`
})
export class FeebeInfoComponent implements OnInit {
  @Input() title;
  @Input() description;

  constructor() {
  }

  ngOnInit() {
  }

}
