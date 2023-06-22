import { Component } from '@angular/core';
import { SecureService } from 'src/shared/service/secure.service';
import { Dialog } from 'src/shared/dialog/dialog.model';
import { Alert } from 'src/shared/alert/alert.model';
import { RoleSearch } from '../model/role-search.model';
import { RoleService } from '../service/role.service';
import { RoleTable } from '../model/role-table.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent {

  roleSearchModel: RoleSearch = new RoleSearch;
  roles = new Array();
  dialogDetails = this.dialogModel.dialogDetail;
  alertDetails = this.alertModel.alertDetail;
  roleId: any;
  type: any;
  roleTableCol = this.roleTable;

  constructor(
    private roleService: RoleService,
    private secureService: SecureService,
    private dialogModel: Dialog,
    private alertModel: Alert,
    private roleTable: RoleTable,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    this.roleService.getRoles(this.roleSearchModel.api).subscribe((res: any) => {
      this.roles = res.result.items;
      this.roleSearchModel.paginationArr = new Array(res.result.paginationInfo.totalPage);
      this.roleSearchModel.api.totalPage = res.result.paginationInfo.totalPage;
      this.roleSearchModel.totalItem = res.result.paginationInfo.totalItem;
      this.roleSearchModel.itemLength = res.result.items.length;
    });
  }

  getEncrypt(data: any) {
    return this.secureService.encrypt(data);
  }

  getFilters(emitValue: any) {
    if(emitValue.type === 'search') {
      this.roleSearchModel.api.field = emitValue.selectFilter;
      this.roleSearchModel.api[emitValue.selectFilter] = emitValue.filterInput;
    } else {
      this.roleSearchModel.api.field = this.roleSearchModel.field;
      this.roleSearchModel.api[emitValue.selectFilter] = null;
    }
    this.getRoles();
  }

  getDataEmit(event: any) {
    switch (event.type) {
      case 'update':
        this.router.navigateByUrl(`/auth/role-form/${this.getEncrypt(event.item.roleId)}`);
        break;
      case 'delete':
        this.confirmDeleteRole(event.item.roleId);
        break;
      case 'active':
        this.confirmActiveRole(event.item.roleId);
        break;
      default:
        break;
    }
  }

  confirmDeleteRole(roleId: any) {
    this.roleId = roleId;
    this.type = 'delete';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmDel,
      type: this.dialogModel.type.confirm
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }

  confirmActiveRole(roleId: any) {
    this.roleId = roleId;
    this.type = 'active';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmActive,
      type: this.dialogModel.type.save
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }

  manageRoleById() {
    if(this.type === 'delete') {
      this.roleService.deleteRole({roleId: this.roleId}).subscribe((res: any) => { this.getResultFromManage(res) });
    } else {
      this.roleService.activeRole({roleId: this.roleId}).subscribe((res: any) => { this.getResultFromManage(res) });
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
      this.getRoles();
    }
  }

}
