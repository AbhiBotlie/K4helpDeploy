import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseCampaignComponent } from './browse-campaign.component';

describe('BrowseCampaignComponent', () => {
  let component: BrowseCampaignComponent;
  let fixture: ComponentFixture<BrowseCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseCampaignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
