import { Component } from '@angular/core';
import { SecureService } from 'src/shared/service/secure.service';
import { Dialog } from 'src/shared/dialog/dialog.model';
import { Alert } from 'src/shared/alert/alert.model';
import { Router } from '@angular/router';
import { ConfigService } from '../../service/config.service';
import { RunningNumberTypeSearch } from '../../model/running-number-type-search.model';
import { RunningNumberTypeTable } from '../../model/running-number-type-table.model';

@Component({
  selector: 'app-running-number-type-management',
  templateUrl: './running-number-type-management.component.html',
  styleUrls: ['./running-number-type-management.component.scss']
})
export class RunningNumberTypeManagementComponent {

  runningNumberTypeSearchModel: RunningNumberTypeSearch = new RunningNumberTypeSearch;
  runningNumberTypes = new Array();
  dialogDetails = this.dialogModel.dialogDetail;
  alertDetails = this.alertModel.alertDetail;
  id: any;
  type: any;
  runningNumberTypeTableCol = this.runningNumberTypeTable;

  constructor(
    private configService: ConfigService,
    private secureService: SecureService,
    private dialogModel: Dialog,
    private alertModel: Alert,
    private runningNumberTypeTable: RunningNumberTypeTable,
    private router: Router
  ) {}

  ngOnInit() {
    this.getSysRunningNumberTypes();
  }

  getSysRunningNumberTypes() {
    this.configService.getSysRunningNumberTypes(this.runningNumberTypeSearchModel.api).subscribe((res: any) => {
      this.runningNumberTypes = res.result.items;
      this.runningNumberTypeSearchModel.paginationArr = new Array(res.result.paginationInfo.totalPage);
      this.runningNumberTypeSearchModel.api.totalPage = res.result.paginationInfo.totalPage;
      this.runningNumberTypeSearchModel.totalItem = res.result.paginationInfo.totalItem;
      this.runningNumberTypeSearchModel.itemLength = res.result.items.length;
    });
  }

  getEncrypt(data: any) {
    return this.secureService.encrypt(data);
  }

  getFilters(emitValue: any) {
    if(emitValue.type === 'search') {
      this.runningNumberTypeSearchModel.api.field = emitValue.selectFilter;
      this.runningNumberTypeSearchModel.api[emitValue.selectFilter] = emitValue.filterInput;
    } else {
      this.runningNumberTypeSearchModel.api.field = this.runningNumberTypeSearchModel.field;
      this.runningNumberTypeSearchModel.api[emitValue.selectFilter] = null;
    }
    this.getSysRunningNumberTypes();
  }

  getDataEmit(event: any) {
    switch (event.type) {
      case 'update':
        this.router.navigateByUrl(`/order/config/running-number-type-form/${this.getEncrypt(event.item.id)}`);
        break;
      case 'delete':
        this.confirmDeleteSysrunningNumberType(event.item.id);
        break;
      case 'active':
        this.confirmActiveSysrunningNumberType(event.item.id);
        break;
      default:
        break;
    }
  }

  confirmDeleteSysrunningNumberType(id: any) {
    this.id = id;
    this.type = 'delete';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmDel,
      type: this.dialogModel.type.confirm
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }

  confirmActiveSysrunningNumberType(id: any) {
    this.id = id;
    this.type = 'active';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmActive,
      type: this.dialogModel.type.save
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }

  manageSysRunningNumberTypeById() {
    if(this.type === 'delete') {
      this.configService.deleteSysRunningNumberType({id: this.id}).subscribe((res: any) => { this.getResultFromManage(res) });
    } else {
      this.configService.activeSysRunningNumberType({id: this.id}).subscribe((res: any) => { this.getResultFromManage(res) });
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
      this.getSysRunningNumberTypes();
    }
  }

}
