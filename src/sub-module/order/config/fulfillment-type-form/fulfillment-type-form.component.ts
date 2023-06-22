import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/shared/alert/alert.model';
import { ActivatedRoute } from '@angular/router';
import { SecureService } from 'src/shared/service/secure.service';
import { ConfigService } from '../../service/config.service';

@Component({
  selector: 'app-fulfillment-type-form',
  templateUrl: './fulfillment-type-form.component.html',
  styleUrls: ['./fulfillment-type-form.component.scss']
})
export class FulfillmentTypeFormComponent {

  fulfillmentTypeForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    key: new FormControl(null, Validators.required),
    value: new FormControl(null, Validators.required),
    displayName: new FormControl(null, Validators.required),
  });
  submitted = false;
  alertDetails = this.alertModel.alertDetail;
  fulfillmentTypeId: any = null;

  constructor(
    private alertModel: Alert,
    private configService: ConfigService,
    private activedRoute: ActivatedRoute,
    private secureService: SecureService
  ) {}

  ngOnInit() {
    if(this.activedRoute.snapshot.paramMap.get('fulfillmentTypeId')) {
      this.fulfillmentTypeId = this.secureService.decrypt(this.activedRoute.snapshot.paramMap.get('fulfillmentTypeId'));
      this.getSysFulfillmentTypeById();
    }
  }

  getSysFulfillmentTypeById() {
    this.configService.getSysFulfillmentTypeById({id: this.fulfillmentTypeId}).subscribe((res: any) => {
      this.fulfillmentTypeForm.patchValue({
        id: res.result.id,
        key: res.result.key,
        value: res.result.value,
        displayName: res.result.displayName
      });
    });
  }

  get fFulfillmentType(): { [key: string]: AbstractControl } {
    return this.fulfillmentTypeForm.controls;
  }

  saveSysFulfillmentType() {
    this.submitted = true;
    if(!this.fulfillmentTypeForm.invalid) {
      if(!this.fulfillmentTypeId) {
        this.configService.createSysFulfillmentType(this.fulfillmentTypeForm.value).subscribe((res: any) => {
          if(res.statusCode !== 200) {
            this.alertDetails =  {
              msg: res.statusDesc,
              type: this.alertModel.type.error
            };
            (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
          } else {
            this.fulfillmentTypeForm.reset();
            this.alertDetails =  {
              msg: res.statusDesc,
              type: this.alertModel.type.success
            };
            (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
            this.fulfillmentTypeForm.reset();
            this.submitted = false;
          }
        });
      } else {
        this.configService.updateSysFulfillmentType(this.fulfillmentTypeForm.value).subscribe((res: any) => {
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
