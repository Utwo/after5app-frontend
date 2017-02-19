import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-position-card',
  templateUrl: './position-card.component.html',
  styles: []
})
export class PositionCardComponent implements OnInit {
  @Input() position;
  @Input() myProject;
  private member = null;

  constructor() { }

  ngOnInit() {
    if(this.position.status == false ) {
      this.member = this.position.member[0]
    }
  }

}
