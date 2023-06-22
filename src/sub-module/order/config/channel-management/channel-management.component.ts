import { Component } from '@angular/core';
import { SecureService } from 'src/shared/service/secure.service';
import { Dialog } from 'src/shared/dialog/dialog.model';
import { Alert } from 'src/shared/alert/alert.model';
import { Router } from '@angular/router';
import { ConfigService } from '../../service/config.service';
import { ChannelTable } from '../../model/channel-table.model';
import { ChannelSearch } from '../../model/channel-search.model';

@Component({
  selector: 'app-channel-management',
  templateUrl: './channel-management.component.html',
  styleUrls: ['./channel-management.component.scss']
})
export class ChannelManagementComponent {

  channelSearchModel: ChannelSearch = new ChannelSearch;
  channels = new Array();
  dialogDetails = this.dialogModel.dialogDetail;
  alertDetails = this.alertModel.alertDetail;
  id: any;
  type: any;
  channelTableCol = this.channelTable;

  constructor(
    private configService: ConfigService,
    private secureService: SecureService,
    private dialogModel: Dialog,
    private alertModel: Alert,
    private channelTable: ChannelTable,
    private router: Router
  ) {}

  ngOnInit() {
    this.getSysChannels();
  }

  getSysChannels() {
    this.configService.getSysChannels(this.channelSearchModel.api).subscribe((res: any) => {
      this.channels = res.result.items;
      this.channelSearchModel.paginationArr = new Array(res.result.paginationInfo.totalPage);
      this.channelSearchModel.api.totalPage = res.result.paginationInfo.totalPage;
      this.channelSearchModel.totalItem = res.result.paginationInfo.totalItem;
      this.channelSearchModel.itemLength = res.result.items.length;
    });
  }

  getEncrypt(data: any) {
    return this.secureService.encrypt(data);
  }

  getFilters(emitValue: any) {
    if(emitValue.type === 'search') {
      this.channelSearchModel.api.field = emitValue.selectFilter;
      this.channelSearchModel.api[emitValue.selectFilter] = emitValue.filterInput;
    } else {
      this.channelSearchModel.api.field = this.channelSearchModel.field;
      this.channelSearchModel.api[emitValue.selectFilter] = null;
    }
    this.getSysChannels();
  }

  getDataEmit(event: any) {
    switch (event.type) {
      case 'update':
        this.router.navigateByUrl(`/order/config/channel-form/${this.getEncrypt(event.item.id)}`);
        break;
      case 'delete':
        this.confirmDeleteSysChannel(event.item.id);
        break;
      case 'active':
        this.confirmActiveSysChannel(event.item.id);
        break;
      default:
        break;
    }
  }

  confirmDeleteSysChannel(id: any) {
    this.id = id;
    this.type = 'delete';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmDel,
      type: this.dialogModel.type.confirm
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }

  confirmActiveSysChannel(id: any) {
    this.id = id;
    this.type = 'active';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmActive,
      type: this.dialogModel.type.save
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }

  manageSysChannelById() {
    if(this.type === 'delete') {
      this.configService.deleteSysChannel({id: this.id}).subscribe((res: any) => { this.getResultFromManage(res) });
    } else {
      this.configService.activeSysChannel({id: this.id}).subscribe((res: any) => { this.getResultFromManage(res) });
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
      this.getSysChannels();
    }
  }

}
