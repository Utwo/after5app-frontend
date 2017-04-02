import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-assets-form',
  template: `
    <app-section-header
      [header]="'Add assets from your computer to the project'"
      [subheader]="'(files like word, jpg, psd, ppt or others)'">
    </app-section-header>
    <button
      class="input-group-addon btn btn-success"
      (click)="storeAssets()">
      >>
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

