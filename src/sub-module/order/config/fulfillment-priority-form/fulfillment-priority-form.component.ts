import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/shared/alert/alert.model';
import { ActivatedRoute } from '@angular/router';
import { SecureService } from 'src/shared/service/secure.service';
import { ConfigService } from '../../service/config.service';

@Component({
  selector: 'app-fulfillment-priority-form',
  templateUrl: './fulfillment-priority-form.component.html',
  styleUrls: ['./fulfillment-priority-form.component.scss']
})
export class FulfillmentPriorityFormComponent {

  fulfillmentPriorityForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    key: new FormControl(null, Validators.required),
    value: new FormControl(null, Validators.required),
    displayName: new FormControl(null, Validators.required),
  });
  submitted = false;
  alertDetails = this.alertModel.alertDetail;
  fulfillmentPriorityId: any = null;

  constructor(
    private alertModel: Alert,
    private configService: ConfigService,
    private activedRoute: ActivatedRoute,
    private secureService: SecureService
  ) {}

  ngOnInit() {
    if(this.activedRoute.snapshot.paramMap.get('fulfillmentPriorityId')) {
      this.fulfillmentPriorityId = this.secureService.decrypt(this.activedRoute.snapshot.paramMap.get('fulfillmentPriorityId'));
      this.getSysFulfillmentPriorityById();
    }
  }

  getSysFulfillmentPriorityById() {
    this.configService.getSysFulfillmentPriorityById({id: this.fulfillmentPriorityId}).subscribe((res: any) => {
      this.fulfillmentPriorityForm.patchValue({
        id: res.result.id,
        key: res.result.key,
        value: res.result.value,
        displayName: res.result.displayName
      });
    });
  }

  get fFulfillmentPriority(): { [key: string]: AbstractControl } {
    return this.fulfillmentPriorityForm.controls;
  }

  saveSysFulfillmentPriority() {
    this.submitted = true;
    if(!this.fulfillmentPriorityForm.invalid) {
      if(!this.fulfillmentPriorityId) {
        this.configService.createSysFulfillmentPriority(this.fulfillmentPriorityForm.value).subscribe((res: any) => {
          if(res.statusCode !== 200) {
            this.alertDetails =  {
              msg: res.statusDesc,
              type: this.alertModel.type.error
            };
            (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
          } else {
            this.fulfillmentPriorityForm.reset();
            this.alertDetails =  {
              msg: res.statusDesc,
              type: this.alertModel.type.success
            };
            (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
            this.fulfillmentPriorityForm.reset();
            this.submitted = false;
          }
        });
      } else {
        this.configService.updateSysFulfillmentPriority(this.fulfillmentPriorityForm.value).subscribe((res: any) => {
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
