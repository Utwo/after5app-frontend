import {Component, Input, EventEmitter, Output} from '@angular/core';
import {StateService} from '../../core/state.service';

@Component({
  selector: 'app-assets-form',
  template: `
    <app-form-header
      [header]="'Add assets from your computer to the project'"
      [subheader]="'(files like word, jpg, psd, ppt or others)'">
    </app-form-header>

    <div class="text-center my-5">
      <div *ngIf="state.isLoggedIn()">
        <div class="row">
          <div class="col-7 text-right">
            <label class="btn btn-success btn-file px-3">
              <small class="px-5">ADD FILES</small>
              <input type="file" multiple (change)="fileChange($event)">
            </label>
            <small class="form-text text-info">Maximum size of 20 mb.</small>
          </div>
          <div class="col-5 text-left">
            <button
              tabindex="1"
              class="btn btn-success"
              (click)="storeAssets()">
              <svg class="icon icon-md">
                <use xlink:href="assets/svg/icons.svg#icon-next-arrows"></use>
              </svg>
            </button>
          </div>
        </div>
        <ul class="tray mt-4 text-center">
          <li class="tray--asset" *ngFor="let file of assets; let i=index">
            {{file.name}} <a href="javascript:;" (click)="removeFile(i)">x</a>
          </li>
        </ul>
      </div>
      <div *ngIf="!state.isLoggedIn()">
        <p>
          You will be able to add assets to your project once you've logged in
        </p>
        <button
          tabindex="2"
          class="btn btn-success"
          (click)="storeAssets()">
          <svg class="icon icon-md">
            <use xlink:href="assets/svg/icons.svg#icon-next-arrows"></use>
          </svg>
        </button>
      </div>
    </div>
  `,
})
export class AssetsFormComponent {
  @Input() assets = [];
  @Output() onNext = new EventEmitter<string[]>();

  constructor(public state: StateService) {
  }

  storeAssets() {
    this.onNext.emit(this.assets);
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    for (let i = 0; i < fileList.length; i++) {
      this.assets.push(fileList[i]);
    }
  }

  removeFile(index) {
    this.assets.splice(index, 1);
  }
}

