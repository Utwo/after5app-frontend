import {Component} from '@angular/core';

@Component({
  selector: 'app-questions-form',
  template: `
    <app-section-header
      [header]="'Have any questions for your potential team members?'"
      [subheader]="'They will see this when they apply to your project'">
    </app-section-header>
    <div class="form-group">
      <label for="question">Questions</label>
      <div class="row">
        <div class="col-md-10 col-9">
          <input class="form-control" id="question" type="text" #question
                 placeholder="How much time can you spend on this project?">
        </div>
        <div class="col-md-2 col-3">
          <button class="btn btn-info" type="button" (click)="addQuestion(question)">Add</button>
        </div>
        <i [hidden]="!questionError" class="form-text text-danger">{{questionError}}</i>
      </div>
    </div>
    <ol>
      <li *ngFor="let question of application_questions; let i = index">
        {{question}}
        <button class="btn btn-sm btn-danger" type="button" (click)="removeQuestion(i)">&times;</button>
      </li>
    </ol>
  `,
})
export class QuestionsFormComponent {
  application_questions = [];
  questionError = null;

  addQuestion(question) {
    if (question.value.length < 2) {
      this.questionError = 'A question must be at least 2 characters long.';
      return;
    }
    if (question.value.length > 250) {
      this.questionError = 'A question can be maximum 250 characters long.';
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

