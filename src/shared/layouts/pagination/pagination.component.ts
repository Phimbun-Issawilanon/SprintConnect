import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Alert } from 'src/shared/alert/alert.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  
  @Input() searchModel: any;
  @Output() paginationEvent = new EventEmitter();

  pagination = new Array();
  currentPage = 1
  alertDetails = this.alertModel.alertDetail;
  perPageArr = new Array(
    { id: 10, value: 10},
    { id: 30, value: 30},
    { id: 50, value: 50},
    { id: 100, value: 100},
  );

  constructor(
    private alertModel: Alert
  ) {}

  selectItemPerPage(event: any) {
    if((this.searchModel.api.currentPage * this.searchModel.totalItem > parseInt(event.target.value)) && this.searchModel.api.currentPage > 1) {
      if(this.searchModel.totalItem <= parseInt(event.target.value)) {
        this.searchModel.api.currentPage = 1;
        this.currentPage = this.searchModel.api.currentPage;
      } else {
        this.searchModel.api.currentPage = this.searchModel.api.currentPage - 1;
        this.currentPage = this.searchModel.api.currentPage;
      }
    }
    this.searchModel.api.itemPerPage = parseInt(event.target.value);
    this.getNewList();
  }

  changeCurrentPage(page: any) {
    switch(page) {
      case '+':
        if(this.searchModel.api.currentPage + 1 <= this.searchModel.api.totalPage) {
          this.searchModel.api.currentPage += 1;
          this.currentPage = this.searchModel.api.currentPage;
        }
        break;
      case '-':
        if(this.searchModel.api.currentPage - 1 >= 1) {
          this.searchModel.api.currentPage -= 1;
          this.currentPage = this.searchModel.api.currentPage;
        }
        break;
      case 'start':
        this.searchModel.api.currentPage = 1;
        this.currentPage = this.searchModel.api.currentPage;
        break;
      case 'end':
        this.searchModel.api.currentPage = this.searchModel.api.totalPage;
        this.currentPage = this.searchModel.api.currentPage;
        break;
      default:
        if(!this.currentPage) {
          this.alertDetails =  {
            msg: this.alertModel.message.paginationComponent.currentPageNotNull,
            type: this.alertModel.type.error
          };
          (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
          return;
        } else if(this.currentPage > this.searchModel.api.totalPage) {
          this.searchModel.api.currentPage = this.searchModel.api.totalPage;
          this.currentPage = this.searchModel.api.currentPage;
        } else if(this.currentPage < 1) {
          this.searchModel.api.currentPage = 1;
          this.currentPage = this.searchModel.api.currentPage;
        } else {
          this.searchModel.api.currentPage = this.currentPage;
        }
    }
    this.getNewList();
  }

  getNewList() {
    this.paginationEvent.emit();
  }

}
