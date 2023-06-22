import { Injectable } from '@angular/core';
import { globalConstant } from 'src/shared/globalConstant';
import { HttpService } from 'src/shared/service/http.service';
import { SecureService } from 'src/shared/service/secure.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  roleUrl = globalConstant.baseDevUrl.authUrl + 'role';

  constructor(
    private httpService: HttpService,
    private secureService: SecureService
  ) {}

  ngOnInit() {}

  getRoles(body: any) {
    return this.httpService.get(`${this.roleUrl}/getRoles?param=${this.secureService.encrypt(body)}`);
  }

  createRole(body: any) {
    return this.httpService.post(`${this.roleUrl}/createRolePermission`, body);
  }

  getRoleById(body: any) {
    return this.httpService.get(`${this.roleUrl}/getRoleByRoleId?param=${this.secureService.encrypt(body)}`);
  }

  updateRole(body: any) {
    return this.httpService.patch(`${this.roleUrl}/updateRolePermission`, body);
  }

  deleteRole(body: any) {
    return this.httpService.delete(`${this.roleUrl}/deleteRole?param=${this.secureService.encrypt(body)}`);
  }

  activeRole(body: any) {
    return this.httpService.patch(`${this.roleUrl}/activateRole`, body);
  }

}
