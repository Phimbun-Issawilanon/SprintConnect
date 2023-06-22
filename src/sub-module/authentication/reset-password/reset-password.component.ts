import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Alert } from 'src/shared/alert/alert.model';
import { globalConstant } from 'src/shared/globalConstant';
import { Router } from '@angular/router';
import { SecureService } from 'src/shared/service/secure.service';
import { ShareService } from 'src/shared/service/share.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  sendEmailForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(globalConstant.emailPattern),
      Validators.maxLength(50)
    ]),
  });
  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(globalConstant.emailPattern),
      Validators.maxLength(50)
    ]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(globalConstant.passwordPattern)
    ]),
  });
  submittedSendEmail = false;
  submittedResetPassword = false;
  alertDetails = this.alertModel.alertDetail;
  pageType: string = '';
  passwordPattern = this.alertModel.message.passwordPattern;
  eyeToggleNew = 'fa-solid fa-eye';
  paramDecrypt: any;
  imgForgotPassword: any;
  exampleImage = globalConstant.exampleImage;

  constructor(
    private authService: AuthService,
    private alertModel: Alert,
    private router: Router,
    private secureService: SecureService,
    private shareService: ShareService
  ) {}

  ngOnInit() {
    if(this.router.url.includes('param=')) {
      let param = this.router.url.split('param=');
      this.pageType = 'resetPassword';
      this.paramDecrypt = this.secureService.decrypt(param[1]);
      this.resetPasswordForm.patchValue({
        email: this.paramDecrypt.Email
      });
    } else {
      this.pageType = 'sendEmail';
    }
    this.getForgotPasswordImg();
  }

  getForgotPasswordImg() {
    this.shareService.displayFile({ imageLocation: 'ForgotPassword' }).subscribe((res: any) => {
      if(res.statusCode === 200) {
        this.imgForgotPassword = res.result.url;
      }
    });
  }

  get fSendEmail(): { [key: string]: AbstractControl } {
    return this.sendEmailForm.controls;
  }

  sendEmailToSMTP() {
    this.submittedSendEmail = true;
    if(!this.sendEmailForm.invalid) {
      this.authService.sendEmailToSMTP(this.sendEmailForm.value).subscribe((res: any) => {
        if(res.statusCode !== 200) {
          this.alertDetails =  {
            msg: res.statusDesc,
            type: this.alertModel.type.error
          };
          (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
        } else {
          this.alertDetails =  {
            msg: `${res.statusDesc}. ${this.alertModel.message.resetPasswordPage.checkEmail}`,
            type: this.alertModel.type.success
          };
          (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
          this.sendEmailForm.reset();
          this.submittedSendEmail = false;
        }
      });
    }
  }

  getEyeClass(id: string) {
    if((<HTMLInputElement>document.getElementById(id)).type === 'password') {
      (<HTMLInputElement>document.getElementById(id)).type = 'text';
      (id === 'newPassword' ? this.eyeToggleNew = 'fa-solid fa-eye-slash' : null);
    } else {
      (<HTMLInputElement>document.getElementById(id)).type = 'password';
      (id === 'newPassword' ? this.eyeToggleNew = 'fa-solid fa-eye' : null);
    }
  }

  get fResetPassword(): { [key: string]: AbstractControl } {
    return this.resetPasswordForm.controls;
  }

  resetPassword() {
    this.submittedResetPassword = true;
    if(!this.resetPasswordForm.invalid) {
      this.authService.resetPassword(this.resetPasswordForm.value).subscribe((res: any) => {
        if(res.statusCode !== 200) {
          this.alertDetails =  {
            msg: res.statusDesc,
            type: this.alertModel.type.error
          };
          (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
        } else {
          this.alertDetails =  {
            msg: `${res.statusDesc}.`,
            type: this.alertModel.type.success
          };
          (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
          this.resetPasswordForm.reset();
          this.submittedResetPassword = false;
          window.location.href = '/auth/login';
        }
      });
    }
  }

}
