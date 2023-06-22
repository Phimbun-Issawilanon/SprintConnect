import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { globalConstant } from 'src/shared/globalConstant';
import { HttpService } from 'src/shared/service/http.service';
import { SecureService } from 'src/shared/service/secure.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = globalConstant.baseDevUrl.authUrl + 'user';
  userProfileUrl = globalConstant.baseDevUrl.authUrl + 'userProfile';
  userProfileFromLocal: any;
  userProfileFromLocalChange = new Subject();

  constructor(
    private httpService: HttpService,
    private secureService: SecureService
  ) {
    if(!this.userProfileFromLocal) {
      this.userProfileFromLocal = this.secureService.decrypt(localStorage.getItem('userProfile'));
    }
  }

  ngOnInit() {}

  getUserProfileFromLocal(body: any) {
    this.userProfileFromLocalChange.next(localStorage.setItem('userProfile', this.secureService.encrypt(body)));
  }

  getUserProfile(body: any) {
    return this.httpService.get(`${this.userProfileUrl}/getUserProfile?param=${this.secureService.encrypt(body)}`);
  }

  updateUserProfile(body: any) {
    return this.httpService.patch(`${this.userProfileUrl}/updateUserProfile`, body);
  }

  changePassword(body: any) {
    return this.httpService.patch(`${this.userUrl}/changePassword`, body);
  }

  getUsers(body: any) {
    return this.httpService.get(`${this.userUrl}/getUsers?param=${this.secureService.encrypt(body)}`);
  }

  createUser(body: any) {
    return this.httpService.post(`${this.userUrl}/createUser`, body);
  }

  getUserById(body: any) {
    return this.httpService.get(`${this.userUrl}/getUserById?param=${this.secureService.encrypt(body)}`);
  }

  updateUserById(body: any) {
    return this.httpService.patch(`${this.userUrl}/updateUser`, body);
  }

  deleteUser(body: any) {
    return this.httpService.delete(`${this.userUrl}/deleteUser?param=${this.secureService.encrypt(body)}`);
  }

  activeUser(body: any) {
    return this.httpService.patch(`${this.userUrl}/activateUser`, body);
  }

}
