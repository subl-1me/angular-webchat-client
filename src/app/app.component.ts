import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-webchat';

  constructor(
  ){
    localStorage.removeItem('activedChatId');
    localStorage.removeItem('isFirstLoad');
  }


}
