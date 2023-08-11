import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpfilledpopupComponent } from './otpfilledpopup.component';

describe('OtpfilledpopupComponent', () => {
  let component: OtpfilledpopupComponent;
  let fixture: ComponentFixture<OtpfilledpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpfilledpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpfilledpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
