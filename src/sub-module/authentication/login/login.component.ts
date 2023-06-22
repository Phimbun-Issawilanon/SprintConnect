import { Component } from '@angular/core';
import { SocialAuthService, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { globalConstant } from 'src/shared/globalConstant';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Alert } from 'src/shared/alert/alert.model';
import { AuthService } from '../service/auth.service';
import { SecureService } from 'src/shared/service/secure.service';
import { ShareService } from 'src/shared/service/share.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  eyeToggle = 'fa-solid fa-eye';
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    remember: new FormControl(false),
  });
  submitted = false;
  alertDetails = this.alertModel.alertDetail;
  imgLogin: any;
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
    this.getLoginImg();
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

  getLoginImg() {
    this.shareService.displayFile({ imageLocation: 'Login' }).subscribe((res: any) => {
      if(res.statusCode === 200) {
        this.imgLogin = res.result.url;
      }
    });
  }

  // google info
  async handleCredentialResponse(response: any) {
    const responsePayload: any = this.secureService.decodeJwtResponse(response.credential);
    this.authService.prepareExternalRegister(responsePayload, 'GOOGLE');
    this.alertDetails = this.authService.alertDetails;
    (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
  }

  getEyeClass(id: string) {
    if((<HTMLInputElement>document.getElementById(id)).type === 'password') {
      (<HTMLInputElement>document.getElementById(id)).type = 'text';
      this.eyeToggle = 'fa-solid fa-eye-slash';
    } else {
      (<HTMLInputElement>document.getElementById(id)).type = 'password';
      this.eyeToggle = 'fa-solid fa-eye';
    }
  }

  // facebook info
  facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((res) => {
      this.authService.prepareExternalRegister(res, 'FACEBOOK');
      this.alertDetails = this.authService.alertDetails;
      (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
    });
  }

  get fLogin(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    if(!this.loginForm.invalid) {
      this.authService.login(this.loginForm.value).subscribe((res: any) => {
        if(res.statusCode !== 200) {
          this.alertDetails =  {
            msg: res.statusDesc,
            type: this.alertModel.type.error
          };
          (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
        } else {
          localStorage.setItem('token', this.secureService.encrypt(res.userViewModel.tokenAccess));
          localStorage.setItem('refreshToken', this.secureService.encrypt(res.userViewModel.refreshToken));
          localStorage.setItem('userProfile', this.secureService.encrypt(res.userViewModel));
          window.location.href = '/home';
        }
      });
    }
  }

}

