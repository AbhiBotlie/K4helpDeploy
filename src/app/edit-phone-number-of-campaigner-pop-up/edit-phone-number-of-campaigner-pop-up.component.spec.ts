import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhoneNumberOfCampaignerPopUpComponent } from './edit-phone-number-of-campaigner-pop-up.component';

describe('EditPhoneNumberOfCampaignerPopUpComponent', () => {
  let component: EditPhoneNumberOfCampaignerPopUpComponent;
  let fixture: ComponentFixture<EditPhoneNumberOfCampaignerPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPhoneNumberOfCampaignerPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPhoneNumberOfCampaignerPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
