import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/shared/alert/alert.model';
import { ActivatedRoute } from '@angular/router';
import { SecureService } from 'src/shared/service/secure.service';
import { ConfigService } from '../../service/config.service';

@Component({
  selector: 'app-fulfillment-option-form',
  templateUrl: './fulfillment-option-form.component.html',
  styleUrls: ['./fulfillment-option-form.component.scss']
})
export class FulfillmentOptionFormComponent {

  fulfillmentOptionForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    key: new FormControl(null, Validators.required),
    value: new FormControl(null, Validators.required),
    displayName: new FormControl(null, Validators.required),
  });
  submitted = false;
  alertDetails = this.alertModel.alertDetail;
  fulfillmentOptionId: any = null;

  constructor(
    private alertModel: Alert,
    private configService: ConfigService,
    private activedRoute: ActivatedRoute,
    private secureService: SecureService
  ) {}

  ngOnInit() {
    if(this.activedRoute.snapshot.paramMap.get('fulfillmentOptionId')) {
      this.fulfillmentOptionId = this.secureService.decrypt(this.activedRoute.snapshot.paramMap.get('fulfillmentOptionId'));
      this.getSysFulfillmentOptionById();
    }
  }

  getSysFulfillmentOptionById() {
    this.configService.getSysFulfillmentOptionById({id: this.fulfillmentOptionId}).subscribe((res: any) => {
      this.fulfillmentOptionForm.patchValue({
        id: res.result.id,
        key: res.result.key,
        value: res.result.value,
        displayName: res.result.displayName
      });
    });
  }

  get fFulfillmentOption(): { [key: string]: AbstractControl } {
    return this.fulfillmentOptionForm.controls;
  }

  saveSysFulfillmentOption() {
    this.submitted = true;
    if(!this.fulfillmentOptionForm.invalid) {
      if(!this.fulfillmentOptionId) {
        this.configService.createSysFulfillmentOption(this.fulfillmentOptionForm.value).subscribe((res: any) => {
          if(res.statusCode !== 200) {
            this.alertDetails =  {
              msg: res.statusDesc,
              type: this.alertModel.type.error
            };
            (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
          } else {
            this.fulfillmentOptionForm.reset();
            this.alertDetails =  {
              msg: res.statusDesc,
              type: this.alertModel.type.success
            };
            (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
            this.fulfillmentOptionForm.reset();
            this.submitted = false;
          }
        });
      } else {
        this.configService.updateSysFulfillmentOption(this.fulfillmentOptionForm.value).subscribe((res: any) => {
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
