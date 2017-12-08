import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-febee-info',
  template: `
    <div class="container-fluid">
      <div class="row no-gutters my-3">
        <div class="col-md-1 col-2">
          <div class="feebe-info__image">
            <div class="feebe-head mx-auto">
              <span class="febee-eyes"></span>
            </div>
            Feebe
          </div>
        </div>
        <div [class.col-md-11.col-10]="!show_btn" [class.col-md-9.col-9]="show_btn">
          <div class="feebe-info__message">
            <p><b>{{title}}</b></p>
            <p> {{description}}</p>
          </div>
        </div>
        <div *ngIf="show_btn && btn_href && btn_text" class="col-md-2 col-1">
          <a
            [href]="btn_href"
            target="_blank">
            <span class="btn btn-success btn-febee text-white h-100 pt-3">
              {{btn_text}} <br>
              <svg class="icon icon-md mt-3">
                <use xlink:href="assets/svg/icons.svg#icon-download"></use>
              </svg>
            </span>
          </a>
        </div>
      </div>
    </div>
  `
})
export class FeebeInfoComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() btn_href = '';
  @Input() btn_text = '';
  @Input() show_btn = false;
}
