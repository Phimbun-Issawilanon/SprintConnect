import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/shared/alert/alert.model';
import { ActivatedRoute } from '@angular/router';
import { SecureService } from 'src/shared/service/secure.service';
import { ConfigService } from '../../service/config.service';

@Component({
  selector: 'app-delivery-type-form',
  templateUrl: './delivery-type-form.component.html',
  styleUrls: ['./delivery-type-form.component.scss']
})
export class DeliveryTypeFormComponent {

  deliveryTypeForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    key: new FormControl(null, Validators.required),
    value: new FormControl(null, Validators.required),
    displayName: new FormControl(null, Validators.required),
  });
  submitted = false;
  alertDetails = this.alertModel.alertDetail;
  deliveryTypeId: any = null;

  constructor(
    private alertModel: Alert,
    private configService: ConfigService,
    private activedRoute: ActivatedRoute,
    private secureService: SecureService
  ) {}

  ngOnInit() {
    if(this.activedRoute.snapshot.paramMap.get('deliveryTypeId')) {
      this.deliveryTypeId = this.secureService.decrypt(this.activedRoute.snapshot.paramMap.get('deliveryTypeId'));
      this.getSysDeliveryTypeById();
    }
  }

  getSysDeliveryTypeById() {
    this.configService.getSysDeliveryTypeById({id: this.deliveryTypeId}).subscribe((res: any) => {
      this.deliveryTypeForm.patchValue({
        id: res.result.id,
        key: res.result.key,
        value: res.result.value,
        displayName: res.result.displayName
      });
    });
  }

  get fDeliveryType(): { [key: string]: AbstractControl } {
    return this.deliveryTypeForm.controls;
  }

  saveSysDeliveryType() {
    this.submitted = true;
    if(!this.deliveryTypeForm.invalid) {
      if(!this.deliveryTypeId) {
        this.configService.createSysDeliveryType(this.deliveryTypeForm.value).subscribe((res: any) => {
          if(res.statusCode !== 200) {
            this.alertDetails =  {
              msg: res.statusDesc,
              type: this.alertModel.type.error
            };
            (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
          } else {
            this.deliveryTypeForm.reset();
            this.alertDetails =  {
              msg: res.statusDesc,
              type: this.alertModel.type.success
            };
            (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
            this.deliveryTypeForm.reset();
            this.submitted = false;
          }
        });
      } else {
        this.configService.updateSysDeliveryType(this.deliveryTypeForm.value).subscribe((res: any) => {
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
