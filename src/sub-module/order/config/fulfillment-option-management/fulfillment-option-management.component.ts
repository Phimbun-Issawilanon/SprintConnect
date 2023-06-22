import { Component } from '@angular/core';
import { SecureService } from 'src/shared/service/secure.service';
import { Dialog } from 'src/shared/dialog/dialog.model';
import { Alert } from 'src/shared/alert/alert.model';
import { Router } from '@angular/router';
import { ConfigService } from '../../service/config.service';
import { FulfillmentOptionSearch } from '../../model/fulfillment-option-search.model';
import { FulfillmentOptionTable } from '../../model/fulfillment-option-table.model';

@Component({
  selector: 'app-fulfillment-option-management',
  templateUrl: './fulfillment-option-management.component.html',
  styleUrls: ['./fulfillment-option-management.component.scss']
})
export class FulfillmentOptionManagementComponent {

  fulfillmentOptionSearchModel: FulfillmentOptionSearch = new FulfillmentOptionSearch;
  fulfillmentOptions = new Array();
  dialogDetails = this.dialogModel.dialogDetail;
  alertDetails = this.alertModel.alertDetail;
  id: any;
  type: any;
  fulfillmentOptionTableCol = this.fulfillmentOptionTable;

  constructor(
    private configService: ConfigService,
    private secureService: SecureService,
    private dialogModel: Dialog,
    private alertModel: Alert,
    private fulfillmentOptionTable: FulfillmentOptionTable,
    private router: Router
  ) {}

  ngOnInit() {
    this.getSysFulfillmentOptions();
  }

  getSysFulfillmentOptions() {
    this.configService.getSysFulfillmentOptions(this.fulfillmentOptionSearchModel.api).subscribe((res: any) => {
      this.fulfillmentOptions = res.result.items;
      this.fulfillmentOptionSearchModel.paginationArr = new Array(res.result.paginationInfo.totalPage);
      this.fulfillmentOptionSearchModel.api.totalPage = res.result.paginationInfo.totalPage;
      this.fulfillmentOptionSearchModel.totalItem = res.result.paginationInfo.totalItem;
      this.fulfillmentOptionSearchModel.itemLength = res.result.items.length;
    });
  }

  getEncrypt(data: any) {
    return this.secureService.encrypt(data);
  }

  getFilters(emitValue: any) {
    if(emitValue.type === 'search') {
      this.fulfillmentOptionSearchModel.api.field = emitValue.selectFilter;
      this.fulfillmentOptionSearchModel.api[emitValue.selectFilter] = emitValue.filterInput;
    } else {
      this.fulfillmentOptionSearchModel.api.field = this.fulfillmentOptionSearchModel.field;
      this.fulfillmentOptionSearchModel.api[emitValue.selectFilter] = null;
    }
    this.getSysFulfillmentOptions();
  }

  getDataEmit(event: any) {
    switch (event.type) {
      case 'update':
        this.router.navigateByUrl(`/order/config/fulfillment-option-form/${this.getEncrypt(event.item.id)}`);
        break;
      case 'delete':
        this.confirmDeleteSysFulfillmentOption(event.item.id);
        break;
      case 'active':
        this.confirmActiveSysFulfillmentOption(event.item.id);
        break;
      default:
        break;
    }
  }

  confirmDeleteSysFulfillmentOption(id: any) {
    this.id = id;
    this.type = 'delete';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmDel,
      type: this.dialogModel.type.confirm
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }

  confirmActiveSysFulfillmentOption(id: any) {
    this.id = id;
    this.type = 'active';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmActive,
      type: this.dialogModel.type.save
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }

  manageSysFulfillmentOptionById() {
    if(this.type === 'delete') {
      this.configService.deleteSysFulfillmentOption({id: this.id}).subscribe((res: any) => { this.getResultFromManage(res) });
    } else {
      this.configService.activeSysFulfillmentOption({id: this.id}).subscribe((res: any) => { this.getResultFromManage(res) });
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
      this.getSysFulfillmentOptions();
    }
  }

}
