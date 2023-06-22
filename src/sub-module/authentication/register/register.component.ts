import { Component } from '@angular/core';
import { SocialAuthService, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import jwt_decode from 'jwt-decode';
import { globalConstant } from 'src/shared/globalConstant';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Alert } from 'src/shared/alert/alert.model';
import { SecureService } from 'src/shared/service/secure.service';
import { ShareService } from 'src/shared/service/share.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  eyeToggle = 'fa-solid fa-eye';
  eyeToggleCon = 'fa-solid fa-eye';
  registerForm: FormGroup = new FormGroup({
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
      Validators.email,
      Validators.pattern(globalConstant.emailPattern),
      Validators.maxLength(50)
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(globalConstant.passwordPattern)
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(globalConstant.passwordPattern)
    ])
  });
  submitted = false;
  alertDetails = this.alertModel.alertDetail;
  passwordPattern: string = this.alertModel.message.passwordPattern;
  imgRegister: any;
  exampleImage = globalConstant.exampleImage;
  
  constructor(
    private socialAuthService: SocialAuthService,
    private authService: AuthService,
    private alertModel: Alert,
    private secureService: SecureService,
    private shareService: ShareService
  ) {}

  ngOnInit() {
    // check token
    if(localStorage.getItem('token') && localStorage.getItem('refreshToken') && localStorage.getItem('userProfile')) {
      window.location.href = '/home';
    }
    this.getRegisterImg();
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: globalConstant.googleClientId,
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,
    });
    // @ts-ignore
    google.accounts.id.renderButton(
      document.getElementById('googleBtn'), {
        theme: 'outline',
        type: 'icon',
        size: 'large',
      }
    );
  }

  getRegisterImg() {
    this.shareService.displayFile({ imageLocation: 'Register' }).subscribe((res: any) => {
      if(res.statusCode === 200) {
        this.imgRegister = res.result.url;
      }
    });
  }

  async handleCredentialResponse(response: any) {
    const responsePayload = this.decodeJwtResponse(response.credential);
    this.authService.prepareExternalRegister(responsePayload, 'GOOGLE');
    this.alertDetails = this.authService.alertDetails;
  }

  decodeJwtResponse(token: string): string {
    return jwt_decode(token);
  }

  getEyeClass(id: string) {
    if((<HTMLInputElement>document.getElementById(id)).type === 'password') {
      (<HTMLInputElement>document.getElementById(id)).type = 'text';
      (id === 'password' ? this.eyeToggle = 'fa-solid fa-eye-slash' : this.eyeToggleCon = 'fa-solid fa-eye-slash');
    } else {
      (<HTMLInputElement>document.getElementById(id)).type = 'password';
      (id === 'confirmPassword' ? this.eyeToggleCon = 'fa-solid fa-eye' : this.eyeToggle = 'fa-solid fa-eye');
    }
  }

  facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((res) => {
      this.authService.prepareExternalRegister(res, 'FACEBOOK');
      this.alertDetails = this.authService.alertDetails;
    });
  }

  get fRegister(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  register() {
    this.submitted = true;
    if(!this.registerForm.invalid) {
      this.authService.internalRegister(this.registerForm.value).subscribe((res: any) => {
        if(res.statusCode !== 200) {
          this.alertDetails =  {
            msg: res.statusDesc,
            type: this.alertModel.type.error
          };
          (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
        } else {
          localStorage.setItem('token', this.secureService.encrypt(res.result.tokenAccess));
          localStorage.setItem('refreshToken', this.secureService.encrypt(res.result.refreshToken));
          localStorage.setItem('userProfile', this.secureService.encrypt(res.result));
          window.location.href = '/home';
        }
      });
    }
  }

}
