import {Component, Output, EventEmitter, Input} from '@angular/core';
import {ProjectService} from '../../projects/shared/project.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {TypeaheadMatch} from 'ngx-bootstrap/typeahead';
import {ResponseHandlerService} from '../response-handler.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html'
})

export class AutocompleteComponent {
  @Input('type') type;
  @Input('label_message') label_message;
  @Input('label_class') label_class = 'input-group-addon label-white';
  @Input('input_class') input_class= 'form-control input-basic input-gray';
  @Output() onSelect = new EventEmitter<Object>();

  public dataSource: Observable<any>;
  public asyncSelected = '';
  public typeaheadLoading = false;
  public typeaheadNoResults = false;

  constructor(private projectService: ProjectService,
              private responseHandler: ResponseHandlerService) {
    this.dataSource = Observable.create((observer: any) => {
      observer.next(this.asyncSelected);
    }).mergeMap((token: string) => this.getSkillsAsObservable(token));
  }


  public getSkillsAsObservable(token: string): Observable<any> {
    return this.projectService.getSkills()
      .map(
        (skills) => {
          return skills.filter(item => {
            return item.name.toLowerCase().indexOf(token.toLowerCase()) > -1;
          });
        },
        (error) => this.responseHandler.errorMessage('An error occured!', error));
  }

  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  public changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
    if (this.type === 'filter-list') {
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
