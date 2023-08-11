import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignDonatePageComponent } from './campaign-donate-page.component';

describe('CampaignDonatePageComponent', () => {
  let component: CampaignDonatePageComponent;
  let fixture: ComponentFixture<CampaignDonatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignDonatePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignDonatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
