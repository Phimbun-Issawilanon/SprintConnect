import { Component } from '@angular/core';
import { SecureService } from 'src/shared/service/secure.service';
import { Dialog } from 'src/shared/dialog/dialog.model';
import { Alert } from 'src/shared/alert/alert.model';
import { Router } from '@angular/router';
import { ConfigService } from '../../service/config.service';
import { DeliveryTypeSearch } from '../../model/delivery-type-search.model';
import { DeliveryTypeTable } from '../../model/delivery-type-table.model';

@Component({
  selector: 'app-delivery-type-management',
  templateUrl: './delivery-type-management.component.html',
  styleUrls: ['./delivery-type-management.component.scss']
})
export class DeliveryTypeManagementComponent {

  deliveryTypeSearchModel: DeliveryTypeSearch = new DeliveryTypeSearch;
  deliveryTypes = new Array();
  dialogDetails = this.dialogModel.dialogDetail;
  alertDetails = this.alertModel.alertDetail;
  id: any;
  type: any;
  deliveryTypeTableCol = this.deliveryTypeTable;

  constructor(
    private configService: ConfigService,
    private secureService: SecureService,
    private dialogModel: Dialog,
    private alertModel: Alert,
    private deliveryTypeTable: DeliveryTypeTable,
    private router: Router
  ) {}

  ngOnInit() {
    this.getSysDeliveryTypes();
  }

  getSysDeliveryTypes() {
    this.configService.getSysDeliveryTypes(this.deliveryTypeSearchModel.api).subscribe((res: any) => {
      this.deliveryTypes = res.result.items;
      this.deliveryTypeSearchModel.paginationArr = new Array(res.result.paginationInfo.totalPage);
      this.deliveryTypeSearchModel.api.totalPage = res.result.paginationInfo.totalPage;
      this.deliveryTypeSearchModel.totalItem = res.result.paginationInfo.totalItem;
      this.deliveryTypeSearchModel.itemLength = res.result.items.length;
    });
  }

  getEncrypt(data: any) {
    return this.secureService.encrypt(data);
  }

  getFilters(emitValue: any) {
    if(emitValue.type === 'search') {
      this.deliveryTypeSearchModel.api.field = emitValue.selectFilter;
      this.deliveryTypeSearchModel.api[emitValue.selectFilter] = emitValue.filterInput;
    } else {
      this.deliveryTypeSearchModel.api.field = this.deliveryTypeSearchModel.field;
      this.deliveryTypeSearchModel.api[emitValue.selectFilter] = null;
    }
    this.getSysDeliveryTypes();
  }

  getDataEmit(event: any) {
    switch (event.type) {
      case 'update':
        this.router.navigateByUrl(`/order/config/delivery-type-form/${this.getEncrypt(event.item.id)}`);
        break;
      case 'delete':
        this.confirmDeleteSysDeliveryType(event.item.id);
        break;
      case 'active':
        this.confirmActiveSysDeliveryType(event.item.id);
        break;
      default:
        break;
    }
  }

  confirmDeleteSysDeliveryType(id: any) {
    this.id = id;
    this.type = 'delete';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmDel,
      type: this.dialogModel.type.confirm
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }

  confirmActiveSysDeliveryType(id: any) {
    this.id = id;
    this.type = 'active';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmActive,
      type: this.dialogModel.type.save
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }

  manageSysDeliveryTypeById() {
    if(this.type === 'delete') {
      this.configService.deleteSysDeliveryType({id: this.id}).subscribe((res: any) => { this.getResultFromManage(res) });
    } else {
      this.configService.activeSysDeliveryType({id: this.id}).subscribe((res: any) => { this.getResultFromManage(res) });
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
      this.getSysDeliveryTypes();
    }
  }

}
