import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/shared/alert/alert.model';
import { globalConstant } from 'src/shared/globalConstant';
import { OwnerService } from '../service/owner.service';
import { ShareService } from 'src/shared/service/share.service';
// menu
import menu from '../../../shared/menu.json';
import { ActivatedRoute } from '@angular/router';
import { SecureService } from 'src/shared/service/secure.service';

@Component({
  selector: 'app-owner-form',
  templateUrl: './owner-form.component.html',
  styleUrls: ['./owner-form.component.scss']
})
export class OwnerFormComponent {

  menu = menu.menu;
  ownerForm: FormGroup = new FormGroup({
    ownerId: new FormControl(null, [
      Validators.required,
      Validators.maxLength(15)
    ]),
    ownerName: new FormControl(null, [
      Validators.required,
      Validators.maxLength(100)
    ]),
    phoneNo: new FormControl(null, Validators.pattern(globalConstant.phoneNoPattern)),
    address: new FormControl(null),
    ownerImage: new FormControl(null),
    imageExtension: new FormControl(null),
    licenseModule: new FormControl(null, Validators.required),
    licenseId: new FormControl(null),
  });
  submitted = false;
  alertDetails = this.alertModel.alertDetail;
  imageSrc: any;
  exampleImageProfile = globalConstant.exampleImageProfile;
  owners = new Array();
  modules = new Array();
  modulesClear = new Array();
  ownerId: any = null;
  ownerDetails: any = {};

  constructor(
    private alertModel: Alert,
    private shareService: ShareService,
    private ownerService: OwnerService,
    private activedRoute: ActivatedRoute,
    private secureService: SecureService
  ) {}

  ngOnInit() {
    if(this.activedRoute.snapshot.paramMap.get('ownerId')) {
      this.ownerId = this.secureService.decrypt(this.activedRoute.snapshot.paramMap.get('ownerId'));
      this.getOwnerById();
    }
  }

  getOwnerById() {
    this.ownerService.getOwnerById({ownerId: this.ownerId}).subscribe((res: any) => {
      this.ownerDetails = res.result;
      this.ownerForm.patchValue({
        ownerId: res.result.ownerId,
        ownerName: res.result.ownerName,
        ownerImage: res.result.ownerImage,
        phoneNo: res.result.phoneNo,
        address: res.result.address,
        licenseId: res.result.licenses[0].licenseId
      });
      for(const item of res.result.licenses[0].licenseModule.split(',')) {
        this.onCheckMenusUpdate(item);
      }
    });
  }

  onCheckMenusUpdate(id: number) {
    this.modules.push(id);
    this.modulesClear.push('module'+id);
    (<HTMLInputElement>document.getElementById('module'+id)).checked = true;
  }

  onCheckMenus(event: any, id: string) {
    // selected
    if(event.target.checked) {
      this.modules.push(event.target.value);
      this.modulesClear.push(id);
    } else { // unselected
      // find the unselected element
      let i: number = 0;
      this.modules.forEach((item: any) => {
        if(item === event.target.value) {
          // Remove the unselected element from the arrayForm
          this.modules.splice(i, 1);
          this.modulesClear.splice(i, 1);
          return;
        }
        i++;
      });
    }
  }

  getImage(id: any) {
    this.shareService.getImage(id);
  }

  readImageURL(event: any) {
    this.shareService.readImageURL(event);
    setTimeout(() => {
      this.imageSrc = this.shareService.imageSrc;
      this.ownerForm.patchValue({
        imageExtension: this.shareService.imageExtension,
        ownerImage: this.shareService.image
      });
      this.alertDetails = this.shareService.alertDetails;
    }, 300);
  }

  get fOwner(): { [key: string]: AbstractControl } {
    return this.ownerForm.controls;
  }

  saveOwner() {
    this.ownerForm.patchValue({
      licenseModule: this.modules.sort().toString()
    });
    this.submitted = true;
    console.log(this.ownerForm.value);
    if(!this.ownerForm.invalid) {
      if(!this.ownerId) {
        this.ownerService.createOwner(this.ownerForm.value).subscribe((res: any) => {
          if(res.statusCode !== 200) {
            this.alertDetails =  {
              msg: res.statusDesc,
              type: this.alertModel.type.error
            };
            (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
          } else {
            this.ownerForm.reset();
            this.alertDetails =  {
              msg: res.statusDesc,
              type: this.alertModel.type.success
            };
            (<HTMLInputElement>document.getElementById(this.alertModel.id.alertBtn)).click();
            this.shareService.imageSrc = null;
            this.shareService.imageExtension = null;
            this.shareService.image = null;
            this.ownerForm.reset();
            this.clearCheckbox();
            this.submitted = false;
          }
        });
      } else {
        this.ownerService.updateOwner(this.ownerForm.value).subscribe((res: any) => {
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

  clearCheckbox() {
    for(const item of this.modulesClear) {
      (<HTMLInputElement>document.getElementById(item)).checked = false;
    }
    this.modulesClear = new Array();
  }

}
