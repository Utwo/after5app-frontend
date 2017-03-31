import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-steps',
  template: `
    <div>
      <ul class="list-unstyled">
        <li *ngFor="let step of steps"
            class="step-button"
            [class.active]="step == activeStep"></li>
      </ul>
      <div class="text-info font-weight-bold">Step {{activeStep}}</div>
    </div>
  `
})
export class StepsComponent {
  @Input() steps = [];
  @Input() activeStep = 1;
}
