import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { UserSearch } from '../model/user-search.model';
import { SecureService } from 'src/shared/service/secure.service';
import { Dialog } from 'src/shared/dialog/dialog.model';
import { Alert } from 'src/shared/alert/alert.model';
import { UserTable } from '../model/user-table.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {

  userSearchModel: UserSearch = new UserSearch;
  users = new Array();
  dialogDetails = this.dialogModel.dialogDetail;
  alertDetails = this.alertModel.alertDetail;
  userId: any;
  type: any;
  userProfile = this.userService.userProfileFromLocal;
  userTableCol = this.userTable;

  constructor(
    private userService: UserService,
    private secureService: SecureService,
    private dialogModel: Dialog,
    private alertModel: Alert,
    private userTable: UserTable,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUsers();
    if(this.userProfile.role[0].roleId === 4) {
      // hide owner id for not system admin user
      this.userTableCol.column[12].hide = false;
      this.userTableCol.columnDisplay[6].hide = false;
    }
  }

  getUsers() {
    this.userService.getUsers(this.userSearchModel.api).subscribe((res: any) => {
      this.users = res.result.items;
      this.userSearchModel.paginationArr = new Array(res.result.paginationInfo.totalPage);
      this.userSearchModel.api.totalPage = res.result.paginationInfo.totalPage;
      this.userSearchModel.totalItem = res.result.paginationInfo.totalItem;
      this.userSearchModel.itemLength = res.result.items.length;
    });
  }

  getEncrypt(data: any) {
    return this.secureService.encrypt(data);
  }

  getFilters(emitValue: any) {
    if(emitValue.type === 'search') {
      this.userSearchModel.api.field = emitValue.selectFilter;
      this.userSearchModel.api[emitValue.selectFilter] = emitValue.filterInput;
    } else {
      this.userSearchModel.api.field = this.userSearchModel.field;
      this.userSearchModel.api[emitValue.selectFilter] = null;
    }
    this.getUsers();
  }

  getDataEmit(event: any) {
    switch (event.type) {
      case 'update':
        this.router.navigateByUrl(`/auth/user-form/${this.getEncrypt(event.item.userId)}`);
        break;
      case 'delete':
        this.confirmDeleteUser(event.item.userId);
        break;
      case 'active':
        this.confirmActiveUser(event.item.userId);
        break;
      default:
        break;
    }
  }

  confirmDeleteUser(userId: any) {
    this.userId = userId;
    this.type = 'delete';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmDel,
      type: this.dialogModel.type.confirm
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }
  
  confirmActiveUser(userId: any) {
    this.userId = userId;
    this.type = 'active';
    this.dialogDetails =  {
      title: this.dialogModel.title.confirm,
      msg: this.dialogModel.message.confirmActive,
      type: this.dialogModel.type.save
    };
    (<HTMLInputElement>document.getElementById('dialogBtn')).click();
  }

  manageUserById() {
    if(this.type === 'delete') {
      this.userService.deleteUser({userId: this.userId}).subscribe((res: any) => { this.getResultFromManage(res) });
    } else {
      this.userService.activeUser({userId: this.userId}).subscribe((res: any) => { this.getResultFromManage(res) });
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
      this.getUsers();
    }
  }

}
