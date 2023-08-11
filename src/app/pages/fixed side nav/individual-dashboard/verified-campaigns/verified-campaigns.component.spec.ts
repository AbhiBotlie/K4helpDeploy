import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedCampaignsComponent } from './verified-campaigns.component';

describe('VerifiedCampaignsComponent', () => {
  let component: VerifiedCampaignsComponent;
  let fixture: ComponentFixture<VerifiedCampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifiedCampaignsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifiedCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
