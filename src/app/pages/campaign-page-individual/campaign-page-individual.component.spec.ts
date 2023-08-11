import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignPageIndividualComponent } from './campaign-page-individual.component';

describe('CampaignPageIndividualComponent', () => {
  let component: CampaignPageIndividualComponent;
  let fixture: ComponentFixture<CampaignPageIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignPageIndividualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignPageIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
