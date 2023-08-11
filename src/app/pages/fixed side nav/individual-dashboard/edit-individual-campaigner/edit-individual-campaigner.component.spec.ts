import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIndividualCampaignerComponent } from './edit-individual-campaigner.component';

describe('EditIndividualCampaignerComponent', () => {
  let component: EditIndividualCampaignerComponent;
  let fixture: ComponentFixture<EditIndividualCampaignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIndividualCampaignerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditIndividualCampaignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
