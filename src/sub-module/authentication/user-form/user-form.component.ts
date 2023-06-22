import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/shared/alert/alert.model';
import { globalConstant } from 'src/shared/globalConstant';
import { UserService } from '../service/user.service';
import { ShareService } from 'src/shared/service/share.service';
import RandExp from 'randexp';
import { OwnerSearch } from '../model/owner-search.model';
import { OwnerService } from '../service/owner.service';
import { RoleService } from '../service/role.service';
import { RoleSearch } from '../model/role-search.model';
import { ActivatedRoute } from '@angular/router';
import { SecureService } from 'src/shared/service/secure.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {

  userForm: FormGroup = new FormGroup({
    userId: new FormControl(null),
    userCode: new FormControl(null, Validators.pattern(globalConstant.userCodePattern)),
    firstName: new FormControl(null, [
      Validators.required,
      Validators.maxLength(100)
    ]),
    lastName: new FormControl(null, [
      Validators.required,
      Validators.maxLength(100)
    ]),
    username: new FormControl(null),
    password: new FormControl(null, Validators.required),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(globalConstant.emailPattern),
      Validators.maxLength(50)
    ]),
    phoneNo: new FormControl(null, Validators.pattern(globalConstant.phoneNoPattern)),
    dob: new FormControl(null, Validators.pattern(globalConstant.datePattern)),
    profileImage: new FormControl(null),
    imageExtension: new FormControl(null),
    ownerId: new FormControl(null, [
      Validators.required,
      Validators.maxLength(15)
    ]),
    ownerName: new FormControl(null, Validators.maxLength(100)),
    roles: new FormArray([], Validators.required),
  });
  submitted = false;
  alertDetails = this.alertModel.alertDetail;
  imageSrc: any;
  exampleImageProfile = globalConstant.exampleImageProfile;
  ownerSearchModel = new OwnerSearch;
  owners = new Array();
  roleSearchModel = new RoleSearch;
  roles = new Array();
  rolesClear = new Array();
  userId: any = null;
  userDetails: any = {};
  userProfile: any = {};

  constructor(
    private alertModel: Alert,
    private userService: UserService,
    private shareService: ShareService,
    private ownerService: OwnerService,
    private roleService: RoleService,
    private activedRoute: ActivatedRoute,
    private secureService: SecureService
  ) {}

  ngOnInit() {
    this.userProfile = this.userService.userProfileFromLocal;
    this.getOwner();
    this.getRole();
    if(this.activedRoute.snapshot.paramMap.get('userId')) {
      this.userId = this.secureService.decrypt(this.activedRoute.snapshot.paramMap.get('userId'));
      this.getUserById();
    }
  }

  getOwner() {
    this.ownerSearchModel.api.itemPerPage = 100;
    this.ownerService.getOwners(this.ownerSearchModel.api).subscribe((res: any) => {
      this.owners = res.result.items;
    });
  }

  getRole() {
    this.roleSearchModel.api.itemPerPage = 100;
    this.roleService.getRoles(this.roleSearchModel.api).subscribe((res: any) => {
      this.roles = res.result.items;
    });
  }

  getUserById() {
    this.userService.getUserById({userId: this.userId}).subscribe((res: any) => {
      if(res.statusCode !== 200) {
        this.alertDetails =  {
          msg: res.statusDesc,
          type: this.alertModel.type.error
        };
        (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
      } else {
        this.userDetails = res.result;
        this.userForm.patchValue({
          userId: res.result.userId,
          userCode: res.result.userCode,
          phoneNo: res.result.phoneNo,
          dob: res.result.dob,
          profileImage: res.result.profileImage,
          firstName: res.result.firstName,
          lastName: res.result.lastName,
          email: res.result.email,
          ownerId: res.result.owner[0].ownerId,
          ownerName: res.result.owner[0].ownerName,
          password: 'password'
        });
        for(const item of res.result.role) {
          this.onCheckRolesUpdate(item.roleId);
        }
      }
    });
  }

  onCheckRolesUpdate(id: number) {
    const formArray: FormArray = this.userForm.get('roles') as FormArray;
    formArray.push(new FormControl(id));
    this.rolesClear.push('role'+id);
    (<HTMLInputElement>document.getElementById('role'+id)).checked = true;
  }

  onCheckRoles(event: any, id: string) {
    const formArray: FormArray = this.userForm.get('roles') as FormArray;
    // selected
    if(event.target.checked) {
      formArray.push(new FormControl(parseInt(event.target.value)));
      this.rolesClear.push(id);
    } else { // unselected
      // find the unselected element
      let i: number = 0;
      formArray.controls.forEach((ctrl: any) => {
        if(ctrl.value === parseInt(event.target.value)) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          this.rolesClear.splice(i, 1);
          return;
        }
        i++;
      });
    }
  }

  getImage(id: any) {
    this.shareService.getImage(id);
  }

  readImageURL(event: any) {
    this.shareService.readImageURL(event);
    setTimeout(() => {
      this.imageSrc = this.shareService.imageSrc;
      this.userForm.patchValue({
        imageExtension: this.shareService.imageExtension,
        profileImage: this.shareService.image
      });
      this.alertDetails = this.shareService.alertDetails;
    }, 300);
  }

  get fUser(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  generatePassword() {
    this.userForm.patchValue({
      password: new RandExp(globalConstant.generatePasswordPattern).gen()
    });
  }

  saveUser() {
    this.submitted = true;
    // user is not system admin
    if(this.userProfile.role[0].roleId !== 4) {
      this.userForm.patchValue({
        ownerId: this.userProfile.owner[0].ownerId
      });
    }
    if(!this.userForm.invalid) {
      if(!this.userId) {
        this.userForm.patchValue({
          username: this.userForm.value.email.split('@')[0]
        });
        this.userService.createUser(this.userForm.value).subscribe((res: any) => {
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
            this.shareService.imageSrc = null;
            this.shareService.imageExtension = null;
            this.shareService.image = null;
            this.userForm.reset();
            this.clearFormArray();
            this.clearCheckbox();
            this.submitted = false;
          }
        });
      } else {
        this.userService.updateUserById(this.userForm.value).subscribe((res: any) => {
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
    const formArray: FormArray = this.userForm.get('roles') as FormArray;
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  clearCheckbox() {
    for(const item of this.rolesClear) {
      (<HTMLInputElement>document.getElementById(item)).checked = false;
    }
    this.rolesClear = new Array();
  }

}
