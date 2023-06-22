import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/shared/alert/alert.model';
import { ActivatedRoute } from '@angular/router';
import { SecureService } from 'src/shared/service/secure.service';
import { ConfigService } from '../../service/config.service';

@Component({
  selector: 'app-channel-form',
  templateUrl: './channel-form.component.html',
  styleUrls: ['./channel-form.component.scss']
})
export class ChannelFormComponent {

  channelForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    key: new FormControl(null, Validators.required),
    value: new FormControl(null, Validators.required),
    displayName: new FormControl(null, Validators.required),
  });
  submitted = false;
  alertDetails = this.alertModel.alertDetail;
  channelId: any = null;

  constructor(
    private alertModel: Alert,
    private configService: ConfigService,
    private activedRoute: ActivatedRoute,
    private secureService: SecureService
  ) {}

  ngOnInit() {
    if(this.activedRoute.snapshot.paramMap.get('channelId')) {
      this.channelId = this.secureService.decrypt(this.activedRoute.snapshot.paramMap.get('channelId'));
      this.getSysChannelById();
    }
  }

  getSysChannelById() {
    this.configService.getSysChannelById({id: this.channelId}).subscribe((res: any) => {
      this.channelForm.patchValue({
        id: res.result.id,
        key: res.result.key,
        value: res.result.value,
        displayName: res.result.displayName
      });
    });
  }

  get fChannel(): { [key: string]: AbstractControl } {
    return this.channelForm.controls;
  }

  saveSysChannel() {
    this.submitted = true;
    if(!this.channelForm.invalid) {
      if(!this.channelId) {
        this.configService.createSysChannel(this.channelForm.value).subscribe((res: any) => {
          if(res.statusCode !== 200) {
            this.alertDetails =  {
              msg: res.statusDesc,
              type: this.alertModel.type.error
            };
            (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
          } else {
            this.channelForm.reset();
            this.alertDetails =  {
              msg: res.statusDesc,
              type: this.alertModel.type.success
            };
            (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
            this.channelForm.reset();
            this.submitted = false;
          }
        });
      } else {
        this.configService.updateSysChannel(this.channelForm.value).subscribe((res: any) => {
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
