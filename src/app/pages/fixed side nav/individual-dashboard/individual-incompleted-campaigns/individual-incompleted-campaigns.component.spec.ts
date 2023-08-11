import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualIncompletedCampaignsComponent } from './individual-incompleted-campaigns.component';

describe('IndividualIncompletedCampaignsComponent', () => {
  let component: IndividualIncompletedCampaignsComponent;
  let fixture: ComponentFixture<IndividualIncompletedCampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualIncompletedCampaignsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualIncompletedCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
