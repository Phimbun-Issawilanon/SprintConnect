import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/shared/alert/alert.model';
import { ActivatedRoute } from '@angular/router';
import { SecureService } from 'src/shared/service/secure.service';
import { ConfigService } from '../../service/config.service';

@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.scss']
})
export class StatusFormComponent {

  statusForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    statusCode: new FormControl(null, Validators.required),
    statusReason: new FormControl(null, Validators.required),
    statusDisplayName: new FormControl(null, Validators.required),
    statusType: new FormControl(null, Validators.required),
  });
  submitted = false;
  alertDetails = this.alertModel.alertDetail;
  statusId: any = null;

  constructor(
    private alertModel: Alert,
    private configService: ConfigService,
    private activedRoute: ActivatedRoute,
    private secureService: SecureService
  ) {}

  ngOnInit() {
    if(this.activedRoute.snapshot.paramMap.get('statusId')) {
      this.statusId = this.secureService.decrypt(this.activedRoute.snapshot.paramMap.get('statusId'));
      this.getSysStatusById();
    }
  }

  getSysStatusById() {
    this.configService.getSysStatusById({id: this.statusId}).subscribe((res: any) => {
      this.statusForm.patchValue({
        id: res.result.id,
        statusCode: res.result.statusCode,
        statusReason: res.result.statusReason,
        statusDisplayName: res.result.statusDisplayName,
        statusType: res.result.statusType
      });
    });
  }

  get fStatus(): { [key: string]: AbstractControl } {
    return this.statusForm.controls;
  }

  saveSysStatus() {
    this.submitted = true;
    if(!this.statusForm.invalid) {
      if(!this.statusId) {
        this.configService.createSysStatus(this.statusForm.value).subscribe((res: any) => {
          if(res.statusCode !== 200) {
            this.alertDetails =  {
              msg: res.statusDesc,
              type: this.alertModel.type.error
            };
            (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
          } else {
            this.statusForm.reset();
            this.alertDetails =  {
              msg: res.statusDesc,
              type: this.alertModel.type.success
            };
            (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
            this.statusForm.reset();
            this.submitted = false;
          }
        });
      } else {
        this.configService.updateSysStatus(this.statusForm.value).subscribe((res: any) => {
          if(res.statusCode !== 200) {
            this.alertDetails =  {
              msg: res.statusDesc,
              type: this.alertModel.type.error
            };
            (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
          } else {
            this.alertDetails =  {
              msg: res.statusDesc,
              type: this.alertModel.type.success
            };
            (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
          }
        });
      }
    }
  }

}
