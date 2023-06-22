import { Component } from '@angular/core';
import { SecureService } from 'src/shared/service/secure.service';
import { Dialog } from 'src/shared/dialog/dialog.model';
import { Alert } from 'src/shared/alert/alert.model';
import { Router } from '@angular/router';
import { ConfigService } from '../../service/config.service';
import { RunningNumberSearch } from '../../model/running-number-search.model';
import { RunningNumberTable } from '../../model/running-number-table.model';

@Component({
  selector: 'app-running-number-management',
  templateUrl: './running-number-management.component.html',
  styleUrls: ['./running-number-management.component.scss']
})
export class RunningNumberManagementComponent {

  runningNumberSearchModel: RunningNumberSearch = new RunningNumberSearch;
  runningNumbers = new Array();
  dialogDetails = this.dialogModel.dialogDetail;
  alertDetails = this.alertModel.alertDetail;
  id: any;
  type: any;
  runningNumberTableCol = this.runningNumberTable;

  constructor(
    private configService: ConfigService,
    private secureService: SecureService,
    private dialogModel: Dialog,
    private alertModel: Alert,
    private runningNumberTable: RunningNumberTable,
    private router: Router
  ) {}

  ngOnInit() {
    this.getSysRunningNumbers();
  }

  getSysRunningNumbers() {
    this.configService.getSysRunningNumbers(this.runningNumberSearchModel.api).subscribe((res: any) => {
      this.runningNumbers = res.result.items;
      this.runningNumberSearchModel.paginationArr = new Array(res.result.paginationInfo.totalPage);
      this.runningNumberSearchModel.api.totalPage = res.result.paginationInfo.totalPage;
      this.runningNumberSearchModel.totalItem = res.result.paginationInfo.totalItem;
      this.runningNumberSearchModel.itemLength = res.result.items.length;
    });
  }

  getEncrypt(data: any) {
    return this.secureService.encrypt(data);
  }

  getFilters(emitValue: any) {
    if(emitValue.type === 'search') {
      this.runningNumberSearchModel.api.field = emitValue.selectFilter;
      this.runningNumberSearchModel.api[emitValue.selectFilter] = emitValue.filterInput;
    } else {
      this.runningNumberSearchModel.api.field = this.runningNumberSearchModel.field;
      this.runningNumberSearchModel.api[emitValue.selectFilter] = null;
    }
    this.getSysRunningNumbers();
  }

  getDataEmit(event: any) {
    switch (event.type) {
      case 'view':
        this.router.navigateByUrl(`/order/config/running-number-form/${this.getEncrypt(event.item.id)}`);
        break;
      default:
        break;
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
      this.getSysRunningNumbers();
    }
  }

}
