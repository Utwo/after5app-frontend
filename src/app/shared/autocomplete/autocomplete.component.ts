import {Component, Output, EventEmitter, Input} from '@angular/core';
import {ProjectService} from '../../projects/shared/project.service';
import {Observable} from 'rxjs';
import {TypeaheadMatch} from 'ng2-bootstrap/ng2-bootstrap';
import {ResponseHandlerService} from '../response-handler.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html'
})

export class AutocompleteComponent {
  @Input('wrap_class') wrap_class;
  @Input('label_message') label_message;
  @Input('label_show') label_show;
  @Input('type') type;
  @Output() onSelect = new EventEmitter<Object>();

  public dataSource: Observable<any>;
  public asyncSelected: string = '';
  public typeaheadLoading: boolean = false;
  public typeaheadNoResults: boolean = false;

  constructor(private projectService: ProjectService,
              private responseHandler: ResponseHandlerService) {
    this.dataSource = Observable.create((observer: any) => {
      observer.next(this.asyncSelected);
    }).mergeMap((token: string) => this.getSkillsAsObservable(token));

    this.wrap_class = this.wrap_class || 'form-group btn btn-primary btn-sm';
    this.label_message = this.label_message || 'Filter by skill ';
    this.label_show = this.label_show || false;
  }

  public getSkillsAsObservable(token: string): Observable<any> {
    return this.projectService.getSkills()
      .map(
        skills => {
          return skills.filter(item => {
            return item.name.toLowerCase().indexOf(token.toLowerCase()) > -1;
          });
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  public changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
    if (this.type === 'list') {
      return;
    }
    this.onSelect.emit({id: 0, name: this.asyncSelected});
  }

  public typeaheadOnSelect(e: TypeaheadMatch): void {
    this.asyncSelected = e.item.name;
    this.onSelect.emit(e.item);
  }

  public setValue(value) {
    this.asyncSelected = value;
  }

  public resetValue() {
    this.asyncSelected = '';
  }
}
