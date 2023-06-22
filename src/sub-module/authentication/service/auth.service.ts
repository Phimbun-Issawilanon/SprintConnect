import { Injectable } from '@angular/core';
import { globalConstant } from 'src/shared/globalConstant';
import { HttpService } from 'src/shared/service/http.service';
import { Register } from '../model/register.model';
import { SecureService } from 'src/shared/service/secure.service';
import { Alert } from 'src/shared/alert/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = globalConstant.baseDevUrl.loginUrl + 'user';
  userUrl = globalConstant.baseDevUrl.authUrl + 'user';
  tokenUrl = globalConstant.baseDevUrl.authUrl + 'token';
  registerModel: Register = new Register;
  alertDetails = this.alertModel.alertDetail;

  constructor(
    private httpService: HttpService,
    private secureService: SecureService,
    private alertModel: Alert,
  ) {}

  login(body: any) {
    return this.httpService.post(`${this.loginUrl}/login`, body);
  }

  prepareExternalRegister(data: any, provider: any) {
    if(provider === 'FACEBOOK') {
      this.registerModel = {
        createBy: null,
        updateBy: null,
        deleteby: null,
        userId: null,
        username: data.email,
        password: null,
        provider: provider,
        phoneNo: null,
        dob: null,
        profileImage: data.photoUrl,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email
      }
    } else if(provider === 'GOOGLE') {
      this.registerModel = {
        createBy: null,
        updateBy: null,
        deleteby: null,
        userId: null,
        username: data.email,
        password: null,
        provider: provider,
        phoneNo: null,
        dob: null,
        profileImage: data.picture,
        firstName: data.given_name,
        lastName: data.family_name,
        email: data.email
      }
    }
    this.externalRegister(this.registerModel).subscribe((res: any) => {
      if(res.statusCode !== 200) {
        this.alertDetails = {
          msg: res.statusDesc,
          type: this.alertModel.type.error
        };
      } else {
        localStorage.setItem('token', this.secureService.encrypt(res.result.tokenAccess));
        localStorage.setItem('refreshToken', this.secureService.encrypt(res.result.refreshToken));
        localStorage.setItem('userProfile', this.secureService.encrypt(res.result));
        window.location.href = '/home';
      }
    });
  }

  externalRegister(body: any) {
    return this.httpService.post(`${this.userUrl}/externalRegister`, body);
  }

  internalRegister(body: any) {
    return this.httpService.post(`${this.userUrl}/internalRegister`, body);
  }

  sendEmailToSMTP(body: any) {
    return this.httpService.post(`${this.userUrl}/sentForgetPasswordToEmail`, body);
  }

  resetPassword(body: any) {
    return this.httpService.patch(`${this.userUrl}/resetPassword`, body);
  }
  
}
