import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'sprint-connect';
  showSidebar = false;

  constructor(
    private location: Location
  ) {}

  ngOnInit() {
    // check for display sidebar
    if(this.location.path().includes('login') || this.location.path().includes('register') || this.location.path().includes('reset-password')) {
      this.showSidebar = false;
    } else {
      this.showSidebar = true;
    }
  }

}
