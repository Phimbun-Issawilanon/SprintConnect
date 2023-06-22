import { Component } from '@angular/core';
import { SecureService } from 'src/shared/service/secure.service';
import { Dialog } from 'src/shared/dialog/dialog.model';
import { Alert } from 'src/shared/alert/alert.model';
import { Router } from '@angular/router';
import { ConfigService } from '../../service/config.service';
import { OrderTypeSearch } from '../../model/order-type-search.model';
import { OrderTypeTable } from '../../model/order-type-table.model';

@Component({
  selector: 'app-order-type-management',
  templateUrl: './order-type-management.component.html',
  styleUrls: ['./order-type-management.component.scss']
})
export class OrderTypeManagementComponent {

  orderTypeSearchModel: OrderTypeSearch = new OrderTypeSearch;
  orderTypes = new Array();
  dialogDetails = this.dialogModel.dialogDetail;
  alertDetails = this.alertModel.alertDetail;
  id: any;
  type: any;
  orderTypeTableCol = this.orderTypeTable;

  constructor(
    private configService: ConfigService,
    private secureService: SecureService,
    private dialogModel: Dialog,
    private alertModel: Alert,
    private orderTypeTable: OrderTypeTable,
    private router: Router
  ) {}

  ngOnInit() {
    this.getSysOrderTypes();
  }

  getSysOrderTypes() {
    this.configService.getSysOrderTypes(this.orderTypeSearchModel.api).subscribe((res: any) => {
      this.orderTypes = res.result.items;
      this.orderTypeSearchModel.paginationArr = new Array(res.result.paginationInfo.totalPage);
      this.orderTypeSearchModel.api.totalPage = res.result.paginationInfo.totalPage;
      this.orderTypeSearchModel.totalItem = res.result.paginationInfo.totalItem;
      this.orderTypeSearchModel.itemLength = res.result.items.length;
    });
  }

  getEncrypt(data: any) {
    return this.secureService.encrypt(data);
  }

  getFilters(emitValue: any) {
    if(emitValue.type === 'search') {
      this.orderTypeSearchModel.api.field = emitValue.selectFilter;
      this.orderTypeSearchModel.api[emitValue.selectFilter] = emitValue.filterInput;
    } else {
      this.orderTypeSearchModel.api.field = this.orderTypeSearchModel.field;
      this.orderTypeSearchModel.api[emitValue.selectFilter] = null;
    }
    this.getSysOrderTypes();
  }

  getDataEmit(event: any) {
    switch (event.type) {
      case 'update':
        this.router.navigateByUrl(`/order/config/order-type-form/${this.getEncrypt(event.item.id)}`);
        break;
      case 'delete':
        this.confirmDeleteSysOrderType(event.item.id);
        break;
      case 'active':
        this.confirmActiveSysOrderType(event.item.id);
        break;
      default:
        break;
    }
  }

  confirmDeleteSysOrderType(id: any) {
    this.id = id;
    this.type = 'delete';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmDel,
      type: this.dialogModel.type.confirm
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }

  confirmActiveSysOrderType(id: any) {
    this.id = id;
    this.type = 'active';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmActive,
      type: this.dialogModel.type.save
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }

  manageSysOrderTypeById() {
    if(this.type === 'delete') {
      this.configService.deleteSysOrderType({id: this.id}).subscribe((res: any) => { this.getResultFromManage(res) });
    } else {
      this.configService.activeSysOrderType({id: this.id}).subscribe((res: any) => { this.getResultFromManage(res) });
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
      this.getSysOrderTypes();
    }
  }

}
