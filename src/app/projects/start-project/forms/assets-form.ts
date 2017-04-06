import {Component, Input, EventEmitter, Output} from '@angular/core';
import {StateService} from "../../../shared/state.service";

@Component({
  selector: 'app-assets-form',
  template: `
    <app-form-header
      [header]="'Add assets from your computer to the project'"
      [subheader]="'(files like word, jpg, psd, ppt or others)'">
    </app-form-header>

    <div class="text-center my-5">
      <p *ngIf="!state.isLoggedIn()">
        You will be able to add assets to your project once you've logged in
      </p>
      <button
        class="btn btn-success"
        (click)="storeAssets()">
        <svg class="icon icon-md">
          <use xlink:href="assets/svg/icons.svg#icon-next-arrows"></use>
        </svg>
      </button>
    </div>
  `,
})
export class AssetsFormComponent {
  @Input() assets = [];
  @Output() onNext = new EventEmitter<string[]>();

  constructor(private state: StateService) {
  }

  storeAssets() {
    this.onNext.emit(this.assets);
  }
}

