import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-temp-menu',
  templateUrl: './temp-menu.component.html',
  styleUrls: ['./temp-menu.component.scss']
})
export class TempMenuComponent {

  title: any;

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe(() => {
      this.title = this.router.url;
    });
  }

}
