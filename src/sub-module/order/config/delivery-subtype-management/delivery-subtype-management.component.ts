import { Component } from '@angular/core';
import { SecureService } from 'src/shared/service/secure.service';
import { Dialog } from 'src/shared/dialog/dialog.model';
import { Alert } from 'src/shared/alert/alert.model';
import { Router } from '@angular/router';
import { ConfigService } from '../../service/config.service';
import { DeliverySubtypeSearch } from '../../model/delivery-subtype-search.model';
import { DeliverySubtypeTable } from '../../model/delivery-subtype-table.model';

@Component({
  selector: 'app-delivery-subtype-management',
  templateUrl: './delivery-subtype-management.component.html',
  styleUrls: ['./delivery-subtype-management.component.scss']
})
export class DeliverySubtypeManagementComponent {

  deliverySubTypeSearchModel: DeliverySubtypeSearch = new DeliverySubtypeSearch;
  deliverySubTypes = new Array();
  dialogDetails = this.dialogModel.dialogDetail;
  alertDetails = this.alertModel.alertDetail;
  id: any;
  type: any;
  deliverySubTypeTableCol = this.deliverySubTypeTable;

  constructor(
    private configService: ConfigService,
    private secureService: SecureService,
    private dialogModel: Dialog,
    private alertModel: Alert,
    private deliverySubTypeTable: DeliverySubtypeTable,
    private router: Router
  ) {}

  ngOnInit() {
    this.getSysDeliverySubTypes();
  }

  getSysDeliverySubTypes() {
    this.configService.getSysDeliverySubTypes(this.deliverySubTypeSearchModel.api).subscribe((res: any) => {
      this.deliverySubTypes = res.result.items;
      this.deliverySubTypeSearchModel.paginationArr = new Array(res.result.paginationInfo.totalPage);
      this.deliverySubTypeSearchModel.api.totalPage = res.result.paginationInfo.totalPage;
      this.deliverySubTypeSearchModel.totalItem = res.result.paginationInfo.totalItem;
      this.deliverySubTypeSearchModel.itemLength = res.result.items.length;
    });
  }

  getEncrypt(data: any) {
    return this.secureService.encrypt(data);
  }

  getFilters(emitValue: any) {
    if(emitValue.type === 'search') {
      this.deliverySubTypeSearchModel.api.field = emitValue.selectFilter;
      this.deliverySubTypeSearchModel.api[emitValue.selectFilter] = emitValue.filterInput;
    } else {
      this.deliverySubTypeSearchModel.api.field = this.deliverySubTypeSearchModel.field;
      this.deliverySubTypeSearchModel.api[emitValue.selectFilter] = null;
    }
    this.getSysDeliverySubTypes();
  }

  getDataEmit(event: any) {
    switch (event.type) {
      case 'update':
        this.router.navigateByUrl(`/order/config/delivery-subtype-form/${this.getEncrypt(event.item.id)}`);
        break;
      case 'delete':
        this.confirmDeleteSysDeliverySubType(event.item.id);
        break;
      case 'active':
        this.confirmActiveSysDeliverySubType(event.item.id);
        break;
      default:
        break;
    }
  }

  confirmDeleteSysDeliverySubType(id: any) {
    this.id = id;
    this.type = 'delete';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmDel,
      type: this.dialogModel.type.confirm
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }

  confirmActiveSysDeliverySubType(id: any) {
    this.id = id;
    this.type = 'active';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmActive,
      type: this.dialogModel.type.save
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }

  manageSysDeliverySubTypeById() {
    if(this.type === 'delete') {
      this.configService.deleteSysDeliverySubType({id: this.id}).subscribe((res: any) => { this.getResultFromManage(res) });
    } else {
      this.configService.activeSysDeliverySubType({id: this.id}).subscribe((res: any) => { this.getResultFromManage(res) });
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
      this.getSysDeliverySubTypes();
    }
  }

}
