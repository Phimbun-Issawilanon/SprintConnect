import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/shared/alert/alert.model';
import { ActivatedRoute } from '@angular/router';
import { SecureService } from 'src/shared/service/secure.service';
import { ConfigService } from '../../service/config.service';

@Component({
  selector: 'app-delivery-subtype-form',
  templateUrl: './delivery-subtype-form.component.html',
  styleUrls: ['./delivery-subtype-form.component.scss']
})
export class DeliverySubtypeFormComponent {

  deliverySubTypeForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    key: new FormControl(null, Validators.required),
    value: new FormControl(null, Validators.required),
    displayName: new FormControl(null, Validators.required),
  });
  submitted = false;
  alertDetails = this.alertModel.alertDetail;
  deliverySubTypeId: any = null;

  constructor(
    private alertModel: Alert,
    private configService: ConfigService,
    private activedRoute: ActivatedRoute,
    private secureService: SecureService
  ) {}

  ngOnInit() {
    if(this.activedRoute.snapshot.paramMap.get('deliverySubTypeId')) {
      this.deliverySubTypeId = this.secureService.decrypt(this.activedRoute.snapshot.paramMap.get('deliverySubTypeId'));
      this.getSysDeliverySubTypeById();
    }
  }

  getSysDeliverySubTypeById() {
    this.configService.getSysDeliverySubTypeById({id: this.deliverySubTypeId}).subscribe((res: any) => {
      this.deliverySubTypeForm.patchValue({
        id: res.result.id,
        key: res.result.key,
        value: res.result.value,
        displayName: res.result.displayName
      });
    });
  }

  get fDeliverySubType(): { [key: string]: AbstractControl } {
    return this.deliverySubTypeForm.controls;
  }

  saveSysDeliverySubType() {
    this.submitted = true;
    if(!this.deliverySubTypeForm.invalid) {
      if(!this.deliverySubTypeId) {
        this.configService.createSysDeliverySubType(this.deliverySubTypeForm.value).subscribe((res: any) => {
          if(res.statusCode !== 200) {
            this.alertDetails =  {
              msg: res.statusDesc,
              type: this.alertModel.type.error
            };
            (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
          } else {
            this.deliverySubTypeForm.reset();
            this.alertDetails =  {
              msg: res.statusDesc,
              type: this.alertModel.type.success
            };
            (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
            this.deliverySubTypeForm.reset();
            this.submitted = false;
          }
        });
      } else {
        this.configService.updateSysDeliverySubType(this.deliverySubTypeForm.value).subscribe((res: any) => {
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
