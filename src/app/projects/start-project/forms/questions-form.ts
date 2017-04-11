import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-questions-form',
  template: `
    <app-form-header
      [header]="'Have any questions for your potential team members?'"
      [subheader]="'They will see this when they apply to your project'">
    </app-form-header>
    <form #questionsForm="ngForm" (ngSubmit)="addQuestion(question)">
      <div class="form-group mt-5">
        <div class="row">
          <div class="col-1">
            <button class="btn btn-success" type="submit">
              <svg class="icon">
                <use xlink:href="assets/svg/icons.svg#icon-plus"></use>
              </svg>
            </button>
          </div>
          <div class="col-11">
            <input
              class="form-control"
              id="question"
              type="text"
              #question
              placeholder="How much time can you invest?">
          </div>
          <i [hidden]="!questionError" class="form-text text-danger">{{questionError}}</i>
        </div>
      </div>
    </form>
    <ul class="list-unstyled mb-5">
      <li *ngFor="let question of application_questions; let i = index"
          class="my-2"
      >
        <button class="btn btn-info btn-sm" type="button" (click)="removeQuestion(i)">
          <small>REMOVE</small>
        </button>
        <span class="ml-2">{{question}}</span>
      </li>
    </ul>
    <div class="text-center">
      <button
        (click)="storeQuestions()"
        class="btn btn-success"
        type="button">
        <small>REVIEW AND POST</small>
      </button>
    </div>
  `,
})
export class QuestionsFormComponent {
  @Input() application_questions = [];
  questionError = null;
  @Output() onNext = new EventEmitter();

  storeQuestions() {
    this.onNext.emit(this.application_questions);
  }

  addQuestion(question) {
    if (question.value.length < 2) {
      this.questionError = 'A question must be at least 2 characters long.';
      return;
    }
    if (question.value.length > 250) {
      this.questionError = 'A question cannot be more than 250 characters long.';
      return;
    }
    this.application_questions.push(question.value);
    this.questionError = null;
    question.value = '';
  }

  removeQuestion(index) {
    this.application_questions.splice(index, 1);
  }
}

