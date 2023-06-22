import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SecureService } from './secure.service';
import { tap, throwError } from 'rxjs';
import { globalConstant } from '../globalConstant';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  constructor(
    private http: HttpClient,
    private secureService: SecureService,
  ) {}  

  getHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': (
        localStorage.getItem('token') ?
        `Bearer ${this.secureService.decrypt(localStorage.getItem('token')).replaceAll('"', '')}` :
        ''
      ),
    })
  };

  handleError() {
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  refreshToken() {
    this.http.post(
      `${globalConstant.baseDevUrl.authUrl}token/refreshToken`,
      { refreshToken: this.secureService.decrypt(localStorage.getItem('refreshToken')).replaceAll('"', '') },
      { headers: this.getHeader() }
    ).toPromise().then((res: any) => {
      if(res.statusCode === 411) {
        localStorage.clear();
        window.location.href = '/auth/login';
      } else if(res.statusCode === 200) {
        localStorage.setItem('token', this.secureService.encrypt(res.result.tokenAccess));
        localStorage.setItem('refreshToken', this.secureService.encrypt(res.result.refreshToken));
        window.location.reload();
      }
    });
  }

  get(url: string) {
    console.log('decrypt body in get method:', this.secureService.decrypt(url.split('param=')[1]));
    return this.http.get(url, { headers: this.getHeader() }).pipe(tap({
      next: () => {},
      error: (error: any) => {
        if(error.status === 401) {
          this.refreshToken();
        }
      }
    }));
  }

  post(url: string, data: any) {
    return this.http.post(url, data, { headers: this.getHeader() }).pipe(tap({
      next: () => {},
      error: (error: any) => {
        if(error.status === 401) {
          this.refreshToken();
        }
      }
    }));
  }

  patch(url: string, data: any) { 
    return this.http.patch(url, data, { headers: this.getHeader() }).pipe(tap({
      next: () => {},
      error: (error: any) => {
        if(error.status === 401) {
          this.refreshToken();
        }
      }
    }));
  }

  delete(url: string) { 
    return this.http.delete(url, { headers: this.getHeader() }).pipe(tap({
      next: () => {},
      error: (error: any) => {
        if(error.status === 401) {
          this.refreshToken();
        }
      }
    }));
  }

}
