import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteModalBodyComponent } from './invite-modal-body.component';

describe('InviteModalBodyComponent', () => {
  let component: InviteModalBodyComponent;
  let fixture: ComponentFixture<InviteModalBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteModalBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteModalBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
