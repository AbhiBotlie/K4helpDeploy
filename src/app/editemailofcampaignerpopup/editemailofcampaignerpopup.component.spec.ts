import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditemailofcampaignerpopupComponent } from './editemailofcampaignerpopup.component';

describe('EditemailofcampaignerpopupComponent', () => {
  let component: EditemailofcampaignerpopupComponent;
  let fixture: ComponentFixture<EditemailofcampaignerpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditemailofcampaignerpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditemailofcampaignerpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
