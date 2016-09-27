import {Component, Input, Output} from '@angular/core';

@Component({
    selector: 'app-autocomplete',
    templateUrl: './autocomplete.component.html'
})
export class AutocompleteComponent {
    @Input() skills;
    query = '';
    filteredList = [];
    @Output() onSelected = new EventEmitter();
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
        this.onSelected.emit(skill);
        this.query = skill.name;
        this.filteredList = [];
    }
}
