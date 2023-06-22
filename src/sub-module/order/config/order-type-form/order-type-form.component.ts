import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/shared/alert/alert.model';
import { ActivatedRoute } from '@angular/router';
import { SecureService } from 'src/shared/service/secure.service';
import { ConfigService } from '../../service/config.service';
import { DeliveryTypeSearch } from '../../model/delivery-type-search.model';
import { DeliverySubtypeSearch } from '../../model/delivery-subtype-search.model';

@Component({
  selector: 'app-order-type-form',
  templateUrl: './order-type-form.component.html',
  styleUrls: ['./order-type-form.component.scss']
})
export class OrderTypeFormComponent {

  orderTypeForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    orderType: new FormControl(null, Validators.required),
    deliveryMethodId: new FormControl(null),
    deliveryMethod: new FormControl(null),
    orderConfig: new FormControl(null, Validators.required),
    description: new FormControl(null),
    deliveryTypeId: new FormControl(null, Validators.required),
    deliverySubTypeId: new FormControl(null, Validators.required)
  });
  submitted = false;
  alertDetails = this.alertModel.alertDetail;
  orderTypeId: any = null;
  deliveryTypes: any;
  deliverySubTypes: any;

  constructor(
    private alertModel: Alert,
    private configService: ConfigService,
    private activedRoute: ActivatedRoute,
    private secureService: SecureService,
    private deliveryTypeSearchModel: DeliveryTypeSearch,
    private deliverySubTypeSearchModel: DeliverySubtypeSearch
  ) {}

  ngOnInit() {
    this.getSysDeliveryType();
    this.getSysDeliverySubType();
    if(this.activedRoute.snapshot.paramMap.get('orderTypeId')) {
      this.orderTypeId = this.secureService.decrypt(this.activedRoute.snapshot.paramMap.get('orderTypeId'));
      this.getSysOrderTypeById();
    }
  }

  getSysDeliveryType() {
    this.configService.getSysDeliveryTypes(this.deliveryTypeSearchModel.api).subscribe((res: any) => {
      this.deliveryTypes = res.result.items;
    });
  }

  getSysDeliverySubType() {
    this.configService.getSysDeliverySubTypes(this.deliverySubTypeSearchModel.api).subscribe((res: any) => {
      this.deliverySubTypes = res.result.items;
    });
  }

  getSysOrderTypeById() {
    this.configService.getSysOrderTypeById({id: this.orderTypeId}).subscribe((res: any) => {
      this.orderTypeForm.patchValue({
        id: res.result.id,
        orderType: res.result.orderType,
        deliveryMethodId: res.result.deliveryMethodId,
        deliveryMethod: res.result.deliveryMethod,
        orderConfig: res.result.orderConfig,
        description: res.result.description,
        deliveryTypeId: res.result.deliveryType.id,
        deliverySubTypeId: res.result.deliverySubType.id
      });
    });
  }

  get fOrderType(): { [key: string]: AbstractControl } {
    return this.orderTypeForm.controls;
  }

  saveSysOrderType() {
    this.submitted = true;
    if(!this.orderTypeForm.invalid) {
      if(!this.orderTypeId) {
        this.configService.createSysOrderType(this.orderTypeForm.value).subscribe((res: any) => {
          if(res.statusCode !== 200) {
            this.alertDetails =  {
              msg: res.statusDesc,
              type: this.alertModel.type.error
            };
            (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
          } else {
            this.orderTypeForm.reset();
            this.alertDetails =  {
              msg: res.statusDesc,
              type: this.alertModel.type.success
            };
            (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
            this.orderTypeForm.reset();
            this.submitted = false;
          }
        });
      } else {
        this.configService.updateSysOrderType(this.orderTypeForm.value).subscribe((res: any) => {
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
