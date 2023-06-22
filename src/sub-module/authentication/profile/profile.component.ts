import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/shared/alert/alert.model';
import { UserService } from '../service/user.service';
import { globalConstant } from 'src/shared/globalConstant';
import { ShareService } from 'src/shared/service/share.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  userProfile: any;
  userProfileForm: FormGroup = new FormGroup({
    userId: new FormControl(null),
    firstname: new FormControl(null, [
      Validators.required,
      Validators.maxLength(100)
    ]),
    lastname: new FormControl(null, [
      Validators.required,
      Validators.maxLength(100)
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.maxLength(50)
    ]),
    phoneNo: new FormControl(null, Validators.pattern(globalConstant.phoneNoPattern)),
    dob: new FormControl(null, Validators.pattern(globalConstant.datePattern)),
    profileImage: new FormControl(null),
    imageExtension: new FormControl(null),
    ownerId: new FormControl(null, Validators.maxLength(15)),
    roleIds: new FormControl([]),
  });
  changePasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, Validators.maxLength(50)),
    oldPassword: new FormControl(null, Validators.required),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(globalConstant.passwordPattern),
    ]),
    confirmNewPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(globalConstant.passwordPattern),
    ]),
  });
  imageSrc: any;
  exampleImageProfile = globalConstant.exampleImageProfile;
  submittedUserProfile = false;
  submittedChangePassword = false;
  alertDetails = this.alertModel.alertDetail;
  passwordPattern = this.alertModel.message.passwordPattern;
  eyeToggleOld = 'fa-solid fa-eye';
  eyeToggleNew = 'fa-solid fa-eye';
  eyeToggleCon = 'fa-solid fa-eye';

  constructor(
    private alertModel: Alert,
    private userService: UserService,
    private shareService: ShareService
  ) {}

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.userProfile = this.userService.userProfileFromLocal;
    this.userProfileForm.patchValue({
      userId: this.userProfile.userId,
      firstname: this.userProfile.firstName,
      lastname: this.userProfile.lastName,
      email: this.userProfile.email,
      phoneNo: this.userProfile.phoneNo,
      dob: this.userProfile.dob,
      ownerId: this.userProfile.owner[0].ownerId,
    });
    if(this.userProfile.role.length > 1) {
      for(const item of this.userProfile.role) {
        this.userProfileForm.value.roleIds.push(item.roleId);
      }      
    } else {
      this.userProfileForm.value.roleIds.push(this.userProfile.role[0].roleId);
    }
    this.changePasswordForm.patchValue({
      email: this.userProfile.email
    });
  }

  getImage(id: any) {
    this.shareService.getImage(id);
  }

  readImageURL(event: any) {
    this.shareService.readImageURL(event);
    setTimeout(() => {
      this.imageSrc = this.shareService.imageSrc;
      this.userProfileForm.patchValue({
        imageExtension: this.shareService.imageExtension,
        profileImage: this.shareService.image
      });
      this.alertDetails = this.shareService.alertDetails;
    }, 300);
  }

  get fUserProfile(): { [key: string]: AbstractControl } {
    return this.userProfileForm.controls;
  }

  getUserProfileFromApi() {
    this.userService.getUserProfile({userId: this.userProfile.userId}).subscribe((res: any) => {
      if(res.statusCode !== 200) {
        this.alertDetails =  {
          msg: res.statusDesc,
          type: this.alertModel.type.error
        };
        (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
      } else {
        this.userProfileForm.patchValue({
          firstname: res.result.firstName,
          lastname: res.result.lastName,
          email: res.result.email,
          phoneNo: res.result.phoneNo,
          dob: res.result.dob,
          profileImage: res.profileImage
        });
        this.userProfile.firstName = res.result.firstName;
        this.userProfile.lastName = res.result.lastName;
        this.userProfile.email = res.result.email;
        this.userProfile.phoneNo = res.result.phoneNo;
        this.userProfile.dob = res.result.dob;
        this.userProfile.profileImage = res.result.profileImage;
        this.userService.getUserProfileFromLocal(this.userProfile);
      }
      this.alertDetails =  {
        msg: res.statusDesc,
        type: this.alertModel.type.success
      };
      (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
    });
  }

  updateUserProfile() {
    this.submittedUserProfile = true;
    if(!this.userProfileForm.invalid) {
      this.userService.updateUserProfile(this.userProfileForm.value).subscribe((res: any) => {
        if(res.statusCode !== 200) {
          this.alertDetails =  {
            msg: res.statusDesc,
            type: this.alertModel.type.error
          };
          (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
        } else {
          this.getUserProfileFromApi();
          this.shareService.imageSrc = null;
          this.shareService.imageExtension = null;
          this.shareService.image = null;
        }
      });
    }
  }

  getEyeClass(id: string) {
    if((<HTMLInputElement>document.getElementById(id)).type === 'password') {
      (<HTMLInputElement>document.getElementById(id)).type = 'text';
      (id === 'oldPassword' ? this.eyeToggleOld = 'fa-solid fa-eye-slash' : null);
      (id === 'newPassword' ? this.eyeToggleNew = 'fa-solid fa-eye-slash' : null);
      (id === 'confirmNewPassword' ? this.eyeToggleCon = 'fa-solid fa-eye-slash' : null);
    } else {
      (<HTMLInputElement>document.getElementById(id)).type = 'password';
      (id === 'oldPassword' ? this.eyeToggleOld = 'fa-solid fa-eye' : null);
      (id === 'newPassword' ? this.eyeToggleNew = 'fa-solid fa-eye' : null);
      (id === 'confirmNewPassword' ? this.eyeToggleCon = 'fa-solid fa-eye' : null);
    }
  }

  get fChangePassword(): { [key: string]: AbstractControl } {
    return this.changePasswordForm.controls;
  }

  changePassword() {
    this.submittedChangePassword = true;
    // old password sam as new password
    if(this.changePasswordForm.value.oldPassword === this.changePasswordForm.value.newPassword) {
      this.alertDetails =  {
        msg: this.alertModel.message.profilePage.sameOldNewPassword,
        type: this.alertModel.type.error
      };
      (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
    } else if(this.changePasswordForm.value.newPassword !== this.changePasswordForm.value.confirmNewPassword) {
      // new password and confirm not the same
      this.alertDetails =  {
        msg: this.alertModel.message.profilePage.mustSamePassword,
        type: this.alertModel.type.error
      };
      (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
    } else if(!this.changePasswordForm.invalid) {
      this.userService.changePassword(this.changePasswordForm.value).subscribe((res: any) => {
        if(res.statusCode !== 200) {
          this.alertDetails =  {
            msg: res.statusDesc,
            type: this.alertModel.type.error
          };
          (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
        } else {
          this.changePasswordForm.reset();
          this.alertDetails =  {
            msg: `${res.statusDesc}. ${this.alertModel.message.profilePage.loginNewPassword}`,
            type: this.alertModel.type.success
          };
          (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
          this.submittedChangePassword = false;
        }
      });
    }
  }

}
