import {Directive, Input, EventEmitter, Inject, ElementRef, Renderer} from '@angular/core';

@Directive({
  selector: '[focus]'
})
export class FocusDirective {
  @Input('focus') focusEvent: EventEmitter<boolean>;

  constructor(@Inject(ElementRef) private element: ElementRef, private renderer: Renderer) {
  }

  ngOnInit() {
    this.focusEvent.subscribe(event => {
      this.renderer.invokeElementMethod(this.element.nativeElement, 'focus', []);
    });
  }
}
