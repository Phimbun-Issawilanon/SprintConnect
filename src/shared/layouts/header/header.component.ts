import { Component } from '@angular/core';
import { UserService } from 'src/sub-module/authentication/service/user.service';
import { globalConstant } from 'src/shared/globalConstant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  userProfile: any;
  exampleImageProfile: any;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userProfile = this.userService.userProfileFromLocal;
    this.exampleImageProfile = globalConstant.exampleImageProfile;
  }

  logout() {
    localStorage.clear()
    window.location.href = '/auth/login';
  }

}
