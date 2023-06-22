import { Component } from '@angular/core';
import { SecureService } from 'src/shared/service/secure.service';
import { Dialog } from 'src/shared/dialog/dialog.model';
import { Alert } from 'src/shared/alert/alert.model';
import { Router } from '@angular/router';
import { ConfigService } from '../../service/config.service';
import { FulfillmentPrioritySearch } from '../../model/fulfillment-priority-search.model';
import { FulfillmentPriorityTable } from '../../model/fulfillment-priority-table.model';

@Component({
  selector: 'app-fulfillment-priority-management',
  templateUrl: './fulfillment-priority-management.component.html',
  styleUrls: ['./fulfillment-priority-management.component.scss']
})
export class FulfillmentPriorityManagementComponent {

  fulfillmentPrioritySearchModel: FulfillmentPrioritySearch = new FulfillmentPrioritySearch;
  fulfillmentPrioritys = new Array();
  dialogDetails = this.dialogModel.dialogDetail;
  alertDetails = this.alertModel.alertDetail;
  id: any;
  type: any;
  fulfillmentPriorityTableCol = this.fulfillmentPriorityTable;

  constructor(
    private configService: ConfigService,
    private secureService: SecureService,
    private dialogModel: Dialog,
    private alertModel: Alert,
    private fulfillmentPriorityTable: FulfillmentPriorityTable,
    private router: Router
  ) {}

  ngOnInit() {
    this.getSysFulfillmentPrioritys();
  }

  getSysFulfillmentPrioritys() {
    this.configService.getSysFulfillmentPrioritys(this.fulfillmentPrioritySearchModel.api).subscribe((res: any) => {
      this.fulfillmentPrioritys = res.result.items;
      this.fulfillmentPrioritySearchModel.paginationArr = new Array(res.result.paginationInfo.totalPage);
      this.fulfillmentPrioritySearchModel.api.totalPage = res.result.paginationInfo.totalPage;
      this.fulfillmentPrioritySearchModel.totalItem = res.result.paginationInfo.totalItem;
      this.fulfillmentPrioritySearchModel.itemLength = res.result.items.length;
    });
  }

  getEncrypt(data: any) {
    return this.secureService.encrypt(data);
  }

  getFilters(emitValue: any) {
    if(emitValue.type === 'search') {
      this.fulfillmentPrioritySearchModel.api.field = emitValue.selectFilter;
      this.fulfillmentPrioritySearchModel.api[emitValue.selectFilter] = emitValue.filterInput;
    } else {
      this.fulfillmentPrioritySearchModel.api.field = this.fulfillmentPrioritySearchModel.field;
      this.fulfillmentPrioritySearchModel.api[emitValue.selectFilter] = null;
    }
    this.getSysFulfillmentPrioritys();
  }

  getDataEmit(event: any) {
    switch (event.type) {
      case 'update':
        this.router.navigateByUrl(`/order/config/fulfillment-priority-form/${this.getEncrypt(event.item.id)}`);
        break;
      case 'delete':
        this.confirmDeleteSysFulfillmentPriority(event.item.id);
        break;
      case 'active':
        this.confirmActiveSysFulfillmentPriority(event.item.id);
        break;
      default:
        break;
    }
  }

  confirmDeleteSysFulfillmentPriority(id: any) {
    this.id = id;
    this.type = 'delete';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmDel,
      type: this.dialogModel.type.confirm
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }

  confirmActiveSysFulfillmentPriority(id: any) {
    this.id = id;
    this.type = 'active';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmActive,
      type: this.dialogModel.type.save
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }

  manageSysFulfillmentPriorityById() {
    if(this.type === 'delete') {
      this.configService.deleteSysFulfillmentPriority({id: this.id}).subscribe((res: any) => { this.getResultFromManage(res) });
    } else {
      this.configService.activeSysFulfillmentPriority({id: this.id}).subscribe((res: any) => { this.getResultFromManage(res) });
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
      this.getSysFulfillmentPrioritys();
    }
  }

}
