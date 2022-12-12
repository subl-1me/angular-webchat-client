import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationSideComponent } from './presentation-side.component';

describe('PresentationSideComponent', () => {
  let component: PresentationSideComponent;
  let fixture: ComponentFixture<PresentationSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentationSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
