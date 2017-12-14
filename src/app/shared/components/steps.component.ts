import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-steps',
  template: `
    <div class="text-center">
      <ul class="list-unstyled">
        <li *ngFor="let step of steps"
            class="step-button"
            [class.enabled]="isStepEnabled(step, steps, project)"
            [class.active]="step == activeStep"
            (click)="goToStep(step)"></li>
      </ul>
      <div class="text-info font-weight-bold">Step {{stepIndex}}</div>
    </div>
  `
})
export class StepsComponent {
  @Input() project = {};
  @Input() steps = [];
  @Input() activeStep = '';
  @Input() isStepEnabled;
  @Output() onChangeStep = new EventEmitter();

  get stepIndex() {
    return this.steps.indexOf(this.activeStep) + 1;
  }

  goToStep(step) {
    this.onChangeStep.emit(step);
  }
}
