import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/shared/alert/alert.model';
import { ActivatedRoute } from '@angular/router';
import { SecureService } from 'src/shared/service/secure.service';
import { ConfigService } from '../../service/config.service';

@Component({
  selector: 'app-order-fulfillment-type-form',
  templateUrl: './order-fulfillment-type-form.component.html',
  styleUrls: ['./order-fulfillment-type-form.component.scss']
})
export class OrderFulfillmentTypeFormComponent {

  orderFulfillmentTypeForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    key: new FormControl(null, Validators.required),
    value: new FormControl(null, Validators.required),
    displayName: new FormControl(null, Validators.required),
  });
  submitted = false;
  alertDetails = this.alertModel.alertDetail;
  orderFulfillmentTypeId: any = null;

  constructor(
    private alertModel: Alert,
    private configService: ConfigService,
    private activedRoute: ActivatedRoute,
    private secureService: SecureService
  ) {}

  ngOnInit() {
    if(this.activedRoute.snapshot.paramMap.get('orderFulfillmentTypeId')) {
      this.orderFulfillmentTypeId = this.secureService.decrypt(this.activedRoute.snapshot.paramMap.get('orderFulfillmentTypeId'));
      this.getSysOrderFulfillmentTypeById();
    }
  }

  getSysOrderFulfillmentTypeById() {
    this.configService.getSysOrderFulfillmentTypeById({id: this.orderFulfillmentTypeId}).subscribe((res: any) => {
      this.orderFulfillmentTypeForm.patchValue({
        id: res.result.id,
        key: res.result.key,
        value: res.result.value,
        displayName: res.result.displayName
      });
    });
  }

  get fOrderFulfillmentType(): { [key: string]: AbstractControl } {
    return this.orderFulfillmentTypeForm.controls;
  }

  saveSysOrderFulfillmentType() {
    this.submitted = true;
    if(!this.orderFulfillmentTypeForm.invalid) {
      if(!this.orderFulfillmentTypeId) {
        this.configService.createSysOrderFulfillmentType(this.orderFulfillmentTypeForm.value).subscribe((res: any) => {
          if(res.statusCode !== 200) {
            this.alertDetails =  {
              msg: res.statusDesc,
              type: this.alertModel.type.error
            };
            (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
          } else {
            this.orderFulfillmentTypeForm.reset();
            this.alertDetails =  {
              msg: res.statusDesc,
              type: this.alertModel.type.success
            };
            (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
            this.orderFulfillmentTypeForm.reset();
            this.submitted = false;
          }
        });
      } else {
        this.configService.updateSysOrderFulfillmentType(this.orderFulfillmentTypeForm.value).subscribe((res: any) => {
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
