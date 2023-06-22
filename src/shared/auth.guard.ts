import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/sub-module/authentication/service/user.service';

// menu
import menu from '../shared/menu.json';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  currentUrl: any;
  userProfile: any;
  menu = menu.menu;

  constructor(
    private userService: UserService
  ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // check token
    if(!localStorage.getItem('token') || !localStorage.getItem('refreshToken') || !localStorage.getItem('userProfile')) {
      localStorage.clear();
      window.location.href = '/auth/login';
    }
    // get needed data
    this.currentUrl = state.url;
    this.userProfile = this.userService.userProfileFromLocal;
    // check user as system admin
    if(this.userProfile && this.userProfile.role[0].roleId !== 4 && (this.currentUrl === '/auth/owner-management' || this.currentUrl === '/owner-management')) {
      window.location.href = '/404';
    }
    // check permission
    // user under owner
    let menuAccess: any;
    let rightAccess: any;
    if(this.userProfile && this.userProfile.role[0].roleId !== 4) {
      // check module or permission with path url
      for(const m of this.menu) {
        if(m.subMenu) {
          for(const s of m.subMenu) {
            if(s.path === this.currentUrl) {
              if(this.userProfile.role[0].roleId !== 4 && this.userProfile.role[0].roleId !== 5) { // user under role
                menuAccess = `${m.menuId}-${s.subMenuId}`;
              } else if(this.userProfile.role[0].roleId === 5) {
                menuAccess = `${m.menuId}`;
              }
              break;
            }
          }
        } else {
          if(m.path === this.currentUrl) {
            if(this.userProfile.role[0].roleId !== 4 && this.userProfile.role[0].roleId !== 5) { // user as owner admin
              menuAccess = `${m.menuId}-0`;
            } else if(this.userProfile.role[0].roleId === 5) {
              menuAccess = `${m.menuId}`;
            }
            break;
          }
        }
      }
      // check module or permission can access
      if(this.userProfile.role[0].roleId !== 4 && this.userProfile.role[0].roleId !== 5) { // user under role
        if(menuAccess) {
          for(const item of this.userProfile.role[0].rolePermission[0].permission.permissionRule) {
            if(item.includes(menuAccess)) {
              return true; // can access
            }
          }
          rightAccess = 'noAccess';
        }
      } else if(this.userProfile.role[0].roleId === 5) { // user as owner admin
        if(menuAccess) {
          for(const item of this.userProfile.owner[0].license[0].licenseModule.split(',')) {
            if(item === menuAccess) {
              return true; // can access
            }
          }
          rightAccess = 'noAccess';
        }
      }
      // cannot access return 404 page
      if(rightAccess === 'noAccess') {
        window.location.href = '/404';
      }
    }
    return true;
  }
  
}
