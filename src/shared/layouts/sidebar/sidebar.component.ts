import { Component } from '@angular/core';
import { UserService } from 'src/sub-module/authentication/service/user.service';
import { SecureService } from 'src/shared/service/secure.service';
// menu
import menu from '../../menu.json';
import { ShareService } from 'src/shared/service/share.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  menu = menu.menu;
  userProfile: any;
  permission = new Array(this.menu.length);
  logoImage: any;

  constructor(
    private userService: UserService,
    private secureService: SecureService,
    private shareService: ShareService
  ) {
    if(!this.logoImage) {
      this.logoImage = this.shareService.logoImage;
    }
  }

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.userProfile = this.userService.userProfileFromLocal;
    // user is system admin => can see all
    if(this.userProfile.role[0].roleId === 4) {
      for(const [i, m] of this.menu.entries()) {
        this.permission[i] = true;
        if(m.subMenu) {
          this.permission[i] = new Array(m.subMenu.length);
          for(const [j, s] of m.subMenu.entries()) {
            this.permission[i][j] = true;
          }
        }
      }
    }
    // user is owner admin => can see all in license module
    else if(this.userProfile.role[0].roleId === 5) {
      let arrLicense = this.userProfile.owner[0].license[0].licenseModule.split(',');
      for(const arr of arrLicense) {
        for(const [i, m] of this.menu.entries()) {
          if(parseInt(arr) === m.menuId) {
            this.permission[i] = true;
          }
          if(m.subMenu && this.permission[i]) {
            this.permission[i] = new Array(m.subMenu.length);
            for(const [j, s] of m.subMenu.entries()) {
              this.permission[i][j] = true;
            }
          }
        }
      }
    }
    // user under owner => can see by permission rule
    else {
      let arrRole = this.userProfile.role[0].rolePermission[0].permission.permissionRule;
      for(const arr of arrRole) {
        for(const [i, m] of this.menu.entries()) {
          if(parseInt(arr) === m.menuId) {
            this.permission[i] = true;
          }
          if(m.subMenu && this.permission[i]) {
            this.permission[i] = new Array(m.subMenu.length);
            for(const [j, s] of m.subMenu.entries()) {
              if(arr.includes(`${m.menuId}-${s.subMenuId}`)) {
                this.permission[i][j] = true;
              }
            }
          }
        }
      }
    }
  }
  
}
