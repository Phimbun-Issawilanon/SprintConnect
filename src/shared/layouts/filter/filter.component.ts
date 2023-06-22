import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  @Input() searchModel: any;
  @Output() filterEvent = new EventEmitter();

  searchFilterForm: FormGroup = new FormGroup({
    selectFilter: new FormControl(null, Validators.required),
    filterInput: new FormControl(null, Validators.required),
    type: new FormControl(null),
  });
  submitted = false;
  inputType = 'text';

  get fSearchFilter(): { [key: string]: AbstractControl } {
    return this.searchFilterForm.controls;
  }

  getInputType(event: any) {
    if(event.target.value !== 'null') {
      let index = this.searchModel.filter.findIndex((object: any) => { return object.value === event.target.value; });
      this.inputType = this.searchModel.filter[index].inputType;
    }
  }

  searchFilter() {
    this.submitted = true;
    console.log(this.searchFilterForm.value);
    if(!this.searchFilterForm.invalid && this.searchFilterForm.value.selectFilter !== 'null') {
      this.searchFilterForm.patchValue({
        type: 'search'
      });
      for(const item of this.searchModel.filter) {
        if(item.value !== this.searchFilterForm.value.selectFilter) {
          this.searchModel.api[item.value] = null;
        }
        if(item.inputType === 'number' && this.searchFilterForm.value.filterInput) {
          this.searchFilterForm.patchValue({
            filterInput: parseInt(this.searchFilterForm.value.filterInput)
          });
        }
      }
      this.filterEvent.emit(this.searchFilterForm.value);
      this.submitted = false;
    }
  }

  clearSearch() {
    this.searchFilterForm.patchValue({
      type: 'clear'
    });
    for(const item of this.searchModel.filter) {
      this.searchModel.api[item.value] = null;
    }
    this.filterEvent.emit(this.searchFilterForm.value);
    this.searchFilterForm.reset();
    this.submitted = false;
  }

}
