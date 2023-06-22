import { Injectable } from '@angular/core';
import { Alert } from '../alert/alert.model';
import { globalConstant } from 'src/shared/globalConstant';
import { HttpService } from 'src/shared/service/http.service';
import { SecureService } from './secure.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  fileUrl = globalConstant.baseDevUrl.authUrl + 'file';
  alertDetails = this.alertModel.alertDetail;
  imageSrc: any = null;
  imageExtension: any = null;
  image: any = null;
  logoImage: any;
  logoImageChange = new Subject();

  constructor(
    private alertModel: Alert,
    private httpService: HttpService,
    private secureService: SecureService
  ) {
    if(!localStorage.getItem('logoImage')) {
      this.displayFile({ imageLocation: 'Logo' }).subscribe((res: any) => {
        if(res.statusCode === 200) {
          this.logoImage = res.result.url;
          this.getLogoImage(res.result.url);
        }
      });
    } else {
      this.logoImage = this.secureService.decrypt(localStorage.getItem('logoImage'));
    }
  }
  
  getLogoImage(body: any) {
    this.logoImageChange.next(localStorage.setItem('logoImage', this.secureService.encrypt(body)));
  }

  getImage(id: any) {
    (<HTMLInputElement>document.getElementById(id)).click();
  }

  readImageURL(event: any) {
    if(event.target.files && event.target.files[0]) {
      // check image size less than 2 mb
      if(event.target.files[0].type !== 'image/jpeg' && event.target.files[0].type !== 'image/png' && event.target.files[0].type !== 'image/jpg') {
        this.alertDetails =  {
          msg: this.alertModel.message.profilePage.imageType,
          type: this.alertModel.type.error
        };
        setTimeout(() => {
          (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
        }, 300);
        this.imageSrc = null;
      } else if(event.target.files[0].size > 2000000) {
        // check image type
        this.alertDetails =  {
          msg: this.alertModel.message.profilePage.imageSize,
          type: this.alertModel.type.error
        };
        setTimeout(() => {
          (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
        }, 300);
        this.imageSrc = null;
      } else {
        // convert to base64
        const file = event.target.files[0];
        this.imageExtension = file.type;
        const readerPreview = new FileReader();
        readerPreview.onload = e => this.imageSrc = readerPreview.result;
        readerPreview.readAsDataURL(file);
        const readerBase64 = new FileReader();
        readerBase64.onload = this.convertToBase64.bind(this);
        readerBase64.readAsBinaryString(file);
      }
    }
  }

  convertToBase64(readerEvt: any) {
    let binaryString = readerEvt.target.result;
    let base64ImageProfile = btoa(binaryString);
    this.image = base64ImageProfile;
  }

  uploadFile(body: any) {
    return this.httpService.post(`${this.fileUrl}/uploadFile`, body);
  }

  displayFile(body: any) {
    return this.httpService.get(`${this.fileUrl}/displayFileUrl?param=${this.secureService.encrypt(body)}`);
  }

}
