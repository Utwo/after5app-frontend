import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-position-card',
  templateUrl: './position-card.component.html',
  styles: []
})
export class PositionCardComponent implements OnInit {
  @Input() position;

  constructor() { }

  ngOnInit() {
    console.log(this.position, "position received")
  }

}
