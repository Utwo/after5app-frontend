import {Directive, Input, EventEmitter, Inject, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective {
  @Input() focusEvent: EventEmitter<boolean>;

  constructor(@Inject(ElementRef) private element: ElementRef, private renderer: Renderer2) {
  }

  OnInit() {
    this.focusEvent.subscribe(event => {
      this.renderer.selectRootElement(this.element.nativeElement);
    });
  }
}
