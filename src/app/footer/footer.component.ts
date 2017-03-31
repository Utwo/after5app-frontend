import {Component, OnInit} from '@angular/core';
import {StateService} from '../shared/state.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {

  constructor(private state: StateService) {}

}
