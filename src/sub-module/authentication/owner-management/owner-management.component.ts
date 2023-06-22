import { Component } from '@angular/core';
import { SecureService } from 'src/shared/service/secure.service';
import { Dialog } from 'src/shared/dialog/dialog.model';
import { Alert } from 'src/shared/alert/alert.model';
import { OwnerSearch } from '../model/owner-search.model';
import { OwnerService } from '../service/owner.service';
import { OwnerTable } from '../model/owner-table.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-management',
  templateUrl: './owner-management.component.html',
  styleUrls: ['./owner-management.component.scss']
})
export class OwnerManagementComponent {

  ownerSearchModel: OwnerSearch = new OwnerSearch;
  owners = new Array();
  dialogDetails = this.dialogModel.dialogDetail;
  alertDetails = this.alertModel.alertDetail;
  ownerId: any;
  type: any;
  ownerTableCol = this.ownerTable;

  constructor(
    private ownerService: OwnerService,
    private secureService: SecureService,
    private dialogModel: Dialog,
    private alertModel: Alert,
    private ownerTable: OwnerTable,
    private router: Router
  ) {}

  ngOnInit() {
    this.getOwners();
  }

  getOwners() {
    this.ownerService.getOwners(this.ownerSearchModel.api).subscribe((res: any) => {
      this.owners = res.result.items;
      this.ownerSearchModel.paginationArr = new Array(res.result.paginationInfo.totalPage);
      this.ownerSearchModel.api.totalPage = res.result.paginationInfo.totalPage;
      this.ownerSearchModel.totalItem = res.result.paginationInfo.totalItem;
      this.ownerSearchModel.itemLength = res.result.items.length;
    });
  }

  getEncrypt(data: any) {
    return this.secureService.encrypt(data);
  }

  getFilters(emitValue: any) {
    if(emitValue.type === 'search') {
      this.ownerSearchModel.api.field = emitValue.selectFilter;
      this.ownerSearchModel.api[emitValue.selectFilter] = emitValue.filterInput;
    } else {
      this.ownerSearchModel.api.field = this.ownerSearchModel.field;
      this.ownerSearchModel.api[emitValue.selectFilter] = null;
    }
    this.getOwners();
  }

  getDataEmit(event: any) {
    switch (event.type) {
      case 'update':
        this.router.navigateByUrl(`/auth/owner-form/${this.getEncrypt(event.item.ownerId)}`);
        break;
      case 'delete':
        this.confirmDeleteOwner(event.item.ownerId);
        break;
      case 'active':
        this.confirmActiveOwner(event.item.ownerId);
        break;
      default:
        break;
    }
  }

  confirmDeleteOwner(ownerId: any) {
    this.ownerId = ownerId;
    this.type = 'delete';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmDel,
      type: this.dialogModel.type.confirm
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }

  confirmActiveOwner(ownerId: any) {
    this.ownerId = ownerId;
    this.type = 'active';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmActive,
      type: this.dialogModel.type.save
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }

  manageOwnerById() {
    if(this.type === 'delete') {
      this.ownerService.deleteOwner({ownerId: this.ownerId}).subscribe((res: any) => { this.getResultFromManage(res) });
    } else {
      this.ownerService.activeOwner({ownerId: this.ownerId}).subscribe((res: any) => { this.getResultFromManage(res) });
    }
  }

  getResultFromManage(res: any) {
    if(res.statusCode !== 200) {
      this.alertDetails =  {
        msg: res.statusDesc,
        type: this.alertModel.type.error
      };
      (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
    } else {
      this.alertDetails =  {
        msg: res.statusDesc,
        type: this.alertModel.type.success
      };
      (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
      this.getOwners();
    }
  }
}
