import { Injectable } from '@angular/core';
import { globalConstant } from '../globalConstant';
import * as CryptoJS from 'crypto-js';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class SecureService {

  constructor() {}

  decodeJwtResponse(token: string) {
    return jwt_decode(token);
  }

  encrypt(data: any) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJS.enc.Utf8.parse(globalConstant.key), {
      keySize: 128,
      iv: CryptoJS.enc.Utf8.parse(globalConstant.iv),
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString().replaceAll('+','xMl3Jk').replaceAll('/','Por21Ld').replaceAll('=','Ml32');
  }

  decrypt(data: any) {
    return (data ? JSON.parse(CryptoJS.AES.decrypt(data.replaceAll('xMl3Jk', '+' ).replaceAll('Por21Ld', '/').replaceAll('Ml32', '='),
    CryptoJS.enc.Utf8.parse(globalConstant.key), {
      keySize: 128,
      iv: CryptoJS.enc.Utf8.parse(globalConstant.iv),
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8)) : null);
  }

}
