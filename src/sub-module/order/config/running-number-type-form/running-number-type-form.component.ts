import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/shared/alert/alert.model';
import { ActivatedRoute } from '@angular/router';
import { SecureService } from 'src/shared/service/secure.service';
import { ConfigService } from '../../service/config.service';

@Component({
  selector: 'app-running-number-type-form',
  templateUrl: './running-number-type-form.component.html',
  styleUrls: ['./running-number-type-form.component.scss']
})
export class RunningNumberTypeFormComponent {

  runningNumberTypeForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    runningNumberTypeCode: new FormControl(null, Validators.required),
    runningNumberTypeName: new FormControl(null, Validators.required),
    format: new FormControl(null, Validators.required),
    formatText: new FormControl(null, Validators.required),
    formatDate: new FormControl(null, Validators.required),
    formatNumberDigit: new FormControl(null, Validators.required),
    formatNumber: new FormControl(null, Validators.required),
    isResetByYear: new FormControl(null),
    isResetByMonth: new FormControl(null),
    isResetByDay: new FormControl(null)
  });
  formatArr = ['[Format_Text]', '[Format_Date]', '[Format_Running]'];
  formatDateArr = new Array();
  monthArr = ['M', 'MM'];
  yearArr = ['y', 'yy', 'yyy', 'yyyy'];
  submitted = false;
  alertDetails = this.alertModel.alertDetail;
  runningNumberTypeId: any = null;

  constructor(
    private alertModel: Alert,
    private configService: ConfigService,
    private activedRoute: ActivatedRoute,
    private secureService: SecureService
  ) {}

  ngOnInit() {
    if(this.activedRoute.snapshot.paramMap.get('runningNumberTypeId')) {
      this.runningNumberTypeId = this.secureService.decrypt(this.activedRoute.snapshot.paramMap.get('runningNumberTypeId'));
      this.getSysRunningNumberTypeById();
    }
    this.formatArrToString();
  }

  getSysRunningNumberTypeById() {
    this.configService.getSysRunningNumberTypeById({id: this.runningNumberTypeId}).subscribe((res: any) => {
      this.runningNumberTypeForm.patchValue({
        id: res.result.id,
        runningNumberTypeCode: res.result.runningNumberTypeCode,
        runningNumberTypeName: res.result.runningNumberTypeName,
        formatText: res.result.formatText,
        formatDate: res.result.formatDate,
        formatNumberDigit: res.result.formatNumber.length,
        formatNumber: res.result.formatNumber,
        isResetByYear: (res.result.isResetByYear ? 1 : 0),
        isResetByMonth: (res.result.isResetByMonth ? 1 : 0),
        isResetByDay: (res.result.isResetByDay ? 1 : 0)
      });
      let arrYear, year = '', arrMonth, month = '';
      // find how many y in format
      if(res.result.formatDate.includes('y')) {
        arrYear = res.result.formatDate.split('y');
        for (const item of arrYear) {
          if(!item) {
            year += 'y';
          }
        }
      }
      // find how many M in format
      if(res.result.formatDate.includes('M')) {
        arrMonth = res.result.formatDate.split('M');
        for (const item of arrMonth) {
          if(!item) {
            month += 'M';
          }
        }
      }
      // check radio btn for display
      for (const [index, item] of this.yearArr.entries()) {
        if(item === year) {
          (<HTMLInputElement>document.getElementById(`yearRadio${index + 1}`)).checked = true;
          break;
        }
      }
      for (const [index, item] of this.monthArr.entries()) {
        if(item === month) {
          (<HTMLInputElement>document.getElementById(`monthRadio${index + 1}`)).checked = true;
          break;
        }
      }
      // assign value for swap
      if(res.result.formatDate[0] === 'y' && res.result.formatDate[(res.result.formatDate.length)-1] === 'M') {
        if(year) { this.formatDateArr.push(year); }
        if(month) { this.formatDateArr.push(month); }
      } else {
        if(month) { this.formatDateArr.push(month); }
        if(year) { this.formatDateArr.push(year); }
      }
    });
  }

  get fRunningNumberType(): { [key: string]: AbstractControl } {
    return this.runningNumberTypeForm.controls;
  }

  drop(event: any, type: string) {
    if(type === 'format') {
      let oldtarget = this.formatArr[event.previousIndex];
      this.formatArr[event.previousIndex] = this.formatArr[event.currentIndex];
      this.formatArr[event.currentIndex] = oldtarget;
      this.formatArrToString();
    } else if(type === 'formatDate') {
      let oldtarget = this.formatDateArr[event.previousIndex];
      this.formatDateArr[event.previousIndex] = this.formatDateArr[event.currentIndex];
      this.formatDateArr[event.currentIndex] = oldtarget;
      this.formatDateArrToString();
    }
  }

  checkRadio(item: any, type: string) {
    if(!this.runningNumberTypeForm.value.formatDate) {
      this.runningNumberTypeForm.patchValue({
        formatDate: item
      });
      this.formatDateArr[0] = item;
    } else {
      if(this.runningNumberTypeForm.value.formatDate[0] === 'y') {
        if(type === 'year') {
          this.formatDateArr[0] = item;
        } else {
          this.formatDateArr[1] = item;
        }
      } else if(this.runningNumberTypeForm.value.formatDate[0] === 'M') {
        if(type === 'month') {
          this.formatDateArr[0] = item;
        } else {
          this.formatDateArr[1] = item;
        }
      }
      this.formatDateArrToString();
    }
  }

  formatArrToString() {
    let formatDisplay = '';
    for (const item of this.formatArr) {
      formatDisplay += item;
    }
    this.runningNumberTypeForm.patchValue({
      format: formatDisplay
    });
  }

  formatDateArrToString() {
    let formatDateDisplay = '';
    for (const item of this.formatDateArr) {
      formatDateDisplay += item;
    }
    this.runningNumberTypeForm.patchValue({
      formatDate: formatDateDisplay
    });
  }

  showExample(event: any) {
    if(event.target.value) {
      let exString = '', exArr = new Array(parseInt(event.target.value));
      for (const item of exArr) {
        exString += 'x';
      }
      this.runningNumberTypeForm.patchValue({ formatNumber: exString });
    } else {
      this.runningNumberTypeForm.patchValue({ formatNumber: null });
    }
  }

  saveSysRunningNumberType() {
    this.submitted = true;
    if (!this.runningNumberTypeForm.invalid) {
      this.runningNumberTypeForm.patchValue({
        isResetByYear: (this.runningNumberTypeForm.value.isResetByYear ? 1 : 0),
        isResetByMonth: (this.runningNumberTypeForm.value.isResetByMonth ? 1 : 0),
        isResetByDay: (this.runningNumberTypeForm.value.isResetByDay ? 1 : 0)
      });
      if(!this.runningNumberTypeId) {
        this.configService.createSysRunningNumberType(this.runningNumberTypeForm.value).subscribe((res: any) => {
          if(res.statusCode !== 200) {
            this.alertDetails =  {
              msg: res.statusDesc,
              type: this.alertModel.type.error
            };
            (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
          } else {
            this.runningNumberTypeForm.reset();
            this.alertDetails =  {
              msg: res.statusDesc,
              type: this.alertModel.type.success
            };
            (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
            this.runningNumberTypeForm.reset();
            for (const [index, item] of this.monthArr.entries()) {
              (<HTMLInputElement>document.getElementById(`monthRadio${index + 1}`)).checked = false;
            }
            for (const [index, item] of this.yearArr.entries()) {
              (<HTMLInputElement>document.getElementById(`yearRadio${index + 1}`)).checked = false;
            }
            (<HTMLInputElement>document.getElementById('isResetByYear')).checked = false;
            (<HTMLInputElement>document.getElementById('isResetByMonth')).checked = false;
            (<HTMLInputElement>document.getElementById('isResetByDay')).checked = false;
            this.formatDateArr = new Array();
            this.submitted = false;
          }
        });
      } else {
        this.configService.updateSysRunningNumberType(this.runningNumberTypeForm.value).subscribe((res: any) => {
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
