import {Component} from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div class="text-center py-5 my-5">
      <span class="spinner icon-xl">
        <span class="double-bounce1"></span>
        <span class="double-bounce2"></span>
      </span>
    </div>
  `
})

export class LoaderComponent {}
