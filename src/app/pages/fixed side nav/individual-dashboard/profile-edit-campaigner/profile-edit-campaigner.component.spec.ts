import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditCampaignerComponent } from './profile-edit-campaigner.component';

describe('ProfileEditCampaignerComponent', () => {
  let component: ProfileEditCampaignerComponent;
  let fixture: ComponentFixture<ProfileEditCampaignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEditCampaignerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEditCampaignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
