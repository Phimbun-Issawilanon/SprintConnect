import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/shared/alert/alert.model';
import { ActivatedRoute } from '@angular/router';
import { SecureService } from 'src/shared/service/secure.service';
import { ConfigService } from '../../service/config.service';

@Component({
  selector: 'app-function-config-form',
  templateUrl: './function-config-form.component.html',
  styleUrls: ['./function-config-form.component.scss']
})
export class FunctionConfigFormComponent {

  functionConfigForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    configKey: new FormControl(null, Validators.required),
    configValue: new FormControl(null, Validators.required),
    configType: new FormControl(null, Validators.required),
    function: new FormControl(null, Validators.required),
    seq: new FormControl(null),
    remark: new FormControl(null),
  });
  submitted = false;
  alertDetails = this.alertModel.alertDetail;
  functionConfigId: any = null;

  constructor(
    private alertModel: Alert,
    private configService: ConfigService,
    private activedRoute: ActivatedRoute,
    private secureService: SecureService
  ) {}

  ngOnInit() {
    if(this.activedRoute.snapshot.paramMap.get('functionConfigId')) {
      this.functionConfigId = this.secureService.decrypt(this.activedRoute.snapshot.paramMap.get('functionConfigId'));
      this.getSysFunctionConfigById();
    }
  }

  getSysFunctionConfigById() {
    this.configService.getSysFunctionConfigById({id: this.functionConfigId}).subscribe((res: any) => {
      this.functionConfigForm.patchValue({
        id: res.result.id,
        configKey: res.result.configKey,
        configValue: res.result.configValue,
        configType: res.result.configType,
        function: res.result.function,
        seq: res.result.seq,
        remark: res.result.remark
      });
    });
  }

  get fFunctionConfig(): { [key: string]: AbstractControl } {
    return this.functionConfigForm.controls;
  }

  saveSysFunctionConfig() {
    this.submitted = true;
    if(!this.functionConfigForm.invalid) {
      if(!this.functionConfigId) {
        this.configService.createSysFunctionConfig(this.functionConfigForm.value).subscribe((res: any) => {
          if(res.statusCode !== 200) {
            this.alertDetails =  {
              msg: res.statusDesc,
              type: this.alertModel.type.error
            };
            (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
          } else {
            this.functionConfigForm.reset();
            this.alertDetails =  {
              msg: res.statusDesc,
              type: this.alertModel.type.success
            };
            (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
            this.functionConfigForm.reset();
            this.submitted = false;
          }
        });
      } else {
        this.configService.updateSysFunctionConfig(this.functionConfigForm.value).subscribe((res: any) => {
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
