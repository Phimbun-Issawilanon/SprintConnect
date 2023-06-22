import { Component } from '@angular/core';
import { SecureService } from 'src/shared/service/secure.service';
import { Dialog } from 'src/shared/dialog/dialog.model';
import { Alert } from 'src/shared/alert/alert.model';
import { Router } from '@angular/router';
import { ConfigService } from '../../service/config.service';
import { FunctionConfigSearch } from '../../model/function-config-search.model';
import { FunctionConfigTable } from '../../model/function-config-table.model';

@Component({
  selector: 'app-function-config-management',
  templateUrl: './function-config-management.component.html',
  styleUrls: ['./function-config-management.component.scss']
})
export class FunctionConfigManagementComponent {

  functionConfigSearchModel: FunctionConfigSearch = new FunctionConfigSearch;
  functionConfigs = new Array();
  dialogDetails = this.dialogModel.dialogDetail;
  alertDetails = this.alertModel.alertDetail;
  id: any;
  type: any;
  functionConfigTableCol = this.functionConfigTable;

  constructor(
    private configService: ConfigService,
    private secureService: SecureService,
    private dialogModel: Dialog,
    private alertModel: Alert,
    private functionConfigTable: FunctionConfigTable,
    private router: Router
  ) {}

  ngOnInit() {
    this.getSysFunctionConfigs();
  }

  getSysFunctionConfigs() {
    this.configService.getSysFunctionConfigs(this.functionConfigSearchModel.api).subscribe((res: any) => {
      this.functionConfigs = res.result.items;
      this.functionConfigSearchModel.paginationArr = new Array(res.result.paginationInfo.totalPage);
      this.functionConfigSearchModel.api.totalPage = res.result.paginationInfo.totalPage;
      this.functionConfigSearchModel.totalItem = res.result.paginationInfo.totalItem;
      this.functionConfigSearchModel.itemLength = res.result.items.length;
    });
  }

  getEncrypt(data: any) {
    return this.secureService.encrypt(data);
  }

  getFilters(emitValue: any) {
    if(emitValue.type === 'search') {
      this.functionConfigSearchModel.api.field = emitValue.selectFilter;
      this.functionConfigSearchModel.api[emitValue.selectFilter] = emitValue.filterInput;
    } else {
      this.functionConfigSearchModel.api.field = this.functionConfigSearchModel.field;
      this.functionConfigSearchModel.api[emitValue.selectFilter] = null;
    }
    this.getSysFunctionConfigs();
  }

  getDataEmit(event: any) {
    switch (event.type) {
      case 'update':
        this.router.navigateByUrl(`/order/config/function-config-form/${this.getEncrypt(event.item.id)}`);
        break;
      case 'delete':
        this.confirmDeleteSysFunctionConfig(event.item.id);
        break;
      case 'active':
        this.confirmActiveSysFunctionConfig(event.item.id);
        break;
      default:
        break;
    }
  }

  confirmDeleteSysFunctionConfig(id: any) {
    this.id = id;
    this.type = 'delete';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmDel,
      type: this.dialogModel.type.confirm
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }

  confirmActiveSysFunctionConfig(id: any) {
    this.id = id;
    this.type = 'active';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmActive,
      type: this.dialogModel.type.save
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }

  manageSysFunctionConfigById() {
    if(this.type === 'delete') {
      this.configService.deleteSysFunctionConfig({id: this.id}).subscribe((res: any) => { this.getResultFromManage(res) });
    } else {
      this.configService.activeSysFunctionConfig({id: this.id}).subscribe((res: any) => { this.getResultFromManage(res) });
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
      this.getSysFunctionConfigs();
    }
  }

}
