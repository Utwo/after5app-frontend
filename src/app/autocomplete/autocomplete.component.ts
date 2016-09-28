import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-autocomplete',
    templateUrl: './autocomplete.component.html'
})
export class AutocompleteComponent {
    @Input() skills;
    @Output() onSelect = new EventEmitter<string>();
    query = '';
    filteredList = [];

    constructor() {
    }

    filter() {
        this.filteredList=[];
        if (this.query === "") {
            return;
        }
        for(let skill of this.skills){
            if(skill.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1){
                this.filteredList.push(skill);
            }
        }
    }

    select(skill) {
        this.onSelect.emit(skill);
        this.query = skill.name;
        this.filteredList = [];
    }
}
