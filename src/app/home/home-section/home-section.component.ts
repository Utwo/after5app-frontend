import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-section',
  templateUrl: './home-section.component.html',
})

export class HomeSectionComponent {
  @Input('main_text') main_text;
  @Input('secondary_text') secondary_text;

  @Input('first_header') first_header;
  @Input('first_text') first_text;
  @Input('first_image') first_image;

  @Input('second_header') second_header;
  @Input('second_text') second_text;
  @Input('second_image') second_image;

  @Input('read_more') read_more;

  @Input('target') target;

  goToNextSection(){
    this.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  getStarted(){
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }
}
