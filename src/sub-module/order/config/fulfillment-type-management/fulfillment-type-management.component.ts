import { Component } from '@angular/core';
import { SecureService } from 'src/shared/service/secure.service';
import { Dialog } from 'src/shared/dialog/dialog.model';
import { Alert } from 'src/shared/alert/alert.model';
import { Router } from '@angular/router';
import { ConfigService } from '../../service/config.service';
import { FulfillmentTypeSearch } from '../../model/fulfillment-type-search.model';
import { FulfillmentTypeTable } from '../../model/fulfillment-type-table.model';

@Component({
  selector: 'app-fulfillment-type-management',
  templateUrl: './fulfillment-type-management.component.html',
  styleUrls: ['./fulfillment-type-management.component.scss']
})
export class FulfillmentTypeManagementComponent {

  fulfillmentTypeSearchModel: FulfillmentTypeSearch = new FulfillmentTypeSearch;
  fulfillmentTypes = new Array();
  dialogDetails = this.dialogModel.dialogDetail;
  alertDetails = this.alertModel.alertDetail;
  id: any;
  type: any;
  fulfillmentTypeTableCol = this.fulfillmentTypeTable;

  constructor(
    private configService: ConfigService,
    private secureService: SecureService,
    private dialogModel: Dialog,
    private alertModel: Alert,
    private fulfillmentTypeTable: FulfillmentTypeTable,
    private router: Router
  ) {}

  ngOnInit() {
    this.getSysFulfillmentTypes();
  }

  getSysFulfillmentTypes() {
    this.configService.getSysFulfillmentTypes(this.fulfillmentTypeSearchModel.api).subscribe((res: any) => {
      this.fulfillmentTypes = res.result.items;
      this.fulfillmentTypeSearchModel.paginationArr = new Array(res.result.paginationInfo.totalPage);
      this.fulfillmentTypeSearchModel.api.totalPage = res.result.paginationInfo.totalPage;
      this.fulfillmentTypeSearchModel.totalItem = res.result.paginationInfo.totalItem;
      this.fulfillmentTypeSearchModel.itemLength = res.result.items.length;
    });
  }

  getEncrypt(data: any) {
    return this.secureService.encrypt(data);
  }

  getFilters(emitValue: any) {
    if(emitValue.type === 'search') {
      this.fulfillmentTypeSearchModel.api.field = emitValue.selectFilter;
      this.fulfillmentTypeSearchModel.api[emitValue.selectFilter] = emitValue.filterInput;
    } else {
      this.fulfillmentTypeSearchModel.api.field = this.fulfillmentTypeSearchModel.field;
      this.fulfillmentTypeSearchModel.api[emitValue.selectFilter] = null;
    }
    this.getSysFulfillmentTypes();
  }

  getDataEmit(event: any) {
    switch (event.type) {
      case 'update':
        this.router.navigateByUrl(`/order/config/fulfillment-type-form/${this.getEncrypt(event.item.id)}`);
        break;
      case 'delete':
        this.confirmDeleteSysFulfillmentType(event.item.id);
        break;
      case 'active':
        this.confirmActiveSysFulfillmentType(event.item.id);
        break;
      default:
        break;
    }
  }

  confirmDeleteSysFulfillmentType(id: any) {
    this.id = id;
    this.type = 'delete';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmDel,
      type: this.dialogModel.type.confirm
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }

  confirmActiveSysFulfillmentType(id: any) {
    this.id = id;
    this.type = 'active';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmActive,
      type: this.dialogModel.type.save
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }

  manageSysFulfillmentTypeById() {
    if(this.type === 'delete') {
      this.configService.deleteSysFulfillmentType({id: this.id}).subscribe((res: any) => { this.getResultFromManage(res) });
    } else {
      this.configService.activeSysFulfillmentType({id: this.id}).subscribe((res: any) => { this.getResultFromManage(res) });
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
      this.getSysFulfillmentTypes();
    }
  }

}
