import { Injectable } from '@angular/core';
import { globalConstant } from 'src/shared/globalConstant';
import { HttpService } from 'src/shared/service/http.service';
import { SecureService } from 'src/shared/service/secure.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  ownerUrl = globalConstant.baseDevUrl.authUrl + 'owner';

  constructor(
    private httpService: HttpService,
    private secureService: SecureService
  ) {}

  ngOnInit() {}

  getOwners(body: any) {
    return this.httpService.get(`${this.ownerUrl}/getOwners?param=${this.secureService.encrypt(body)}`);
  }

  createOwner(body: any) {
    return this.httpService.post(`${this.ownerUrl}/createOwner`, body);
  }

  getOwnerById(body: any) {
    return this.httpService.get(`${this.ownerUrl}/getOwnerByOwnerId?param=${this.secureService.encrypt(body)}`);
  }

  updateOwner(body: any) {
    return this.httpService.patch(`${this.ownerUrl}/updateOwner`, body);
  }

  deleteOwner(body: any) {
    return this.httpService.delete(`${this.ownerUrl}/deleteOwner?param=${this.secureService.encrypt(body)}`);
  }

  activeOwner(body: any) {
    return this.httpService.patch(`${this.ownerUrl}/activateOwner`, body);
  }

}
