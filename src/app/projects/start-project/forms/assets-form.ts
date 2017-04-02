import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-assets-form',
  template: `
    <app-form-header
      [header]="'Add assets from your computer to the project'"
      [subheader]="'(files like word, jpg, psd, ppt or others)'">
    </app-form-header>
    <button
      class="input-group-addon btn btn-success"
      (click)="storeAssets()">
      <svg class="icon">
        <use xlink:href="assets/svg/icons.svg#icon-next-arrows"></use>
      </svg>
    </button>
  `,
})
export class AssetsFormComponent {
  assets = [];
  @Output() onNext = new EventEmitter<string[]>();

  storeAssets() {
    this.onNext.emit(this.assets);
  }
}

