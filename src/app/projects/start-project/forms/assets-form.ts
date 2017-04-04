import {Component,Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-assets-form',
  template: `
    <app-form-header
      [header]="'Add assets from your computer to the project'"
      [subheader]="'(files like word, jpg, psd, ppt or others)'">
    </app-form-header>
    <div class="text-center mb-5">
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

  storeAssets() {
    this.onNext.emit(this.assets);
  }
}

