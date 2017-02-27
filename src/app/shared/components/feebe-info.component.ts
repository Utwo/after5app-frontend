import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-febee-info',
  templateUrl: 'feebe-info.component.html',
  styles: []
})
export class FeebeInfoComponent implements OnInit {
  @Input() title;
  @Input() description;

  constructor() { }

  ngOnInit() {
  }

}
