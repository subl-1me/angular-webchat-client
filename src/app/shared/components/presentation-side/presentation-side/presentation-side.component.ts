import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presentation-side',
  templateUrl: './presentation-side.component.html',
  styleUrls: ['./presentation-side.component.css']
})
export class PresentationSideComponent implements OnInit {

  public inviteType:string = '';

  constructor() { }

  ngOnInit(): void {
  }

  public setInviteDuo():void{
    this.inviteType = 'duo';
    localStorage.setItem('inviteType', 'duo');
  }

}
