import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-card',
  templateUrl: 'home-card.component.html',
})
export class HomeCardComponent {
  @Input() main_text;
  @Input() secondary_text;
  @Input() image_name;
  @Input() button_text;
  @Input() link;
}
