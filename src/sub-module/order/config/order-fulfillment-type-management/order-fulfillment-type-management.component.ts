import { Component } from '@angular/core';
import { SecureService } from 'src/shared/service/secure.service';
import { Dialog } from 'src/shared/dialog/dialog.model';
import { Alert } from 'src/shared/alert/alert.model';
import { Router } from '@angular/router';
import { ConfigService } from '../../service/config.service';
import { OrderFulfillmentTypeSearch } from '../../model/order-fulfillment-type-search.model';
import { OrderFulfillmentTypeTable } from '../../model/order-fulfillment-type-table.model';

@Component({
  selector: 'app-order-fulfillment-type-management',
  templateUrl: './order-fulfillment-type-management.component.html',
  styleUrls: ['./order-fulfillment-type-management.component.scss']
})
export class OrderFulfillmentTypeManagementComponent {

  orderFulfillmentTypeSearchModel: OrderFulfillmentTypeSearch = new OrderFulfillmentTypeSearch;
  orderFulfillmentTypes = new Array();
  dialogDetails = this.dialogModel.dialogDetail;
  alertDetails = this.alertModel.alertDetail;
  id: any;
  type: any;
  orderFulfillmentTypeTableCol = this.orderFulfillmentTypeTable;

  constructor(
    private configService: ConfigService,
    private secureService: SecureService,
    private dialogModel: Dialog,
    private alertModel: Alert,
    private orderFulfillmentTypeTable: OrderFulfillmentTypeTable,
    private router: Router
  ) {}

  ngOnInit() {
    this.getSysOrderFulfillmentTypes();
  }

  getSysOrderFulfillmentTypes() {
    this.configService.getSysOrderFulfillmentTypes(this.orderFulfillmentTypeSearchModel.api).subscribe((res: any) => {
      this.orderFulfillmentTypes = res.result.items;
      this.orderFulfillmentTypeSearchModel.paginationArr = new Array(res.result.paginationInfo.totalPage);
      this.orderFulfillmentTypeSearchModel.api.totalPage = res.result.paginationInfo.totalPage;
      this.orderFulfillmentTypeSearchModel.totalItem = res.result.paginationInfo.totalItem;
      this.orderFulfillmentTypeSearchModel.itemLength = res.result.items.length;
    });
  }

  getEncrypt(data: any) {
    return this.secureService.encrypt(data);
  }

  getFilters(emitValue: any) {
    if(emitValue.type === 'search') {
      this.orderFulfillmentTypeSearchModel.api.field = emitValue.selectFilter;
      this.orderFulfillmentTypeSearchModel.api[emitValue.selectFilter] = emitValue.filterInput;
    } else {
      this.orderFulfillmentTypeSearchModel.api.field = this.orderFulfillmentTypeSearchModel.field;
      this.orderFulfillmentTypeSearchModel.api[emitValue.selectFilter] = null;
    }
    this.getSysOrderFulfillmentTypes();
  }

  getDataEmit(event: any) {
    switch (event.type) {
      case 'update':
        this.router.navigateByUrl(`/order/config/order-fulfillment-type-form/${this.getEncrypt(event.item.id)}`);
        break;
      case 'delete':
        this.confirmDeleteSysOrderFulfillmentType(event.item.id);
        break;
      case 'active':
        this.confirmActiveSysOrderFulfillmentType(event.item.id);
        break;
      default:
        break;
    }
  }

  confirmDeleteSysOrderFulfillmentType(id: any) {
    this.id = id;
    this.type = 'delete';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmDel,
      type: this.dialogModel.type.confirm
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }

  confirmActiveSysOrderFulfillmentType(id: any) {
    this.id = id;
    this.type = 'active';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmActive,
      type: this.dialogModel.type.save
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }

  manageSysOrderFulfillmentTypeById() {
    if(this.type === 'delete') {
      this.configService.deleteSysOrderFulfillmentType({id: this.id}).subscribe((res: any) => { this.getResultFromManage(res) });
    } else {
      this.configService.activeSysOrderFulfillmentType({id: this.id}).subscribe((res: any) => { this.getResultFromManage(res) });
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
      this.getSysOrderFulfillmentTypes();
    }
  }

}
