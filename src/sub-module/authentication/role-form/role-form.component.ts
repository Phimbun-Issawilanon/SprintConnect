import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/shared/alert/alert.model';
import { RoleService } from '../service/role.service';
import { RoleSearch } from '../model/role-search.model';
import { ActivatedRoute } from '@angular/router';
import { SecureService } from 'src/shared/service/secure.service';
// menu
import menu from '../../../shared/menu.json';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent {

  menu = menu.menu;
  roleForm: FormGroup = new FormGroup({
    roleId: new FormControl(null),
    roleName: new FormControl(null, Validators.required),
    permissionRule: new FormArray([], Validators.required),
  });
  submitted = false;
  alertDetails = this.alertModel.alertDetail;
  roleSearchModel = new RoleSearch;
  owners = new Array();
  roles = new Array();
  permissionClear = new Array();
  roleId: any = null;
  roleDetails: any;
  userProfile = this.userService.userProfileFromLocal;

  constructor(
    private alertModel: Alert,
    private roleService: RoleService,
    private activedRoute: ActivatedRoute,
    private secureService: SecureService,
    private userService: UserService
  ) {}

  ngOnInit() {
    if(this.activedRoute.snapshot.paramMap.get('roleId')) {
      this.roleId = this.secureService.decrypt(this.activedRoute.snapshot.paramMap.get('roleId'));
      this.getRoleById();
    }
    console.log(this.userProfile.role[0].roleId);
  }

  getRoleById() {
    this.roleService.getRoleById({roleId: this.roleId}).subscribe((res: any) => {
      if(res.statusCode !== 200) {
        this.alertDetails =  {
          msg: res.statusDesc,
          type: this.alertModel.type.error
        };
        (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
      } else {
        this.roleDetails = res.result;
        this.roleForm.patchValue({
          roleId: res.result.roleId,
          roleName: res.result.roleName
        });
        for(const item of res.result.permissions[0].permissionModule) {
          this.onCheckPermissionsUpdate(item);
        }
      }
    });
  }

  getPermissionOfModeuleDisplay(menuId: any) {
    return (this.userProfile.owner[0].license[0].licenseModule.includes(menuId.toString()) ? true : false);
  }

  onCheckPermissionsUpdate(id: string) {
    const formArray: FormArray = this.roleForm.get('permissionRule') as FormArray;
    formArray.push(new FormControl(id));
    let checkSplit = id.split('-');
    if(parseInt(checkSplit[1]) === 0) {
      (<HTMLInputElement>document.getElementById(`permission${checkSplit[0]}`)).checked = true;
    } else {
      (<HTMLInputElement>document.getElementById(`permission${checkSplit[0]}`)).checked = true;
      (<HTMLInputElement>document.getElementById(`permission${checkSplit[0]}-${checkSplit[1]}`)).checked = true;
      for(const item of checkSplit[2]) {
        (<HTMLInputElement>document.getElementById(`permission${checkSplit[0]}-${checkSplit[1]}-${item}`)).checked = true;
      }
    }
  }

  onCheckPermissions(event: any, type: any, id: any) {
    const formArray: FormArray = this.roleForm.get('permissionRule') as FormArray;
    // checked menu or sub menu
    if(type === 'menu') {
      let emptySubMenu = true;
      if(event.target.checked) {
        // in case have nothing before
        for(const i of this.menu) {
          if(id === i.menuId && i.subMenu) { // in case checked menu -> make all sub menu can read
            for(const j of i.subMenu) {
              let checkInsert = false;
              // check if already check on CUD
              for(const item of this.roleForm.value.permissionRule) {
                if(item.includes(`${i.menuId}-${j.subMenuId}-`)) {
                  checkInsert = true;
                  break;
                }
              }
              if(!checkInsert) {
                // push to form
                formArray.push(new FormControl(`${i.menuId}-${j.subMenuId}-R`));
                // push for clear
                this.permissionClear.push(`permission${i.menuId}-${j.subMenuId}`);
                // checked html
                (<HTMLInputElement>document.getElementById(`permission${i.menuId}-${j.subMenuId}`)).checked = true;
                (<HTMLInputElement>document.getElementById(`permission${i.menuId}-${j.subMenuId}-R`)).checked = true;
                emptySubMenu = false;
              }
            }
            break;
          }
        }
        if(emptySubMenu) { // in case checked menu without sub menu
          // push to form
          formArray.push(new FormControl(`${id}-0-R`));
          // push for clear
          this.permissionClear.push(`permission${id}`);
          // checked html
          (<HTMLInputElement>document.getElementById(`permission${id}`)).checked = true;
        }
      } else { // unselected
        // find the unselected element
        let subMenu = new Array();
        for(const i of this.menu) {
          if(id === i.menuId && i.subMenu) {
            subMenu = i.subMenu;
            break;
          }
        }
        if(subMenu.length > 0) { // in case unchecked all sub menu can read
          for(let index = 0; index < formArray.controls.length;) {
            for(const sub of subMenu) {
              if(
                this.roleForm.value.permissionRule[index].includes(`${id}-${sub.subMenuId}-C`) ||
                this.roleForm.value.permissionRule[index].includes(`${id}-${sub.subMenuId}-CR`) ||
                this.roleForm.value.permissionRule[index].includes(`${id}-${sub.subMenuId}-CU`) ||
                this.roleForm.value.permissionRule[index].includes(`${id}-${sub.subMenuId}-CD`) ||
                this.roleForm.value.permissionRule[index].includes(`${id}-${sub.subMenuId}-CRU`) ||
                this.roleForm.value.permissionRule[index].includes(`${id}-${sub.subMenuId}-CRD`) ||
                this.roleForm.value.permissionRule[index].includes(`${id}-${sub.subMenuId}-CUD`) ||
                this.roleForm.value.permissionRule[index].includes(`${id}-${sub.subMenuId}-CRUD`) ||
                this.roleForm.value.permissionRule[index].includes(`${id}-${sub.subMenuId}-R`) ||
                this.roleForm.value.permissionRule[index].includes(`${id}-${sub.subMenuId}-RU`) ||
                this.roleForm.value.permissionRule[index].includes(`${id}-${sub.subMenuId}-RD`) ||
                this.roleForm.value.permissionRule[index].includes(`${id}-${sub.subMenuId}-RUD`) ||
                this.roleForm.value.permissionRule[index].includes(`${id}-${sub.subMenuId}-U`) ||
                this.roleForm.value.permissionRule[index].includes(`${id}-${sub.subMenuId}-UD`) ||
                this.roleForm.value.permissionRule[index].includes(`${id}-${sub.subMenuId}-D`)
              ) {
                // Remove the unselected element from the arrayForm
                formArray.removeAt(index);
                this.permissionClear.splice(index, 1);
                (<HTMLInputElement>document.getElementById(`permission${id}-${sub.subMenuId}`)).checked = false;
                (<HTMLInputElement>document.getElementById(`permission${id}-${sub.subMenuId}-C`)).checked = false;
                (<HTMLInputElement>document.getElementById(`permission${id}-${sub.subMenuId}-R`)).checked = false;
                (<HTMLInputElement>document.getElementById(`permission${id}-${sub.subMenuId}-U`)).checked = false;
                (<HTMLInputElement>document.getElementById(`permission${id}-${sub.subMenuId}-D`)).checked = false;
              }
            }
            index++;
          }
        } else { // in case unchecked for have no sub menu
          // Remove the unselected element from the arrayForm
          for(let index = 0; index < formArray.controls.length; index++) {
            if(this.roleForm.value.permissionRule[index].includes(`${id}-0`)) {
              formArray.removeAt(index);
              this.permissionClear.splice(index, 1);
              (<HTMLInputElement>document.getElementById(`permission${id}`)).checked = false;
              break;
            }
          }
        }
      }
    } else if(type === 'subMenu' || type === 'R') {
      if(event.target.checked) {
        formArray.push(new FormControl(`${id}-R`));
        this.permissionClear.push(`permission${id}`);
        (<HTMLInputElement>document.getElementById(`permission${id}`)).checked = true;
        (<HTMLInputElement>document.getElementById(`permission${id}-R`)).checked = true;
      } else { // unselected
        // find the unselected element
        let i: number = 0;
        formArray.controls.forEach((ctrl: any) => {
          if(ctrl.value.includes(id)) {
            // Remove the unselected element from the arrayForm
            formArray.removeAt(i);
            this.permissionClear.splice(i, 1);
            (<HTMLInputElement>document.getElementById(`permission${id}`)).checked = false;
            (<HTMLInputElement>document.getElementById(`permission${id}-C`)).checked = false;
            (<HTMLInputElement>document.getElementById(`permission${id}-R`)).checked = false;
            (<HTMLInputElement>document.getElementById(`permission${id}-U`)).checked = false;
            (<HTMLInputElement>document.getElementById(`permission${id}-D`)).checked = false;
            return;
          }
          i++;
        });
      }
    } else if(type === 'C' || type === 'U' || type === 'D') {
      let checkItem: any;
      let itemOnList: any;
      let indexInsert: any;
      let method: any;
      for(const [index, item] of this.roleForm.value.permissionRule.entries()) {
        checkItem = false;
        if(item.includes(`${id}-`)) {
          checkItem = true;
          itemOnList = item;
          indexInsert = index;
          break;
        }
      }
      if(itemOnList) {
        method = itemOnList.split('-')[2];
      }
      if(event.target.checked) {
        // not found any thing
        if(!checkItem) { // add new CR to form array
          if(type === 'C') {
            formArray.push(new FormControl(`${id}-CR`));
            this.permissionClear.push(`permission${id}`);
            (<HTMLInputElement>document.getElementById(`permission${id}`)).checked = true;
            (<HTMLInputElement>document.getElementById(`permission${id}-C`)).checked = true;
            (<HTMLInputElement>document.getElementById(`permission${id}-R`)).checked = true;
          } else if(type === 'U') {
            formArray.push(new FormControl(`${id}-RU`));
            this.permissionClear.push(`permission${id}`);
            (<HTMLInputElement>document.getElementById(`permission${id}`)).checked = true;
            (<HTMLInputElement>document.getElementById(`permission${id}-R`)).checked = true;
            (<HTMLInputElement>document.getElementById(`permission${id}-U`)).checked = true;
          } else if(type === 'D') {
            formArray.push(new FormControl(`${id}-RD`));
            this.permissionClear.push(`permission${id}`);
            (<HTMLInputElement>document.getElementById(`permission${id}`)).checked = true;
            (<HTMLInputElement>document.getElementById(`permission${id}-R`)).checked = true;
            (<HTMLInputElement>document.getElementById(`permission${id}-D`)).checked = true;
          }
        } else { // add new C to form array
          if(type === 'C') {
            (<FormArray>this.roleForm.controls['permissionRule']).at(indexInsert).patchValue(`${id}-C${method}`);
          } else if(type === 'U') {
            if(method === 'R' || method === 'CR') {
              (<FormArray>this.roleForm.controls['permissionRule']).at(indexInsert).patchValue(`${id}-${method}U`);
            } else {
              let methodRidD = method.split('D')[0];
              (<FormArray>this.roleForm.controls['permissionRule']).at(indexInsert).patchValue(`${id}-${methodRidD}UD`);
            }
          } else if(type === 'D') {
            (<FormArray>this.roleForm.controls['permissionRule']).at(indexInsert).patchValue(`${id}-${method}D`);
          }
        }
      } else {
        // Remove the unselected element from the arrayForm
        if(type === 'C') {
          let newMethod = method.split('C')[1];
          (<FormArray>this.roleForm.controls['permissionRule']).at(indexInsert).patchValue(`${id}-${newMethod}`);
        } else if(type === 'U') {
          let newMethod = `${method.split('U')[0]}${method.split('U')[1]}`;
          (<FormArray>this.roleForm.controls['permissionRule']).at(indexInsert).patchValue(`${id}-${newMethod}`);
        } else if(type === 'D') {
          let newMethod = method.split('D')[0];
          (<FormArray>this.roleForm.controls['permissionRule']).at(indexInsert).patchValue(`${id}-${newMethod}`);
        }
      }
    }
    let menuId: any;
    if(type === 'subMenu' || type === 'R' || type === 'C' || type === 'U' || type === 'D') {
      menuId = parseInt(id.split('-')[0]);
      if(event.target.checked) {
        // in case checked all sub menu
        let subMenu = new Array();
        for(const i of this.menu) {
          if(menuId === i.menuId && i.subMenu) {
            subMenu = i.subMenu;
            break;
          }
        }
        // checked menu after sub menu full
        let numChecked = 0;
        for(const item of this.roleForm.value.permissionRule) {
          for(const sub of subMenu) {
            if(item.includes(`${menuId}-${sub.subMenuId}`)) {
              numChecked++;
              break;
            }
          }
        }
        if(numChecked === subMenu.length) {
          (<HTMLInputElement>document.getElementById(`permission${menuId}`)).checked = true;
        }
      } else {
        // in case unchecked all sub menu
        let checkMenuId: any;
        for(const item of this.roleForm.value.permissionRule) {
          checkMenuId = false;
          if(item.includes(`${id}-`)) {
            checkMenuId = true;
            break;
          }
        }
        // unchecked menu after sub menu gone
        if(!checkMenuId) {
          (<HTMLInputElement>document.getElementById(`permission${menuId}`)).checked = false;
        }
      }
    }
    this.sortPermissionRule();
  }

  get fRole(): { [key: string]: AbstractControl } {
    return this.roleForm.controls;
  }

  sortPermissionRule() {
    let sortArr = this.roleForm.value.permissionRule;
    this.roleForm.patchValue({
      permissionRule: sortArr.sort()
    });
    this.permissionClear = this.permissionClear.sort();
  }

  saveRole() {
    this.submitted = true;
    if(!this.roleForm.invalid) {
      if(!this.roleId) {
        this.roleService.createRole(this.roleForm.value).subscribe((res: any) => {
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
            this.roleForm.reset();
            this.clearFormArray();
            this.clearCheckbox();
            this.submitted = false;
          }
        });
      } else {
        this.roleService.updateRole(this.roleForm.value).subscribe((res: any) => {
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
            this.submitted = false;
          }
        });
      }
    }
  }

  clearFormArray() {
    const formArray: FormArray = this.roleForm.get('permissionRule') as FormArray;
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  clearCheckbox() {
    for(const item of this.permissionClear) {
      (<HTMLInputElement>document.getElementById(`${item.split('-')[0]}`)).checked = false;
      if(item.split('-').length > 1) {
        (<HTMLInputElement>document.getElementById(item)).checked = false;
        (<HTMLInputElement>document.getElementById(`${item}-C`)).checked = false;
        (<HTMLInputElement>document.getElementById(`${item}-R`)).checked = false;
        (<HTMLInputElement>document.getElementById(`${item}-U`)).checked = false;
        (<HTMLInputElement>document.getElementById(`${item}-D`)).checked = false;
      }
    }
    this.permissionClear = new Array();
  }

}
