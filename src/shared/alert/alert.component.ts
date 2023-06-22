import { Component, Input } from '@angular/core';
import { Alert } from './alert.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  @Input() alertDetail: any = this.alertModel.alertDetail;
  alertShow = false;
  alertBtn = this.alertModel.id.alertBtn;

  constructor(
    private alertModel: Alert
  ) {}

  alert() {
    this.alertShow = true;
    setTimeout(() => {
      this.alertShow = false;
    }, 5000);
  }

  closeAlert() {
    this.alertShow = false;
  }

}
