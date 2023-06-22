import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SecureService } from 'src/shared/service/secure.service';
import { ConfigService } from '../../service/config.service';

@Component({
  selector: 'app-running-number-form',
  templateUrl: './running-number-form.component.html',
  styleUrls: ['./running-number-form.component.scss']
})
export class RunningNumberFormComponent {

  runningNumberId: any = null;
  runningNumberDetails: any = null;

  constructor(
    private configService: ConfigService,
    private activedRoute: ActivatedRoute,
    private secureService: SecureService
  ) {}

  ngOnInit() {
    if(this.activedRoute.snapshot.paramMap.get('runningNumberId')) {
      this.runningNumberId = this.secureService.decrypt(this.activedRoute.snapshot.paramMap.get('runningNumberId'));
      this.getSysRunningNumberById();
    }
  }

  getSysRunningNumberById() {
    this.configService.getSysRunningNumberById({id: this.runningNumberId}).subscribe((res: any) => {
      this.runningNumberDetails = res.result;
    });
  }

}
