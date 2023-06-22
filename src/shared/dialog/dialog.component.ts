import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dialog } from './dialog.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  @Input() dialogDetail: any = this.dialogModel.dialogDetail;
  @Output() dialogEvent = new EventEmitter();

  constructor(
    private dialogModel: Dialog
  ) {}

  confirm() {
    this.dialogEvent.emit();
    (<HTMLInputElement>document.getElementById('closeDialogBtn')).click();
  }

}
