import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-paragraph',
  templateUrl: 'home-paragraph.component.html',
  styles: []
})
export class HomeParagraphComponent {
  @Input('header') header;
  @Input('image_name') image_name;
  @Input('text') text;
}
