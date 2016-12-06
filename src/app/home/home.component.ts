import {Component} from '@angular/core';
import {StateService} from '../shared/state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor(private state: StateService) {
  }
}
