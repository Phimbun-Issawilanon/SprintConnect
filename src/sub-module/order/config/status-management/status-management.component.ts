import { Component } from '@angular/core';
import { SecureService } from 'src/shared/service/secure.service';
import { Dialog } from 'src/shared/dialog/dialog.model';
import { Alert } from 'src/shared/alert/alert.model';
import { Router } from '@angular/router';
import { ConfigService } from '../../service/config.service';
import { StatusSearch } from '../../model/status-search.model';
import { StatusTable } from '../../model/status-table.model';

@Component({
  selector: 'app-status-management',
  templateUrl: './status-management.component.html',
  styleUrls: ['./status-management.component.scss']
})
export class StatusManagementComponent {

  statusSearchModel: StatusSearch = new StatusSearch;
  statuses = new Array();
  dialogDetails = this.dialogModel.dialogDetail;
  alertDetails = this.alertModel.alertDetail;
  id: any;
  type: any;
  statusTableCol = this.statusTable;

  constructor(
    private configService: ConfigService,
    private secureService: SecureService,
    private dialogModel: Dialog,
    private alertModel: Alert,
    private statusTable: StatusTable,
    private router: Router
  ) {}

  ngOnInit() {
    this.getSysStatuses();
  }

  getSysStatuses() {
    this.configService.getSysStatuses(this.statusSearchModel.api).subscribe((res: any) => {
      this.statuses = res.result.items;
      this.statusSearchModel.paginationArr = new Array(res.result.paginationInfo.totalPage);
      this.statusSearchModel.api.totalPage = res.result.paginationInfo.totalPage;
      this.statusSearchModel.totalItem = res.result.paginationInfo.totalItem;
      this.statusSearchModel.itemLength = res.result.items.length;
    });
  }

  getEncrypt(data: any) {
    return this.secureService.encrypt(data);
  }

  getFilters(emitValue: any) {
    if(emitValue.type === 'search') {
      this.statusSearchModel.api.field = emitValue.selectFilter;
      this.statusSearchModel.api[emitValue.selectFilter] = emitValue.filterInput;
    } else {
      this.statusSearchModel.api.field = this.statusSearchModel.field;
      this.statusSearchModel.api[emitValue.selectFilter] = null;
    }
    this.getSysStatuses();
  }

  getDataEmit(event: any) {
    switch (event.type) {
      case 'update':
        this.router.navigateByUrl(`/order/config/status-form/${this.getEncrypt(event.item.id)}`);
        break;
      case 'delete':
        this.confirmDeleteSysstatus(event.item.id);
        break;
      case 'active':
        this.confirmActiveSysstatus(event.item.id);
        break;
      default:
        break;
    }
  }

  confirmDeleteSysstatus(id: any) {
    this.id = id;
    this.type = 'delete';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmDel,
      type: this.dialogModel.type.confirm
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }

  confirmActiveSysstatus(id: any) {
    this.id = id;
    this.type = 'active';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmActive,
      type: this.dialogModel.type.save
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }

  manageSysStatusById() {
    if(this.type === 'delete') {
      this.configService.deleteSysStatus({id: this.id}).subscribe((res: any) => { this.getResultFromManage(res) });
    } else {
      this.configService.activeSysStatus({id: this.id}).subscribe((res: any) => { this.getResultFromManage(res) });
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
      this.getSysStatuses();
    }
  }

}
