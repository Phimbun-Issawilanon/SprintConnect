import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() dataColumn: any;
  @Input() dataRow: any;
  @Input() searchModel: any;
  @Output() tableEvent = new EventEmitter();

  sort() {
    this.dataColumn = this.dataColumn.sort((itemA: any, itemB: any) => (itemA.field > itemB.field) ? 1 : (itemA.field < itemB.field) ? -1 : 0);
  }

  getIndex(index: number) {
    return (this.searchModel.api.itemPerPage * this.searchModel.api.currentPage) - (this.searchModel.api.itemPerPage - (index + 1));
  }

  actionBack(item: any, type: string) {
    this.tableEvent.emit({item, type});
  }

  toggleDisplay(field: string) {
    let index = this.dataColumn.column.findIndex((object: any) => {
      return object.field === field;
    });
    this.dataColumn.column[index].hide = !this.dataColumn.column[index].hide;
  }

  drop(event: any) {
    // column in table
    let oldtarget = this.dataColumn.column[event.previousIndex];
    this.dataColumn.column[event.previousIndex] = this.dataColumn.column[event.currentIndex];
    this.dataColumn.column[event.currentIndex] = oldtarget;
    // column for display
    let oldtargetDisplay = this.dataColumn.columnDisplay[event.previousIndex];
    this.dataColumn.columnDisplay[event.previousIndex] = this.dataColumn.columnDisplay[event.currentIndex];
    this.dataColumn.columnDisplay[event.currentIndex] = oldtargetDisplay;
  }

}
