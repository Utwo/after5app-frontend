import {Component} from '@angular/core';
import {StateService} from '../shared/state.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {

  constructor(public state: StateService) {
  }

}
