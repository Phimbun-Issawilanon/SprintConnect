import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/shared/alert/alert.model';
import { ConfigService } from '../../service/config.service';
import { RunningNumberSearch } from '../../model/running-number-search.model';

@Component({
  selector: 'app-generate-running-number',
  templateUrl: './generate-running-number.component.html',
  styleUrls: ['./generate-running-number.component.scss']
})
export class GenerateRunningNumberComponent {

  runningNumberSearchModel: RunningNumberSearch = new RunningNumberSearch;
  generateBarcodeForm: FormGroup = new FormGroup({
    runningNumberTypeCode: new FormControl(null, Validators.required),
    numberOfDocument: new FormControl(null, Validators.required),
    optionalCurrentDateTime: new FormControl(),
  });
  submitted = false;
  alertDetails = this.alertModel.alertDetail;
  runningNumberTypes: any;
  barcodes = new Array();

  constructor(
    private alertModel: Alert,
    private configService: ConfigService,
  ) {}

  ngOnInit() {
    this.getSysRunningNumberTypes();
  }

  getSysRunningNumberTypes() {
    this.runningNumberSearchModel.api.itemPerPage = 100;
    this.configService.getSysRunningNumberTypes(this.runningNumberSearchModel.api).subscribe((res: any) => {
      this.runningNumberTypes = res.result.items;
    });
  }

  get fGenerateBarcode(): { [key: string]: AbstractControl } {
    return this.generateBarcodeForm.controls;
  }

  generateBarcode() {
    this.submitted = true;
    console.log(this.generateBarcodeForm.value);
    let optionalCurrentDateTime = (this.generateBarcodeForm.value.optionalCurrentDateTime ? this.generateBarcodeForm.value.optionalCurrentDateTime.replace('T', ' ') : null);
    this.generateBarcodeForm.patchValue({
      optionalCurrentDateTime: optionalCurrentDateTime
    });
    if(!this.generateBarcodeForm.invalid) {
      this.configService.genDocumentNumbers(this.generateBarcodeForm.value).subscribe((res: any) => {
        if(res.statusCode !== 200) {
          this.alertDetails =  {
            msg: res.statusDesc,
            type: this.alertModel.type.error
          };
          (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
          this.barcodes = new Array();
        } else {
          this.barcodes = res.result.documentNumbers;}
      });
    }
  }

}
