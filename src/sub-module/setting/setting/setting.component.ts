import { Component } from '@angular/core';
import { Alert } from 'src/shared/alert/alert.model';
import { globalConstant } from 'src/shared/globalConstant';
import { ShareService } from 'src/shared/service/share.service';
import { UploadFile } from 'src/shared/model/upload-file.model';

// menu
import menu from '../../../shared/menu.json';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent {

  menu = menu.menu;
  submitted = false;
  alertDetails = this.alertModel.alertDetail;
  allImage = ['Logo', 'Login', 'Register', 'ForgotPassword']
  imageLogo: any = {
    imageSrcLogo: null,
    imageExtLogo: null,
    imageBase64Logo: null
  };
  imageLogin: any = {
    imageSrcLogin: null,
    imageExtLogin: null,
    imageBase64Login: null
  };
  imageRegister: any = {
    imageSrcRegister: null,
    imageExtRegister: null,
    imageBase64Register: null
  };
  imageForgotPassword: any = {
    imageSrcForgotPassword: null,
    imageExtForgotPassword: null,
    imageBase64ForgotPassword: null
  };
  idUpload: any;
  exampleImageProfile = globalConstant.exampleImageProfile;
  exampleImage = globalConstant.exampleImage;
  owners = new Array();
  roles = new Array();
  rolesClear = new Array();
  userId: any = null;
  userProfile: any = {};

  constructor(
    private alertModel: Alert,
    private shareService: ShareService,
    private uploadFileModel: UploadFile
  ) {}

  ngOnInit() {
    this.getAllImage();
  }

  getAllImage() {
    for(const item of this.allImage) {
      this.shareService.displayFile({ imageLocation: item }).subscribe((res: any) => {
        if(res.statusCode === 200) {
          if(item === 'Logo') {
            this.imageLogo.imageSrcLogo = res.result.url;
            this.shareService.getLogoImage(res.result.url);
          } else if(item === 'Login') {
            this.imageLogin.imageSrcLogin = res.result.url;
          } else if(item === 'Register') {
            this.imageRegister.imageSrcRegister = res.result.url;
          } else if(item === 'ForgotPassword') {
            this.imageForgotPassword.imageSrcForgotPassword = res.result.url;
          }
        }
      });
    }    
  }

  getImage(id: any) {
    this.shareService.getImage(id);
    this.idUpload = id;
  }

  readImageURL(event: any) {
    this.shareService.readImageURL(event);
    setTimeout(() => {
      if(this.idUpload === 'inputLogoImage') {
        this.imageLogo.imageSrcLogo = (
          this.imageLogo.imageSrcLogo && !this.shareService.imageSrc ? this.imageLogo.imageSrcLogo : this.shareService.imageSrc
        );
        this.imageLogo.imageExtLogo = this.shareService.imageExtension;
        this.imageLogo.imageBase64Logo = this.shareService.image;
      } else if(this.idUpload === 'inputLoginImage') {
        this.imageLogin.imageSrcLogin = (
          this.imageLogin.imageSrcLogin && !this.shareService.imageSrc ? this.imageLogin.imageSrcLogin : this.shareService.imageSrc
        );
        this.imageLogin.imageExtLogin = this.shareService.imageExtension;
        this.imageLogin.imageBase64Login = this.shareService.image;
      } else if(this.idUpload === 'inputRegisterImage') {
        this.imageRegister.imageSrcRegister = (
          this.imageRegister.imageSrcRegister && !this.shareService.imageSrc ? this.imageRegister.imageSrcRegister : this.shareService.imageSrc
        );
        this.imageRegister.imageExtRegister = this.shareService.imageExtension;
        this.imageRegister.imageBase64Register = this.shareService.image;
      } else if(this.idUpload === 'inputForgotPasswordImage') {
        this.imageForgotPassword.imageSrcForgotPassword = (
          this.imageForgotPassword.imageSrcForgotPassword && !this.shareService.imageSrc ? this.imageForgotPassword.imageSrcForgotPassword : this.shareService.imageSrc
        );
        this.imageForgotPassword.imageExtForgotPassword = this.shareService.imageExtension;
        this.imageForgotPassword.imageBase64ForgotPassword = this.shareService.image;
      }
      this.alertDetails = this.shareService.alertDetails;
    }, 300);
  }

  uploadImage(type: any) {
    let body: any = this.uploadFileModel;
    if(type === 'logo') {
      body.imageFile = this.imageLogo.imageBase64Logo;
      body.imageExtension = this.imageLogo.imageExtLogo;
      body.imageLocation = 'Logo';
    } else if(type === 'login') {
      body.imageFile = this.imageLogin.imageBase64Login;
      body.imageExtension = this.imageLogin.imageExtLogin;
      body.imageLocation = 'Login';
    } else if(type === 'register') {
      body.imageFile = this.imageRegister.imageBase64Register;
      body.imageExtension = this.imageRegister.imageExtRegister;
      body.imageLocation = 'Register';
    } else if(type === 'forgotPassword') {
      body.imageFile = this.imageForgotPassword.imageBase64ForgotPassword;
      body.imageExtension = this.imageForgotPassword.imageExtForgotPassword;
      body.imageLocation = 'ForgotPassword';
    }
    this.shareService.uploadFile(body).subscribe((res: any) => {
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
      }
    });
  }

}
